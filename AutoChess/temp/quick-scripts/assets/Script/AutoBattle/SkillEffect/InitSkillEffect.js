(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/InitSkillEffect.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6f35eMEnWJJHp5oRLwXOori', 'InitSkillEffect', __filename);
// Script/AutoBattle/SkillEffect/InitSkillEffect.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var Damage_1 = require("./Damage");
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var LineDamage_1 = require("./LineDamage");
var CircleDamage_1 = require("./CircleDamage");
var AddDefence_1 = require("./AddDefence");
var Sneer_1 = require("./Sneer");
var SwordStorm_1 = require("./SwordStorm");
var AddMaxHp_1 = require("./AddMaxHp");
var ChainHeal_1 = require("./ChainHeal");
var ChainLightning_1 = require("./ChainLightning");
var Tear_1 = require("./Tear");
var Sweep_1 = require("./Sweep");
var Roar_1 = require("./Roar");
var Crit_1 = require("./Crit");
var MulDamage_1 = require("./MulDamage");
var WarCry_1 = require("./WarCry");
var Bang_1 = require("./Bang");
var RecoverMpRange_1 = require("./RecoverMpRange");
var MagicRing_1 = require("./MagicRing");
var CritSilent_1 = require("./CritSilent");
var ManaBurn_1 = require("./ManaBurn");
var Banish_1 = require("./Banish");
var ThunderClap_1 = require("./ThunderClap");
var GodAvatar_1 = require("./GodAvatar");
var FlashBoom_1 = require("./FlashBoom");
var WarFever_1 = require("./WarFever");
var BloodthirstySpear_1 = require("./BloodthirstySpear");
var BloodthirstySpearBuff_1 = require("./BloodthirstySpearBuff");
var BloodSacrifice_1 = require("./BloodSacrifice");
var Boom_1 = require("./Boom");
var AddMDefence_1 = require("./AddMDefence");
var ReduceCd_1 = require("./ReduceCd");
var AddAttackSpeed_1 = require("./AddAttackSpeed");
var Tenacity_1 = require("./Tenacity");
var RecoverHp_1 = require("./RecoverHp");
var Summon_1 = require("./Summon");
var Sputtering_1 = require("./Sputtering");
var Refraction_1 = require("./Refraction");
var BigFireBall_1 = require("./BigFireBall");
exports.skillEffects = new Array();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.baseEffect] = new BaseSkillEffect_1.BaseSkillEffect();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage] = new Damage_1.Damage();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.circleDamage] = new CircleDamage_1.CircleDamage();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.lineDamage] = new LineDamage_1.LineDamage();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.addDefence] = new AddDefence_1.AddDefence();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.addMDefence] = new AddMDefence_1.AddMDefence();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.reduceCd] = new ReduceCd_1.ReduceCd();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.addAttackSpeed] = new AddAttackSpeed_1.AddAttackSpeed();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.sneer] = new Sneer_1.Sneer();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.swordStorm] = new SwordStorm_1.SwordStorm();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.addMaxHp] = new AddMaxHp_1.AddMaxHp();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.chainHeal] = new ChainHeal_1.ChainHeal();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.chainLightning] = new ChainLightning_1.ChainLightning();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.tear] = new Tear_1.Tear();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.sweep] = new Sweep_1.Sweep();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.roar] = new Roar_1.Roar();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.crit] = new Crit_1.Crit();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.mulDamage] = new MulDamage_1.MulDamage();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.warCry] = new WarCry_1.WarCry();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.bang] = new Bang_1.Bang();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.recoverMpRange] = new RecoverMpRange_1.RecoverMpRange();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.magicRing] = new MagicRing_1.MagicRing();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.critSilent] = new CritSilent_1.CritSilent();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.manaBurn] = new ManaBurn_1.ManaBurn();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.banish] = new Banish_1.Banish();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.thunderClap] = new ThunderClap_1.ThunderClap();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.godAvatar] = new GodAvatar_1.GodAvatar();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.flashBoom] = new FlashBoom_1.FlashBoom();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.warFever] = new WarFever_1.WarFever();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.bloodthirstySpear] = new BloodthirstySpear_1.BloodthirstySpear();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.bloodthirstySpearBuff] = new BloodthirstySpearBuff_1.BloodthirstySpearBuff();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.bloodSacrifice] = new BloodSacrifice_1.BloodSacrifice();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.boom] = new Boom_1.Boom();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.tenacity] = new Tenacity_1.Tenacity();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.recoverHp] = new RecoverHp_1.RecoverHp();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.summon] = new Summon_1.Summon();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.sputtering] = new Sputtering_1.Sputtering();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.refraction] = new Refraction_1.Refraction();
exports.skillEffects[SkillEffectEnum_1.SkillEffectEnum.bigFireBall] = new BigFireBall_1.BigFireBall();

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
        //# sourceMappingURL=InitSkillEffect.js.map
        