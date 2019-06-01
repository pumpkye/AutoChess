"use strict";
cc._RF.push(module, '08d1efxVadDL5Ub9qH0PNiQ', 'AddDamage');
// Script/AutoBattle/SkillEffect/AddDamage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 增加攻击力[0]点，持续[1]秒
 */
var AddDamage = /** @class */ (function (_super) {
    __extends(AddDamage, _super);
    function AddDamage() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AddDamage.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.addDamage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddDamage.prototype, "effName", {
        get: function () {
            return "addDamage";
        },
        enumerable: true,
        configurable: true
    });
    AddDamage.prototype.play = function (data) {
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var addDamage = data.skillEff.effArr[0];
        var lifeTime = data.skillEff.effArr[1];
        if (lifeTime != 0) {
            var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender);
            buff.setAttrChange("damage", addDamage);
            defender.addBuff(buff);
        }
        else {
            defender.addAttrChange("damage", new ChessBuff_1.AttrChangeInfo(addDamage));
        }
        return true;
    };
    return AddDamage;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.AddDamage = AddDamage;

cc._RF.pop();