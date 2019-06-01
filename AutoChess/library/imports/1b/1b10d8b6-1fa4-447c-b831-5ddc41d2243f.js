"use strict";
cc._RF.push(module, '1b10di2H6REfLgxXdxB0iQ/', 'Sputtering');
// Script/AutoBattle/SkillEffect/Sputtering.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 *  溅射，对目标周围[0]格单位造成[1]%伤害
 */
var Sputtering = /** @class */ (function (_super) {
    __extends(Sputtering, _super);
    function Sputtering() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Sputtering.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.sputtering;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sputtering.prototype, "effName", {
        get: function () {
            return "sputtering";
        },
        enumerable: true,
        configurable: true
    });
    Sputtering.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return false;
        }
        var range = data.skillEff.effArr[0];
        var damagePer = data.skillEff.effArr[1];
        data.defender.addAttrChange("sputtering", new ChessBuff_1.AttrChangeInfo({ range: range, damagePer: damagePer }));
        return true;
    };
    return Sputtering;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.Sputtering = Sputtering;

cc._RF.pop();