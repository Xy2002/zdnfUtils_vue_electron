<template>
  <FullCalendar :options="calendarOptions"/>
</template>
<script src="https://unpkg.com/popper.js/dist/umd/popper.min.js"></script>
<script src="https://unpkg.com/tooltip.js/dist/umd/tooltip.min.js"></script>
<script>
import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid';
import courseSpider from '../utils/courseSpider';
import {checkLoginStatus} from "@/utils/getInfo";

export default {
  name: "calendar",
  components: {
    FullCalendar
  },
  data() {
    const jwloginToken = this.$store.getters.getToken
    return {
      calendarOptions: {
        plugins: [timeGridPlugin],
        initialView: 'timeGridWeek',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        },
        allDaySlot: false,
        locale: 'zh-cn',
        firstDay: 1,
        nowIndicator: true,
        slotMinTime: "01:00:00",
        slotMaxTime: "24:00:00",
        slotDuration: "01:00:00",
        expandRows: true,
        eventDidMount: function (info) {
          var tooltip = new Tooltip(info.el, {
            title: `${info.event.extendedProps.desName}\n${info.event.extendedProps.description}`,
            placement: 'top',
            trigger: 'hover',
            container: 'body'
          });
        },
        events: async function (info, successCallback, failureCallback) {
          let courseData = await courseSpider(jwloginToken)
          let courseFormatData = []
          for (let i = 0; i < courseData.length; i++) {
            let data = courseData[i]
            let start = data.start
            let end = data.end
            let title = data.title
            let obj = {}
            obj.start = start
            obj.end = end
            obj.title = title
            obj.description = "上课地点:" + data.place
            obj.desName = "课程名称:" + data.title
            courseFormatData.push(obj)
          }
          console.log(info)
          if (courseFormatData) {
            successCallback(courseFormatData)
          } else {
            failureCallback("获取课程表失败!");
          }
        }
      },
    }
  },
  methods: {
    async checkStatus() {
      let jwloginToken = this.$store.getters.getToken
      let loginStatus = await checkLoginStatus(jwloginToken)
      try {
        loginStatus = await checkLoginStatus(jwloginToken)
      } catch (e) {
        console.log(e)
        this.$notify.error({
          title: 'Error',
          message: '教务系统抽风，请稍后再试'
        });
      }
      console.log(loginStatus)
      if (loginStatus !== true) {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
    }
  },
  async created() {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    await this.checkStatus()
    let arr = ['https://unpkg.com/popper.js/dist/umd/popper.min.js',
      'https://unpkg.com/tooltip.js/dist/umd/tooltip.min.js'];
    arr.map((item) => {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = item;
      document.getElementsByTagName('body')[0].appendChild(script);
    })
    loading.close()
  }
}
</script>

<style>
.tooltip {
  position: absolute;
  z-index: 9999;
  background: #67C23A;
  color: white;
  width: 150px;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}
</style>
