<template>
  <div>
    <h1>基本学分信息</h1>
    <div class="table1">
      <el-table
          :data="tableData1"
          border
          style="width: 100%">
        <el-table-column
            prop="sumCredits"
            label="已选学分">
        </el-table-column>
        <el-table-column
            prop="getCredits"
            label="已选学分">
        </el-table-column>
        <el-table-column
            prop="noCredits"
            label="未获得学分">
        </el-table-column>
        <el-table-column
            prop="failed"
            label="不及格课数">
        </el-table-column>
      </el-table>
    </div>
    <div style="height: 20px"></div>
    <h1>详细学分信息</h1>
    <div class="table2">
<!--      <el-table-->
<!--          :data="tableData2"-->
<!--          border-->
<!--          style="width: 100%">-->
<!--        <el-table-column-->
<!--            prop="comGrowth"-->
<!--            label="成长必修课">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="english"-->
<!--            label="大学英语课">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="pe"-->
<!--            label="大学体育课">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="phy"-->
<!--            label="自然与学科基础课">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="divElective"-->
<!--            label="多元化专业选修课">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="comGeneral"-->
<!--            label="通识必修课">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="pubElective"-->
<!--            label="公共选修课">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="ideCompulsory"-->
<!--            label="思政必修课">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="proElective"-->
<!--            label="专业选修课">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="proEdu"-->
<!--            label="专业教育课">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="undefinedScore"-->
<!--            label="未匹配学分">-->
<!--        </el-table-column>-->
<!--      </el-table>-->
      <el-table
          :data="tableData2"
          border
          style="width: 100%">
        <template v-for='(col) in tableData4'>
          <el-table-column
          :prop="col.dataItem"
          :label="col.dataName"
          :key="col.dataItem">
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div style="height: 20px"></div>
    <h1>人才培养方案</h1>
    <div class="table3">
      <el-table
          :data="tableData3"
          border
          style="width: 100%">
        <el-table-column
            prop="description"
            label="">
        </el-table-column>
        <el-table-column
            prop="proCredits"
            label="专业课平均绩点">
        </el-table-column>
        <el-table-column
            prop="pubCompulsory"
            label="公共必修">
        </el-table-column>
        <el-table-column
            prop="genElective"
            label="通识选修">
        </el-table-column>
        <el-table-column
            prop="comGrowth"
            label="成长教育必修">
        </el-table-column>
        <el-table-column
            prop="phy"
            label="自然与学科基础">
        </el-table-column>
        <el-table-column
            prop="proEdu"
            label="专业教育">
        </el-table-column>
        <el-table-column
            prop="divProElective"
            label="多元化专业选修">
        </el-table-column>
        <el-table-column
            prop="sum"
            label="总计">
        </el-table-column>
        <el-table-column
            prop="undefinedScore"
            label="未匹配学分">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import scoreStatistics from '../utils/scoreStatistics'
