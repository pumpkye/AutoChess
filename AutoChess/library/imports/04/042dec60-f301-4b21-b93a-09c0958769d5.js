"use strict";
cc._RF.push(module, '042dexg8wFLIbk6CcCVh2nV', 'ChessSkill');
// Script/AutoBattle/Model/ChessSkill.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EffectInfo_1 = require("./EffectInfo");
var AutoBattleConfig_1 = require("../Config/AutoBattleConfig");
var InitSkillEffect_1 = require("../SkillEffect/InitSkillEffect");
var SkillEffectEnum_1 = require("../SkillEffect/SkillEffectEnum");
var SkillBaseData_1 = require("../TbxModel/SkillBaseData");
var SkillLevelData_1 = require("../TbxModel/SkillLevelData");
var AutoBattleManager_1 = require("../AutoBattleManager");
var Printer_1 = require("../OutPut/Printer");
var Util_1 = require("../Util");
var ChessBuff_1 = require("./ChessBuff");
var SkillType;
(function (SkillType) {
    /**
     * 普攻技能
     */
    SkillType[SkillType["normal"] = 0] = "normal";
    /**
     * 主动技能
     */
    SkillType[SkillType["active"] = 1] = "active";
    /**
     * 被动技能
     */
    SkillType[SkillType["passive"] = 2] = "passive";
    /**
     * 种族技能
     */
    SkillType[SkillType["race"] = 3] = "race";
    /**
     * 职业技能
     */
    SkillType[SkillType["career"] = 4] = "career";
})(SkillType || (SkillType = {}));
/**
 * 技能目标类型
 */
var SkillTargetType;
(function (SkillTargetType) {
    SkillTargetType[SkillTargetType["enemy"] = 0] = "enemy";
    SkillTargetType[SkillTargetType["myself"] = 1] = "myself";
    SkillTargetType[SkillTargetType["friend"] = 2] = "friend";
    /**
     * 当前方向
     */
    SkillTargetType[SkillTargetType["dir"] = 3] = "dir";
    /**
     * 目标地点
     */
    SkillTargetType[SkillTargetType["point"] = 4] = "point";
    /**
     * 敌方最高星
     */
    SkillTargetType[SkillTargetType["enemyHighLevel"] = 5] = "enemyHighLevel";
    /**
     * 己方最低血量
     */
    SkillTargetType[SkillTargetType["friendLowHp"] = 6] = "friendLowHp";
    /**
     * 己方同职业
     */
    SkillTargetType[SkillTargetType["friendCareer"] = 11] = "friendCareer";
    /**
     * 己方同种族
     */
    SkillTargetType[SkillTargetType["friendRace"] = 12] = "friendRace";
    /**
     * 己方所有
     */
    SkillTargetType[SkillTargetType["friendAll"] = 13] = "friendAll";
    /**
     * 对方所有
     */
    SkillTargetType[SkillTargetType["enemyAll"] = 14] = "enemyAll";
    /**
     * 场上所有
     */
    SkillTargetType[SkillTargetType["all"] = 15] = "all";
})(SkillTargetType || (SkillTargetType = {}));
var ChessSkill = /** @class */ (function () {
    function ChessSkill(skillId, level) {
        this.initSuccess = false;
        this.curCdTime = 0;
        this.maxCdTime = 0;
        this.maxGcdTime = 0;
        this.targetType = 0;
        this.range = 0;
        this.mpCost = 0;
        this.id = skillId;
        this.baseData = new SkillBaseData_1.SkillBaseData(skillId);
        this.levelData = new SkillLevelData_1.skillLevelData(skillId * 100 + level);
        this.skillEff = new EffectInfo_1.EffectInfo();
        this.skillEff.initByStr(this.levelData.status);
        this.maxCdTime = this.levelData.cd;
        this.maxGcdTime = this.baseData.gcd;
        this.mpCost = this.levelData.mp;
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.initSkill, { skillName: this.baseData.name });
    }
    ChessSkill.prototype.play = function (attacker, defender) {
        if (!attacker || attacker.isDead) {
            return;
        }
        switch (this.baseData.targetType) {
            case SkillTargetType.enemy:
                if (!defender || defender.isDead || defender.hasBuffState(SkillEffectEnum_1.BuffAndDotState.bkb)
                    || !Util_1.g_Util.checkPosShortInRange(attacker.posX, attacker.posY, defender.posX, defender.posY, this.levelData.range)) {
                    if (defender && defender.hasBuffState(SkillEffectEnum_1.BuffAndDotState.bkb)) {
                        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.bkb, { defender: defender });
                    }
                    return;
                }
                break;
            case SkillTargetType.myself:
                defender = attacker;
                break;
            case SkillTargetType.dir:
                break;
            case SkillTargetType.enemyHighLevel:
                break;
            default:
                break;
        }
        attacker.mp = attacker.mp - this.mpCost;
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.playSkill, { attacker: attacker, defender: defender, skillName: this.baseData.name });
        var effId = this.skillEff.effId;
        var effData = new EffectInfo_1.EffData(this.skillEff, attacker, defender);
        InitSkillEffect_1.skillEffects[effId].play(effData);
        this.startCD(attacker);
    };
    ChessSkill.prototype.update = function (dt) {
        if (this.curCdTime > 0) {
            this.curCdTime = this.curCdTime - dt;
            if (this.curCdTime < 0) {
                this.curCdTime = 0;
            }
        }
    };
    ChessSkill.prototype.startCD = function (attacker) {
        var reduceCdInfo = attacker.getAttrChange("reduceCD");
        var maxTime = this.maxCdTime;
        if (reduceCdInfo && reduceCdInfo.length > 0) {
            for (var i = 0; i < reduceCdInfo.length; i++) {
                var per = reduceCdInfo[i].info;
                maxTime = maxTime * (100 - per) / 100;
            }
        }
        this.curCdTime = Math.floor(maxTime);
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.cdTime, { skillName: this.baseData.name, cd: this.curCdTime });
    };
    Object.defineProperty(ChessSkill.prototype, "isActive", {
        get: function () {
            return this.baseData.type == SkillType.normal || this.baseData.type == SkillType.active;
        },
        enumerable: true,
        configurable: true
    });
    return ChessSkill;
}());
exports.ChessSkill = ChessSkill;
/**
 * status: "effId,damageType"
 */
