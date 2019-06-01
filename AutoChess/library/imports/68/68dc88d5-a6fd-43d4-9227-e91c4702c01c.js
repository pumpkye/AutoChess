"use strict";
cc._RF.push(module, '68dc8jVpv1D1JIn6RxHAsAc', 'AddAttackSpeed');
// Script/AutoBattle/SkillEffect/AddAttackSpeed.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 增加攻速[0]点，持续[1]秒
 */
var AddAttackSpeed = /** @class */ (function (_super) {
    __extends(AddAttackSpeed, _super);
    function AddAttackSpeed() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AddAttackSpeed.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.addAttackSpeed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAttackSpeed.prototype, "effName", {
        get: function () {
            return "addAttackSpeed";
        },
        enumerable: true,
        configurable: true
    });
    AddAttackSpeed.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var attackSpeed = data.skillEff.effArr[0];
        var lifeTime = data.skillEff.effArr[1];
        if (lifeTime != 0) {
            var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender);
            buff.setAttrChange("attackSpeed", attackSpeed);
            defender.addBuff(buff);
        }
        else {
            defender.addAttrChange("attackSpeed", new ChessBuff_1.AttrChangeInfo(attackSpeed));
        }
        return true;
    };
    return AddAttackSpeed;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.AddAttackSpeed = AddAttackSpeed;

cc._RF.pop();