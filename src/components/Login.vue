<template>
  <div class="register-com">
    <div class="main clearfix">
      <x-header :left-options="{backText:'',showBack:false}" class="loginHeader">登录</x-header>
      <div class="title">登录</div>
      <div class="formMain">
        <div class="formMain-item vux-border">
          <img src="../../static/images/loginPhone.png" alt="" class="phoneImg ">
          <input class="phoneNo" type="tel" @blur="setScroll" v-model="phone" @input="checkPhone" placeholder="输入您常用手机号" maxlength="11">
          <!-- @click="sendVerCode" -->
          <div class="sendCode" slot="right" @blur="setScroll" @click="getVerCode" v-html="verCodeTxtCom"></div>
        </div>
        <div class="formMain-item vux-border">
          <img src="../../static/images/loginCode.png" alt="" class="phoneImg ">
          <input type="text" class="verCode" @blur="setScroll" v-model="verCode">
        </div>
      </div>
      <div class="doLogin">
        <input type="button" :disabled="disabled" value="登录" @click="doLogin">
      </div>

    </div>
    <div class="loginBottom"></div>
    <!-- 图像验证码 -->
    <div class="vue-popup">
      <div class="mask" @click.stop="showVerCode=false" v-show="showVerCode"></div>
      <transition name="slide-fade">
        <div class="popup-content" v-show="showVerCode">
          <div class="verCodeCon">
            <img :src="verPicImg" alt="" @click="refreshVerImg">
            <div class="tips">点击刷新<img src="../../static/images/loginTips.png" alt=""></div>
            <input type="text" @blur="setScroll" maxlength="6" v-model="picVerCode" class="vux-input-border" placeholder="请输入图形验证码">
          </div>
          <div class="bottom">
            <input type="button" @click="sendVerCode" value="确定">
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {
  ViewBox,
  XHeader,
  Group,
  Cell
} from 'vux';
import axios from 'axios';
export default {
  name: 'Login',
  components: {
    XHeader,
    ViewBox,
    Group,
    Cell
  },
  data() {
    return {
      verPicImg: "",
      showVerCode: false, //图像验证码model
      picVerCode: "", //图形验证码
      verCodeImg: "",
      verCode: '',
      verCodeTxt: '发送验证码',
      hasSend: false, //是否已经发送验证码
      disabled: false,
      phone: "" //手机号
    }
  },
  watch: {},
  methods: {
    setScroll() {
      window.scroll(0, 0);
    },
    //
    refreshVerImg() {
      this.verPicImg = "https://jingpincang.quansuwangluo.com/index/Verify/?v=" + new Date().getTime() + "&sid=" + this.$store
        .state.sid;
    },
    checkPhone(e) {
      this.phone = e.target.value.replace(/[^0-9]/, '');
    },
    //获取图形验证码
    getVerCode() {
      //验证手机号
      if (!this.checkPhoneNo()) {
        this.$vux.toast.text('请检查手机号码', 'middle');
        return;
      }
      this.refreshVerImg();
      this.showVerCode = true;
    },
    //接受验证码
    sendVerCode() {
      if (this.picVerCode == "") {
        this.$vux.toast.text('请输入验证码!', 'middle');
        return;
      }
      if (this.phone == "") {
        this.$vux.toast.text('请输入您的手机号!', 'middle');
        return;
      } else if (!this.checkPhoneNo()) {
        this.$vux.toast.text('请输入正确的手机号码!', 'middle');
        return;
      }
      if (this.hasSend) return;
      //已发送验证码
      this.$vux.loading.show({
        text: '稍等...'
      });
      this.ajax.get("/agent/index/wed_index?mobile=" + this.phone + "&captcha=" + this.picVerCode, {}, data => {
        this.$vux.loading.hide();
        this.$vux.toast.text(data.data.info, 'middle');
        //成功
        if (data.data.status == '1') {
          this.verCodeTxt = 60;
          this.hasSend = true;
          //this.disabled = false;
          //开始倒计时
          this.countDown();
          //model 关闭
          this.showVerCode = false;
        }
      }, data => { });
    },
    checkPhoneNo() {
      var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      //验证手机号码
      return reg.test(this.phone);
    },
    countDown() {
      if (this.verCodeTxt == 0) {
        this.verCodeTxt = "重新发送";
        this.hasSend = false; //可以再次发送验证码
      } else {
        this.verCodeTxt--;
        setTimeout(() => {
          this.countDown();
        }, 1000)
      }
    },
    //登录
    doLogin() {
      if (this.phone == "") {
        this.$vux.toast.text('输入您的手机号!', 'middle');
        return
      } else if (this.verCode == "") {
        this.$vux.toast.text('请输入验证码!', 'middle');
        return
      }
      this.disabled = true;
      this.$vux.loading.show({
        text: '登陆中...'
      });
      this.ajax.post("/agent/index/sms_mobile", {
        "sms_code": this.verCode,
        "mobile": this.phone
      }, data => {
        this.$vux.loading.hide();
        //保存用户的sid
        if (data.data.info == '1') {
          this.$store.commit("setToken", data.data.datas);
          //保存token
          window.localStorage.setItem("liveToken", data.data.datas);
          axios.defaults.headers = {
            TOKEN: data.data.datas,
            'Content-Type': 'application/x-www-form-urlencoded'
          };
          //跳转返回
          this.$router.push({
            name: "index",
            params: {}
          });
        } else {
          this.$vux.toast.text(data.data.info, 'middle');
        }
        this.disabled = false;
      }, data => {
        this.disabled = false;
      })
    },
    getSession() {
      this.ajax.get("/agent/index/login", {}, data => {
        this.$store.commit("setSid", data.data.sid);
      }, data => { });
    }
  },
  computed: {
    verCodeTxtCom() {
      if (typeof this.verCodeTxt == 'number')
        return "倒计时<span style='color:#FE1969'>" + this.verCodeTxt + "s</span>";
      else
        return this.verCodeTxt;
    }
  },
  created() {
    this.getSession();
  },
  mounted() { }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  display: inline-block;
}

