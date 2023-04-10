import {
  defineComponent,
  ref,
  reactive,
  useSlots,
  useAttrs,
  onMounted,
  watch,
} from "vue";

export default defineComponent({
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
  setup: (props, context) => {
    const panels = context.slots.default();
    const titles = panels.map((item, index) => {
      const { props = {} } = item;
      const { label, name } = props;
      props.key = name; // 绑定keys 值
      return { label, name: name || index };
    });

    let activeValue = ref(props.modelValue || titles[0].name);

    watch(
      () => props.modelValue,
      (n, o) => {
        activeValue.value = n;
      }
    );

    function handleChangeTab(name) {
      activeValue.value = name;
      context.emit("update:modelValue", name);
    }

    return () => (
      <>
        <div class="ss-tabs-header">
          {titles.map((titleInfo) => {
            const { name, label } = titleInfo;
            return (
              <div
                key={name}
                onClick={() => handleChangeTab(name)}
                class={["tab-title", { active: activeValue.value === name }]}
              >
                {label}
              </div>
            );
          })}
        </div>

        <div class="ss-tabs-content">
          {panels.map((panelComponent) => {
            const { props = {} } = panelComponent;
            const { name } = props;
            return (
              <div key={name} v-show={activeValue.value === name}>
                <panelComponent></panelComponent>
              </div>
            );
          })}
        </div>
      </>
    );
  },
});