import transcriptSpider from "../utils/transcriptSpider";
import {getInfo,checkLoginStatus} from "../utils/getInfo"
import planArray from "../utils/plan";
export default {
  name: "creditManage",
  data() {
    return {
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: []
    }
  },
  methods: {
    async getBaseData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let jwloginToken = this.$store.getters.getToken
      let loginStatus = await checkLoginStatus(jwloginToken)
      try {
        loginStatus = await checkLoginStatus(jwloginToken)
      } catch (e) {
        this.$notify.error({
          title: 'Error',
          message: '教务系统抽风，请稍后再试'
        });
      }
      if (loginStatus === true) {
        let obj = await transcriptSpider(jwloginToken, {xn: '2020', xq: '2'})
        let actualId = obj.user.actualId
        let statistics = await scoreStatistics(jwloginToken, actualId)
        let obj1 = {}
        obj1.sumCredits = statistics.yxxf
        obj1.getCredits = statistics.yhdxf
        obj1.noCredits = statistics.yxxf - statistics.yhdxf
        obj1.failed = statistics.bjgmc
        this.tableData1.push(obj1)
      } else {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
      loading.close()
    },
    async getDetailData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let jwloginToken = this.$store.getters.getToken
      let loginStatus = await checkLoginStatus(jwloginToken)
      try {
        loginStatus = await checkLoginStatus(jwloginToken)
      } catch (e) {
        this.$notify.error({
          title: 'Error',
          message: '教务系统抽风，请稍后再试'
        });
      }
      if (loginStatus === true) {
        let obj = await transcriptSpider(jwloginToken, {xn: "", xq: ""})
        obj = obj.msg.list
        let obj2 = {}
        let english = 0
        let pe = 0
        let phy = 0
        let proEdu = 0
        let proElective = 0
        let divElective = 0
        let comGeneral = 0
        let pubElective = 0
        let ideCompulsory = 0
        let comGrowth = 0
        let undefinedScore = 0
        obj.forEach(function (element) {
          switch (element.kcxz) {
            case "大学英语课":
              english += parseInt(element.kcxf);
              break;
            case "大学体育课":
              pe += parseInt(element.kcxf)
              break;
            case "自然与学科基础课":
              phy += parseInt(element.kcxf);
              break;
            case "专业教育课":
              proEdu += parseInt(element.kcxf);
              break;
            case "专业选修课":
              proElective += parseInt(element.kcxf);
              break;
            case "多元化专业选修课":
              divElective += parseInt(element.kcxf);
              break;
            case "通识必修课":
              comGeneral += parseInt(element.kcxf);
              break;
            case "公共选修课":
              pubElective += parseInt(element.kcxf);
              break;
            case "思政必修课":
              ideCompulsory += parseInt(element.kcxf);
              break;
            case "成长必修课":
              comGrowth += parseInt(element.kcxf);
              break;
            default:
              undefinedScore += parseInt(element.kcxf);
              break;
          }
        })
        obj2.english = english
        obj2.pe = pe
        obj2.phy = phy
        obj2.proEdu = proEdu
        obj2.proElective = proElective
        obj2.divElective = divElective
        obj2.comGeneral = comGeneral
        obj2.pubElective = pubElective
        obj2.ideCompulsory = ideCompulsory
        obj2.comGrowth = comGrowth
        obj2.undefinedScore = undefinedScore
        this.tableData2.push(obj2)
      } else {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
      loading.close()
    },
    async getPlan(){
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let jwloginToken = this.$store.getters.getToken
      let loginStatus = await checkLoginStatus(jwloginToken)
      try {
        loginStatus = await checkLoginStatus(jwloginToken)
      } catch (e) {
        this.$notify.error({
          title: 'Error',
          message: '教务系统抽风，请稍后再试'
        });
      }
      if (loginStatus === true) {
        let obj = await transcriptSpider(jwloginToken, {xn: "", xq: ""})
        let infoForm = await getInfo(jwloginToken)
        obj = obj.msg.list
        console.log(obj)
        let obj2 = {}
        let pubCompulsory = 0
        let genElective = 0
        let comGrowth = 0
        let phy = 0
        let proEdu = 0
        let divProElective = 0
        let undefinedScore = 0
        let avg = 0
        let avgCount = 0
        planArray.forEach(function (element){
          if(infoForm.faculty === element.name){
            obj.forEach(function (e){
              element.data.forEach(function (eData) {
                // eslint-disable-next-line no-prototype-builtins
                if(eData.hasOwnProperty("include")){
                  if(eData.name === e.kcxz || eData.include.includes(e.kcxz)){
                    switch (eData.name) {
                      case "公共必修课":
                        pubCompulsory += parseFloat(e.kcxf);
                        break;
                      case "通识选修课":
                        genElective += parseFloat(e.kcxf);
                        break;
                      case "成长教育必修课":
                        comGrowth += parseFloat(e.kcxf);
                        break;
                      case "自然与学科基础课":
                        phy += parseFloat(e.kcxf);
                        avg += parseFloat(e.jdVal);
                        avgCount++
                        break;
                      case "专业教育课":
                        proEdu += parseFloat(e.kcxf);
                        avg += parseFloat(e.jdVal);
                        avgCount++
                        break;
                      case "多元化专业选修课":
                        divProElective += parseFloat(e.kcxf);
                        avg += parseFloat(e.jdVal);
                        avgCount++
                        break;
                      default:
                        undefinedScore += parseFloat(e.kcxf);
                        break;
                    }
                  }
                }else{
                  if(eData.name === e.kcxz){
                    switch (eData.name) {
                      case "公共必修课":
                        pubCompulsory += parseFloat(e.kcxf);
                        break;
                      case "通识选修课":
                        genElective += parseFloat(e.kcxf);
                        break;
                      case "成长教育必修课":
                        comGrowth += parseFloat(e.kcxf);
                        break;
                      case "自然与学科基础课":
                        phy += parseFloat(e.kcxf);
                        avg += parseFloat(e.jdVal);
                        avgCount++
                        break;
                      case "专业教育课":
                        proEdu += parseFloat(e.kcxf);
                        avg += parseFloat(e.jdVal);
                        avgCount++
                        break;
                      case "多元化专业选修课":
                        divProElective += parseFloat(e.kcxf);
                        avg += parseFloat(e.jdVal);
                        avgCount++
                        break;
                      default:
                        undefinedScore += parseFloat(e.kcxf);
                        break;
                    }
                  }
                }
              })
            })
          }
        })
        obj2.description = "已获得学分"
        obj2.proCredits = (avg/avgCount).toFixed(3)
        console.log(avg)
        console.log(avgCount)
        obj2.sum = pubCompulsory+genElective+comGrowth+phy+proEdu+divProElective
        obj2.pubCompulsory = pubCompulsory
        obj2.genElective = genElective
        obj2.comGrowth = comGrowth
        obj2.phy = phy
        obj2.proEdu = proEdu
        obj2.divProElective = divProElective
        obj2.undefinedScore = undefinedScore
        let obj3 = {}
        obj3.description = "培养方案"
        console.log(infoForm.major)
        let flag = false
        for(let i=0;i<planArray.length;i++){
          console.log(infoForm)
          if(infoForm.faculty === planArray[i].name && "20"+infoForm.id.substr(0,2) === planArray[i].level+""){
            flag = true
            let tempObj = planArray[i]
            obj3.sum = tempObj.total
            planArray[i].data.forEach(function (element) {
              switch (element.name){
                case "公共必修课":
                  obj3.pubCompulsory = element.num;
                  break;
                case "通识选修课":
                  obj3.genElective = element.num;
                  break;
                case "成长教育必修课":
                  obj3.comGrowth = element.num;
                  break;
                case "自然与学科基础课":
                  obj3.phy = element.num;
                  break;
                case "专业教育课":
                  obj3.proEdu = element.num;
                  break;
                case "多元化专业选修课":
                  obj3.divProElective = element.num;
                  break;
              }
            })
          }
        }
        if(flag === false){
          obj3.pubCompulsory = "暂未适配！"
          obj3.genElective = "暂未适配！"
          obj3.comGrowth = "暂未适配！"
          obj3.phy = "暂未适配！"
          obj3.proEdu = "暂未适配！"
          obj3.divProElective = "暂未适配！"
        }
        obj3.undefinedScore = "-"
        obj3.proCredits="2.0"
        this.tableData3.push(obj3)
        this.tableData3.push(obj2)
      } else {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
      loading.close()
    },
    async getTable2(){
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let jwloginToken = this.$store.getters.getToken
      let loginStatus = await checkLoginStatus(jwloginToken)
      try {
        loginStatus = await checkLoginStatus(jwloginToken)
      } catch (e) {
        this.$notify.error({
          title: 'Error',
          message: '教务系统抽风，请稍后再试'
        });
      }
      if (loginStatus === true) {
        let obj = await transcriptSpider(jwloginToken, {xn: "", xq: ""})
        obj = obj.msg.list
        let obj2 = []
        obj.forEach(function (element) {
          let flag = false
          let tempObj = {}
          obj2.forEach(function (ele2) {
            if(ele2.dataName === element.kcxz){
              flag = true
            }
          })
          if(flag === false){
            tempObj.dataName = element.kcxz
            switch (element.kcxz){
              case "大学英语课":
                tempObj.dataItem = "english"
                break;
              case "大学体育课":
                tempObj.dataItem = "pe"
                break;
              case "自然与学科基础课":
                tempObj.dataItem = "phy"
                break;
              case "专业教育课":
                tempObj.dataItem = "proEdu"
                break;
              case "专业选修课":
                tempObj.dataItem = "proElective"
                break;
              case "多元化专业选修课":
                tempObj.dataItem = "divElective"
                break;
              case "通识必修课":
                tempObj.dataItem = "comGeneral"
                break;
              case "公共选修课":
                tempObj.dataItem = "pubElective"
                break;
              case "思政必修课":
                tempObj.dataItem = "ideCompulsory"
                break;
              case "成长必修课":
                tempObj.dataItem = "comGrowth"
                break;
            }
            obj2.push(tempObj)
          }
        })
        obj2.push({
          dataName:"未匹配学分",
          dataItem:"undefinedScore"
        })
        this.tableData4 = obj2
      } else {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
      loading.close()
    }
  },
  created() {
    this.getBaseData()
    this.getDetailData()
    this.getPlan()
    this.getTable2()
  }
}
</script>

<style scoped>

</style>
