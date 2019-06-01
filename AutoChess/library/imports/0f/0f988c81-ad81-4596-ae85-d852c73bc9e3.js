"use strict";
cc._RF.push(module, '0f988yBrYFFlq6F2FLHO8nj', 'Bang');
// Script/AutoBattle/SkillEffect/Bang.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 闷棍，使目标眩晕[0]秒
 */
var Bang = /** @class */ (function (_super) {
    __extends(Bang, _super);
    function Bang() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Bang.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.bang;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bang.prototype, "effName", {
        get: function () {
            return "bang";
        },
        enumerable: true,
        configurable: true
    });
    Bang.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return false;
        }
        var lifeTime = data.skillEff.effArr[0];
        var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, data.defender, null, SkillEffectEnum_1.BuffAndDotState.coma);
        data.defender.addBuff(buff);
        return true;
    };
    return Bang;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.Bang = Bang;

cc._RF.pop();