var NormalSkill = /** @class */ (function (_super) {
    __extends(NormalSkill, _super);
    function NormalSkill(skillId, npc) {
        var _this = _super.call(this, skillId, 1) || this;
        _this.refreshAttr(npc);
        return _this;
    }
    /**
     * 对于普攻附加的操作在这里处理
     * @param attacker 攻击者
     * @param defender 被攻击者
     */
    NormalSkill.prototype.play = function (attacker, defender) {
        if (attacker.hasBuffState(SkillEffectEnum_1.BuffAndDotState.beDisarm)) {
            return;
        }
        this.refreshAttr(attacker);
        if (!defender || defender.isDead
            || !Util_1.g_Util.checkPosShortInRange(attacker.posX, attacker.posY, attacker.curTarget.posX, attacker.curTarget.posY, attacker.attRange)) {
            return;
        }
        var effId = this.skillEff.effId;
        var damage = attacker.damage;
        var damageType = this.skillEff.effArr[1];
        //是否miss
        var missInfos = defender.getAttrChange("miss");
        if (missInfos && missInfos.length > 0) {
            for (var i = 0; i < missInfos.length; i++) {
                var info = missInfos[i];
                var rad = AutoBattleManager_1.g_AutoBattleManager.getRandomNumber(100);
                if (rad <= info.info) {
                    this.startCD();
                    Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.miss, { attacker: attacker, defender: defender });
                    return 0;
                }
            }
        }
        //是否添加折光添加伤害
        var addDamageShieldInfo = attacker.getShieldState("AddDamageShield");
        if (addDamageShieldInfo && addDamageShieldInfo.length > 0) {
            Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.addDamage, { des: "pre", damage: damage });
            for (var i = 0; i < addDamageShieldInfo.length; i++) {
                var shield = addDamageShieldInfo[i];
                var arg = { damage: damage };
                shield.doShieldEffect(arg);
                damage = arg.damage;
            }
            Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.addDamage, { des: "after", damage: damage });
        }
        //判断是否暴击
        var critInfos = attacker.getAttrChange("crit");
        if (critInfos && critInfos.length > 0) {
            var tempDamage = damage;
            for (var i = 0; i < critInfos.length; i++) {
                var info = critInfos[i];
                var rad = AutoBattleManager_1.g_AutoBattleManager.getRandomNumber(100);
                if (rad <= info.info.per) {
                    damage = Math.max(damage, tempDamage * info.info.mul / 100);
                }
            }
            if (damage > attacker.damage) {
                Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.crit, { npc: attacker, damage: damage });
                //暴击是否触发了沉默
                var silentInfos = attacker.getAttrChange("critSilent");
                if (silentInfos && silentInfos.length > 0) {
                    var buff = new ChessBuff_1.ChessBuff(silentInfos[0].info, 0, defender, null, SkillEffectEnum_1.BuffAndDotState.silent);
                    defender.addBuff(buff);
                    Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.critSilent, { attacker: attacker, defender: defender, time: silentInfos[0].info });
                }
                //血之祭祀的血量回复
                var bloodInfos = attacker.getAttrChange("bloodSacrifice");
                if (bloodInfos && bloodInfos.length > 0) {
                    for (var i = 0; i < bloodInfos.length; i++) {
                        var info = bloodInfos[i].info;
                        var recoverHp = damage * info / 100;
                        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.bloodSacrificeRecoverHp, { hp: recoverHp });
                        attacker.reduceHp(-recoverHp);
                    }
                }
            }
        }
        var effInfo = new EffectInfo_1.EffectInfo();
        effInfo.init(effId, [damage, damageType]);
        var effData = new EffectInfo_1.EffData(effInfo, attacker, defender);
        var rDamage = InitSkillEffect_1.skillEffects[effId].play(effData);
        //附加溅射
        var sputterInfo = attacker.getAttrChange("sputtering");
        if (sputterInfo && sputterInfo.length > 0) {
            for (var i = 0; i < sputterInfo.length; i++) {
                var info = sputterInfo[i].info;
                var damage_1 = Math.floor(rDamage * info.damagePer / 100);
                var hitList = InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage].getRandomNpc(AutoBattleManager_1.g_AutoBattleManager.getEnemyList(attacker), 100, info.range, defender.getPosition());
                var effInfo_1 = new EffectInfo_1.EffectInfo();
                effInfo_1.init(SkillEffectEnum_1.SkillEffectEnum.damage, [damage_1, damageType]);
                for (var j = 0; j < hitList.length; j++) {
                    var npc = hitList[j];
                    if (npc.thisId != defender.thisId) {
                        var effData_1 = new EffectInfo_1.EffData(effInfo_1, attacker, npc);
                        InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage].play(effData_1);
                    }
                }
            }
        }
        //嗜血之矛附加伤害
        var bloodthirstySpearInfo = attacker.getAttrChange("bloodthirstySpear");
        if (bloodthirstySpearInfo && bloodthirstySpearInfo.length > 0) {
            var info = bloodthirstySpearInfo[0].info;
            attacker.reduceHp(info.hpReduce);
            var effInfo_2 = new EffectInfo_1.EffectInfo();
            effInfo_2.init(SkillEffectEnum_1.SkillEffectEnum.bloodthirstySpearBuff, [info.damage]);
            var effData_2 = new EffectInfo_1.EffData(effInfo_2, attacker, defender);
            var buff = new ChessBuff_1.ChessBuff(info.lifeTime, 1000, defender, effData_2);
            defender.addBuff(buff);
        }
        //是否有manaBurn效果
        var manaBurnInfo = attacker.getAttrChange("manaBurn");
        if (manaBurnInfo && manaBurnInfo.length > 0) {
            var info = manaBurnInfo[0].info;
            var mp = Math.min(info.mana, defender.mp);
            defender.mp = defender.mp - mp;
            var damage_2 = mp * info.damagePer / 100;
            var effInfo_3 = new EffectInfo_1.EffectInfo();
            effInfo_3.init(SkillEffectEnum_1.SkillEffectEnum.damage, [damage_2, SkillEffectEnum_1.DamageType.real]);
            var effData_3 = new EffectInfo_1.EffData(effInfo_3, attacker, defender);
            var rDamage_1 = InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage].play(effData_3);
        }
        this.startCD();
    };
    NormalSkill.prototype.startCD = function () {
        this.curCdTime = this.maxCdTime;
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.cdTime, { skillName: this.baseData.name, cd: this.curCdTime });
    };
    /**
     * 根据npc的数值更新普攻的数值
     */
    NormalSkill.prototype.refreshAttr = function (npc) {
        var attSpeed = npc.attSpeed;
        if (attSpeed <= 0) {
            attSpeed = 1;
        }
        this.maxCdTime = Math.floor(100.0 * AutoBattleConfig_1.ATTACK_BASE_TIME / npc.attSpeed * 1000);
        this.maxGcdTime = this.maxCdTime;
        this.range = npc.attRange;
    };
    return NormalSkill;
}(ChessSkill));
exports.NormalSkill = NormalSkill;
var RaceSkill = /** @class */ (function (_super) {
    __extends(RaceSkill, _super);
    function RaceSkill(skillId, race, isTeamA) {
        var _this = _super.call(this, skillId, 1) || this;
        _this.race = 0;
        _this.isTeamA = false;
        _this.race = race;
        _this.isTeamA = isTeamA;
        return _this;
    }
    RaceSkill.prototype.play = function () {
        Printer_1.printDefault("play race skill");
        var effId = this.skillEff.effId;
        var effData = new EffectInfo_1.EffData(this.skillEff);
        effData.race = this.race;
        var npcList;
        switch (this.baseData.targetType) {
            case SkillTargetType.friendRace:
                Printer_1.printDefault("己方同种族" + this.race);
                npcList = this.isTeamA ? AutoBattleManager_1.g_AutoBattleManager.npcListA : AutoBattleManager_1.g_AutoBattleManager.npcListB;
                for (var i = 0; i < npcList.length; i++) {
                    var npc = npcList[i];
                    if (npc.race == this.race) {
                        effData.defender = npc;
                        InitSkillEffect_1.skillEffects[effId].play(effData);
                    }
                }
                break;
            case SkillTargetType.enemyAll:
                npcList = this.isTeamA ? AutoBattleManager_1.g_AutoBattleManager.npcListB : AutoBattleManager_1.g_AutoBattleManager.npcListA;
                for (var i = 0; i < npcList.length; i++) {
                    var npc = npcList[i];
                    effData.defender = npc;
                    InitSkillEffect_1.skillEffects[effId].play(effData);
                }
                break;
            case SkillTargetType.friendAll:
                npcList = this.isTeamA ? AutoBattleManager_1.g_AutoBattleManager.npcListA : AutoBattleManager_1.g_AutoBattleManager.npcListB;
                for (var i = 0; i < npcList.length; i++) {
                    var npc = npcList[i];
                    effData.defender = npc;
                    InitSkillEffect_1.skillEffects[effId].play(effData);
                }
                break;
            default:
                break;
        }
    };
    return RaceSkill;
}(ChessSkill));
exports.RaceSkill = RaceSkill;
var CareerSkill = /** @class */ (function (_super) {
    __extends(CareerSkill, _super);
    function CareerSkill(skillId, career, isTeamA) {
        var _this = _super.call(this, skillId, 1) || this;
        _this.career = 0;
        _this.isTeamA = false;
        _this.career = Number(career);
        _this.isTeamA = isTeamA;
        return _this;
    }
    CareerSkill.prototype.play = function () {
        var effId = this.skillEff.effId;
        var effData = new EffectInfo_1.EffData(this.skillEff);
        effData.career = this.career;
        var npcList;
        switch (this.baseData.targetType) {
            case SkillTargetType.friendCareer:
                npcList = this.isTeamA ? AutoBattleManager_1.g_AutoBattleManager.npcListA : AutoBattleManager_1.g_AutoBattleManager.npcListB;
                for (var i = 0; i < npcList.length; i++) {
                    var npc = npcList[i];
                    if (npc.career == this.career) {
                        effData.defender = npc;
                        InitSkillEffect_1.skillEffects[effId].play(effData);
                    }
                }
                break;
            case SkillTargetType.enemyAll:
                npcList = this.isTeamA ? AutoBattleManager_1.g_AutoBattleManager.npcListB : AutoBattleManager_1.g_AutoBattleManager.npcListA;
                for (var i = 0; i < npcList.length; i++) {
                    var npc = npcList[i];
                    effData.defender = npc;
                    InitSkillEffect_1.skillEffects[effId].play(effData);
                }
                break;
            case SkillTargetType.friendAll:
                npcList = this.isTeamA ? AutoBattleManager_1.g_AutoBattleManager.npcListA : AutoBattleManager_1.g_AutoBattleManager.npcListB;
                for (var i = 0; i < npcList.length; i++) {
                    var npc = npcList[i];
                    effData.defender = npc;
                    InitSkillEffect_1.skillEffects[effId].play(effData);
                }
                break;
            default:
                break;
        }
    };
    return CareerSkill;
}(ChessSkill));
exports.CareerSkill = CareerSkill;

cc._RF.pop();