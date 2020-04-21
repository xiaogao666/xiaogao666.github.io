<template>
    <div>
        <div><img src="../../login/logo_index.png" alt="" class="tp"></div>
          <el-menu
    default-active="/"
    background-color="#002033"
    text-color="pink"
    active-text-color="#ffd04b"
    router
    class="abc"
  >
    <el-menu-item index="/">
      <svg class="icon" aria-hidden="true">
    <use xlink:href="#iconHOMEMESSAGE"></use>
</svg>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-article"></use>
</svg>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <svg class="icon" aria-hidden="true">
    <use xlink:href="#iconImage"></use>
</svg>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <svg class="icon" aria-hidden="true">
    <use xlink:href="#iconGamePublishing"></use>
</svg>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <svg class="icon" aria-hidden="true">
    <use xlink:href="#iconsidebar_comment_hov"></use>
</svg>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <svg class="icon" aria-hidden="true">
    <use xlink:href="#iconjuyifansan"></use>
</svg>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <svg class="icon" aria-hidden="true">
    <use xlink:href="#iconsettings"></use>
</svg>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
    </div>

</template>

<script>
export default {
  name: 'AppAside',
  methods: {
  }
}
</script>

<style>
.tp {
    width: 100%;
    /* margin-top: 10px; */
    padding: 15px;
    box-sizing: border-box;
}
.icon {
    font-size: 23px;
    margin-right: 10px;
}
</style>
