<template>
  <div class="upload-cover" @click="showCoverSelect">
      <div class="cover-wrap">
          <img ref="cover-iamge" class="cover-iamge"
          :src="coverImage"
          >
      </div>

      <!-- 弹出层 -->
      <el-dialog
        title="选择封面"
        :visible.sync="dialogVisible"
        append-to-body
        >
       <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
            <image-list
            :is-show-add="false"
            ref="image-list"
            :is-show-selected='true'
            />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
            <input ref="file" type="file" @change="onfileChange">
            <img
            ref="preview-image"
            width="100px"
            >
        </el-tab-pane>
    </el-tabs>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
            type="primary"
            @click="onCoverConfirm"
            >确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
import ImageList from '@/views/image/components/image-list'
export default {
  name: 'UploadCover',
  components: {
    ImageList
  },
  props: ['cover-image'],
  data () {
    return {
      dialogVisible: false,
      activeName: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onfileChange () {
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
      // console.log('onfileChange')
    //   this.$refs.file.value = ''
    },
    onCoverConfirm () {
      if (this.activeName === 'second') {
        if (!this.$refs.file.files[0]) {
          this.$message('请选择文件')
          return
        }
        const fd = new FormData()
        fd.append('image', this.$refs.file.files[0])
        uploadImage(fd).then(res => {
          this.dialogVisible = false
          this.$refs['cover-iamge'].src = res.data.data.url

          // 将图片地址发送给父组件
          this.$emit('update-cover', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        // console.log(selected)
        if (selected === null) {
          this.$message('请选择封面图片')
          return
        }
        this.dialogVisible = false
        // this.$emit('input', imageList.images[selected].url)  忘记设置v-modle所以不生效
      }
    }
  }
}
</script>

<style scoped lang="less">
.cover-wrap {
    width: 150px;
    height: 130px;
    border: 1px solid #000;
    .cover-iamge {
        width: 100%;
        height: 100%;
    }
}
</style>
