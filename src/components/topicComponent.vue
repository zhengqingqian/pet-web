<template>
    <div id="topicMain">
        <div id="topic-container">
            <!--标题-->
            <div class="title">全部话题</div>
            <div v-loading="loading">
                <div style="height: 200px;width: 100%;background-color: #ffffff"
                     v-if="loading"></div>
                <div v-else style="padding: 0 10%">
                    <div class="topic-div" v-for="item in info" :key="item.id">
                        <img :src="item.pic" alt="" class="topic-pic">
                        <div style="display: inline-block;position: absolute;margin-left: 1.2rem;">
                            <span class="topic-span-1">{{item.name}}</span>
                            <span class="topic-span-2">{{item.joinPeople}}人参与</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import API from "../config/api"

    export default {
        name: "topicComponent",
        data() {
            return {
                loading: true,
                info: [],
            }
        },
        mounted() {
            this.getTopicInfo();
        },
        methods: {
            getTopicInfo() {
                var _this = this;
                _this.axios({
                    method: 'get',
                    url: API.URL + API.TopicAll,
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
                    _this.loading = false;
                })
            }
        }
    }
</script>

<style scoped src="./css/topicCss.css"></style>