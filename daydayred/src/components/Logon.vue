<template>
  <div class="logon-body">
    <!--欢迎注册-->
    <div class="Welcome-logon-body">
      <i class="iconfont icon-jiantou jiantouZ" @click="gobackClick"></i>
      <span class="welcome-logon">欢迎注册</span>
    </div>
    <!--请输入手机号-->
    <div class="login-phone-body">
      <div class="login-phone">
        <i class="iconfont icon-shouji shouji"></i>
        <div id="phone-text">
          <mt-field  :attr="{ maxlength: 13 }"  label="" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        </div>
      </div>
      <!--请输入短信验证码-->
      <div class="login-sms">
        <i class="iconfont icon-weibiaoti9 weibiaoti"></i>
        <div class="sms-text">
          <mt-field :attr="{ maxlength: 6 }" label="" v-model="captcha" placeholder="请输入验证码">
            <button @click="sendClick($event)" class="send-yzm">发送验证码</button>
          </mt-field>
        </div>
        <!--<input @input="smsinput" type="text" v-model="smsValue" placeholder="请输入验证码" class="sms-text">-->
        <!--<i v-show="guanbiisSms" @click="smsClick" class="iconfont icon-guanbi guanbisms"></i>-->
      </div>
      <!--请输入密码-->
      <div class="logon-password">
        <i class="iconfont icon-mima mima"></i>
        <div class="sms-text">
          <mt-field label="" :attr="{ maxlength: 16, minlength:6 }" placeholder="6~16位密码" type="password" v-model="password"></mt-field>
        </div>
      </div>
      <!--登陆-->
      <mt-button class="login-login" type="default" @click.native="logonClick">立即注册</mt-button>
      <!--注册-->
      <p class="celerity-logon">注册即代表我已满18周岁并同意《用户服务协议》</p>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import isPhone from '@/common/js/isPhone'
  import sendCode from '@/common/js/sendCode'
  import TrimJs from '@/common/js/trimJs'
  import {getJsCookie} from '@/common/js/util'
  export default {
    name: 'Logon',
    data () {
      return {
        phone: '',
        captcha: '',
        password: '',
        guid: ''
      }
    },
    methods: {
      // 点击右箭头的返回事件
      gobackClick () {
        this.$router.go(-1)
      },
      // 点击立即注册按钮
      logonClick () {
        let phone = TrimJs(this.phone, 'g')
        let myUrl = `"RandomGuid":"${this.guid}","UserName":"${phone}","Password":"${this.password}","ValidCode":"${this.captcha}","ReferrerId":"undefined"`
        let myOtherUrl = encodeURI(myUrl)
        if (this.phone.length <= 0) {
          isPhone(phone)
        } else {
          isPhone(phone)
        }
        if (this.password.length <= 0) {
          Toast({
            message: '获取验证码后手机号不能修改或者已经过时！',
            position: 'middle',
            iconClass: 'iconfont icon-guanbi1',
            duration: 5000
          })
          return false
        }
        this.$request({
          type: 'get',
          url: '/api/user/Handler.ashx?action=703&params={' + myOtherUrl + '}',
          success: function (res) {
            let Guid = res.data.data.Guid
            if (res.status === 200) {
              this.cookieValue = getJsCookie('CP_UserIDGuid')
              if (this.cookieValue === Guid) {
                // 获取用户数据以字符串形式保存在localStorage中
                let data = JSON.stringify(res.data.data)
                window.localStorage.setItem('datas', data)
                this.$router.push({path: '/user'})
                window.location.reload()
              } else {
                window.localStorage.removeItem('datas')
              }
            }
          },
          failed: function (err) {
            console.log('未找到数据是' + err)
          }
        })
      },
      // 点击发送验证码
      sendClick (event) {
        let phone = TrimJs(this.phone, 'g')
        let myUrl = `"Mobile":"${phone}","TypeID":"1"`
        let myOtherUrl = encodeURIComponent(myUrl)
        if (this.phone.length <= 0) {
          isPhone(phone)
        } else {
          isPhone(phone)
        }
        this.$request({
          type: 'get',
          url: '/api/user/Handler.ashx?action=704&params={' + myOtherUrl + '}',
          success: function (res) {
            this.guid = res.data.data
            let msg = res.data.msg
            sendCode(msg, event)
          },
          failed: function (err) {
            console.log('未找到的验证码数据是' + err)
          }
        })
      }
    },
    watch: {
      // 通过watch来设置空格
      phone (newValue, oldValue) {
        if (newValue.length > oldValue.length) { // 文本框中输入
          if (newValue.length === 3 || newValue.length === 8) {
            this.phone = this.phone + ' '
          }
        } else { // 文本框中删除
          if (newValue.length === 9 || newValue.length === 4) {
            this.phone = this.phone.trim()
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../common/css/style.less";

  .logon-body {
    width: 100%;
    height: 180vmin;
    background-color: #FFFFFF;
    position: relative;
  }

  .Welcome-logon-body {
    width: 100%;
    height: 12vmin;
    background-color: @color-text-red;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .jiantouZ {
    line-height: 12vmin;
    color: white;
    font-size: 4.5vmin;
    font-weight: bold;
    margin-left: 5%;
  }

  .welcome-logon {
    line-height: 10vmin;
    color: #F2F2F2;
    font-size: 6vmin;
    margin-left: 30vmin;
  }
  .phone{
    font-size: 5vmin;
  }
  .login-user-dl {
    width: 50%;
    height: 10vmin;
    text-align: center;
    line-height: 10vmin;
    color: @color-text-red;
  }

  .login-user-yzm {
    line-height: 10vmin;
    height: 10vmin;
    width: 50%;
    text-align: center;
    background-color: @color-text-red;
    color: #F2F2F2;
  }

  .login-phone-body {
    width: 90vmin;
    position: absolute;
    left: 10%;
    top: 20vmin;
  }

  .login-phone {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    line-height: 10vmin;
    overflow: hidden;
    width: 90%;
    height: 13vmin;
    box-sizing: border-box;
    border: 2px solid rgb(204, 204, 204);
    border-radius: 10px;
  }
  .login-sms {
    margin-top: 5%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    line-height: 10vmin;
    overflow: hidden;
    width: 90%;
    height: 13vmin;
    box-sizing: border-box;
    border: 2px solid rgb(204, 204, 204);
    border-radius: 10px;
  }

  .shouji {
    margin-left: 18px;
    font-size: 7vmin;
    color: @color-text-red;
  }

  .guanbi {
    margin-left: 12%;
    font-size: 25px;
    color: #CCCCCC;
  }
  .guanbisms{
    font-size: 25px;
    color: #CCCCCC;
  }

  .weibiaoti {
    margin-left: 18px;
    font-size: 7vmin;
    color: @color-text-red;
  }
  .mima {
    margin-left: 20px;
    font-size: 6.2vmin;
    color: @color-text-red;
  }
  #phone-text {
    width: 60vmin;
    height: 12vmin;
  }
  .sms-text {
    width: 70vmin;
    height: 12vmin;
  }
  .send-yzm {
    border: none;
    outline: none;
    background-color: white;
    color: @color-text-red;
    font-size: 4.8vmin;
    line-height: 12vmin;
  }
  .login-login {
    margin-top: 5vmin;
    width: 80vmin;
    height: 10vmin;
    background-color: @color-text-red;
    border: none;
    outline: none;
    color: @color-background-white;
    font-size: 4vmin;
    border-radius: 5px;
  }
  .celerity-logon {
    width: 75vmin;
    text-align: center;
    color: @color-text-gray;
    font-size: 3.3vmin;
    margin: 6% 2%;
  }
  .logon-password {
    margin-top: 5%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    line-height: 10vmin;
    overflow: hidden;
    width: 90%;
    height: 13vmin;
    box-sizing: border-box;
    border: 2px solid rgb(204, 204, 204);
    border-radius: 10px;
  }

</style>
