"use strict";
cc._RF.push(module, '9e58cWjP91BE5a1ge6Fbgyx', 'Tear');
// Script/AutoBattle/SkillEffect/Tear.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var EffectInfo_1 = require("../Model/EffectInfo");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 撕裂，降低目标[0]点攻速，并造成每[1]秒[2]点伤害，持续[3]秒
 */
var Tear = /** @class */ (function (_super) {
    __extends(Tear, _super);
    function Tear() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Tear.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.tear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tear.prototype, "effName", {
        get: function () {
            return "tear";
        },
        enumerable: true,
        configurable: true
    });
    Tear.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var attackSpeed = data.skillEff.effArr[0];
        var deltaTime = data.skillEff.effArr[1];
        var damage = data.skillEff.effArr[2];
        var lifeTime = data.skillEff.effArr[3];
        var effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.damage, [damage, SkillEffectEnum_1.DamageType.normal]);
        var effData = new EffectInfo_1.EffData(effInfo, data.attacker, data.defender);
        var buff = new ChessBuff_1.ChessBuff(lifeTime, deltaTime, data.defender, effData);
        buff.setAttrChange("attackSpeed", -attackSpeed);
        data.defender.addBuff(buff);
        return true;
    };
    return Tear;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.Tear = Tear;

cc._RF.pop();