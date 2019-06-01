"use strict";
cc._RF.push(module, 'ae874+1v/VERL4vCck5upWD', 'ManaBurn');
// Script/AutoBattle/SkillEffect/ManaBurn.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 *  法力燃烧，每次普攻都会削减目标[0]点魔法，并且造成削减魔法量[1]%的伤害
 */
var ManaBurn = /** @class */ (function (_super) {
    __extends(ManaBurn, _super);
    function ManaBurn() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ManaBurn.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.manaBurn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManaBurn.prototype, "effName", {
        get: function () {
            return "manaBurn";
        },
        enumerable: true,
        configurable: true
    });
    ManaBurn.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return;
        }
        var mana = data.skillEff.effArr[0];
        var damagePer = data.skillEff.effArr[1];
        data.defender.addAttrChange("manaBurn", new ChessBuff_1.AttrChangeInfo({ mana: mana, damagePer: damagePer }));
        return true;
    };
    return ManaBurn;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.ManaBurn = ManaBurn;

cc._RF.pop();