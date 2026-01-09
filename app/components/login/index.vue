<template>
  <div class="form-container">
    <p class="title">Login</p>
    <div class="form">
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" v-model="userName" name="username" id="username" placeholder="admin" />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="userPwd"
          name="password"
          id="password"
          placeholder="123456"
        />
        <div class="forgot">
          <!-- <a rel="noopener noreferrer" href="#">Forgot Password ?</a> -->
        </div>
      </div>
      <button class="sign" @click="signIn">Sign in</button>
      <button class="sign" @click="visitorIn">Visitor In</button>
    </div>
    <div class="social-message">
      <div class="line"></div>
      <p class="message">Login with social accounts</p>
      <div class="line"></div>
    </div>
    <div class="social-icons">
      <button aria-label="Log in with Google" class="icon hide">
        <Google />
      </button>
      <button aria-label="Log in with Twitter" class="icon hide">
        <Twitter />
      </button>
      <a
        v-if="device.isWeixinBrowser()"
        href="javascript:void(0);"
        title="微信登录"
        @click.stop="loginHandle('wx')"
      >
        <button aria-label="Log in with WeiXin" class="icon">
          <WeiXin />
        </button>
      </a>
      <a href="javascript:void(0);" title="GitHub登录" @click.stop="loginHandle('github')">
        <!-- @click="authHandle('github')" -->
        <button aria-label="Log in with GitHub" class="icon">
          <GitHub />
        </button>
      </a>
      <a href="javascript:void(0);" title="QQ登录" @click.stop="loginHandle('QQ')">
        <button aria-label="Log in with QQ" class="icon">
          <!-- <img src="~/assets/images/qq_login.png" class="qq_icon" alt="QQ登录" title="QQ登录" /> -->
          <img
            src="https://wiki.connect.qq.com/wp-content/uploads/2016/12/Connect_logo_7.png"
            class="qq_icon"
            title="QQ登录"
            alt="QQ登录"
          />
        </button>
      </a>
    </div>
    <p class="signup">
      Don't have an account?
      <a rel="noopener noreferrer" href="#" class="">Sign up</a>
    </p>
  </div>
</template>

<script lang="ts" setup>
import Google from '~/components/svg/Google.vue'
import Twitter from '~/components/svg/Twitter.vue'
import GitHub from '~/components/svg/GitHub.vue'
import WeiXin from '~/components/svg/WeiXin.vue'
import device from '~/utils/index'
import axiosHttp from '~/service/axiosHttp'

const userName = ref('admin')
const userPwd = ref('123456')
const redirect_url = ref('')
const router = useRouter()

onMounted(() => {
  if (!location.origin.includes('localhost'))
    redirect_url.value = location.origin + '/frontend/nuxt/callback'
})

function signIn() {
  const _isBol = userName.value == 'admin' && userPwd.value == '123456'
  if (!_isBol) return console.log('用户名或密码不正确')
  console.log('登录成功')
  localStorage.setItem('token', '11999')
  const param = {
    username: 'admin',
    password: '123456'
  }
  axiosHttp.post('/auth/login', param).then((res) => {
    console.warn(res, 55555)
    if (res.code == 200) {
      const _ret = res.data.access_token || ''
      localStorage.setItem('token', _ret)
    }
  })
  // 将 token 写入 cookie，以便在服务端中间件也能读取
  // const token = useCookie('token')
  // if (token) token.value = '11999'
  router.replace({ path: '/' })
}
function visitorIn() {
  router.replace({
    name: 'visitor'
  })
}

function loginHandle(type: string) {
  let url = ''
  if (type == 'wx') {
    url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdbeccfefbd3da567&redirect_uri=${encodeURIComponent(
      redirect_url.value
    )}&response_type=code&scope=snsapi_userinfo&state=wx_auth#wechat_redirect`
  } else if (type == 'github') {
    url = `http://docs.ieternal.top/gateway/api/ThirdAuth/github?redirect_url=${redirect_url.value}`
  } else if (type == 'QQ') {
    url = `http://docs.ieternal.top/gateway/api/ThirdAuth/qq?redirect_url=${redirect_url.value}`
  }

  if (url) location.href = url
}
</script>

<style lang="less" scoped>
/* From Uiverse.io by Yaya12085 */
.form-container {
  position: absolute;
  left: 50%;
  top: 50%;
  box-sizing: border-box;
  width: 320px;
  border-radius: 0.75rem;
  background-color: rgba(17, 24, 39, 1);
  padding: 2rem;
  color: rgba(243, 244, 246, 1);
  transform: translate(-50%, -50%);
}

.title {
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}

.form {
  margin-top: 1.5rem;
}

.input-group {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.input-group label {
  display: block;
  color: rgba(156, 163, 175, 1);
  margin-bottom: 4px;
}

.input-group input {
  box-sizing: border-box;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: rgba(17, 24, 39, 1);
  padding: 0.75rem 1rem;
  color: rgba(243, 244, 246, 1);
}

.input-group input:focus {
  border-color: rgba(167, 139, 250);
}

.forgot {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175, 1);
  margin: 8px 0 14px 0;
}

.forgot a,
.signup a {
  color: rgba(243, 244, 246, 1);
  text-decoration: none;
  font-size: 14px;
}

.forgot a:hover,
.signup a:hover {
  text-decoration: underline rgba(167, 139, 250, 1);
}

.sign {
  display: block;
  width: 100%;
  background-color: rgba(167, 139, 250, 1);
  padding: 0.75rem;
  text-align: center;
  color: rgba(17, 24, 39, 1);
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;

  & + .sign {
    margin-top: 10px;
  }
}

.social-message {
  display: flex;
  align-items: center;
  padding-top: 1rem;
}

.line {
  height: 1px;
  flex: 1 1 0%;
  background-color: rgba(55, 65, 81, 1);
}

.social-message .message {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(156, 163, 175, 1);
}

.social-icons {
  display: flex;
  justify-content: center;
}

.social-icons .icon {
  border-radius: 0.125rem;
  padding: 0.7rem;
  border: none;
  background-color: transparent;
  cursor: pointer;

  :deep(.svg_icon svg) {
    height: 1.25rem;
    width: 1.25rem;
    fill: #fff;
  }

  & + .icon {
    margin-left: 0px;
  }

  &.hide {
    display: none;
  }

  .qq_icon {
    width: 52px;
    height: 20px;
  }
}

.signup {
  display: none;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175, 1);
}
</style>
