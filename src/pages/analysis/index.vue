<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()
// https://www.wacai.com/
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
        })
      } else {
        alert('请允许读取剪贴板！')
      }
    })
}

</script>

<template>
  <h1>analysis</h1>
  <h2>请按顺序执行以下内容：</h2>

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
    </div>
    <div>3. 登录网站=&gt;查看记账页面 =&gt; F12 打开控制面板 =&gt; 在console 粘贴脚本 </div>
    <div>
      4. 点击粘贴按钮插入数据
      <div
        class="btn"
        @click="insertText"
      >粘贴</div>
    </div>
    <div>
      5. 点击分析按钮进行数据分析
      <div class="btn">分析</div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.list {}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  /* width: ; */
}
</style>
