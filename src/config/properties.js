//接口地址基本的前缀
export const BaseUrl = process.env.VUE_APP_BASE_URL;
//统计接口地址
export const BaseStatisticsUrl = process.env.VUE_APP_STATISTICS_URL;
export const rootWebUrl = process.env.VUE_APP_WEBURL;
//超时时间
export const TIMEOUT = process.env.VUE_APP_TIMEOUT;

// 当前调用平台 wechat ios android
export const callerType = "web";
// 当前版本号
export const version = "V1.0.1";
// RSA加密私钥
export const privateKey = () => {
    return
};