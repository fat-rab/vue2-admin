
// IntersectionObserver：http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
export default {
  inserted (el, binding) {
    const { value, arg } = binding
    if (!arg) return
    const observer = new IntersectionObserver((entries = []) => {
      if (!el._observer) return
      // 初始化时候，不调用回调函数
      if (value && el._observer.init) {
        // 判断绑定元素是否可见
        const isIntersecting = Boolean(
          entries.find((entry) => entry.isIntersecting)
        )
        if (isIntersecting) {
          value()
        }
      }
      el._observer.init = true
    })
    // 给el绑定observer属性，便于unbind中定制观察
    el._observer = { init: false, observer }
    // 开始观察
    observer.observe(el)
  },
  unbind (el, binding) {
    const { arg } = binding
    if (!arg) return
    if (!el._observe) return
    // 停止观察
    el._observe.observer.unobserve(el)
    // 删除el上面绑定的属性
    delete el._observe
  }
}

