<template>
    <div id="inBox">
        <el-row type="flex" justify="space-between">
            <el-col id="leadBox" :span="9" style="height: 60px">
                <el-link :underline="false" @click="clickTag(1)">首页</el-link>
                <el-link :underline="false" @click="clickTag(2)">托管</el-link>
                <el-link :underline="false" @click="clickTag(3)">领养</el-link>
                <el-link :underline="false" @click="clickTag(4)">话题</el-link>
            </el-col>


            <el-col :span="6" style="height: 60px">
                <el-input v-model="topSearch" placeholder="请输入关键字" :suffix-icon="'el-icon-search'"></el-input>
            </el-col>


            <el-col :span="3" style="height: 60px">
                <el-dropdown>
                    <el-button type="primary">
                        我要发布<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item>双皮奶</el-dropdown-item>
                        <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>

            <el-col :span="3" class="userInfoClass">
                <el-col :span="8">
                    <i class="el-icon-message-solid"></i>
                </el-col>
                <el-col :span="16" style="height: 50px;margin: 5px auto;text-align: center;">
                    <el-avatar shape="square" :size="50" :src="checkUserIcon"></el-avatar>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        name: "topGuideComponent",
        data() {
            return {
                topSearch: '',
            };
        },
        mounted() {
        },
        computed: {
            checkUserIcon() {
                var _this = this;
                if (_this.$store.state.userInfo !== null) {
                    return _this.$store.state.userInfo.userIcon;
                } else {
                    return "";
                }
            }
        },
        methods: {
            clickTag(index) {
                var _this = this;
                var elementById = document.getElementById('inBox');
                var elementsByTagName = elementById.getElementsByTagName('a');
                for (var i = 0; i < 4; i++) {
                    if (i + 1 === index) {
                        elementsByTagName[i].style.color = '#409eff';
                    } else {
                        elementsByTagName[i].style.color = '#909090';
                    }
                }
                switch (index) {
                    case 1:
                        _this.$router.push('home');
                        break;
                    case 2:
                        _this.$router.push('lookafter');
                        break;
                    case 3:
                        _this.$router.push('adopt');
                        break;
                    case 4:
                        _this.$router.push('topic');
                        break;
                }
            },
        }
    }
</script>

<style scoped>
    .userInfoClass .el-col:first-child i {
        font-size: 1.6rem;
        line-height: 60px;
        color: #71777c;
    }

    .userInfoClass .el-col:first-child {
        text-align: center;
    }

    .userInfoClass {
        height: 60px
    }

    #inBox {
        height: 100%;
        width: 75%;
        line-height: 60px;
        margin: 0 auto;
    }

    #leadBox .el-link {
        line-height: 60px;
        font-size: 1.2rem;
        padding: 0 1.5rem;
        color: #909090;;
    }

    #leadBox a:nth-child(1) {
        padding-left: 0;
        color: #409eff;
    }
</style>