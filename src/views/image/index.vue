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
        class="aaa"
        v-for="(img, index) in images"
        :key="index"
        >
          <el-image
            style="height: 150px"
            :src="img.url"
            fit="cover">
            </el-image>
            <div class="bbb">
              <!-- 收藏按钮 -->
              <el-button
              size="mini"
              type="info"
              icon="el-icon-star-off"
              circle
              :style=" img.is_collected ? 'color: red' : 'color: whilte'"
              @click="collectionImage(img.id, !img.is_collected)"
              ></el-button>
              <!-- 删除按钮 -->
              <el-button @click="deleteImage(img.id)" size="mini" type="info" icon="el-icon-delete" circle></el-button>
            </div>
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
import { getImage, deleteImages, collectionImages } from '@/api/image'
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
    },
    // 删除图片
    deleteImage (id) {
      this.$confirm('确定删除该图片？, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteImages(id).then(res => {
          this.loadImages()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 收藏按钮
    collectionImage (id, iscollection) {
      collectionImages(id, iscollection).then(res => {
        // console.log(res)
        if (iscollection) {
          this.loadImages()
          this.$message({
            type: 'success',
            message: '收藏成功'
          })
        } else {
          this.loadImages()
          this.$message({
            type: 'danger',
            message: '取消收藏'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.aaa {
  position: relative;
}
.bbb {
  width: 90%;
  height: 28px;
  text-align: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
}
</style>
