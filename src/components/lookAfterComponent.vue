<template>
    <div style="width: 45%; margin: 0 auto;">
        <div class="lookAfter-main">
            <el-row v-loading="loading">
                <ul style="background: #f4f5f5;">

                    <!--骨架屏占位-->
                    <el-row style="width: 100%;height: 200px;background-color: #ffffff" v-if="loading"></el-row>

                    <!--加载完成后数据-->
                    <li class="lookAfter-li" v-for="item in info" :key="item.id" v-else>
                        <!--人物以及相关信息-->
                        <el-row class="pin-header" type="flex" justify="start">
                            <el-col style="width:10%">
                                <el-avatar size="medium" style="width: 45px;height: 45px"
                                           :src="item.userIcon"></el-avatar>
                            </el-col>
                            <el-col style="width:10%;height:100%">
                                <el-col style="width: 100%;">{{item.userName}}</el-col>
                                <el-col style="width: 100%;" class="meta-box">
                                    {{$moment(item.creatTime).startOf("h").fromNow(true)+"前"}}
                                </el-col>
                            </el-col>
                        </el-row>

                        <el-row class="pin-content-row">
                            <div><p>春节过年需要回家，由于路途遥远，不能带回家。小哈很听话的，希望寻个好心人帮忙托管一下。价钱好商量，感谢</p></div>
                            <el-image
                                    style="width: 100%; height: 100%"
                                    :src="item.pic"
                                    :preview-src-list="item.pic">
                            </el-image>
                        </el-row>
                    </li>
                </ul>
            </el-row>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import API from "../config/api"

    export default {
        name: "lookAfterComponent",
        data() {
            return {
                info: [],
                loading: true,
                nowsPageNum: 1,
            }
        },
        mounted() {
            this.getNextInfo();
        },
        computed: {},
        methods: {
            getNextInfo() {
                var _this = this;
                _this.axios({
                    method: 'get',
                    url: API.URL + API.LookAfter,
                    params: {
                        pageNum: _this.nowsPageNum,
                        pageSize: 10,
                    }
                }).then(function (re) {
                    if (re.data.code !== 200) {
                        _this.$message({
                            showClose: true,
                            message: re.data.message,
                            type: 'error'
                        });
                        return;
                    }
                    for (var i = 0; i < re.data.data.length; ++i) {
                        _this.info.push(re.data.data[i]);
                    }
                    _this.nowsPageNum++;
                    _this.loading = false;
                })
            },
        }
    }
</script>

<style scoped src="./css/lookAfterCss.css"></style>