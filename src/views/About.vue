<template>
    <div class="about">
        <h1 @click="goHome">This is an about page</h1>
        <van-button plain type="primary">主要按钮</van-button>
        <van-button type="primary">主要按钮</van-button>
        <van-button type="success">成功按钮</van-button>
        <van-button type="default">默认按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
        <button class="myText">测试按钮</button>
        <div style="height: 20px;">测试rem</div>
        <router-link to="/helloWorld"></router-link>
        <router-view/>
    </div>
</template>
<script>
    import {useRouter} from "vue-router";
    import {HttpUrl} from "@/httpRequest/HttpUrl";

    export default {
        setup(){
            const router = useRouter();
            function goHome() {
                console.log("1111")
                console.log(this, this.$router, router)
                router.push('/home')
                // this.$router.push({path: '/home'})
            }
            let str = HttpUrl.statistics;
            return {goHome}
        }
    }
</script>

<style lang="less">
    .about {
        width: 100%;
        height: 100%;
    }

</style>
