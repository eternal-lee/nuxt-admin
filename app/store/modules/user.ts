export const useUserStore = defineStore(
  'userStore',
  () => {
    // token
    const token = ref('')
    // userInfo
    const userInfo = ref('')

    return {
      token,
      userInfo
    }
  },
  {
    persist: process.client && {
      storage: sessionStorage
    }
  }
)
