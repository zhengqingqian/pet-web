<template>
    <div>
        <div class="theBox">
            <!-- type pausing -->
            <vue-typed-js
                    id="typing"
                    class="boxElement"
                    :strings="['领养代替购买','尊重生命，不离不弃。 ']"
                    :startDelay="1500"
                    :typeSpeed="120"
                    :backSpeed="70">
                <h2 class="typing boxElement type-text"></h2>
            </vue-typed-js>
            <!--登录、注册框-->
            <sign-in-box-component class="boxElement"></sign-in-box-component>
        </div>
        <!--视频背景播放-->
        <el-row class="videoPlay">
            <vue-video-section
                    style="z-index: 999;height: 100vh;width: 100vw"
                    :mp4-source="require('../assets/cat.mp4')"
                    :elementId="'background-video'">
            </vue-video-section>
        </el-row>
    </div>
</template>


<script>
    import signInBoxComponent from "@/components/signInBoxComponent";

    export default {
        name: "siInPage",
        components: {
            signInBoxComponent
        }
    }
</script>
<style scoped src="./css/signInPage.css"></style>