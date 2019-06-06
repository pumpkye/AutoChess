"use strict";
cc._RF.push(module, 'd981d6TExxGmbWMdceTLX4F', 'NetUtil');
// Script/Net/NetUtil.ts

/**
 * @description 网络接口与api，http连接
 * @author  pumpkye
 */
Object.defineProperty(exports, "__esModule", { value: true });
var NetUtil = /** @class */ (function () {
    function NetUtil() {
        // readonly url: "https://pumpkye.fun";
        // readonly ip: "https://47.97.185.90";
        // readonly port: "1024";
        this.url = "http://localhost";
        this.port = "3000";
    }
    /**
     *
     * @param url 接口url(不包含域名和ip)
     * @param kvObj
     */
    NetUtil.prototype.formatUrl = function (url, kvObj) {
        url = this.url + ":" + this.port + url;
        if (kvObj) {
            var len = Object.getOwnPropertyNames(kvObj).length;
            var i = 0;
            url = url + "?";
            for (var key in kvObj) {
                url = url + key + "=" + kvObj[key];
                i = i + 1;
                if (i < len) {
                    url = url + "&";
                }
            }
        }
        // console.log("formatUrl:"+url)
        return url;
    };
    /**
     *
     * @param url
     * @param method post/get/...
     * @param body 当method为post时的body
     */
    NetUtil.prototype.sendHttpRequest = function (url, method, body) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var resObj = void 0;
                    try {
                        resObj = JSON.parse(xhr.responseText);
                    }
                    catch (e) {
                        reject(e);
                    }
                    if (resObj) {
                        resolve(resObj);
                    }
                    else {
                        reject(xhr);
                    }
                }
            };
            xhr.withCredentials = false;
            xhr.open(method, url);
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(body);
        });
    };
    return NetUtil;
}());
exports.g_NetUtil = new NetUtil();

cc._RF.pop();