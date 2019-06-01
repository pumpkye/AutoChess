"use strict";
cc._RF.push(module, 'cd9aeyGBNJGi7C0mEEtweDc', 'Sweep');
// Script/AutoBattle/SkillEffect/Sweep.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var EffectInfo_1 = require("../Model/EffectInfo");
var InitSkillEffect_1 = require("./InitSkillEffect");
var AutoBattleManager_1 = require("../AutoBattleManager");
/**
 * 横扫，对目标造成[0]倍普通攻击的物理伤害，对目标周围[1]格的目标造成[2]倍普通攻击的物理伤害
 */
var Sweep = /** @class */ (function (_super) {
    __extends(Sweep, _super);
    function Sweep() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Sweep.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.sweep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sweep.prototype, "effName", {
        get: function () {
            return "sweep";
        },
        enumerable: true,
        configurable: true
    });
    Sweep.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var per1 = data.skillEff.effArr[0];
        var range = data.skillEff.effArr[1];
        var per2 = data.skillEff.effArr[2];
        var damage1 = data.attacker.damage * per1;
        var damage2 = data.attacker.damage * per2;
        var effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.damage, [damage1, SkillEffectEnum_1.DamageType.normal]);
        var effData = new EffectInfo_1.EffData(effInfo, data.attacker, data.defender);
        InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage].play(effData);
        effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(SkillEffectEnum_1.SkillEffectEnum.damage, [damage2, SkillEffectEnum_1.DamageType.normal]);
        var hitNpc = this.getRandomNpc(AutoBattleManager_1.g_AutoBattleManager.getEnemyList(data.attacker), 100, range, { x: data.defender.posX, y: data.defender.posY });
        for (var i = 0; i < hitNpc.length; i++) {
            var defender = hitNpc[i];
            if (defender.thisId != data.defender.thisId) {
                var effData_1 = new EffectInfo_1.EffData(effInfo, data.attacker, defender);
                InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage].play(effData_1);
            }
        }
        return true;
    };
    return Sweep;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.Sweep = Sweep;

cc._RF.pop();