<template>
  <div class="wdCon">
    <div class="wdItem">
      <x-header :left-options="{backText:''}" class="header">余额提现
			<div slot="right" class="bdrecord" @click="$router.push('withDrawalRecord')">提现明细</div></x-header>
      <div class="wdtop clearfix">
        <div class="wdtopItem wdtopItem-border vux-height itemFlex">
          当前余额<span class="balanceItem">{{$route.params.amount||0}}</span>
        </div>
        <div class="wdtopItem wdtopItem-border vux-height">
          <div>提现金额</div>
          <div class="wdAmount">
            <span class="balanceUnit">￥</span>
            <input type="number" v-model.number="wdAmount" class="balanceAmount" @input="checkNum" @blur="setTop">
            <span @click="wdAmount=$route.params.amount||0">全部提现</span>
          </div>
        </div>
        <div class="wdtopItem vux-height topDesc">本月可提现{{forNumber}}次</div>
      </div>

      <div class="wdDesc">
        <span class="top">提现说明</span>
        <span>1：每次提现金额不小于1元，上限20000元；</span>
        <span>2：每月最多可提现5次；</span>
        <span>3：操作提现暂不收手续费（以后根据政策调整）；</span>
        <span>4：恶意提现一经发现，平台将对账号进行封号；</span>
      </div>
    </div>
    <div class="wdHandler">
      <input type="button" :disabled="disabled" value="提现" class="btn" @click.once="withdrawal">
    </div>
  </div>
</template>
<script>
import { XHeader } from "qsvux";

export default {
  name: "WithDrawal",
  components: {
    XHeader
  },
  data() {
    return {
      forNumber: 5,//可进行提现的次数
      wdAmount: "",
      disabled: true
    };
  },
  watch: {
    wdAmount(cur, old) {
      this.disabled = cur == "";
    }
  },
  methods: {
    setTop() {
      window.scroll(0, 0);
    },
    //检查只能输入数字
    checkNum(e) {
      this.wdAmount = e.target.value.replace(/[^\d]/g, '');
      if (Number(this.wdAmount) > Number(this.$route.params.amount)) {
        this.wdAmount = this.$route.params.amount;
      }
    },
    //进行提现操作
    withdrawal() {
      this.$vux.loading.show({
        text: '申请中...'
      });
      this.ajax.post("/agent/index/tixian", {
        "amount": this.wdAmount//提现金额
      }, data => {
        this.$vux.loading.hide();
        this.$vux.toast.text(data.data.info, 'middle');
        if (data.data.status == '1') {
          //进行首页余额的刷新
          this.$store.commit("setRefresh", true);
          setTimeout(() => {
            this.$router.push('/')
          }, 2000);
        }


        this.disabled = false;
      }, data => {
        this.disabled = false;
      })
    }
  },
  computed: {
  },
  created() {
  },
  mounted() { }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wdCon {
  height: 100%;
  width: 100%;
  background-color: #f1f2f7;
  .header {
    background-color: #f9dc3b;
  }
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
  .wdItem {
    height: auto;
    min-height: 100%;
    padding-bottom: 100px;
    box-sizing: border-box;
		.bdrecord {
			font-size: 24px;
			color: #111111;
		}
		
    .wdtop {
      width: 690px;
      padding: 20px 30px;
      margin: 20px auto 0 auto;
      border-radius: 16px;
      box-sizing: border-box;
      background-color: #ffffff;
      .vux-height {
        &:after {
          height: 1px;
        }
      }
      .wdtopItem-border {
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #eeeeee;
        }
      }
      .itemFlex {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .wdtopItem {
        padding: 20px 0;
        box-sizing: border-box;
        position: relative;
        font-size: 28px;
        color: #111111;
        .balanceItem {
          margin-left: 30px;
          color: #fe1969;
          font-size: 34px;
        }
        .balanceUnit {
          font-size: 50px;
        }
        .balanceAmount {
          width: 430px;
          font-size: 28px;
          color: #fe1969;
          border: none;
          outline: none;
          background-color: #ffffff;
        }
        .wdAmount {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
        }
        .topDesc {
          font-size: 26px;
          color: #7b7b7b;
        }
      }
    }

    .wdDesc {
      padding: 38px 30px 0;
      box-sizing: border-box;
      span {
        display: block;
        margin: 3px 0;
        font-size: 24px;

        color: #7b7b7b;
      }
      .top {
        font-size: 26px;
      }
    }
  }
  .wdHandler {
    position: relative;
    margin-top: -100px;
    width: 100%;
    height: 100px;
    clear: both;
    font-size: 30px;
    .btn {
      border: none;
      outline: none;
      height: 100%;
      width: 100%;
      line-height: 100px;
      background-color: #f9dc3b;
      font-size: 30px;
      font-weight: 600;
      letter-spacing: 10px;
      text-indent: 10px;
    }
    .btn:disabled {
      background-color: #ececec;
    }
  }
}
</style>