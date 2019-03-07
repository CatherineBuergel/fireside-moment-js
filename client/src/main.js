import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  mounted(){
    this.$store.dispatch('getWiffles')
  },
  render: function (h) { return h(App) }
}).$mount('#app')
