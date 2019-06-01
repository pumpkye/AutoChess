"use strict";
cc._RF.push(module, '2bb9ePP1RFIO6VkCJxl/nM1', 'MagicRing');
// Script/AutoBattle/SkillEffect/MagicRing.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var EffectInfo_1 = require("../Model/EffectInfo");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 奥术光环，每[0]秒为所有友军回复[1]点魔法
 */
var MagicRing = /** @class */ (function (_super) {
    __extends(MagicRing, _super);
    function MagicRing() {
        return _super.call(this) || this;
    }
    Object.defineProperty(MagicRing.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.magicRing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MagicRing.prototype, "effName", {
        get: function () {
            return "magicRing";
        },
        enumerable: true,
        configurable: true
    });
    MagicRing.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var deltaTime = data.skillEff.effArr[0];
        var mp = data.skillEff.effArr[1];
        var effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.recoverMpRange, [mp]);
        var effectData = new EffectInfo_1.EffData(effInfo, data.defender);
        var buff = new ChessBuff_1.ChessBuff(0, deltaTime, data.defender, effectData);
        data.defender.addBuff(buff);
        return true;
    };
    return MagicRing;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.MagicRing = MagicRing;

cc._RF.pop();