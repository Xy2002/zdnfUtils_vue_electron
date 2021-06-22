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
        <el-menu-item route="./calendar" index="2">课程表</el-menu-item>
        <el-menu-item route="./examList" index="3">考试信息列表</el-menu-item>
        <el-menu-item route="./transcriptList" index="4">成绩查询</el-menu-item>
        <el-menu-item index="5"><a href="https://www.naiquoy.com/vr/index.html" target="_blank">全景地图</a></el-menu-item>
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
      if (this.$store.getters.getToken || document.cookie) {
        this.isLogin = true;
        if (document.cookie) {
          this.$store.commit("increment", document.cookie.split("=")[1]);
        }
      } else {
        this.isLogin = false;
        if (this.$route.fullPath !== "/login") {
          this.$router.push("./login");
        }
      }
      if (this.isLogin == true) {
        if (this.$route.fullPath !== "/info") {
          this.$router.push("./info");
        }
      }
      console.log(this.isLogin);
    },
  },
  created() {
    this.initLoginState();
    this.$notify({
      title: 'success',
      message: '当前版本号为0.1.6，优化了更新算法',
      type: 'success'
    });
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

a {
  text-decoration: none;
}
</style>
