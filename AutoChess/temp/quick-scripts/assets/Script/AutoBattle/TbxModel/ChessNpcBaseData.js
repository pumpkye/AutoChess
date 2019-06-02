(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/TbxModel/ChessNpcBaseData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '10c955I7Z1PpJgEHtgT7Hy1', 'ChessNpcBaseData', __filename);
// Script/AutoBattle/TbxModel/ChessNpcBaseData.ts

Object.defineProperty(exports, "__esModule", { value: true });
var npc_data_1 = require("../Tbx/npc_data");
/**
 * @author pumpkye
 */
var ChessNpcBaseData = /** @class */ (function () {
    /**
     * @description 通过baseId从配置文件中读取数据
     * @param baseId
     */
    function ChessNpcBaseData(baseId) {
        this.baseId = 0;
        this.name = "";
        this.hp = 0;
        this.maxHp = 0;
        this.mp = 0;
        this.maxMp = 0;
        this.damage = 0;
        this.defence = 0;
        this.mdefence = 0;
        this.attaSpeed = 0;
        this.attackRange = 0;
        this.skill = 0;
        this.normalSkill = 0;
        this.speed = 0;
        this.mvSpeed = 0;
        this.race = 0;
        this.career = 0;
        this.mvStep = 0;
        this.type = 0;
        this.baseId = baseId;
        var tbxData = npc_data_1.npc_data[baseId];
        if (tbxData) {
            for (var key in tbxData) {
                if (tbxData.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                    this[key] = tbxData[key];
                }
            }
        }
    }
    return ChessNpcBaseData;
}());
exports.ChessNpcBaseData = ChessNpcBaseData;

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
        //# sourceMappingURL=ChessNpcBaseData.js.map
        