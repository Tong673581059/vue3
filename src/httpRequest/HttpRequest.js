/**
 * 接口网络请求
 * */
import {BaseStatisticsUrl, callerType, version} from "../config/properties"
import {getRandomNum} from "../util/SystemUtil"
import {getRsaCode} from "../util/RsaUtil"
import axios from "axios";
import {Toast} from "vant";
import qs from "qs";
/**
 * GET请求 form-data格式
 *
 * @param url 接口地址
 * @param params 请求参数
 * @param success 请求成功回调
 * @param error 请求失败回调
 * @param showSuccess 展示请求成功文字提示
 * @param showError 展示请求失败文字提示
 * @param showFail 展示网络出错的文字提示
 * */
export const HttpGet = (url, params, success, error, showSuccess, showError, showFail) => {
    if (!url) {
        return;
    }
    params.callerType = callerType;
    params.nonce = getRandomNum();
    params.timestamp = new Date().getTime();
    params.version = version;
    params.sign = getRsaCode(
        params.callerType,
        params.nonce,
        params.timestamp,
        params.version
    );
    axios.get(url, {params:params})
        .then(response => {
            if (response.status == 200) {
                if (response.data.code == 10000 || (response.data.code == "" &&
                    (response.data.success || response.data.success == "true"))) {
                    success(response.data);
                } else {
                    if (showError) {
                        Toast(response.data.message);
                    }
                    error(response.data.code, response.data.message)
                }
            } else {
                if (showError) {
                    Toast(response.data.message);
                }
                error(1, response.statusText)
            }
        })
        .catch(error => {
            if (showFail) {
                Toast("当前无网络连接，请检查后重试");
            }
            error(2,error.message)
        })
}

/**
 * POST请求 form-data格式
 *
 * @param url 接口地址
 * @param params 请求参数
 * @param success 请求成功回调
 * @param error 请求失败回调
 * @param showSuccess 展示请求成功文字提示
 * @param showError 展示请求失败文字提示
 * @param showFail 展示网络出错的文字提示
 * */
export const HttpPost = (url, params, success, error, showSuccess, showError, showFail) => {
    if (!url) {
        return;
    }

    const callerType = callerType;
    const nonce = getRandomNum();
    const timestamp = new Date().getTime();
    const version = version;
    const sign = getRsaCode(callerType, nonce, timestamp, version);
    // const commonParams = {
    //     callerType: callerType,
    //     nonce:nonce,
    //     timestamp:timestamp,
    //     version: version,
    //     sign:sign
    // }
    params.callerType = callerType;
    params.nonce = nonce,
    params.timestamp = timestamp;
    params.version = version;
    params.sign = sign;
    axios.post(url, qs.stringify(params))
        .then(response => {
            if (response.status == 200) {
                if (response.data.code == 10000 || (response.data.code == "" &&
                    (response.data.success || response.data.success == "true"))) {
                    success(response.data);
                } else {
                    if (showError) {
                        Toast(response.data.message);
                    }
                    error(response.data.code, response.data.message)
                }
            } else {
                if (showError) {
                    Toast(response.data.message);
                }
                error(1, response.statusText)
            }
        })
        .catch(error => {
            if (showFail) {
                Toast("当前无网络连接，请检查后重试");
            }
            error(2, error.message)
        })
}

/**
 * POST请求 json格式 统计接口
 *
 * @param url 接口地址
 * @param params 请求参数
 * @param success 请求成功回调
 * @param error 请求失败回调
 * @param showSuccess 展示请求成功文字提示
 * @param showError 展示请求失败文字提示
 * @param showFail 展示网络出错的文字提示
 * */
export const HttpPostStatistics = (url, params, success, error, showSuccess, showError, showFail) => {
    if (!url) {
        return;
    }
    params.callerType = callerType;
    params.nonce = getRandomNum();
    params.timestamp = new Date().getTime();
    params.version = version;
    params.sign = getRsaCode(
        params.callerType,
        params.nonce,
        params.timestamp,
        params.version
    );
    axios.post(url, qs.stringify(params), {
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Request-Methods": "POST",
            "Access-Control-Request-Headers": "Content-Type"
        },
        baseURL: BaseStatisticsUrl
    })
        .then(response => {
            if (response.status == 200) {
                if (response.data.code == 10000 || (response.data.code == "" &&
                    (response.data.success || response.data.success == "true"))) {
                    success(response.data);
                } else {
                    if (showError) {
                        Toast(response.data.message);
                    }
                    error(response.data.code, response.data.message)
                }
            } else {
                if (showError) {
                    Toast(response.data.message);
                }
                error(1, response.statusText)
            }
        })
        .catch(error => {
            if (showFail) {
                Toast("当前无网络连接，请检查后重试");
            }
            error(2,error.message)
        })
}

// export const HttpPostMore = (httpList) => {
//     httpList.forEach(requestObj => {
//         HttpPost(requestObj.url, requestObj.params, requestObj.success, requestObj.error);
//     })
// }
