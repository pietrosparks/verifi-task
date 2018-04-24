import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Task from '@/components/Task'
import AllTasks from '@/components/AllTasks'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component:Home
    },
    {
      path:'/task/:id',
      name:'Task',
      component: Task,
      props: true
    },
    {
      path:'/task',
      name:'AllTasks',
      component:AllTasks,
    }
  ]
})
