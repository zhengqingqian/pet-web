<template>
    <div id="box">
        <el-tabs type="border-card">
            <el-tab-pane label="登录" class="box-card">
                <el-input v-model="userSignIn.name" placeholder="请输入账号"></el-input>
                <el-input v-model="userSignIn.password" placeholder="请输入密码"></el-input>
                <el-button type="primary" style="width: 100%;margin-top: 40px" @click="signIn">登录</el-button>
            </el-tab-pane>
            <el-tab-pane label="邮箱注册" class="box-card">
                <el-input v-model="userSignUp.name" placeholder="请输入账号"></el-input>
                <el-input v-model="userSignUp.password" placeholder="请输入密码"></el-input>
                <el-input v-model="userSignUp.address" placeholder="请输入邮箱地址"></el-input>
                <el-row>
                    <el-input v-model="userSignUp.code" placeholder="请输入验证码"
                              style="display: inline-block;width: 40%"></el-input>
                    <el-button type="primary" style="display: inline-block;width: 40%;margin-left: 20%"
                               @click="sendCode">获取验证码
                    </el-button>
                </el-row>
                <el-button type="primary" style="width: 100%;margin-top: 40px" @click="signUp">注册</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import API from '../config/api'
    /* eslint-disable */
    export default {
        name: "signInBoxComponent.vue",
        data() {
            return {
                userSignIn: {
                    name: '',
                    password: '',
                },
                userSignUp: {
                    name: '',
                    password: '',
                    address: '',
                    code: ''
                }
            }
        },
        methods: {
            signIn() {
                var _this = this;
                _this.axios({
                    method: 'get',
                    url: API.URL + API.SignIn,
                    params: {
                        userName: _this.userSignIn.name,
                        password: _this.userSignIn.password,
                    }
                }).then(function (re) {
                    if (re.data.code === 200) {
                        _this.$store.commit("setUserInfo", re.data.data);
                        _this.$router.push(API.Home);
                    } else {
                        _this.$message({
                            showClose: true,
                            message: re.data.message,
                            type: 'error'
                        });
                    }
                })
            },
            sendCode() {
                var _this = this;
                if (_this.userSignUp.address === '') {
                    _this.$message({
                        message: '地址为空',
                        type: 'error'
                    });
                    return;
                }
                var reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
                if (!reg.test(_this.userSignUp.address)) {
                    _this.$message({
                        message: '格式错误',
                        type: 'error'
                    });
                    return;
                }
                _this.axios({
                    method: 'get',
                    url: API.URL + API.SendMail,
                    params: {
                        addr: _this.userSignUp.address,
                    }
                }).then(function (re) {
                    if (re.data.code === 200) {
                        _this.$message({
                                showClose: true,
                                message: re.data.message,
                                type: 'success'
                            }
                        )
                    } else {
                        _this.$message({
                                showClose: true,
                                message: re.data.message,
                                type: 'error'
                            }
                        )
                    }
                })

            },
            signUp() {
                var _this = this;
                if (_this.userSignUp.address === "" ||
                    _this.userSignUp.code === "" ||
                    _this.userSignUp.name === "" ||
                    _this.userSignUp.password === "") {
                    _this.$message({
                        message: '请输入信息',
                        type: 'error'
                    });
                    return;
                }
                _this.axios({
                    method: 'post',
                    url: API.URL + API.SignUp,
                    data: {
                        adderss: _this.userSignUp.address,
                        code: _this.userSignUp.code,
                        password: _this.userSignUp.password,
                        userName: _this.userSignUp.name
                    }
                }).then(function (re) {
                    if (re.data.code === 200) {
                        _this.$message({
                                showClose: true,
                                message: re.data.message,
                                type: 'success'
                            }
                        )
                    } else {
                        _this.$message({
                                showClose: true,
                                message: re.data.message,
                                type: 'error'
                            }
                        )
                    }
                })
            },
        }
    }
</script>

<style scoped>
    #box {
        width: 500px;
        padding: 0 50px;
        height: 376px;
        opacity: 0.8;
    }

    .box-card {
        width: 400px;
        margin: auto;
    }

    .el-input {
        margin: 10px 0;
    }
</style>