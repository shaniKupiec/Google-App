import homePage from './pages/home-page.cmp.js'
import mailApp from './pages/mail-app.cmp.js'
import emailList from './apps/mail/cmps/email-list.cmp.js'
import mailDetails from './apps/mail/pages/email-details.cmp.js'
import notesApp from './pages/notes-app.cmp.js'

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/mail',
    component: mailApp,
    children: [
      {
        path: 'inbox/:noteMsg?',
        component: emailList,
      },
      {
        path: 'details/:emailId',
        component: mailDetails,
      },
    ],
  },
  {
    path: '/note/:mail?',
    component: notesApp,
  },
]

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
})
