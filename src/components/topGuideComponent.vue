<template>
    <div id="inBox">
        <el-row type="flex" justify="space-between">
            <!--页面导航-->
            <el-col id="leadBox" :span="9" style="height: 60px">
                <el-link :underline="false" @click="clickTag(1)">首页</el-link>
                <el-link :underline="false" @click="clickTag(2)">托管</el-link>
                <el-link :underline="false" @click="clickTag(3)">领养</el-link>
                <el-link :underline="false" @click="clickTag(4)">话题</el-link>
            </el-col>

            <!--搜索输入框-->
            <el-col :span="6" style="height: 60px">
                <el-input v-model="topSearch" placeholder="请输入关键字" :suffix-icon="'el-icon-search'"></el-input>
            </el-col>

            <!--发布消息按钮-->
            <el-col :span="3" style="height: 60px">
                <el-dropdown @command="handleCommand">
                    <el-button type="primary">
                        我要发布<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">待领养宠物</el-dropdown-item>
                        <el-dropdown-item command="b">待托管宠物</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <!--发布消息是的对话框-->
            <!--领养-->
            <el-dialog
                    :show-close="false"
                    :visible="dialogVisible==='a'"
                    title="请填写待领养信息"
                    width="55%">

                <el-input v-model="adoptUploadData.tradeDetailAddress" style="width: 70%">
                    <template slot="prepend">详细地址：</template>
                </el-input>
                <el-input v-model="adoptUploadData.title" style="width: 70%">
                    <template slot="prepend">标题：</template>
                </el-input>
                <h3>上传封面图片</h3>
                <el-upload
                        style="margin-top: 0;margin-left: 30px"
                        :limit=1
                        action=""
                        :http-request="uploadProgress"
                        list-type="picture-card"
                        :before-upload="beforeUpload"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-divider></el-divider>
                <h2>宠物详细情况介绍说明</h2>
                <!--富文本-->
                <wysiwyg v-model="adoptUploadData.intrduce"/>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="adoptConfirm">确 定</el-button>
                </span>
            </el-dialog>


            <!--托管-->
            <el-dialog
                    :visible="dialogVisible==='b'"
                    title="请填写待托管信息"
                    width="55%">
                <el-input v-model="lookUploadData.title" style="width: 70%">
                    <template slot="prepend">标题：</template>
                </el-input>
                <el-input v-model="lookUploadData.tradeDetailAddress" style="width: 70%">
                    <template slot="prepend">详细地址：</template>
                </el-input>
                <el-row style="width: 70%;margin-top: 20px;line-height: 40px">
                    <div class="el-input-group__prepend" style="display: inline-table;">托管截止日期：</div>
                    <el-date-picker
                            v-model="timeValue"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            format="yyyy 年 MM 月 dd 日"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-row>
                <el-input v-model="lookUploadData.exceptPrice" style="width: 70%">
                    <template slot="prepend">预期交易价格/天：</template>
                </el-input>
                <h3>上传封面图片</h3>
                <el-upload
                        style="margin-top: 0;margin-left: 30px"
                        :limit=1
                        action=""
                        :http-request="uploadProgress"
                        list-type="picture-card"
                        :before-upload="beforeUpload"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-divider></el-divider>
                <h2>宠物详细情况介绍说明</h2>
                <!--富文本-->
                <wysiwyg v-model="lookUploadData.intrduce"/>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="lookAfterConfire">确 定</el-button>
                </span>
            </el-dialog>


            <!--消息图标，以及人物头像-->
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
    import API from '../config/api'
    import * as qiniu from 'qiniu-js'

    export default {
        components: {},
        name: "topGuideComponent",
        data() {
            return {
                timeValue: '',
                dialogVisible: '',
                topSearch: '',
                fileList: [],
                adoptUploadData: {
                    saleUserId: '',
                    pic: '',
                    tradeDetailAddress: '',
                    title: '',
                    intrduce: '',
                },
                lookUploadData: {
                    orderServerId: '',
                    tradeDetailAddress: '',
                    introduce: '',
                    beginTime: '',
                    deadlineTime: '',
                    title: '',
                    exceptPrice: '',
                    pic: '',
                    lastTime: '',
                },
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
            },
        },
        methods: {
            clearAllInfo() {
                this.lookUploadData.tradeDetailAddress = '';
                this.lookUploadData.introduce = '';
                this.lookUploadData.beginTime = '';
                this.lookUploadData.deadlineTime = '';
                this.lookUploadData.title = '';
                this.lookUploadData.exceptPrice = '';
                this.lookUploadData.pic = '';
                this.adoptUploadData.pic = '';
                this.adoptUploadData.tradeDetailAddress = '';
                this.adoptUploadData.title = '';
                this.adoptUploadData.intrduce = '';
            },
            /*确认托管按钮*/
            lookAfterConfire() {
                let _this = this;
                _this.lookUploadData.orderServerId = _this.$store.state.userInfo.id;
                if (_this.lookUploadData.pic === '') {
                    _this.$message({
                        type: "error",
                        message: "请上传宠物图片",
                    });
                    return;
                }
                _this.axios({
                    method: 'get',
                    url: API.URL + API.LookAfterAdd,
                    params: {
                        orderServerId: _this.lookUploadData.orderServerId,
                        tradeDetailAddress: _this.lookUploadData.tradeDetailAddress,
                        introduce: _this.lookUploadData.intrduce,
                        beginTime: _this.timeValue[0],
                        deadlineTime: _this.timeValue[1],
                        title: _this.lookUploadData.title,
                        exceptPrice: _this.lookUploadData.exceptPrice,
                        pic: _this.lookUploadData.pic,
                    },
                }).then(function (re) {
                    if (re.data.code !== 200) {
                        _this.$message({
                            type: 'error',
                            message: "添加失败",
                        })
                        return;
                    }
                    _this.$message({type: 'success', message: "添加成功！"});
                    _this.clearAllInfo();
                });
                _this.dialogVisible = false;
            },
            /*确认领养按钮*/
            adoptConfirm() {
                let _this = this;
                _this.adoptUploadData.saleUserId = _this.$store.state.userInfo.id;
                if (_this.adoptUploadData.pic === '') {
                    _this.$message({
                        type: "error",
                        message: "请上传宠物图片",
                    });
                    return;
                }
                _this.axios({
                    method: 'get',
                    url: API.URL + API.AdoptAdd,
                    params: {
                        pic: _this.adoptUploadData.pic,
                        saleUserId: _this.adoptUploadData.saleUserId,
                        title: _this.adoptUploadData.title,
                        tradeDetailAddress: _this.adoptUploadData.tradeDetailAddress,
                        intrduce: _this.adoptUploadData.intrduce,
                    },
                }).then(function (re) {
                    if (re.data.code !== 200) {
                        _this.$message({
                            type: 'error',
                            message: "添加失败",
                        })
                        return;
                    }
                    _this.$message({type: 'success', message: "添加成功！"});
                    _this.clearAllInfo();
                });
                _this.dialogVisible = false;
            },
            /*上传*/
            uploadProgress(file) {
                var _this = this;
                var key = _this.randomWord(true, 4, 7);
                //参数putExtra
                var putExtra = {
                    fname: file.file.name,
                    mimeType: ["image/png", "image/jpeg", "image/gif"],
                };
                //参数config
                var config = {
                    useCdnDomain: false,
                    region: qiniu.region.z0,
                };
                var observable = null;
                //设置上传回调函数
                var observer = {
                    next(res) {
                    },
                    error(err) {
                        _this.$message(err.message);
                    },
                    complete(res) {
                        _this.$message({
                            type: 'success',
                            message: '上传完成',
                        });
                        _this.adoptUploadData.pic = "http://pet.jutu.xyz/" + res.key;
                        _this.lookUploadData.pic = "http://pet.jutu.xyz/" + res.key;
                    }
                };
                _this.axios({
                    method: 'get',
                    url: API.UploadImg,
                })
                    .then(function (response) {
                        if (response.data.code === 200) {
                            console.log("不删除原文件上传");
                            observable = qiniu.upload(file.file, key, response.data.data, putExtra, config);
                            var subscription = observable.subscribe(observer); // 上传开始
                        } else {
                            _this.$message(response.data.message);
                        }
                    });
            },
            /*产生随机字符*/
            randomWord(randomFlag, min, max) {
                var str = "",
                    range = min,
                    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                    pos;
                // 随机产生
                if (randomFlag) {
                    range = Math.round(Math.random() * (max - min)) + min;
                }
                for (var i = 0; i < range; i++) {
                    pos = Math.round(Math.random() * (arr.length - 1));
                    str += arr[pos];
                }
                return 'a' + str;
            },
            /*上传前的检查*/
            beforeUpload(file) {
                let _this = this;
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    _this.$message({
                        type: 'error',
                        message: '上传格式必须为jpeg/png',
                    });
                    return false;
                }
                if (file.size >= 2048000) {
                    _this.$message({
                        type: 'error',
                        message: '上传大小不能超过2M',
                    });
                    return false;
                }
            },
            /*点击不同的菜单项*/
            handleCommand(command) {
                let _this = this;
                if (_this.$store.state.userInfo === null) {
                    _this.$message({
                        type: "error",
                        message: '请先登录',
                    });
                    return;
                }
                this.dialogVisible = command;
            },
            /*点击路由到不同页面*/
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
            /*移除上传图片*/
            handleRemove(file, fileList) {
                this.$message({
                    type: 'success',
                    message: '已移除',
                });
            },
        },
    }
</script>
<style scoped>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";

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