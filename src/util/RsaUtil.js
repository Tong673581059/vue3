import jsrsasign from "jsrsasign";
import {privateKey} from "../config/properties"

/**
 * 按规则对参数进项RSA加密
 * */
export const getRsaCode = (callerType, nonce, timestamp, version) => {
    // 创建RSAKey对象
    var rsa = new jsrsasign.RSAKey();
    //因为后端提供的是pck#8的密钥对，所以这里使用 KEYUTIL.getKey来解析密钥
    var k = privateKey();
    // 将密钥转码
    rsa = jsrsasign.KEYUTIL.getKey(k);
    // 创建Signature对象，设置签名编码算法
    var sig = new jsrsasign.KJUR.crypto.Signature({ alg: "SHA256withRSA" });
    // 初始化
    sig.init(rsa);
    // 传入待加密字符串
    sig.updateString(
        "caller_type=" +
        callerType +
        "&nonce=" +
        nonce +
        "&timestamp=" +
        timestamp +
        "&version=" +
        version
    );
    // 生成密文
    var sign = jsrsasign.hextob64(sig.sign());
    // 对加密后内容进行URI编码
    // sign = encodeURIComponent(sign);
    //把参数与密文拼接好，返回
    var params = sign;
    return params;
};