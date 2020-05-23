import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index/Index'
import search from '../views/index/search'
import main from '../views/index/Main'
import adminLogin from '../views/login/admin/login'
import studentLogin from '../views/login/student/login'
import teacherLogin from '../views/login/teacher/login'
import studentRegister from '../views/login/student/register'
import teacherRegister from '../views/login/teacher/register'
import luntan from '../views/article/index'
import articleCreate from '../views/article/create'
import articleList from '../views/article/list'
import articleEdit from '../views/article/edit'
import articleDetail from '../views/article/Detail'
import course from '../views/course/index'
import courseBody from '../views/course/CourseBody'
import myCourse from '../views/course/MyCourse'
import courseDetail from '../views/course/CourseDetail'
import courseManager from '../views/course/courseManager'
import createCourse from '../views/course/createCourse'
import courseStatistics from '../views/course/courseStatistics'
import tests from '../views/Information/tests'
import questions from '../views/Information/questions'
import questionAnalytic from '../views/Information/questionAnalytic'
import questionDone from '../views/Information/questionDone'
import createQuestion from '../views/Information/createQuestion'
import createTest from '../views/Information/createTest'
import questionList from '../views/Information/questionList'
import testDone from '../views/Information/testDone'
import choiceQuestion from '../views/Information/choiceQuestion'
import choicesQuestion from '../views/Information/choicesQuestion'
import informationIndex from '../views/Information/Index'
import myInfo from '../views/Information/MyInfo'
import myTests from '../views/Information/MyTests'
import myQuestions from '../views/Information/MyQuestions'
import studyIndex from '../views/study/Index'
import messageIndex from '../views/message/Index'
import userIndex from '../views/user/Index'
import editUser from '../views/user/editUser'
import userInfo from '../views/user/userInfo'
import userList from '../views/user/userList'
import image from '../views/manager/image'
import announce from '../views/manager/announce'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/search',
          name: 'search',
          component: search,
          meta: {
            isLogin: true, // 是否登录
            roles: ['教师', '学生'] // 是否登录
          }
        },
        {
          path: '/course',
          name: 'course',
          component: course,
          meta: {
            isLogin: true, // 是否登录
            roles: ['教师', '学生'] // 是否登录
          }
        },
        {
          path: '/main',
          name: 'main',
          component: main
        },
        {
          path: '/luntan',
          name: 'luntan',
          component: luntan,
          meta: {
            isLogin: true, // 是否登录
            roles: ['学生', '教师'] // 是否登录
          }
        }, {
          path: '/informationIndex',
          name: 'informationIndex',
          component: informationIndex,
          meta: {
            isLogin: true, // 是否登录
            roles: ['学生', '教师'] // 是否登录
          }
        },
        {
          path: '/questionList',
          name: 'questionList',
          component: questionList,
          meta: {
            isLogin: true, // 是否登录
            roles: ['教师', '学生'] // 是否登录
          }
        },
        {
          path: '/testDone',
          name: 'testDone',
          component: testDone,
          meta: {
            isLogin: true, // 是否登录
            roles: ['教师', '学生'] // 是否登录
          },
          children: [
            {
              path: '/questionAnalytic',
              name: 'questionAnalytic',
              component: questionAnalytic,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/questionDone',
              name: 'questionDone',
              component: questionDone,
              meta: {
                isLogin: true, // 是否登录
                roles: ['教师', '学生'] // 是否登录
              }
            }
          ]
        },
        {
          path: '/messageIndex',
          name: 'messageIndex',
          component: messageIndex,
          meta: {
            isLogin: true, // 是否登录
            roles: ['学生', '教师'] // 是否登录
          }
        },
        {
          path: '/userIndex',
          name: 'userIndex',
          component: userIndex,
          meta: {
            isLogin: true, // 是否登录
            roles: ['学生', '教师'] // 是否登录
          },
          children: [
            {
              path: '/myInfo',
              name: 'myInfo',
              component: myInfo,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/image',
              name: 'image',
              component: image,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/myQuestions',
              name: 'myTests',
              component: myTests,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/myQuestions',
              name: 'myQuestions',
              component: myQuestions,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/myCourse',
              name: 'myCourse',
              component: myCourse,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/studyIndex',
              name: 'studyIndex',
              component: studyIndex,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/announce',
              name: 'announce',
              component: announce,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/userList',
              name: 'userList',
              component: userList,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/userInfo',
              name: 'userInfo',
              component: userInfo,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/editUser',
              name: 'editUser',
              component: editUser,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/articleList',
              name: 'articleList',
              component: articleList,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/createCourse',
              name: 'createCourse',
              component: createCourse,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/courseStatistics',
              name: 'courseStatistics',
              component: courseStatistics,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/createQuestion',
              name: 'createQuestion',
              component: createQuestion,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/createTest',
              name: 'createTest',
              component: createTest,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/choiceQuestion',
              name: 'choiceQuestion',
              component: choiceQuestion,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            },
            {
              path: '/choicesQuestion',
              name: 'choicesQuestion',
              component: choicesQuestion,
              meta: {
                isLogin: true, // 是否登录
                roles: ['学生', '教师'] // 是否登录
              }
            }
          ]
        }, {
          path: '/articleDetail',
          name: 'articleDetail',
          component: articleDetail,
          meta: {
            isLogin: true, // 是否登录
            roles: ['学生', '教师'] // 是否登录
          }
        },
        {
          path: '/articleCreate',
          name: 'articleCreate',
          component: articleCreate,
          meta: {
            isLogin: true, // 是否登录
            roles: ['学生', '教师'] // 是否登录
          }
        },
        {
          path: '/articleEdit',
          name: 'articleEdit',
          component: articleEdit,
          meta: {
            isLogin: true, // 是否登录
            roles: ['学生', '教师'] // 是否登录
          }
        }
      ]
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: adminLogin,
      meta: {
        roles: ['学生', '教师'] // 是否登录
      }
    },
    {
      path: '/login',
      name: 'login',
      component: studentLogin
    },
    {
      path: '/teacherLogin',
      name: 'teacherLogin',
      component: teacherLogin,
      meta: {
        isLogin: true, // 是否登录
        roles: ['学生', '教师'] // 是否登录
      }
    },
    {
      path: '/register',
      name: 'register',
      component: studentRegister
    },
    {
      path: '/teacherRegister',
      name: 'teacherRegister',
      component: teacherRegister,
      meta: {
        isLogin: true, // 是否登录
        roles: ['学生', '教师'] // 是否登录
      }
    },
    {
      path: '/courseBody',
      name: 'courseBody',
      component: courseBody,
      meta: {
        isLogin: true, // 是否登录
        roles: ['学生', '教师'] // 是否登录
      }
    },
    {
      path: '/courseDetail',
      name: 'courseDetail',
      component: courseDetail,
      meta: {
        isLogin: true, // 是否登录
        roles: ['学生', '教师'] // 是否登录
      }
    },
    {
      path: '/courseManager',
      name: 'courseManager',
      component: courseManager,
      meta: {
        isLogin: true, // 是否登录
        roles: ['学生', '教师'] // 是否登录
      }
    },
    {
      path: '/tests',
      name: 'tests',
      component: tests,
      meta: {
        isLogin: true, // 是否登录
        roles: ['学生', '教师'] // 是否登录
      }
    },
    {
      path: '/questions',
      name: 'questions',
      component: questions,
      meta: {
        isLogin: true, // 是否登录
        roles: ['学生', '教师'] // 是否登录
      }
    }
  ]
})
