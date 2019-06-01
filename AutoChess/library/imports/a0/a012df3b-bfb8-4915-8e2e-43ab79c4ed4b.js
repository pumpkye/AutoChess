"use strict";
cc._RF.push(module, 'a012d87v7hJFY4uQ6t5xO1L', 'NormalDamage');
// Script/AutoBattle/SkillEffect/NormalDamage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var NormalDamage = /** @class */ (function (_super) {
    __extends(NormalDamage, _super);
    function NormalDamage() {
        return _super.call(this) || this;
    }
    Object.defineProperty(NormalDamage.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.damage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NormalDamage.prototype, "effName", {
        get: function () {
            return "normalDamage";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * play
     */
    NormalDamage.prototype.play = function (data) {
        return true;
    };
    return NormalDamage;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.NormalDamage = NormalDamage;

cc._RF.pop();