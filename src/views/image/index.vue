<template>
  <div class="image-container">
     <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div style="padding-bottom: 20px">
        <el-radio-group
        v-model="collect"
        size="mini"
        @change="onCollectChange"
        >
      <el-radio-button
      :label="false"
      >全部</el-radio-button>
      <el-radio-button
      :label="true"
      >收藏</el-radio-button>
    </el-radio-group>
    <el-button
    style="float: right"
    type="primary"
    @click="dialogVisible = true"
    >上传素材</el-button>
      </div>
      <!-- 图片列表 -->
      <el-row :gutter="18">
        <el-col
        :xs="24"
        :sm="12"
        :lg="4"
        :span="4"
        v-for="(img, index) in images"
        :key="index"
        >
          <el-image
            style="height: 150px"
            :src="img.url"
            fit="cover"></el-image>
        </el-col>
</el-row>
        <!-- 列表分页 -->
      <el-pagination
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="perPage"
          @current-change="onCurrentChange"
          >
        </el-pagination>
</el-card>
        <el-dialog
        title="上传素材"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-upload
          class="upload-demo"
          drag
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="uploadHeaders"
          name="image"
          :on-success="onUploadSuccess"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </el-dialog>
  </div>
</template>

<script>
import { getImage } from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // 默认查询全部
      images: [], // 图片素材列表
      dialogVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      page: 1, // 当前页码
      totalCount: 0, // 图片总数
      perPage: 12 // 每页显示多少条数据
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(false)
  },
  mounted () {},
  methods: {
    loadImages (collect = false) {
      getImage({
        collect,
        page: this.page,
        per_page: this.perPage
      }).then(res => {
        // console.log(res)
        const { results, total_count: totalCount } = res.data.data
        this.images = results
        this.totalCount = totalCount
      })
    },
    onCollectChange (value) {
      this.loadImages(value)
    },
    handleClose () {
      console.log('handleClose')
    },
    onUploadSuccess () {
      // 上传完成后 关闭弹出层
      this.dialogVisible = false
      // 重新加载素材列表
      this.loadImages(false)
    },
    // 切换分页
    onCurrentChange (page) {
      // console.log(page)
      // 更换当前页码
      this.page = page
      // 重新调用请求
      this.loadImages()
    }
  }
}
</script>

<style scoped lang="less"></style>