/* Hides from IE-mac \*/
* html .clearfix {
  height: 1%;
}

.clearfix {
  display: block;
}

/* End hide from IE-mac */

.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}

@mixin loginFlex($jcontent: space-between) {
  display: flex;
  align-items: center;
  justify-content: $jcontent;
}

@mixin loginInput($width: 442px) {
  width: $width;
  padding: 8px 20px;
  border: none;
  outline-style: none;
  font-size: 28px;
  box-sizing: border-box;
}

.register-com {
  height: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  .vue-popup {
    .popup-content {
      position: fixed;
      width: 488px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 30px 20px 0;
      box-sizing: border-box;
      border-radius: 14px;
      background-color: white;

      .verCodeCon {
        @include loginFlex(space-around);
        flex-direction: column;

        img {
          width: 428px;
          height: 120px;
        }

        .vux-input-border {
          border-bottom: 1px solid #ececec;
        }

        .tips {
          display: inline-block;
          width: 100%;
          margin: 16px 0;
          @include loginFlex(flex-end);
          color: #367ccc;
          font-size: 20px;

          img {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-left: 8px;
          }
        }

        input[type="text"] {
          width: 428px;
          height: 64px;
          padding: 15px 20px;
          border: none;
          outline-style: none;
          font-size: 26px;
          box-sizing: border-box;
          border-radius: 4px;
          background-color: #f1f2f7;
        }
      }

      .bottom {
        width: 100%;
        text-align: center;

        input[type="button"] {
          width: 352px;
          height: 64px;
          margin: 30px 0;
          background: rgba(249, 220, 59, 1);
          box-shadow: 0px 6px 8px 0px rgba(249, 220, 59, 0.49);
          border-radius: 47px;
          box-sizing: border-box;
          border: none;
          outline: none;
          font-size: 32px;
          letter-spacing: 6px;
          text-indent: 6px;
        }
      }
    }

    .mask {
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  .loginHeader {
    background-color: #ffffff;
  }

  .main {
    height: auto;
    min-height: 100%;
    padding-bottom: 162px;
    box-sizing: border-box;
    background-color: #ffffff;

    .title {
      width: 100%;
      padding: 0 50px;
      margin: 90px 0 104px 0;
      box-sizing: border-box;
      font-size: 78px;
      color: rgba(0, 0, 0, 1);
      font-weight: 600;
    }

    .formMain {
      width: 100%;
      padding: 0 24px 0 42px;
      box-sizing: border-box;

      .vux-border {
        &::after {
          height: 1px;
        }
      }

      .formMain-item {
        width: 100%;
        @include loginFlex;
        position: relative;
        margin-bottom: 60px;

        &::after {
          content: "";
          position: absolute;
          width: 650px;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #e8e8e8;
        }

        .phoneImg {
          width: 52px;
          height: 52px;
        }

        .vux-img-border {
          border: 1px dashed #000000;
        }

        .phoneNo {
          @include loginInput;
        }

        .verCode {
          @include loginInput(632px);
        }

        .sendCode {
          width: 190px;
          height: 54px;
          border: none;
          background-color: #ffffff;
          padding: 10px 20px;
          border-radius: 8px;
          border: 2px solid rgba(17, 17, 17, 1);
          font-size: 24px;
          box-sizing: border-box;
          text-align: center;
          @include loginFlex(center);
        }
      }
    }

    .doLogin {
      width: 100%;
      margin-top: 148px;
      text-align: center;

      input[type="button"] {
        width: 592px;
        height: 94px;
        line-height: 94px;
        border-radius: 47px;
        border: none;
        outline: none;
        background: rgba(249, 220, 59, 1);
        box-shadow: 0px 8px 16px 0px rgba(249, 220, 59, 0.49);
        font-size: 40px;
        letter-spacing: 6px;
        text-indent: 6px;
        color: #111111;
        font-family: PingFangSC-Regular;
      }
    }
  }

  .loginBottom {
    position: relative;
    margin-top: -162px;
    width: 100%;
    height: 162px;
    clear: both;
    background: url(../../static/images/loginBg.png) no-repeat center center /
      100% 100%;
  }
}
</style>
