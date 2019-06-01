/**
 * @description 网络接口与api
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

export var g_NetUtil = new NetUtil()

/**
 * @description 客户端发送给服务器的消息基类
 */
class MessageBase {
    protected readonly url: string;
    protected reqObj: {};   //消息结构，定义消息中需要传递的参数
    protected resObj: {     //返回消息的结构定义，用于存储返回结果对象化之后的结果
        success: boolean;        //success or fail
    };
    constructor() {

    }
    testUrl() {
        console.log("testUrl:", g_NetUtil.formatUrl(this.url, this.reqObj))
    }
    /**
     * @description 将消息返回的json对象转化为对应消息的ts对象，若该函数没有被重写，则直接返回json对象，
     * 对于返回消息不包含复杂对象结构的消息不需要重写该函数
     * @param ret 一个json对象
     */
    getResObj(ret): any {
        // this.resObj.msg = ret.msg;
        // return this.resObj;
        return ret;
    }

    async send() {
        console.log('url:', this.url);
        let url = g_NetUtil.formatUrl(this.url, this.reqObj);
        let resObj = await g_NetUtil.sendHttpRequest(url, "GET");
        return this.getResObj(resObj);
    }
}

