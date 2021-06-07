<template>
  <div id="app">
    <div v-if="isLogin">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          router
          @select="handleSelect"
      >
        <el-menu-item route="./info" index="1"> 个人中心</el-menu-item>
        <el-menu-item route="./courseInfo" index="2">课程表</el-menu-item>
        <el-menu-item index="3">考试信息列表</el-menu-item>
        <el-menu-item index="4">成绩查询</el-menu-item>
        <el-menu-item index="5">全景地图</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      isLogin: false,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    initLoginState() {
      if (this.$store.getters.getToken) {
        this.isLogin = true;
      } else if (document.cookie) {
        this.isLogin = true;
        this.$store.commit("increment", document.cookie.split("=")[1]);
        console.log(document.cookie);
      } else {
        this.isLogin = false;
        this.$router.push("./login");
      }
      if (this.isLogin == true) {
        if (this.$route.fullPath == "/login") {
          this.$router.push("./info");
        }
      }
      console.log(this.isLogin);
    },
  },
  created() {
    this.initLoginState();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#loginForm {
  border-radius: 4px;
  border: 1px solid gray;
}

#loginForm2 {
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
}

.buttonGroup {
  margin-left: -80px;
}

</style>
