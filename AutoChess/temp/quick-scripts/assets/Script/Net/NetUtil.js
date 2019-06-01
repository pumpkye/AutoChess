(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Net/NetUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd981d6TExxGmbWMdceTLX4F', 'NetUtil', __filename);
// Script/Net/NetUtil.ts

/**
 * @description 网络接口与api
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
/**
 * @description 客户端发送给服务器的消息基类
 */
var MessageBase = /** @class */ (function () {
    function MessageBase() {
    }
    MessageBase.prototype.testUrl = function () {
        console.log("testUrl:", exports.g_NetUtil.formatUrl(this.url, this.reqObj));
    };
    /**
     * @description 将消息返回的json对象转化为对应消息的ts对象，若该函数没有被重写，则直接返回json对象，
     * 对于返回消息不包含复杂对象结构的消息不需要重写该函数
     * @param ret 一个json对象
     */
    MessageBase.prototype.getResObj = function (ret) {
        // this.resObj.msg = ret.msg;
        // return this.resObj;
        return ret;
    };
    MessageBase.prototype.send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, resObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('url:', this.url);
                        url = exports.g_NetUtil.formatUrl(this.url, this.reqObj);
                        return [4 /*yield*/, exports.g_NetUtil.sendHttpRequest(url, "GET")];
                    case 1:
                        resObj = _a.sent();
                        return [2 /*return*/, this.getResObj(resObj)];
                }
            });
        });
    };
    return MessageBase;
}());

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=NetUtil.js.map
        