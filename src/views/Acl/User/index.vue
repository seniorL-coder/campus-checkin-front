<template>
  <el-container>
    <!-- 头部 -->
    <el-header
      height="60px"
      style="background-color: #409eff; color: #fff; text-align: center; line-height: 60px"
    >
      Header
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" style="background-color: #f5f5f5">
        <el-menu default-active="1">
          <el-menu-item index="1">菜单 1</el-menu-item>
          <el-menu-item index="2">菜单 2</el-menu-item>
          <el-menu-item index="3">菜单 3</el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主体 -->
      <el-main style="padding: 20px">
        <!-- 卡片 + 按钮 -->
        <el-card class="box-card" style="margin-bottom: 20px">
          <h3>卡片标题</h3>
          <p>卡片内容，用于测试布局和间距。</p>
          <el-button type="primary">主要按钮</el-button>
          <el-button>默认按钮</el-button>
        </el-card>

        <!-- 表单 -->
        <el-form label-width="80px" style="margin-bottom: 20px">
          <el-form-item label="姓名">
            <el-input placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success">提交</el-button>
            <el-button type="warning">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" style="background-color: #f5f5f5">
        <el-menu default-active="1">
          <el-menu-item index="1">菜单 1</el-menu-item>
          <el-menu-item index="2">菜单 2</el-menu-item>
          <el-menu-item index="3">菜单 3</el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主体 -->
      <el-main style="padding: 20px">
        <!-- 卡片 + 按钮 -->
        <el-card class="box-card" style="margin-bottom: 20px">
          <h3>卡片标题</h3>
          <p>卡片内容，用于测试布局和间距。</p>
          <el-button type="primary">主要按钮</el-button>
          <el-button>默认按钮</el-button>
        </el-card>

        <!-- 表单 -->
        <el-form label-width="80px" style="margin-bottom: 20px">
          <el-form-item label="姓名">
            <el-input placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success">提交</el-button>
            <el-button type="warning">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <!-- 底部 -->
    <el-footer height="40px" style="text-align: center"> Footer </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { date: '2025-12-14', name: '张三', address: '北京市朝阳区' },
  { date: '2025-12-14', name: '李四', address: '上海市浦东新区' },
  { date: '2025-12-14', name: '王五', address: '广州市天河区' },
])
</script>

<style scoped>
/* 可根据需要调整卡片和间距 */
.box-card {
  padding: 20px;
}
</style>
