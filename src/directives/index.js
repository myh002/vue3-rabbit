import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(el, ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => (el.src = binding.value), 500)
            // console.log(entry.isIntersecting)
            // 出现视口口停止监听
            stop()
          }
        })
      }
    })
  }
}
