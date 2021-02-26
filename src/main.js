import { createApp } from 'vue'
import App from '@/App.vue'
import router from "@/router";
import VConsole from "vconsole";//测试打印
import FastClick from "fastclick";//防止连点
import { Button } from "vant"
import "vant/lib/index.css";
import axios from "@/httpRequest/AxiosConfig";
import {version} from "@/config/properties";
import {HttpUrl} from "@/httpRequest/HttpUrl";
import {HttpPost, HttpPostStatistics} from "@/httpRequest/HttpRequest";
import "lib-flexible/flexible";
import "@/styles/index.less"

if (process.env.VUE_APP_DEBUG == 1) {
    new VConsole();
}

// 添加路由跳转 用户授权和信息校验
router.beforeEach((to, from, next) => {
    // 统计
    let statisticsParams = {
        // 访问方式（浏览：visit；点击：click；展示：show）
        accessMode: "visit",
        // 页面代码
        pageCode: to.name,
        // 子平台id
        // platformId: to.params.appId,
        platformId: 0,
        // 场馆id
        venueId: "",
        // 赛事id
        matchId: "",
        // 区域类型advert中部广告区，banner顶部，kingarea金刚区
        zoneType: "",
        // 顶部和广告区传各自的id, 金刚区传对应的code:1:运动地图，2:活动投票，3:赛事报名，4:一键领券，5:场馆预订，6:赛事直播，7:精彩				视频，8:协会风采，9:健康管理，10:赛场资讯
        zoneCode: ""
    };
    let commonParams = {
        // 业务线（海看体育：hksports）
        lob: "hksports",
        //  终端（web、ios、android)
        terminal: "web",
        // 用户id，未登录传空字符串
        userId: "",
        // 唯一id，用于uv去重，微信端可传openId，App可传设备号
        uniqueId: "",
        // 页面来源
        refererPage: ""
    };
    HttpPostStatistics(
        HttpUrl.statistics,
        {
            ...commonParams,
            ...statisticsParams
        },
        res => {},
        (err, type) => {},
        false, false, false
    );
    next();
});

FastClick.attach(document.body);

const app = createApp(App);
app.use(router);
app.version = version;
app.config.productionTip = false;//阻止Vue在正式运行时发出生产提示
app.config.globalProperties.$http=axios;
app.config.globalProperties.HttpUrl = HttpUrl
app.config.globalProperties.HttpPost = HttpPost
app.use(Button);
app.mount('#app');
