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
                                    {{$moment(item.creatTime).startOf("m").fromNow(true)+"前"}}
                                </el-col>
                            </el-col>
                        </el-row>
                        <!--托管告示的正文内容-->
                        <el-row class="pin-content-row">
                            <!--标题-->
                            <h3>
                                {{item.title}}
                            </h3>
                            <!--卡片信息-->
                            <el-card :body-style="{ padding: '10px' }" style="margin: 20px 0"
                                     v-on:click.native="clickCard(item)">
                                <el-col style="width:55%;height: 250px;">
                                    <img :src="item.pic" style="width: 15rem;">
                                </el-col>
                                <el-row>
                                    <el-col class="look-after-info">
                                        <el-button type="info" plain>开始日期：{{$moment(item.beginTime).format("YYYY-M月D日")}}
                                        </el-button>
                                    </el-col>
                                    <el-col class="look-after-info">
                                        <el-button type="info" plain>截止日期：{{$moment(item.deadlineTime).format("YYYY-M月D日")}}
                                        </el-button>
                                    </el-col>
                                    <el-col class="look-after-info" v-if="item.lastTime!==null">
                                        <el-button type="success" plain>托管时长：{{item.lastTime}}天</el-button>
                                    </el-col>
                                    <el-col class="look-after-info">
                                        <el-button type="warning" plain>预算：{{item.exceptPrice}}/天</el-button>
                                    </el-col>
                                    <el-col class="look-after-info">
                                        <el-button plain type="danger">交易地址：{{item.tradeDetailAddress}}</el-button>
                                    </el-col>
                                </el-row>
                            </el-card>
                            <!--操作-->
                        </el-row>
                        <!---->
                        <el-row class="pin-bottom">
                            <el-col>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-if="activeClass.indexOf(item.id+'like')===-1"
                                     @click="activeClass.push(item.id+'like')">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="width: 25px; height: 25px;display: inline-block;"
                                             src="http://pet.jutu.xyz/点赞.png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #8a93a0;">
                                            喜欢
                                        </span>
                                    </a>
                                </div>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-else
                                     @click="activeClass.pop(item.id+'like')">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="width: 25px; height: 25px;display: inline-block;"
                                             src="http://pet.jutu.xyz/点赞2.png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #1296db;">
                                            喜欢
                                        </span>
                                    </a>
                                </div>
                            </el-col>
                            <div style="height: 50%;width: 3px;background-color: #ebebeb;margin-top: 13px"></div>

                            <el-col>
                                <div style="width: 30%; margin: 0 auto;">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="width: 25px; height: 25px;display: inline-block;"
                                             src="http://pet.jutu.xyz/评 论.png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #8a93a0;">
                                        评论
                                    </span>
                                    </a>
                                </div>
                            </el-col>
                            <div style="height: 50%;width: 3px;background-color: #ebebeb;;margin-top: 13px"></div>

                            <el-col>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-if="activeClass.indexOf(item.id+'get')===-1"
                                     @click="becomeTheClient(item.id)">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="width: 25px; height: 25px;display: inline-block;"
                                             src="http://pet.jutu.xyz/手.png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #8a93a0;">
                                            接受
                                        </span>
                                    </a>
                                </div>
                                <div style="width: 30%; margin: 0 auto;"
                                     v-else
                                     @click="activeClass.pop(item.id+'get')">
                                    <a href="javascript:void(0)" style="text-decoration: none">
                                        <img style="width: 25px; height: 25px;display: inline-block;"
                                             src="http://pet.jutu.xyz/手2.png" alt="">
                                        <span style="font-size: 13px;font-weight: 500;color: #1296db;">
                                            接受
                                        </span>
                                    </a>
                                </div>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
            </el-row>

            <!--对话框，点击卡牌时弹出-->
            <el-dialog
                    :visible.sync="dialogVisible"
                    width="40%">
                <h3 style="margin-top: -30px;margin-bottom: 30px;color: #909090;">{{dialogInfo.title}}</h3>
                <div v-html="dialogInfo.introduce"></div>
            </el-dialog>
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
                /*是否显示对话框*/
                dialogVisible: false,
                /*对话框信息*/
                dialogInfo: '',
                activeClass: [],
            }
        },
        mounted() {
            this.getNextInfo();
        },
        computed: {},
        methods: {
            becomeTheClient(id) {
                this.activeClass.push(id + 'get');
                this.$message({
                    type: 'success',
                    message: '消息已发送，用户等待确认'
                })
            },
            clickCard(info) {
                this.dialogInfo = info;
                this.dialogVisible = true;
            },
            getNextInfo() {
                let _this = this;
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