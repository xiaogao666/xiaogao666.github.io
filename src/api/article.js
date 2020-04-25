
import request from '@/utils/request'

// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
// 获取文章频道
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    // 路径参数 需要在url中进行传递  接口路径中有：的  需要传递路径参数
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 新建文章
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    // 路径参数 需要在url中进行传递  接口路径中有：的  需要传递路径参数
    url: '/mp/v1_0/articles',
    params: {
      draft // 是否存为草稿
    },
    data
  })
}

// 获取指定文章
export const getArticle = articleId => {
  return request({
    method: 'GET',
    // 路径参数 需要在url中进行传递  接口路径中有：的  需要传递路径参数
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 编辑文章
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    // 路径参数 需要在url中进行传递  接口路径中有：的  需要传递路径参数
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft // 是否存为草稿
    },
    data
  })
}
