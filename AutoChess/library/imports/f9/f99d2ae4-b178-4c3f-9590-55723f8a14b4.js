"use strict";
cc._RF.push(module, 'f99d2rksXhMP5WQVXI/ihS0', 'Util');
// Script/AutoBattle/Util.ts

Object.defineProperty(exports, "__esModule", { value: true });
var AutoBattleConfig_1 = require("./Config/AutoBattleConfig");
/**
 *
 */
var Util = /** @class */ (function () {
    function Util() {
    }
    /**
     * 读取excell表数据
     * @param name 表名
     * @param id 主键id
     */
    Util.prototype.getExcellData = function (name, id) {
        return null;
    };
    /**
     * 读取xml配置
     * @param name xml文件名
     */
    Util.prototype.getXmlData = function (name) {
    };
    Util.prototype.getDir = function (dirX, dirY) {
        if (dirX != 0) {
            dirX = Math.floor(dirX / Math.abs(dirX));
        }
        if (dirY != 0) {
            dirY = Math.floor(dirY / Math.abs(dirY));
        }
        var dir = 0;
        for (var i = 0; i < 8; i++) {
            if (AutoBattleConfig_1.dirConfig[i].x == dirX && AutoBattleConfig_1.dirConfig[i].y) {
                dir = i;
                break;
            }
        }
        return dir;
    };
    Util.prototype.getDistance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
    Util.prototype.getCityDistance = function (arg1, arg2, arg3, arg4) {
        if (typeof arg1 === 'number' && typeof arg2 === 'number') {
            return Math.abs(arg1 - arg3) + Math.abs(arg2 - arg4);
        }
        else if (typeof arg1 === 'object' && typeof arg2 === 'object') {
            return Math.abs(arg1.posX - arg2.posX) + Math.abs(arg1.posY - arg2.posY);
        }
    };
    Util.prototype.checkPosShortInRange = function (pos1X, pos1Y, pos2X, pos2Y, radius) {
        var dx = Math.abs(pos1X - pos2X);
        if (dx > radius) {
            return false;
        }
        var dy = Math.abs(pos1Y - pos2Y);
        if (AutoBattleConfig_1.attackRangeConfig[radius] && dy > AutoBattleConfig_1.attackRangeConfig[radius][dx]) {
            return false;
        }
        return true;
    };
    /**
    * 返回一个[1,num]的随机数
    * @param num
    */
    Util.prototype.getRandomNumber = function (num) {
        if (num <= 1) {
            return num;
        }
        var rad = Math.floor(Math.random() * num) + 1;
        return rad;
    };
    return Util;
}());
exports.g_Util = new Util();

cc._RF.pop();