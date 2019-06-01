"use strict";
cc._RF.push(module, '1f5ec7eL6dNOIQ/Fy5+t8Rn', 'SwordStorm');
// Script/AutoBattle/SkillEffect/SwordStorm.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var EffectInfo_1 = require("../Model/EffectInfo");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 旋风斩，以自己为中心，[0]范围内，每[1]秒造成[2]点伤害，持续[3]秒，期间自己无法攻击
 */
var SwordStorm = /** @class */ (function (_super) {
    __extends(SwordStorm, _super);
    function SwordStorm() {
        return _super.call(this) || this;
    }
    Object.defineProperty(SwordStorm.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.swordStorm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwordStorm.prototype, "effName", {
        get: function () {
            return "swordStorm";
        },
        enumerable: true,
        configurable: true
    });
    SwordStorm.prototype.play = function (data) {
        var defender = data.defender;
        if (!defender || defender.isDead) {
            return false;
        }
        var skillEff = data.skillEff;
        var range = skillEff.effArr[0];
        var deltaTime = skillEff.effArr[1];
        var damage = skillEff.effArr[2];
        var lifeTime = skillEff.effArr[3];
        //持续造成伤害，持续期间无法普攻
        var effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.circleDamage, [range, 100, damage]);
        var effData = new EffectInfo_1.EffData(effInfo, defender, defender);
        var chessBuff = new ChessBuff_1.ChessBuff(lifeTime, deltaTime, defender, effData, SkillEffectEnum_1.BuffAndDotState.beDisarm);
        defender.addBuff(chessBuff);
        //持续期间魔免
        chessBuff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender, null, SkillEffectEnum_1.BuffAndDotState.bkb);
        defender.addBuff(chessBuff);
        return true;
    };
    return SwordStorm;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.SwordStorm = SwordStorm;

cc._RF.pop();