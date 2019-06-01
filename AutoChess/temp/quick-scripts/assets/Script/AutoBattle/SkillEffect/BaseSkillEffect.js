(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/BaseSkillEffect.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '50c4dlk0ptC+LJiYQsog3MB', 'BaseSkillEffect', __filename);
// Script/AutoBattle/SkillEffect/BaseSkillEffect.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var Util_1 = require("../Util");
var AutoBattleManager_1 = require("../AutoBattleManager");
var Printer_1 = require("../OutPut/Printer");
var BaseSkillEffect = /** @class */ (function () {
    function BaseSkillEffect() {
        console.log("init skillEffect:", this.effName);
    }
    Object.defineProperty(BaseSkillEffect.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.baseEffect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSkillEffect.prototype, "effName", {
        get: function () {
            return "BaseSkillEffect";
        },
        enumerable: true,
        configurable: true
    });
    BaseSkillEffect.prototype.getRandomNpc = function (npcList, count, range, center) {
        var tempList = new Array();
        var hitList = new Array();
        for (var i = 0; i < npcList.length; i++) {
            var npc = npcList[i];
            if ((!range || !center) || (range && center && Util_1.g_Util.checkPosShortInRange(center.x, center.y, npc.posX, npc.posY, range))) {
                tempList.push(npc);
            }
        }
        if (count >= tempList.length) {
            return tempList;
        }
        for (var i = 0; i < count; i++) {
            var rad = AutoBattleManager_1.g_AutoBattleManager.getRandomNumber(tempList.length) - 1;
            if (tempList[rad]) {
                hitList.push(tempList[rad]);
            }
            else {
                Printer_1.printErrMsg(Printer_1.pErrTag.randomNum, { max: tempList.length, rad: rad });
            }
        }
        return hitList;
    };
    /**
     * play
     */
    BaseSkillEffect.prototype.play = function (data) {
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.doSkillEffect, this.effName);
        return true;
    };
    return BaseSkillEffect;
}());
exports.BaseSkillEffect = BaseSkillEffect;

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
        //# sourceMappingURL=BaseSkillEffect.js.map
        