<template>
  <el-container>
    <el-header height="130px">
      <el-alert
          :title="alertTitle"
          type="info"
          show-icon
          :closable="false"
          style="margin-top: 10px">
      </el-alert>
      <div class="header">
        <el-row style="margin-top: 10px;margin-bottom: 10px">
          <el-col :span="8">
            <div class="grid-content">开课学年:
              <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">开课学期:
              <el-select v-model="value2" placeholder="请选择">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="grid-content">
              <el-button type="primary" @click="getTranscript" plain>查询</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-header>
    <el-main>
      <el-table
          :data="tableData"
          style="width: 100%"
          stripe
          max-height="490">
        <el-table-column
            prop="schoolYear"
            label="开课学年">
        </el-table-column>
        <el-table-column
            prop="schoolTerm"
            label="学年学期">
        </el-table-column>
        <el-table-column
            prop="name"
            label="课程名称">
        </el-table-column>
        <el-table-column
            prop="nature"
            label="课程性质">
        </el-table-column>
        <el-table-column
            prop="credit"
            label="课程学分">
        </el-table-column>
        <el-table-column
            prop="usualGrades"
            label="平时成绩">
        </el-table-column>
        <el-table-column
            prop="midTermGrades"
            label="期中成绩">
        </el-table-column>
        <el-table-column
            prop="finalGrades"
            label="期末成绩">
        </el-table-column>
        <el-table-column
            prop="practiceResults"
            label="实践成绩">
        </el-table-column>
        <el-table-column
            prop="overallRating"
            label="总评成绩">
        </el-table-column>
        <el-table-column
            prop="retakeGrades"
            label="重考成绩">
        </el-table-column>
        <el-table-column
            prop="minorMark"
            label="辅修标记">
        </el-table-column>
        <el-table-column
            prop="reworkMark"
            label="重修标记">
        </el-table-column>
        <el-table-column
            prop="gradePoint"
            label="最终绩点">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import transcriptSpider from '../utils/transcriptSpider'
import scoreStatistics from '../utils/scoreStatistics'

export default {
  name: "transcriptList",
  data() {
    return {
      tableData: [],
      value: '',
      value2: '',
      options: [{value: '2021', label: '2021'}, {value: '2020', label: '2020'}, {
        value: '2019',
        label: '2019'
      }, {value: '2018', label: '2018'}, {value: '2017', label: '2017'}],
      options2: [{value: '1', label: '1'}, {value: '2', label: '2'}],
      alertTitle: ''
    }
  },
  methods: {
    async getAlerTitle() {
      let jwloginToken = this.$store.getters.getToken
      let obj = await transcriptSpider(jwloginToken, {xn: '2020', xq: '2'})
      let actualId = obj.user.actualId
      let statistics = await scoreStatistics(jwloginToken, actualId)
      let avgScore = statistics.avg
      let avgPoint = statistics.avgJd
      let sumScore = statistics.yxxf
      let havenScore = statistics.yhdxf
      this.alertTitle = `已获得学分:${havenScore},当前已选学分:${sumScore},历年平均成绩为:${avgScore},历年平均绩点为:${avgPoint}`
    },
    async getTranscript() {
      let jwloginToken = this.$store.getters.getToken
      let _options = {
        xn: this.value,
        xq: this.value2
      }
      let obj = await transcriptSpider(jwloginToken, _options)
      obj = obj.msg.list
      let result = []
      var sum = 0;
      for (let i = 0; i < obj.length; i++) {
        let temp = obj[i]
        let tempObj = {}
        tempObj.schoolYear = temp.kkxn
        tempObj.schoolTerm = temp.xnxq
        tempObj.name = temp.yjkcmc
        tempObj.nature = temp.kcxz
        tempObj.credit = temp.kcxf
        tempObj.usualGrades = temp.pscj
        tempObj.midTermGrades = temp.qzcj
        tempObj.finalGrades = temp.qmcj
        tempObj.practiceResults = temp.sjcj
        tempObj.overallRating = temp.zpcj
        if (temp.ckcj) {
          tempObj.retakeGrades = temp.ckcj
        } else {
          tempObj.retakeGrades = ""
        }
        if (temp.fxbj === 0) {
          tempObj.minorMark = "否"
        } else {
          tempObj.minorMark = "是"
        }
        if (temp.cxbj === 0) {
          tempObj.reworkMark = "否"
        } else {
          tempObj.reworkMark = "是"
        }
        tempObj.gradePoint = temp.jdVal
        sum += tempObj.gradePoint
        result.push(tempObj)
      }
      // sum = sum.toFixed(2)
      let _avgPoint = ((sum.toFixed(2)) / result.length).toFixed(2)
      this.$notify({
        title: '提示',
        message: `该学期的平均绩点为${_avgPoint}
          注:因开发者也不知道学校的平均绩点是如何计算的，采取学期的绩点总和除以学期的课程数的方法得到该学期的平均绩点，数据仅供参考，以教务系统为准`,
        duration: 0
      });

      this.tableData = result
    }
  },
  created() {
    this.getAlerTitle()
  }
}
</script>

<style scoped>
.header {
  margin-top: 10px;
  /*margin-bottom: 10px;*/
  border-radius: 4px;
  border: 1px solid gray;
}
</style>
