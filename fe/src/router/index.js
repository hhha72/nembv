import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'test',
      component: test
    }
  ]
})
