"use strict";
cc._RF.push(module, '9b1a97QiTNG/rms2Su2UlZW', 'PlatformUtilBase');
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