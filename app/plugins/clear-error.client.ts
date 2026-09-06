export default defineNuxtPlugin(() => {
  const router = useRouter()

  router.afterEach(() => {
    const err = useError()
    if (err.value) {
      clearError()
    }
  })
})
