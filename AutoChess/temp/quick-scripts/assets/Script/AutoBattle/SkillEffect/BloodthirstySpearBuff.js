(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/BloodthirstySpearBuff.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '444b1ids0dPV6z464l/1pL5', 'BloodthirstySpearBuff', __filename);
// Script/AutoBattle/SkillEffect/BloodthirstySpearBuff.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var EffectInfo_1 = require("../Model/EffectInfo");
var InitSkillEffect_1 = require("./InitSkillEffect");
/**
 *  嗜血之矛debuff，造成[0]点纯粹伤害，并为攻击者回复同等血量
 */
var BloodthirstySpearBuff = /** @class */ (function (_super) {
    __extends(BloodthirstySpearBuff, _super);
    function BloodthirstySpearBuff() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BloodthirstySpearBuff.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.bloodthirstySpearBuff;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BloodthirstySpearBuff.prototype, "effName", {
        get: function () {
            return "bloodthirstySpearBuff";
        },
        enumerable: true,
        configurable: true
    });
    BloodthirstySpearBuff.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return false;
        }
        var effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.damage, [data.skillEff.effArr[0], SkillEffectEnum_1.DamageType.real]);
        var effect = new EffectInfo_1.EffData(effInfo, data.attacker, data.defender);
        InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage].play(effect);
        if (data.attacker && !data.attacker.isDead) {
            data.attacker.reduceHp(-data.skillEff.effArr[0]);
        }
        return true;
    };
    return BloodthirstySpearBuff;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.BloodthirstySpearBuff = BloodthirstySpearBuff;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=BloodthirstySpearBuff.js.map
        