import request from './request'



// 引入封装的文件中的post方法


/**
 *用户请求
 */
  // 登录接口，params是接口所需参数，‘api/v2/auth’是接口地址中不同的后半部分
  // 注：此接口是get请求接口，post请求，只需要将return get()换成return post()即可
  export function login (data) {
    return request({
      url: '/user/login',
      method: 'post',
      params: { ...data }
    })
  }

  export function studentRegister (data) {
  return request({
    url: '/user/student/register',
    method: 'post',
    params: { ...data }
    })
  }

export function editUser (data) {
  return request({
    url: '/user/editUser',
    method: 'post',
    params: { ...data }
  })
}

export function getUserById (data) {
  return request({
    url: '/user/getUserById',
    method: 'post',
    params: {...data}
  })
}


export function getUserList (data) {
  return request({
    url: '/user/getUserList',
    method: 'post',
    params: {...data}
  })
}

export function deleteUserById (data) {
  return request({
    url: '/user/deleteUserById',
    method: 'post',
    params: {...data}
  })
}
/**
 * 博客部分
 */

export function createArticle (datas) {
  return request({
    url: '/blog/createOrEditArticle',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify(datas)
  })
}


export function getHotArticle (data) {
  return request({
    url: '/blog/getHotArticle',
    method: 'post',
    params: { ...data }
  })
}
export function getArticleById (data) {
  return request({
    url: '/blog/getArticleById',
    method: 'post',
    params: {...data}
  })
}
export function deleteByCid (data) {
  return request({
    url: '/blog/deleteByCid',
    method: 'post',
    params: {...data}
  })
}
export function getArticleByUId (data) {
  return request({
    url: '/blog/getArticleByUid',
    method: 'post',
    params: {...data}
  })
}

/**
 *
 * @param 访问者，作者，文章id
 * @returns {AxiosPromise}
 */
export function addViews (data) {
  return request({
    url: '/blog/addViews',
    method: 'post',
    params: {...data}
  })
}


/**
 *
 * @param 访问者，作者，文章id
 * @returns {AxiosPromise}
 */
export function addComment (data) {
  return request({
    url: '/blog/createComment',
    method: 'post',
    params: {...data}
  })
}

/**
 *
 * @param 访问者，作者，文章id
 * @returns {AxiosPromise}
 */
export function getCommentByContentId (data) {
  return request({
    url: '/blog/getCommentByContentId',
    method: 'post',
    params: {...data}
  })
}


/**
 * 课程部分
 */

export function getCommentByCourseId (data) {
  return request({
    url: '/blog/getCommentByCourseId',
    method: 'post',
    params: {...data}
  })
}
export function getSubjects () {
  return request({
    url: '/study/getSubjects',
    method: 'get'
  })
}

export function getKnowledgesBySId (data) {
  return request({
    url: '/study/getKnowledgesBySId',
    method: 'post',
    params: {...data}
  })
}
export function createCourse (datas) {
  return request({
    url: '/course/createOrEditCourse',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify(datas)
  })
}

export function getCoursesByType (data) {
  return request({
    url: '/course/getCoursesByType',
    method: 'post',
    params: {...data}
  })
}
export function getCourseById (data) {
  return request({
    url: '/course/getCourseById',
    method: 'post',
    params: {...data}
  })
}

/**
 *题库
 **/
export function createQuestion (datas) {
  return request({
    url: '/question/createOrEditQuestion',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify(datas)
  })
}
export function createTest (datas) {
  return request({
    url: '/question/createOrEditTest',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify(datas)
  })
}

export function searchQuestion (data) {
  return request({
    url: '/question/searchQuestion',
    method: 'post',
    params: {...data}
  })
}
export function getHotTests (data) {
  return request({
    url: '/question/getHotTestList',
    method: 'post',
    params: {...data}
  })
}


export function createRecordTest (datas) {
  return request({
    url: '/question/createRecordTest',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify(datas)
  })
}
export function getTestByTid (data) {
  return request({
    url: '/question/getTestByTid',
    method: 'post',
    params: {...data}
  })
}


export function getQuestionsByUtid (data) {
  return request({
    url: '/question/getQuestionsByUtid',
    method: 'post',
    params: {...data}
  })
}


export function getRecordTestById (data) {
  return request({
    url: '/question/getRecordTestById',
    method: 'post',
    params: {...data}
  })
}

export function createTestBySubject (data) {
  return request({
    url: '/question/createTestBySubject',
    method: 'post',
    params: {...data}
  })
}

export function getAnnounce (data) {
  return request({
    url: '/manage/getAnnounce',
    method: 'post',
    params: {...data}
  })
}

export function createAnnounce (datas) {
  return request({
    url: '/manage/createAnnounce',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify(datas)
  })
}

export function deleteAnnounceById (data) {
  return request({
    url: '/manage/deleteAnnounceById',
    method: 'post',
    params: {...data}
  })
}

export function getImage (data) {
  return request({
    url: '/manage/getImage',
    method: 'post',
    params: {...data}
  })
}

export function createImage (datas) {
  return request({
    url: '/manage/createImage',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify(datas)
  })
}

export function deleteImageById (data) {
  return request({
    url: '/manage/deleteImageById',
    method: 'post',
    params: {...data}
  })
}


export function getMessageByUid (data) {
  return request({
    url: '/manage/getMessageByUid',
    method: 'post',
    params: {...data}
  })
}

export function deleteMessageById (data) {
  return request({
    url: '/manage/deleteImageById',
    method: 'post',
    params: {...data}
  })
}
export function editMessageById (data) {
  return request({
    url: '/manage/editMessageById',
    method: 'post',
    params: {...data}
  })
}

