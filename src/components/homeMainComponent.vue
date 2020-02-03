<template>
    <div id="homeMain">
        <!--资讯分类栏-->
        <div style="background-color: white;width: 100%">
            <div id="typeList">
                <el-row type="flex">
                    <el-link :underline="false" v-for="item in category"
                             :key="item.id"
                             @click="clickCateTag(item.id)">
                        {{item.typeName}}
                    </el-link>
                </el-row>
            </div>
        </div>
        <!--下面的文章以及信息-->
        <div style="width:75%;margin:17px auto 0 auto;" id="infoBox">
            <el-row type="flex" justify="space-between">
                <!--文章遍历-->
                <el-col :span="17" id="newsInfo" style="background-color:#ffffff" v-loading="loading">
                    <ul>
                        <!--骨架占位-->
                        <li v-if="loading" style="height: 200px"></li>
                        <!--文章内容-->
                        <div v-if="!loading">
                            <li v-for="item in news" :key="item.id" style="padding-bottom: 0">
                                <h2 class="commontitle">{{item.title}}</h2>
                                <div class="innerconent">


                                    <!--显示简介-->
                                    <div v-if="activenews.indexOf(item.id)===-1">
                                        <!--左边图片-->
                                        <div class="RichContent-cover">
                                            <el-image style="width: 100%;height: 100%;" :src="item.frontPicture">
                                            </el-image>
                                        </div>
                                        <!--右边文章内容-->
                                        <div class="RichContent-inner">
                                            {{item.author}}：
                                            <div v-html="item.body"></div>
                                        </div>
                                        <!--阅读更多按钮-->
                                        <el-row type="flex" justify="space-between">
                                            <el-col :span="2" style="text-align: center">
                                                ......
                                            </el-col>
                                            <el-col :span="5" v-on:click.native="activenews.push(item.id)">
                                                <el-link style="color: #175199;" :underline="false">
                                                    阅读全文
                                                    <i class="el-icon-view el-icon--right"></i></el-link>
                                            </el-col>
                                        </el-row>
                                    </div>


                                    <!--显示全文内容-->
                                    <div v-else>
                                        <!--第一行显示图片以及作者信息-->
                                        <el-row class="innerAuthorBox">
                                            <el-image
                                                    style="width: 24px; height: 24px"
                                                    src="http://pet.jutu.xyz/author.jpg"
                                                    :fit="fit">
                                                <div slot="error" class="image-slot">
                                                    <i class="el-icon-picture-outline"></i>
                                                </div>
                                            </el-image>
                                            <el-col :span="3"
                                                    style="margin-left: 10px;font-weight: 600;color: #444;line-height:2.1">
                                                {{item.author}}
                                            </el-col>
                                        </el-row>
                                        <el-row style="color: #8590a6;font-size: 14px;line-height: 1.67;text-align: start;margin-top: 10px;margin-bottom: -4px;">
                                            {{item.likePeopleNumber}} 人喜欢了该文章
                                        </el-row>
                                        <!--文章内容-->
                                        <div v-html="item.body"></div>
                                    </div>


                                    <div class="footer">
                                        <!--底部操作栏-->
                                        <el-row type="flex" justify="space-between" style="line-height: 2.6rem;">
                                            <!--喜欢按钮-->
                                            <el-col :span="8">
                                                <el-button type="primary" class="likeButton" icon="el-icon-caret-top">
                                                    喜欢&nbsp;{{item.likePeopleNumber}}
                                                </el-button>
                                                <el-button
                                                        class="likeButton" type="primary" icon="el-icon-caret-bottom">
                                                </el-button>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-link icon="el-icon-edit" style="margin-right: 40px">评论</el-link>
                                                <el-link icon="el-icon-star-off">收藏</el-link>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-link icon="el-icon-arrow-up" @click="activenews.pop(item.id)">
                                                    收起
                                                </el-link>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>
                </el-col>
                <!--个人信息简介以及推荐-->
                <el-col :span="6" id="userInfo" style="background-color: white;max-width: 248px;height: fit-content;">
                    <!--个人信息-->
                    <div class="profile-box" v-if="this.$store.state.userInfo!==null">
                        <el-row class="profile">
                            <el-avatar :src="$store.state.userInfo.userIcon"
                                       style="width: 60px;height: 60px;">
                            </el-avatar>
                            <el-col style="width: auto;line-height: 60px;margin-left: 20px;">
                                {{$store.state.userInfo.userName}}
                            </el-col>
                        </el-row>
                        <el-row class="stat-list" type="flex" justify="space-between">
                            <el-col>
                                <span style="color: #909090">
                                    个性签名：
                                </span>
                                <span>
                                    "{{$store.state.userInfo.userSignature}}"
                                </span>
                            </el-col>
                        </el-row>
                    </div>
                    <!--未登录时的占位-->
                    <div class="profile-box" style="height:160px;text-align: center" v-else>
                        <el-row type="flex" justify="center" style="margin-top: 75px">
                            <el-col :span="7">你还未登录,</el-col>
                            <el-col :span="6" v-on:click.native="$router.push('/signin')">
                                <el-link class="profileSignIn">
                                    立即登录
                                </el-link>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>


<script>
    /* eslint-disable */
    import API from '../config/api'

    export default {
        name: "HomeMainComponent",
        data() {
            return {
                category: [],
                nowPageNum: 1,
                loading: true,
                news: [],
                activenews: [],
            }
        },
        mounted() {
            var _this = this;
            _this.axios({
                method: 'get',
                url: API.URL + API.NewsCategory,
            }).then(function (re) {
                if (re.data.code !== 200) {
                    _this.$message({
                        showClose: true,
                        message: re.data.message,
                        type: 'error'
                    });
                    return;
                }
                _this.category = re.data.data;
                _this.getNews(_this.category[0].id);
            })
        },
        methods: {
            clickCateTag(index) {
                var _this = this;
                var typeListEle = document.getElementById("typeList");
                var aEles = typeListEle.getElementsByTagName("a");
                for (var i = 0; i < _this.category.length; ++i) {
                    if (_this.category[i].id === index) {
                        aEles[i].style.color = '#007fff';
                        _this.pageNum = 1;
                        _this.getNews(index);
                    } else {
                        aEles[i].style.color = '#71777c';
                    }
                }
            },
            getNews(categoryId) {
                var _this = this;
                _this.axios({
                    method: 'get',
                    url: API.URL + API.NewsByCategoryId,
                    params: {
                        categoryId: categoryId,
                        pageNum: _this.pageNum,
                        pageSize: 10,
                    }
                }).then(function (re) {
                    if (re.data.code === 200) {
                        _this.news = re.data.data;
                        _this.loading = false;
                    } else {
                        _this.$message({
                                showClose: true,
                                message: re.data.message,
                                type: 'error'
                            }
                        )
                    }
                })
            }
        }
    }
</script>

<style scoped src="./css/homeMainCss.css"></style>