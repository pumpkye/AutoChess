(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/Util.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9a6cdGQGvVBdraNQc6XUmra', 'Util', __filename);
// Script/AutoBattle/Util.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ChessNpc_1 = require("./Model/ChessNpc");
var AutoBattleConfig_1 = require("./Config/AutoBattleConfig");
var WordsConfig_1 = require("./Config/WordsConfig");
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
     * 获取阵容触发的职业和种族buff
     * @param baseIdList 阵容的baseId列表，可重复
     */
    Util.prototype.getCareerAndRaceBuffList = function (npcInfoList) {
        var npcList = new Array();
        for (var i = 0; i < npcInfoList.length; i++) {
            var info = npcInfoList[i];
            var chessNpc = new ChessNpc_1.ChessNpc(info.thisId, info.baseId, info.level, true);
            npcList.push(chessNpc);
        }
        var careerArr = new Array();
        var raceArr = new Array();
        for (var key in AutoBattleConfig_1.careerBuffConfig) {
            if (AutoBattleConfig_1.careerBuffConfig.hasOwnProperty(key)) {
                var element = AutoBattleConfig_1.careerBuffConfig[key];
                var careerNum = 0;
                var tempList = new Array();
                for (var i = 0; i < npcList.length; i++) {
                    var npc = npcList[i];
                    if (npc.career == Number(key)) {
                        tempList[npc.baseId] = 1;
                    }
                }
                for (var baseId in tempList) {
                    if (tempList.hasOwnProperty(baseId)) {
                        careerNum += 1;
                        if (element[careerNum]) {
                            careerArr[Number(key)] = careerNum;
                        }
                    }
                }
            }
        }
        for (var key in AutoBattleConfig_1.raceBuffConfig) {
            if (AutoBattleConfig_1.raceBuffConfig.hasOwnProperty(key)) {
                var tempList = new Array();
                for (var i = 0; i < npcList.length; i++) {
                    var npc = npcList[i];
                    if (npc.race == Number(key)) {
                        tempList[npc.baseId] = 1;
                    }
                }
                var element = AutoBattleConfig_1.raceBuffConfig[key];
                var raceNum = 0;
                for (var baseId in tempList) {
                    if (tempList.hasOwnProperty(baseId)) {
                        raceNum += 1;
                        if (element[raceNum]) {
                            raceArr[Number(key)] = raceNum;
                        }
                    }
                }
            }
        }
        var buffArr = {
            careerArr: careerArr,
            raceArr: raceArr,
        };
        return buffArr;
    };
    /**
     * 获取触发的种族和职业buff描述字符串
     * @param npcInfoList 阵容的baseId列表，可重复
     */
    Util.prototype.getCareerAndRaceBuffStr = function (npcInfoList) {
        var str = "";
        var buffArr = this.getCareerAndRaceBuffList(npcInfoList);
        /**
         * 职业描述字符串
         */
        for (var careerId in buffArr.careerArr) {
            if (buffArr.careerArr.hasOwnProperty(careerId)) {
                var num = buffArr.careerArr[careerId];
                str = str + WordsConfig_1.WorsConfig.career[Number(careerId)] + num.toString();
            }
        }
        /**
         * 种族描述字符串
         */
        for (var raceId in buffArr.raceArr) {
            if (buffArr.raceArr.hasOwnProperty(raceId)) {
                var num = buffArr.raceArr[raceId];
                str = str + WordsConfig_1.WorsConfig.race[Number(raceId)] + num.toString();
            }
        }
        return str;
    };
    return Util;
}());
exports.g_Util = new Util();

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
        //# sourceMappingURL=Util.js.map
        