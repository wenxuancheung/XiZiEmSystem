import Vue from 'vue'
import Router from 'vue-router'
import OnLoad from '@/components/OnLoad'
import Index from '@/components/Index'
import Notice from '@/components/notice'
import Book from '@/components/Book'
import Project from '@/components/Project'
import ProjectOne from '@/components/ProjectOne'
import ProjectTwo from '@/components/ProjectTwo'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/',
      name : 'OnLoad',
      component : OnLoad
    },
    {
    	path : '/index',
    	name : 'Index',
    	component : Index,
    	children : [
        {
		    	path : '/notice',
		    	name : 'notice',
		    	component : Notice
		    }
    	]
    },
    {
    	path : '/book',
    	name : 'Book',
    	component : Book
    },
    {
    	path : '/project',
    	name : 'Project',
    	component : Project,
    	children : [
    		{
    			path : '/projectOne',
    			name : '/projectOne',
    			component : ProjectOne
    		},
        {
          path : '/projectTwo',
          name : '/projectTwo',
          component : ProjectTwo
        }
    	]
    },
  ]
})
