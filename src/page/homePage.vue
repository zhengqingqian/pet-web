<template>
    <el-row>
        <el-container style="background:#f4f5f5;min-height: 100vh">
            <!--顶部组件-->
            <el-header>
                <top-guide-component></top-guide-component>
            </el-header>
            <!--下面路由组件-->
            <el-main style="overflow: visible">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-row>
</template>

<script>
    import topGuideComponent from "@/components/topGuideComponent";

    export default {
        name: "homePage",
        components: {
            topGuideComponent,
        }
    }
</script>

<style scoped>
    .el-container .el-header {
        background-color: white;
        border-bottom: 1px solid #f1f1f1;
        padding: 0
    }

    .el-container .el-main {
        padding: 0;
    }
</style>