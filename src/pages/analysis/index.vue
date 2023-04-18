<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import ecahrts from '../../components/echarts/index.vue'
import utils from '../../plugins/utils'
interface LineOption {
  xAxis: {
    data: Array<String>
  },
  series: Array<{
    name: String,
    type: String,
    data: Array<Number>
  }>
}

defineProps<{ msg: string }>()

const searchParams = reactive({ startYear: '', startMouth: '', endYear: '', endMouth: '' }),
  activeVal = ref(''),
  activeTab = ref('operate')

let message: any = null;
const pieOption = JSON.stringify({
  title: {
    text: '收入汇总',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '收入',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      data: [],
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
    }
  ]
})
const lineOption: LineOption = reactive({
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
  series: []
}),
  pieOption1 = reactive(JSON.parse(pieOption)),
  pieOption2 = reactive(JSON.parse(pieOption))

pieOption2.series[0].name = '支出'
pieOption2.title.text = '支出汇总'

const yearList: Array<Number> = [], mouthList: Array<Number> = []
const nowY = new Date().getFullYear()

for (let i = 0; i < 10; i++) {
  yearList.unshift(nowY - i)
}

for (let i = 0; i < 12; i++) {
  mouthList.push(i + 1)
}

onMounted(() => {
  message = getCurrentInstance()?.appContext.config.globalProperties.$message
})

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
  activeTab.value = 'analysis'
  handleChangeTime('ALL', 0)
}

function handleChangeTime(flag: string, item: number) {
  activeVal.value = `${flag}-${item}`

  let startTime = 0, endTime = new Date().getTime()
  if (flag !== 'ALL') {
    const time = flag === 'M' ? `${nowY}-${item}-01` : `${item}-01-01`
    startTime = utils.getStartTime(flag, time)
    endTime = utils.getEndTime(flag, time)
  }

  getPartData(startTime, endTime)
}

function handleSearch() {
  const { startYear, startMouth, endYear, endMouth } = searchParams
  if (!startYear) return message({ msg: '请选择开始年份', duration: 1000, type: 'error' })
  if (!startMouth) return message({ msg: '请选择开始月份', duration: 1000, type: 'error' })
  if (!endYear) return message({ msg: '请选择结束年份', duration: 1000, type: 'error' })
  if (!endMouth) return message({ msg: '请选择结束月份', duration: 1000, type: 'error' })

  const startTime = utils.getStartTime('M', `${startYear}-${startMouth}-1`)
  const endTime = utils.getEndTime('M', `${endYear}-${endMouth}-1`)
  getPartData(startTime, endTime)
}

function getPartData(startTime: number, endTime: number) {
  const bks = localStorage.getItem('bk-ss')
  if (!bks) return message({ msg: '请粘贴数据', duration: 1000, type: 'error' })
  const dailyItems: Array<any> = JSON.parse(bks).dailyItems
  dailyItems.reverse()

  let temp: Array<{}> = []
  dailyItems.map(item => {
    if (item.date > startTime && item.date < endTime) {
      temp.push(item)
    }
  })

  analysisPie(temp)
  analysisLine(temp)
}

function analysisLine(data) {
  const d: Array<string> = [], income: Array<Number> = [], outcome: Array<Number> = [], in2out: Array<Number> = [], one = { in: 0, out: 0 }

  data.map(item => {
    const { date, flowList, incomeAmount, outgoAmount } = item

    item.in1 = incomeAmount ? incomeAmount / 10000 : incomeAmount
    item.out1 = outgoAmount ? outgoAmount / 10000 : outgoAmount
    item.date1 = utils.formatTime(date)

    const { in1, out1, date1 } = item
    one.in += in1
    one.out += out1

    d.push(date1)
    income.push(in1)
    outcome.push(out1)
    in2out.push(one.in - one.out)
  })

  lineOption.xAxis.data = d
  lineOption.series = [{
    name: '收入',
    type: 'line',
    data: income
  }, {
    name: '支出',
    type: 'line',
    data: outcome
  }, {
    name: '结余',
    type: 'line',
    data: in2out
  },
  ]
}

function analysisPie(data) {
  const tempIn = [], tempOut = []
  data.map(item => {
    item.flowList.map(it => {
      if (it.recType === 1) {
        tempOut.push(it)
      } else {
        tempIn.push(it)
      }
    })
  })

  analysisByCategory(tempIn, pieOption1)
  analysisByCategory(tempOut, pieOption2)
}

function analysisByCategory(data, option) {
  const res = [], obj = {}
  data.map(item => {
    const { categoryName, categoryId, amount } = item
    if (!obj[categoryName]) {
      obj[categoryName] = amount
    } else {
      obj[categoryName] += amount
    }
  })
  Object.keys(obj).map(k => {
    res.push({ name: k, value: obj[k] })
  })
  option.series[0].data = res
}

</script>

<template>
  <main-layout>
    <ss-tabs v-model="activeTab">
      <ss-tab-pane
        label="获取数据"
        name="operate"
      >
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

      </ss-tab-pane>
      <ss-tab-pane
        label="分析数据"
        name="analysis"
      >
        <!-- 年，月 -->
        <ss-tabs>
          <ss-tab-pane
            label="year"
            name="y"
          >
            <div class="time-wrapper box-start">
              <div
                v-for="item in yearList"
                :key="item"
                :class="`time-item ${activeVal === `Y-${item}` ? 'active' : ''}`"
                @click="() => handleChangeTime('Y', item)"
              >{{ item }}</div>
              <div
                :class="`time-item ${activeVal === `ALL-0` ? 'active' : ''}`"
                @click="() => handleChangeTime('ALL', 0)"
              >全部</div>
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
                :class="`time-item ${activeVal === `M-${item}` ? 'active' : ''}`"
                @click="() => handleChangeTime('M', item)"
              >{{ item }}</div>
            </div>
          </ss-tab-pane>
          <ss-tab-pane
            label="other"
            name="o"
          >
            <div class="box-start">
              <ss-select
                :dicData="yearList"
                placeholder="开始年份"
                v-model:modelValue="searchParams.startYear"
              ></ss-select>
              <ss-select
                :dicData="mouthList"
                placeholder="开始月份"
                v-model:modelValue="searchParams.startMouth"
              ></ss-select>
              -
              <ss-select
                :dicData="yearList"
                placeholder="结束年份"
                v-model:modelValue="searchParams.endYear"
              ></ss-select>
              <ss-select
                :dicData="mouthList"
                placeholder="结束月份"
                v-model:modelValue="searchParams.endMouth"
              ></ss-select>
              <ss-button @click="handleSearch">分析</ss-button>
            </div>
          </ss-tab-pane>

        </ss-tabs>
        <!-- 折线图 -->
        <ecahrts :option="lineOption"></ecahrts>
        <!-- 饼图 -->
        <ecahrts :option="pieOption1"></ecahrts>
        <ecahrts :option="pieOption2"></ecahrts>
      </ss-tab-pane>
    </ss-tabs>

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

  &.active {
    color: $color-primary;
  }
}
</style>
