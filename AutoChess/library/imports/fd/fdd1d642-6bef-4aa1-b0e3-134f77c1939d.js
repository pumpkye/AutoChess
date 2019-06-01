"use strict";
cc._RF.push(module, 'fdd1dZCa+9KobDjE093wZOd', 'AddMaxHp');
// Script/AutoBattle/SkillEffect/AddMaxHp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 增加生命值[0]点，持续[1]秒
 */
var AddMaxHp = /** @class */ (function (_super) {
    __extends(AddMaxHp, _super);
    function AddMaxHp() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AddMaxHp.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.addMaxHp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddMaxHp.prototype, "effName", {
        get: function () {
            return "addMaxHp";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * play
     */
    AddMaxHp.prototype.play = function (data) {
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var addMaxHp = data.skillEff.effArr[0];
        var lifeTime = data.skillEff.effArr[1];
        if (lifeTime != 0) {
            var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender);
            buff.setAttrChange("maxHp", addMaxHp);
            defender.addBuff(buff);
        }
        else {
            defender.addAttrChange("maxHp", new ChessBuff_1.AttrChangeInfo(addMaxHp));
        }
        return true;
    };
    return AddMaxHp;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.AddMaxHp = AddMaxHp;

cc._RF.pop();