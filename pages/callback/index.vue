<template>
  <div></div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

definePageMeta({
  layout: 'full'
})

onMounted(() => {
  const code = route.query.code
  const state = route.query.state
  if (!code) return console.log('无任何参数')
  if (state == 'qq_auth') {
    // 这里可以把 code 发送到后端换取 access_token
    console.log('QQ 授权 code:', code)
  } else if (state == 'github_auth') {
    console.log('Github 授权 code:', code)
  }
  localStorage.setItem('token', '11999')
  router.replace('/')
})
</script>
