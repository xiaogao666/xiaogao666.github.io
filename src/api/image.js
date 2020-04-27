// 素材相关模块
import request from '@/utils/request'

// 上传图片
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 一般文件上传的接口都要求把请求头中的 Content-Type 设置为 multipart/form-data，
    // 使用 axios 上传文件的话不需要手动设置，需要给 data 一个 FormData 对象。
    // new FormData()
    data
  })
}

// 获取图片
export const getImage = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
