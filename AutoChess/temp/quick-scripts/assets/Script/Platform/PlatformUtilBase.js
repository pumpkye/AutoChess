(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Platform/PlatformUtilBase.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9b1a97QiTNG/rms2Su2UlZW', 'PlatformUtilBase', __filename);
// Script/Platform/PlatformUtilBase.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlatformUtilBase = /** @class */ (function () {
    function PlatformUtilBase() {
        console.log("init PlatformUtilBase");
    }
    //account    
    PlatformUtilBase.prototype.getOpenId = function () {
        return "0";
    };
    //file system
    PlatformUtilBase.prototype.loadUserFileData = function (obj) {
    };
    PlatformUtilBase.prototype.saveUserFileData = function (obj) {
    };
    //social
    PlatformUtilBase.prototype.shareGame = function (arg) {
    };
    PlatformUtilBase.prototype.shareToGroup = function (arg) {
    };
    PlatformUtilBase.prototype.showAd = function (arg) {
    };
    PlatformUtilBase.prototype.hideAd = function (arg) {
    };
    //sub canvas
    PlatformUtilBase.prototype.postMessage = function (arg) {
    };
    PlatformUtilBase.prototype.initSharedCanvas = function (arg) {
    };
    PlatformUtilBase.prototype.getSubCanvasTex = function () {
        return null;
    };
    return PlatformUtilBase;
}());
exports.PlatformUtilBase = PlatformUtilBase;

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
        //# sourceMappingURL=PlatformUtilBase.js.map
        