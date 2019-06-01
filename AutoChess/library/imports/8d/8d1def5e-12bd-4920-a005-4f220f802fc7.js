"use strict";
cc._RF.push(module, '8d1de9eEr1JIKAFTyIPgC/H', 'ReduceCd');
// Script/AutoBattle/SkillEffect/ReduceCd.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 减少技能cd[0]%
 */
var ReduceCd = /** @class */ (function (_super) {
    __extends(ReduceCd, _super);
    function ReduceCd() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ReduceCd.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.reduceCd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReduceCd.prototype, "effName", {
        get: function () {
            return "reduceCd";
        },
        enumerable: true,
        configurable: true
    });
    ReduceCd.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var reduceCdPercent = data.skillEff.effArr[0];
        defender.addAttrChange("reduceCD", new ChessBuff_1.AttrChangeInfo(reduceCdPercent));
        return true;
    };
    return ReduceCd;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.ReduceCd = ReduceCd;

cc._RF.pop();