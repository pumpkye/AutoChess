"use strict";
cc._RF.push(module, '236d2v83YVAYLCWsoKFl90O', 'MulDamage');
// Script/AutoBattle/SkillEffect/MulDamage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 增加[0]%攻击力，持续[1]秒
 */
var MulDamage = /** @class */ (function (_super) {
    __extends(MulDamage, _super);
    function MulDamage() {
        return _super.call(this) || this;
    }
    Object.defineProperty(MulDamage.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.mulDamage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MulDamage.prototype, "effName", {
        get: function () {
            return "mulDamage";
        },
        enumerable: true,
        configurable: true
    });
    MulDamage.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var damage = data.skillEff.effArr[0] * defender.damage / 100;
        var lifeTime = data.skillEff.effArr[1];
        if (lifeTime != 0) {
            var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender);
            buff.setAttrChange("damage", damage);
            defender.addBuff(buff);
        }
        else {
            defender.addAttrChange("damage", new ChessBuff_1.AttrChangeInfo(damage));
        }
        return true;
    };
    return MulDamage;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.MulDamage = MulDamage;

cc._RF.pop();