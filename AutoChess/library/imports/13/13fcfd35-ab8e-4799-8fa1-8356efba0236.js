"use strict";
cc._RF.push(module, '13fcf01q45HmY+hg1bvugI2', 'RecoverHp');
// Script/AutoBattle/SkillEffect/RecoverHp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
/**
 * 回复[0]点血量
 */
var RecoverHp = /** @class */ (function (_super) {
    __extends(RecoverHp, _super);
    function RecoverHp() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RecoverHp.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.recoverHp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecoverHp.prototype, "effName", {
        get: function () {
            return "recoverHp";
        },
        enumerable: true,
        configurable: true
    });
    RecoverHp.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return false;
        }
        data.defender.hp = data.defender.getHp() + data.skillEff.effArr[0];
        return true;
    };
    return RecoverHp;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.RecoverHp = RecoverHp;

cc._RF.pop();