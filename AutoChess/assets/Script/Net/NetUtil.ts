/**
 * @description 网络接口与api，http连接
 * @author  pumpkye
 */

class NetUtil {
    // readonly url: "https://pumpkye.fun";
    // readonly ip: "https://47.97.185.90";
    // readonly port: "1024";
    readonly url = "http://localhost";
    readonly port = "3000";

    constructor() { }

    /**
     * 
     * @param url 接口url(不包含域名和ip)
     * @param kvObj 
     */
    formatUrl(url: string, kvObj?) {
        url = this.url + ":" + this.port + url
        if (kvObj) {
            let len = Object.getOwnPropertyNames(kvObj).length
            let i = 0
            url = url + "?"
            for (var key in kvObj) {
                url = url + key + "=" + kvObj[key]
                i = i + 1
                if (i < len) {
                    url = url + "&"
                }
            }
        }
        // console.log("formatUrl:"+url)
        return url
    }

    /**
     * 
     * @param url 
     * @param method post/get/...
     * @param body 当method为post时的body
     */
    sendHttpRequest(url: string, method: string, body?: string) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    let resObj;
                    try {
                        resObj = JSON.parse(xhr.responseText);
                    } catch (e) {
                        reject(e);
                    }
                    if (resObj) {
                        resolve(resObj);
                    } else {
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
        })
    }

}

export const g_NetUtil = new NetUtil()