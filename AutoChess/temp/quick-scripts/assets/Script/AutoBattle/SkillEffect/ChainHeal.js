(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/ChainHeal.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd5915AHaTlEIKiXxTAqFNtr', 'ChainHeal', __filename);
// Script/AutoBattle/SkillEffect/ChainHeal.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var AutoBattleManager_1 = require("../AutoBattleManager");
var Printer_1 = require("../OutPut/Printer");
/**
 * 对己方[0]个血量最低的单位回复[1]%的血量
 */
var ChainHeal = /** @class */ (function (_super) {
    __extends(ChainHeal, _super);
    function ChainHeal() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ChainHeal.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.chainHeal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChainHeal.prototype, "effName", {
        get: function () {
            return "chainHeal";
        },
        enumerable: true,
        configurable: true
    });
    ChainHeal.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var attacker = data.attacker;
        if (!attacker || attacker.isDead) {
            return false;
        }
        var count = data.skillEff.effArr[0];
        var recoverPercent = data.skillEff.effArr[1];
        var npcList = AutoBattleManager_1.g_AutoBattleManager.getFriendList(attacker);
        var hitNpc = new Array();
        for (var i = 0; i < npcList.length; i++) {
            var npc = npcList[i];
            if (npc.hp / npc.maxHp < 1) {
                hitNpc.push(npc);
            }
        }
        hitNpc.sort(function (a, b) {
            var perA = a.hp / a.maxHp;
            var perB = b.hp / b.maxHp;
            return perA - perB;
        });
        count = Math.min(count, hitNpc.length);
        for (var i = 0; i < count; i++) {
            var defender = hitNpc[i];
            var hpRecover = Math.floor(defender.maxHp * recoverPercent / 100);
            Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.recoverHp, { attacker: attacker, defender: defender, hp: hpRecover });
            defender.reduceHp(-hpRecover);
        }
        return true;
    };
    return ChainHeal;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.ChainHeal = ChainHeal;

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
        //# sourceMappingURL=ChainHeal.js.map
        