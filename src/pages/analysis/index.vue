<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import ecahrts from '../../components/echarts/index.vue'
import utils from '../../plugins/utils'
defineProps<{ msg: string }>()

let message: any = null;

let showStep = ref(true),
  lineOption = reactive({
    title: {
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['收入', '支出', '结余']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
    ]
  }),
  pieOption = reactive(
    {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    }
  ),
  allListItems = reactive({ data: [] })


onMounted(() => {
  message = getCurrentInstance()?.appContext.config.globalProperties.$message
})

const count = ref(0)
function copyText() {
  navigator.clipboard.writeText(`function postRequest(url, params) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText).data
                console.log(JSON.stringify(data));

                // let flows = []
                // data.dailyItems.map(item => {
                //     flows = flows.concat(item.flowList)
                // })
                // console.log(JSON.stringify(flows));
                // window.flows = flows
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(JSON.stringify(params));
}


// https://www.wacai.com/activity/bkk-frontier/api/v2/flow/list/web?___t=1674008531842
postRequest("https://www.wacai.com/activity/bkk-frontier/api/v2/flow/list/web?___t=1674008531842", {
    "bkId": 110132707,
    "startTime": new Date('2017-01-01 00:00:00').getTime(),
    "endTime": new Date().getTime(),
    "queryFlowCount": true, "recTypeList": null, "mainTypeIdList": null, "subTypeIdList": null, "accountIdList": null, "projectIdList": null, "tradetgtIdList": null, "memberIdList": null, "reimburseList": null, "comment": null, "amountStart": null, "amountEnd": null, "pageSize": 1000000000, "pageIndex": 1, "queryTagName": true
})`)

  message({ msg: '复制成功~', duration: 1000, type: 'success' })
}
function insertText() {
  navigator.permissions
    .query({
      name: 'clipboard-read' as PermissionName
    })
    .then(result => {
      if (result.state == 'granted' || result.state == 'prompt') {
        //读取剪贴板
        navigator.clipboard.readText().then(text => {
          console.log(text)
          localStorage.setItem('bk-ss', text)
          message({ msg: '粘贴成功~', duration: 1000, type: 'success' })
        })
      } else {
        message({ msg: '请允许读取剪贴板！', duration: 1000, type: 'error' })
      }
    })
}

function analysisData() {
  showStep.value = false
  const bks = localStorage.getItem('bk-ss')
  if (!bks) return message({ msg: '请粘贴数据', duration: 1000, type: 'error' })
  const { dailyItems } = JSON.parse(bks)
  console.log(dailyItems)
  dailyItems.map(item => {

  })
  allListItems.data = dailyItems
}
let activeTitle = ref('m')
const tempY = [], tempM = []
const nowY = new Date().getFullYear()
for (let i = 0; i < 10; i++) {
  tempY.unshift(nowY - i)
}
for (let i = 0; i < 12; i++) {
  tempY.unshift(nowY - i)
}

let yearList = ref(tempY)

function handleChangeTime(item, flag) {
  let time = '', start = 0, end = 0
  if(flag === 'm'){
     time = `${nowY}-${item}-01`
     start = utils.getStartTime(time)
     end = utils.getEndTime(time)
  }

}
</script>

<template>
  <main-layout>
    <ss-tabs v-model="activeTitle">
      <ss-tab-pane
        label="year"
        name="y"
      >
        <div class="time-wrapper box-start">
          <div
            v-for="item in yearList"
            :key="item"
            class="time-item"
            @click="() => handleChangeTime(item, 'y')"
          >{{ item }}</div>
        </div>

      </ss-tab-pane>

      <ss-tab-pane
        label="mouth"
        name="m"
      >
        <div class="time-wrapper box-start">
          <div
            v-for="item in 12"
            :key="item"
            class="time-item"
            @click="() => handleChangeTime(item, 'm')"
          >{{ item }}</div>
        </div>
      </ss-tab-pane>
    </ss-tabs>

    <div class="tabs">
      <div
        :class="showStep ? 'active' : ''"
        @click="showStep = true"
      >
        插入数据
      </div>
      <div
        :class="!showStep ? 'active' : ''"
        @click="showStep = false"
      >分析</div>
    </div>
    <div v-if="showStep">
      <div class="list">
        <div>1. 点击复制按钮，复制脚本
          <div
            class="btn"
            @click="copyText"
          >复制</div>
        </div>
        <div>2. <a
            href="https://www.wacai.com/"
            target="_blank"
          >点击去记账网站</a>
          => 登录网站=&gt;查看记账页面 =&gt; F12 打开控制面板 =&gt; 在console 粘贴脚本
        </div>
        <div>
          3. 点击粘贴按钮插入数据
          <div
            class="btn"
            @click="insertText"
          >粘贴</div>
        </div>
        <div>
          4. 点击分析按钮进行数据分析
          <div
            class="btn"
            @click="analysisData"
          >分析</div>
        </div>
      </div>
    </div>

    <div v-else>

      <!-- <div class="tabs">
                                      <div class="year"></div>
                                      <div class="mouth"></div>
                                      <div class="other"></div>
                                    </div> -->
      <!-- 饼图 -->
      <ecahrts :option="lineOption"></ecahrts>
      <!-- 折线图 -->
      <ecahrts :option="pieOption"></ecahrts>
    </div>
  </main-layout>
</template>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
}

.list>div {
  display: flex;
  align-items: center;
  padding: 5px 0;

}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 5px;
  border: 1px solid #999;
  border-radius: 5px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.tabs {
  display: flex;
  align-items: center;

  div {
    padding: 5px;
    cursor: pointer;
  }

  .active {
    color: $color-primary;
  }

}

.time-item {
  cursor: pointer;
}
</style>
