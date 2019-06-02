(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/BloodSacrifice.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '57febOgHvlLxqQSlxlsl6Zv', 'BloodSacrifice', __filename);
// Script/AutoBattle/SkillEffect/BloodSacrifice.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 对当前目标造成最大生命值[0]%的伤害，同时对自己造成最大生命值[1]%的伤害，并获得一个buff:触发暴击时恢复伤害[2]%的血量，持续时间[3]秒
 */
var BloodSacrifice = /** @class */ (function (_super) {
    __extends(BloodSacrifice, _super);
    function BloodSacrifice() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BloodSacrifice.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.bloodSacrifice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BloodSacrifice.prototype, "effName", {
        get: function () {
            return "bloodSacrifice";
        },
        enumerable: true,
        configurable: true
    });
    BloodSacrifice.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.attacker || data.attacker.isDead || !data.defender || data.defender.isDead) {
            return false;
        }
        var damagePer = data.skillEff.effArr[0];
        var hurtSelfPer = data.skillEff.effArr[1];
        var recoverPer = data.skillEff.effArr[2];
        var lifeTime = data.skillEff.effArr[3];
        var damage = Math.floor(data.defender.hp * damagePer / 100);
        var hurtSelf = Math.floor(data.attacker.hp * hurtSelfPer / 100);
        data.defender.reduceHp(damage);
        data.attacker.reduceHp(hurtSelf);
        var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, data.attacker);
        buff.setAttrChange("bloodSacrifice", recoverPer);
        data.attacker.addBuff(buff);
        return true;
    };
    return BloodSacrifice;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.BloodSacrifice = BloodSacrifice;

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
        //# sourceMappingURL=BloodSacrifice.js.map
        