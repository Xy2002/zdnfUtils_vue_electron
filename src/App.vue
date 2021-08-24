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
        <el-menu-item route="./creditManage" index="5">学分管理</el-menu-item>
        <el-menu-item v-show="isLogin" @click="clearCookie" style="position: absolute;right: 0;">退出登录</el-menu-item>
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
      isLogin: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    initLoginState() {
      // if(this.$store.getters.getServerToken){
      //   this.isLogin=true;
      //
      // }

      if (this.$store.getters.getToken || document.cookie) {
        this.isLogin = true;
        console.log(document.cookie)
        if (document.cookie) {
          this.$store.commit("increment", document.cookie.split("=")[1]);
        }
      } else {
        this.isLogin = false;
        if (this.$route.fullPath !== "/login") {
          this.$router.push("./login");
        }
      }

      if (this.isLogin === true) {
        if (this.$route.fullPath !== "/info") {
          this.$router.push("./info");
        }
      }
      console.log(this.isLogin);
    },
    clearCookie(){
      this.$store.commit('resetState')
      function clearAllCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys) {
          for(var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
      }
      clearAllCookie()
      console.log("reset!")
      location.reload()
      // this.$alert('请点击确认按钮以刷新页面状态','Tips',{
      //   confirmButtonText:'确定',
      //   callback:() => {
      //     location.reload();
      //   }
      // })
    },
  },
  created() {
    this.initLoginState();
    this.$notify({
      title: 'success',
      message: '当前版本号为0.1.9，增加了学分管理功能，目前只适配了19计科和软工的人才培养方案',
      type: 'success'
    });
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({},
          this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
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
