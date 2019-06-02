(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/SkillEffectEnum.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fdec3YHM+NKwIncYiyMotIK', 'SkillEffectEnum', __filename);
// Script/AutoBattle/SkillEffect/SkillEffectEnum.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SkillEffectEnum;
(function (SkillEffectEnum) {
    SkillEffectEnum[SkillEffectEnum["baseEffect"] = 0] = "baseEffect";
    /**
     * 对目标造成[0]点[1{1：普通，2：魔法，3：纯粹}]类型伤害
     */
    SkillEffectEnum[SkillEffectEnum["damage"] = 1] = "damage";
    /**
     * 一条线伤害
     */
    SkillEffectEnum[SkillEffectEnum["lineDamage"] = 2] = "lineDamage";
    /**
     * 以目标为中心,对[0]范围内[1]个目标造成[2]点魔法伤害
     */
    SkillEffectEnum[SkillEffectEnum["circleDamage"] = 3] = "circleDamage";
    /**
     * 增加护甲[0]点，持续[1]秒
     */
    SkillEffectEnum[SkillEffectEnum["addDefence"] = 4] = "addDefence";
    /**
     * 增加魔抗[0]点，持续[1]秒
     */
    SkillEffectEnum[SkillEffectEnum["addMDefence"] = 5] = "addMDefence";
    /**
     * 增加生命值[0]点，持续[1]秒
     */
    SkillEffectEnum[SkillEffectEnum["addMaxHp"] = 6] = "addMaxHp";
    /**
     * 增加攻击力[0]点，持续[1]秒
     */
    SkillEffectEnum[SkillEffectEnum["addDamage"] = 7] = "addDamage";
    /**
     * 减少技能cd[0]%
     */
    SkillEffectEnum[SkillEffectEnum["reduceCd"] = 8] = "reduceCd";
    /**
     * 降低回蓝速度（包含各种途径的回蓝）[0]%
     */
    SkillEffectEnum[SkillEffectEnum["reduceGetMana"] = 9] = "reduceGetMana";
    /**
     * 增加回血每[0]秒[1]点，持续[2]秒
     */
    SkillEffectEnum[SkillEffectEnum["recoverHp"] = 10] = "recoverHp";
    /**
     * 增加攻速[0]点,持续[1]秒
     */
    SkillEffectEnum[SkillEffectEnum["addAttackSpeed"] = 11] = "addAttackSpeed";
    /**
     * 嘲讽，使得周围[0]范围内的所有目标强制攻击自己[1]秒,同时提升自己的护甲[2]点
     */
    SkillEffectEnum[SkillEffectEnum["sneer"] = 12] = "sneer";
    /**
     * 旋风斩，以自己为中心，[0]范围内，每[1]秒造成[2]点伤害，持续[3]秒
     */
    SkillEffectEnum[SkillEffectEnum["swordStorm"] = 13] = "swordStorm";
    /**
     * 治疗链，对己方[0]个血量最低的单位回复[1]%的血量
     */
    SkillEffectEnum[SkillEffectEnum["chainHeal"] = 14] = "chainHeal";
    /**
     * 闪电链，对目标和周边[0]格的单位造成[1]点伤害，并在随后的[2]秒时间内沉默被击中的目标
     */
    SkillEffectEnum[SkillEffectEnum["chainLightning"] = 15] = "chainLightning";
    /**
     * 撕裂，降低目标[0]点攻速，并造成每[1]秒[2]点伤害，持续[3]秒
     */
    SkillEffectEnum[SkillEffectEnum["tear"] = 16] = "tear";
    /**
     * 横扫，对目标造成[0]倍普通攻击的物理伤害，对目标周围[1]格的目标造成[2]倍普通攻击的物理伤害
     */
    SkillEffectEnum[SkillEffectEnum["sweep"] = 17] = "sweep";
    /**
     * 咆哮，对周围[0]格目标造成眩晕，持续[1]秒
     */
    SkillEffectEnum[SkillEffectEnum["roar"] = 18] = "roar";
    /**
     * 普通攻击有[0]几率造成[1]%的暴击伤害
     */
    SkillEffectEnum[SkillEffectEnum["crit"] = 19] = "crit";
    /**
     * 增加[0]%攻击力,持续[1]秒
     */
    SkillEffectEnum[SkillEffectEnum["mulDamage"] = 20] = "mulDamage";
    /**
     * 战吼，使得自己和周围[0]格单位受到的伤害减少[1]%,持续[2]秒
     */
    SkillEffectEnum[SkillEffectEnum["warCry"] = 21] = "warCry";
    /**
     * 闷棍，使目标眩晕[0]秒
     */
    SkillEffectEnum[SkillEffectEnum["bang"] = 22] = "bang";
    /**
     * 奥术光环，每[0]秒为所有友军回复[1]点魔法
     */
    SkillEffectEnum[SkillEffectEnum["magicRing"] = 23] = "magicRing";
    /**
     * 为周围单位回复[0]点魔法
     */
    SkillEffectEnum[SkillEffectEnum["recoverMpRange"] = 24] = "recoverMpRange";
    /**
     * 暴击时触发效果，沉默当前目标[0]秒
     */
    SkillEffectEnum[SkillEffectEnum["critSilent"] = 25] = "critSilent";
    /**
     * 法力燃烧，每次普攻都会削减目标[0]点魔法，并且造成削减魔法量[1]%的伤害
     */
    SkillEffectEnum[SkillEffectEnum["manaBurn"] = 26] = "manaBurn";
    /**
     * 放逐，使当前目标无法攻击，也不会受到物理伤害，但是受到[0]%的魔法伤害，持续[1]秒
     */
    SkillEffectEnum[SkillEffectEnum["banish"] = 27] = "banish";
    /**
     *天神下凡，获得技能免疫，增加额外的血量[0]点，攻击力[1]点，护甲[2]点，魔抗[3]点，攻速[4]点
     */
    SkillEffectEnum[SkillEffectEnum["godAvatar"] = 28] = "godAvatar";
    /**
     * 雷霆一击, 对周围[0]格单位造成[1]点伤害，并降低[2]点攻速，持续[3]秒
     */
    SkillEffectEnum[SkillEffectEnum["thunderClap"] = 29] = "thunderClap";
    /**
     * 折光，接下来的[0]次攻击增加[1]点伤害，并免疫接下来的[2]次攻击,持续[3]秒
     */
    SkillEffectEnum[SkillEffectEnum["refraction"] = 30] = "refraction";
    /**
     * 闪光弹，使敌方目标短暂致盲，所有友军有[0]%的概率闪避攻击，持续[1]秒
     */
    SkillEffectEnum[SkillEffectEnum["flashBoom"] = 31] = "flashBoom";
    /**
     * 战争狂热，损失的生命值会提升巨魔的攻速和魔法抗性，每百分之一的血量损失提供[0]的攻速提升和[1]的魔抗
     */
    SkillEffectEnum[SkillEffectEnum["warFever"] = 32] = "warFever";
    /**
     * 嗜血之矛,每次攻击时消耗自身[0]点生命值，对目标造成每秒[1]点纯粹伤害，持续[2]秒，该伤害可以叠加，该伤害生效时会为自己恢复生命值
     */
    SkillEffectEnum[SkillEffectEnum["bloodthirstySpear"] = 33] = "bloodthirstySpear";
    /**
     * 嗜血之矛debuff，每秒造成[1]点纯粹伤害，并为攻击者回复同等血量
     */
    SkillEffectEnum[SkillEffectEnum["bloodthirstySpearBuff"] = 34] = "bloodthirstySpearBuff";
    /**
     * 对当前目标造成最大生命值[0]%的伤害，同时对自己造成最大生命值[1]%的伤害，并获得一个buff:触发暴击时恢复伤害[2]%的血量，持续时间[3]秒
     */
    SkillEffectEnum[SkillEffectEnum["bloodSacrifice"] = 35] = "bloodSacrifice";
    /**
     * boom，死亡时造成范围伤害并眩晕[0]秒，伤害数值为其之前造成的伤害的[1]%，该伤害结算会在该单位死亡之前
     */
    SkillEffectEnum[SkillEffectEnum["boom"] = 36] = "boom";
    /**
     * 增加状态抗性[0]%,增加回血每[1]秒[2]点
     */
    SkillEffectEnum[SkillEffectEnum["tenacity"] = 37] = "tenacity";
    /**
     * 召唤npcId为[0]的npc，召唤[1]个
     */
    SkillEffectEnum[SkillEffectEnum["summon"] = 38] = "summon";
    /**
     * 溅射，对目标周围[0]格单位造成[1]%伤害
     */
    SkillEffectEnum[SkillEffectEnum["sputtering"] = 39] = "sputtering";
    /**
     * 炎爆，对目标和周围[0]格单位造成[1]点伤害
     */
    SkillEffectEnum[SkillEffectEnum["bigFireBall"] = 40] = "bigFireBall";
})(SkillEffectEnum = exports.SkillEffectEnum || (exports.SkillEffectEnum = {}));
var BuffAndDotState;
(function (BuffAndDotState) {
    /**
     * 技能免疫
     */
    BuffAndDotState[BuffAndDotState["bkb"] = 0] = "bkb";
    /**
     * 眩晕
     */
    BuffAndDotState[BuffAndDotState["coma"] = 1] = "coma";
    /**
     * 被缴械
     */
    BuffAndDotState[BuffAndDotState["beDisarm"] = 2] = "beDisarm";
    /**
     * 被沉默
     */
    BuffAndDotState[BuffAndDotState["silent"] = 3] = "silent";
    /**
     * 减甲
     */
    BuffAndDotState[BuffAndDotState["dengdengdeng"] = 4] = "dengdengdeng";
    /**
     * 被缠绕
     */
    BuffAndDotState[BuffAndDotState["beTwine"] = 5] = "beTwine";
    /**
     * 溅射
     */
    BuffAndDotState[BuffAndDotState["sputtering"] = 6] = "sputtering";
    /**
     * 被嘲讽
     */
    BuffAndDotState[BuffAndDotState["beSneer"] = 7] = "beSneer";
    /**
     * 被放逐，无法攻击，但也不会受到物理攻击
     */
    BuffAndDotState[BuffAndDotState["beBanish"] = 8] = "beBanish";
})(BuffAndDotState = exports.BuffAndDotState || (exports.BuffAndDotState = {}));
/**
 * 负面状态列表
 */
var DebuffState;
(function (DebuffState) {
    /**
     * 眩晕
     */
    DebuffState[DebuffState["coma"] = 1] = "coma";
    /**
     * 被缴械
     */
    DebuffState[DebuffState["beDisarm"] = 2] = "beDisarm";
    /**
     * 被沉默
     */
    DebuffState[DebuffState["silent"] = 3] = "silent";
    /**
     * 减甲
     */
    DebuffState[DebuffState["dengdengdeng"] = 4] = "dengdengdeng";
    /**
     * 被缠绕
     */
    DebuffState[DebuffState["beTwine"] = 5] = "beTwine";
    /**
     * 溅射
     */
    DebuffState[DebuffState["sputtering"] = 6] = "sputtering";
    /**
     * 被嘲讽
     */
    DebuffState[DebuffState["beSneer"] = 7] = "beSneer";
    /**
     * 被放逐，无法攻击，但也不会受到物理攻击
     */
    DebuffState[DebuffState["beBanish"] = 8] = "beBanish";
})(DebuffState = exports.DebuffState || (exports.DebuffState = {}));
var DamageType;
(function (DamageType) {
    /**
     * 物理伤害
     */
    DamageType[DamageType["normal"] = 1] = "normal";
    /**
     * 魔法伤害
     */
    DamageType[DamageType["magic"] = 2] = "magic";
    /**
     * 真实伤害
     */
    DamageType[DamageType["real"] = 3] = "real";
})(DamageType = exports.DamageType || (exports.DamageType = {}));

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
        //# sourceMappingURL=SkillEffectEnum.js.map
        