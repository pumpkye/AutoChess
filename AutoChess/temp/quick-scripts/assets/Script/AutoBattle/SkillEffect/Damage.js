(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/Damage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '58383FV+2JBEbdnadNNwFez', 'Damage', __filename);
// Script/AutoBattle/SkillEffect/Damage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var AutoBattleConfig_1 = require("../Config/AutoBattleConfig");
var Printer_1 = require("../OutPut/Printer");
var AutoBattleManager_1 = require("../AutoBattleManager");
/**
 * 对目标造成[0]点[1{1：普通，2：魔法，3：纯粹}]类型伤害
 */
var Damage = /** @class */ (function (_super) {
    __extends(Damage, _super);
    function Damage() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Damage.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.damage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Damage.prototype, "effName", {
        get: function () {
            return "point damage";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * play
     */
    Damage.prototype.play = function (data) {
        var attacker = data.attacker;
        var defender = data.defender;
        if (!attacker || !defender || defender.isDead) {
            return;
        }
        var rDamage = 0;
        var skillEff = data.skillEff;
        var damage = skillEff.effArr[0];
        var damageType = skillEff.effArr[1];
        switch (damageType) {
            case SkillEffectEnum_1.DamageType.normal:
                var flag = 1;
                if (defender.defence < 0) {
                    flag = -1;
                }
                var defence = Math.abs(defender.defence);
                var per = 1 - flag * AutoBattleConfig_1.damageK.k1 * defence / (AutoBattleConfig_1.damageK.k2 + AutoBattleConfig_1.damageK.k3 * defence);
                rDamage = damage * per;
                break;
            case SkillEffectEnum_1.DamageType.magic:
                rDamage = damage * (100 - defender.mDefence) / 100.0;
                break;
            case SkillEffectEnum_1.DamageType.real:
                rDamage = damage;
            default:
                break;
        }
        //判定战吼减伤
        var warCryInfo = defender.getAttrChange("warCry");
        if (warCryInfo && warCryInfo.length > 0) {
            var rp = 1;
            for (var i = 0; i < warCryInfo.length; i++) {
                var per = warCryInfo[i].info;
                rp = rp * (100 - per) / 100;
            }
            Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.warCry, { npc: defender, per: rp });
            rDamage = rDamage * rp;
        }
        rDamage = Math.floor(rDamage);
        //被放逐的目标不受物理伤害但是受到额外的魔法伤害
        var banishInfo = defender.getAttrChange("banish");
        if (banishInfo && banishInfo.length > 0) {
            if (damageType == SkillEffectEnum_1.DamageType.normal) {
                rDamage = 0;
            }
            else if (damageType == SkillEffectEnum_1.DamageType.magic) {
                var per = banishInfo[0].info;
                rDamage = rDamage * per / 100;
            }
        }
        //护盾减伤
        if (rDamage > 0) {
            var missDamageInfo = defender.getShieldState("MissDamageShield");
            if (missDamageInfo && missDamageInfo.length > 0) {
                var arg = { damage: rDamage };
                missDamageInfo[0].doShieldEffect(arg);
                rDamage = arg.damage;
            }
        }
        //伤害回蓝
        defender.mp = defender.mp + Math.floor(rDamage / 10);
        if (attacker && !attacker.isDead) {
            attacker.mp = attacker.mp + Math.floor(rDamage / 10);
        }
        //dps统计
        AutoBattleManager_1.g_AutoBattleManager.addDpsInfo(attacker.thisId, attacker.baseId, attacker.isTeamA, rDamage);
        //造成伤害
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.damage, { attacker: attacker, defender: defender, damage: rDamage });
        defender.reduceHp(rDamage);
        // defender.hp = defender.hp - rDamage;
        if (defender.hp <= 0) {
            defender.die();
        }
        return rDamage;
    };
    return Damage;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.Damage = Damage;

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
        //# sourceMappingURL=Damage.js.map
        