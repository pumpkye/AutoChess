"use strict";
cc._RF.push(module, '8bf6eNrDYhClZxnr11TdHv4', 'ChessNpc');
// Script/AutoBattle/Model/ChessNpc.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ChessNpcBaseData_1 = require("../TbxModel/ChessNpcBaseData");
var ChessBuff_1 = require("./ChessBuff");
var ChessSkill_1 = require("./ChessSkill");
var AutoBattleManager_1 = require("../AutoBattleManager");
var Util_1 = require("../Util");
var AutoBattleConfig_1 = require("../Config/AutoBattleConfig");
var Printer_1 = require("../OutPut/Printer");
var SkillEffectEnum_1 = require("../SkillEffect/SkillEffectEnum");
var EffectInfo_1 = require("./EffectInfo");
var InitSkillEffect_1 = require("../SkillEffect/InitSkillEffect");
/**
 * @author pumpkye
 * @description 棋子
 */
var ChessNpc = /** @class */ (function () {
    function ChessNpc(thisId, baseId, level, teamA) {
        this._lockTime = 0;
        this.dir = 0;
        this._pos = {
            x: 0,
            y: 0,
        };
        this._isDead = false;
        // 数值数据
        this._hp = 0;
        this._maxHp = 0;
        this._mp = 0;
        this._maxMp = 0;
        this._damage = 0;
        this._defence = 0;
        this._mDefence = 0;
        this._attSpeed = 0;
        this._attRange = 0;
        this._speed = 0;
        this._mvSpeed = 0;
        this._level = 1;
        this._moveStep = 0;
        this.thisId = thisId;
        this.baseId = baseId;
        this.teamA = teamA;
        this.baseData = new ChessNpcBaseData_1.ChessNpcBaseData(baseId);
        this._level = level;
        //初始化数值
        this._hp = this.baseHp;
        this._maxHp = this.baseHp;
        this._mp = 0;
        this._maxMp = this.baseMp;
        this._damage = this.baseDamage;
        this._defence = this.baseDefence;
        this._mDefence = this.baseMDefence;
        this._attSpeed = this.baseAttSpeed;
        this._attRange = this.baseAttRange;
        this._speed = this.baseSpeed;
        this._mvSpeed = this.baseMvSpeed;
        this._buffArr = new Array();
        this._buffStateArr = new Array();
        this.hitArrThisId = new Array();
        this._attrChangeMap = {};
        this._shieldMap = {};
    }
    ChessNpc.prototype.update = function (dt) {
        this.updateBuff(dt);
        this.updateSkill(dt);
        if (this._lockTime > 0) {
            this._lockTime = this._lockTime - dt;
            return;
        }
        if (this.hasBuffState(SkillEffectEnum_1.BuffAndDotState.coma)) {
            return;
        }
        this.findTarget();
        this.move();
    };
    ChessNpc.prototype.updateBuff = function (dt) {
        var tempT = new Array();
        for (var i = 0; i < this._buffArr.length; i++) {
            var buff = this._buffArr[i];
            buff.update(dt);
            if (buff.isValid) {
                tempT.push(buff);
            }
        }
        this._buffArr = tempT;
    };
    ChessNpc.prototype.updateSkill = function (dt) {
        for (var i = 0; i < this._skillList.length; i++) {
            var skill = this._skillList[i];
            skill.update(dt);
        }
    };
    ChessNpc.prototype.addBuff = function (buff) {
        this._buffArr.push(buff);
    };
    ChessNpc.prototype.addShield = function (shield) {
        this.addBuff(shield);
        if (!this._shieldMap[shield.name]) {
            this._shieldMap[shield.name] = new Array();
        }
        var infoArr = this._shieldMap[shield.name];
        infoArr.push(shield);
        shield.idx = infoArr.length - 1;
    };
    ChessNpc.prototype.removeShield = function (shield) {
        var infoArr = this._shieldMap[shield.name];
        if (infoArr && infoArr[shield.idx]) {
            for (var i = shield.idx + 1; i < infoArr.length; i++) {
                var element = infoArr[i];
                element.idx = element.idx - 1;
            }
            infoArr.splice(shield.idx, 1);
        }
    };
    ChessNpc.prototype.getShieldState = function (shieldName) {
        return this._shieldMap[shieldName];
    };
    ChessNpc.prototype.findTarget = function () {
        if (this.curTarget && !this.curTarget.isDead) {
            return true;
        }
        this.setTarget(null);
        var dt = 100;
        var target = null;
        for (var i = 0; i < AutoBattleManager_1.g_AutoBattleManager.getEnemyList(this).length; i++) {
            var npc = AutoBattleManager_1.g_AutoBattleManager.getEnemyList(this)[i];
            if (!npc.isDead && Util_1.g_Util.checkPosShortInRange(this.posX, this.posY, npc.posX, npc.posY, this.attRange)) {
                var dis = Util_1.g_Util.getCityDistance(this, npc);
                if (dis < dt) {
                    dt = dis;
                    target = npc;
                }
                else if (dis == dt) {
                    var dy1 = Math.abs(this.posY - target.posY);
                    var dy2 = Math.abs(this.posY - npc.posY);
                    if (dy2 < dy1) {
                        target = npc;
                    }
                    else if (dy1 == dy2) {
                        var dx1 = Math.abs(target.posX - 4);
                        var dx2 = Math.abs(npc.posX - 4);
                        if (dx2 < dx1) {
                            target = npc;
                        }
                    }
                }
            }
        }
        if (!target) {
            return false;
        }
        this.setTarget(target);
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.select, { npc: this, target: target });
        // console.log(this.printName + " 选择了一个目标： " + target.printName);
        return true;
    };
    ChessNpc.prototype.move = function () {
        if (this.curTarget && !this.curTarget.isDead
            && Util_1.g_Util.checkPosShortInRange(this.posX, this.posY, this.curTarget.posX, this.curTarget.posY, this.attRange)) {
            return true;
        }
        if (this.moveStep == 0) {
            return true;
        }
        this.setTarget(null);
        var tempT = new Array();
        var npcList = AutoBattleManager_1.g_AutoBattleManager.getEnemyList(this);
        for (var i = 0; i < npcList.length; i++) {
            tempT.push(npcList[i]);
        }
        if (this.career == AutoBattleConfig_1.CareerEnum.assissan) {
            this.assassinMove(tempT);
        }
        else {
            this.normalMove(tempT);
        }
    };
    ChessNpc.prototype.assassinMove = function (tempT) {
        if (tempT.length == 0) {
            return;
        }
        //选目标
        var dx = 100;
        var dy = 0;
        var target = null;
        var idx = 0;
        for (var i = 0; i < tempT.length; i++) {
            var v = tempT[i];
            var dy1 = Math.abs(this.posY - v.posY);
            var dx1 = Math.abs(this.posX - v.posX);
            if (dy1 > dy) {
                target = v;
                idx = i;
                dy = dy1;
                dx = dx1;
            }
            else if (dy1 == dy) {
                if (dx1 < dx) {
                    target = v;
                    idx = i;
                    dx = dx1;
                }
                else if (dx1 == dx) {
                    dx1 = Math.abs(target.posX - 4);
                    var dx2 = Math.abs(v.posX - 4);
                    if (dx2 < dx1) {
                        idx = i;
                        target = v;
                    }
                }
            }
        }
        if (!target) {
            return;
        }
        //添加候选位置
        var tempPosList = new Array();
        var chessTable = AutoBattleManager_1.g_AutoBattleManager.chessTable;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (!chessTable[i][j]) {
                    if (Util_1.g_Util.checkPosShortInRange(i, j, target.posX, target.posY, this.attRange)) {
                        tempPosList.push({ x: i, y: j });
                    }
                }
            }
        }
        if (tempPosList.length == 0) {
            tempT.splice(idx, 1);
            this.assassinMove(tempT);
            return;
        }
        this.setTarget(target);
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.select, { npc: this, target: target });
        // console.log(this.printName + "选择了assassin目标" + target.printName);
        //选择移动位置
        dx = 10;
        dy = 0;
        var targetPos = null;
        for (var i = 0; i < tempPosList.length; i++) {
            var v = tempPosList[i];
            var dx1 = Math.abs(this.posX - v.x);
            var dy1 = Math.abs(this.posY - v.y);
            if (dy1 > dy) {
                targetPos = v;
                dy = dy1;
                dx = dx1;
            }
            else if (dy1 == dy) {
                if (dx1 < dx) {
                    targetPos = v;
                    dx = dx1;
                }
                else if (dx1 == dx) {
                    dx1 = Math.abs(targetPos.x - 4);
                    var dx2 = Math.abs(v.x - 4);
                    if (dx2 < dx1) {
                        targetPos = v;
                    }
                }
            }
        }
        if (targetPos) {
            this.moveTo(targetPos);
        }
    };
    ChessNpc.prototype.normalMove = function (tempT) {
        if (tempT.length == 0) {
            return;
        }
        Printer_1.printDefault("normalMove");
        // 选目标
        var dt = 100;
        var target = null;
        var idx = 0;
        for (var i = 0; i < tempT.length; i++) {
            var v = tempT[i];
            var dis = Util_1.g_Util.getCityDistance(this, v);
            if (dis < dt) {
                dt = dis;
                target = v;
                idx = i;
            }
            else if (dis == dt) {
                var dy1 = Math.abs(this.posY - target.posY);
                var dy2 = Math.abs(this.posY - v.posY);
                if (dy2 < dy1) {
                    idx = i;
                    target = v;
                }
                else if (dy2 == dy1) {
                    var dx1 = Math.abs(target.posX - 4);
                    var dx2 = Math.abs(v.posX - 4);
                    if (dx2 < dx1) {
                        idx = i;
                        target = v;
                    }
                }
            }
        }
        if (!target) {
            return;
        }
        //选位置
        var canMovePos = new Array(); //可移动到的位置
        var tempPosList = new Array(); //可以攻击到目标的候选位置
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (!AutoBattleManager_1.g_AutoBattleManager.chessTable[i][j]) {
                    if (Util_1.g_Util.checkPosShortInRange(i, j, target.posX, target.posY, this.attRange)) {
                        tempPosList.push({ x: i, y: j });
                    }
                    if (Util_1.g_Util.checkPosShortInRange(i, j, this.posX, this.posY, this.moveStep)) {
                        canMovePos.push({ x: i, y: j });
                    }
                }
            }
        }
        if (canMovePos.length == 0) {
            return;
        }
        if (tempPosList.length == 0) {
            tempT.splice(idx, 1);
            this.normalMove(tempT);
            return;
        }
        //在备选的可以攻击到目标的候选位置中选择一个下一步要移动到的位置
        dt = 100;
        var targetPos = null;
        for (var i = 0; i < tempPosList.length; i++) {
            var v = tempPosList[i];
            for (var j = 0; j < canMovePos.length; j++) {
                var w = canMovePos[j];
                var dis = Util_1.g_Util.getCityDistance(v.x, v.y, w.x, w.y);
                if (dis < dt) {
                    dt = dis;
                    targetPos = w;
                }
                else if (dis == dt) {
                    var dy1 = Math.abs(this.posY - targetPos.y);
                    var dy2 = Math.abs(this.posY - w.y);
                    if (dy2 < dy1) {
                        targetPos = w;
                    }
                    else if (dy1 == dy2) {
                        var dx1 = Math.abs(targetPos.x - 4);
                        var dx2 = Math.abs(w.x - 4);
                        if (dx2 < dx1) {
                            targetPos = w;
                        }
                    }
                }
            }
        }
        this.setTarget(target);
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.select, { npc: this, target: target });
        // console.log(this.printName + " 选择了目标： " + target.printName);
        if (targetPos) {
            this.moveTo(targetPos);
        }
    };
    ChessNpc.prototype.moveTo = function (targetPos) {
        var chessTable = AutoBattleManager_1.g_AutoBattleManager.chessTable;
        if (chessTable[targetPos.x][targetPos.y]) {
            Printer_1.printDefault("移动失败");
            return false;
        }
        chessTable[targetPos.x][targetPos.y] = this;
        chessTable[this.posX][this.posY] = null;
        var dt = Util_1.g_Util.getDistance(this.posX, this.posY, targetPos.x, targetPos.y);
        this._lockTime = dt * this.mvSpeed;
        var dirX = targetPos.x - this.posX;
        var dirY = targetPos.y - this.posY;
        this.dir = Util_1.g_Util.getDir(dirX, dirY);
        this.posX = targetPos.x;
        this.posY = targetPos.y;
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.move, { npc: this, pos: this._pos });
        this._lockTime = this._lockTime + 500;
    };
    ChessNpc.prototype.attack = function () {
        if (this._lockTime > 0) {
            return;
        }
        if (this.hasBuffState(SkillEffectEnum_1.BuffAndDotState.coma)) {
            Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.coma, { npc: this });
            return;
        }
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.tryAttack, { npc: this });
        var curSkill = this.getCurSkill();
        if (!curSkill) {
            return;
        }
        curSkill.play(this, this.curTarget);
    };
    ChessNpc.prototype.playSkill = function (skillId) {
    };
    ChessNpc.prototype.die = function () {
        this._isDead = true;
        for (var thisId in this.hitArrThisId) {
            var npc = AutoBattleManager_1.g_AutoBattleManager.getChessNpcByThisId(Number(thisId));
            if (npc && npc.curTarget == this) {
                if (npc.hasBuffState(SkillEffectEnum_1.BuffAndDotState.beSneer)) {
                    npc.removeBuffState(SkillEffectEnum_1.BuffAndDotState.beSneer);
                }
                npc.curTarget = null;
            }
        }
        var boom = this.getAttrChange("boom");
        if (boom && boom.length > 0) {
            var boomInfo = boom[0].info;
            var dpsInfo = AutoBattleManager_1.g_AutoBattleManager.getDpsInfo(this.thisId);
            var damage = 0;
            if (dpsInfo) {
                damage = boomInfo.damagePer * dpsInfo.dps / 100;
            }
            var effInfo = new EffectInfo_1.EffectInfo();
            effInfo.init(SkillEffectEnum_1.SkillEffectEnum.damage, [damage, SkillEffectEnum_1.DamageType.normal]);
            var hitNpcList = AutoBattleManager_1.g_AutoBattleManager.getEnemyList(this);
            for (var i = 0; i < hitNpcList.length; i++) {
                var defender = hitNpcList[i];
                var effData = new EffectInfo_1.EffData(effInfo, this, defender);
                InitSkillEffect_1.skillEffects[SkillEffectEnum_1.SkillEffectEnum.damage].play(effData);
                defender.addBuff(new ChessBuff_1.ChessBuff(boomInfo.comaTime, 0, defender, null, SkillEffectEnum_1.BuffAndDotState.coma));
            }
        }
    };
    /**
     * 初始化技能
     */
    ChessNpc.prototype.initSkillList = function () {
        this._skillList = new Array();
        var normalSkill = new ChessSkill_1.NormalSkill(this.normalSkillId, this);
        this._skillList.push(normalSkill);
        if (this.skillId != 0) {
            var skill = new ChessSkill_1.ChessSkill(this.skillId, this.level);
            if (skill.isActive) {
                this._skillList.push(skill);
            }
            else {
                skill.play(this);
            }
        }
    };
    /**
     * 选择一个当前可用的技能
     */
    ChessNpc.prototype.getCurSkill = function () {
        var curSkill = null;
        for (var i = 0; i < this._skillList.length; i++) {
            var skill = this._skillList[i];
            if (skill.id == this.normalSkillId &&
                (this.hasBuffState(SkillEffectEnum_1.BuffAndDotState.beDisarm) ||
                    this.hasBuffState(SkillEffectEnum_1.BuffAndDotState.beBanish))) {
                continue;
            }
            if ((this.hasBuffState(SkillEffectEnum_1.BuffAndDotState.beSneer) || this.hasBuffState(SkillEffectEnum_1.BuffAndDotState.silent))
                && skill.id == this.skillId) {
                continue;
            }
            if (skill.curCdTime <= 0 && this.mp >= skill.mpCost) {
                if (!curSkill) {
                    curSkill = skill;
                }
                else if (skill.mpCost > curSkill.mpCost) {
                    curSkill = skill;
                }
            }
        }
        return curSkill;
    };
    ChessNpc.prototype.addAttrChange = function (attrName, info) {
        if (!this._attrChangeMap[attrName]) {
            this._attrChangeMap[attrName] = new Array();
        }
        var infoArr = this._attrChangeMap[attrName];
        infoArr.push(info);
        info.idx = infoArr.length - 1;
    };
    ChessNpc.prototype.removeAttrChange = function (attrName, idx) {
        var infoArr = this._attrChangeMap[attrName];
        if (infoArr && infoArr[idx]) {
            for (var i = idx + 1; i < infoArr.length; i++) {
                var element = infoArr[i];
                element.idx = element.idx - 1;
            }
            infoArr.splice(idx, 1);
        }
    };
    ChessNpc.prototype.getAttrChange = function (attrName) {
        return this._attrChangeMap[attrName];
    };
    // addShieldState(shield: ChessShield) {
    //     if (!this._attrShieldMap[shield.name]) {
    //         this._attrShieldMap[shield.name] = new Array();
    //     }
    //     let infoArr: Array<ChessShield> = this._attrShieldMap[shield.name];
    //     infoArr.push(shield);
    //     shield.idx = infoArr.length - 1;
    // }
    // removeShieldState(attrName: string, idx: number) {
    //     let infoArr: Array<AttrChangeInfo> = this._attrShieldMap[attrName]
    //     if (infoArr && infoArr[idx]) {
    //         for (let i = idx + 1; i < infoArr.length; i++) {
    //             const element = infoArr[i];
    //             element.idx = element.idx - 1;
    //         }
    //         infoArr.splice(idx, 1);
    //     }
    // }
    // getShieldState(attrName: string): Array<AttrChangeInfo> {
    //     return this._attrShieldMap[attrName];
    // }
    ChessNpc.prototype.addBuffState = function (state) {
        if (!this._buffStateArr[state]) {
            this._buffStateArr[state] = 0;
        }
        this._buffStateArr[state] = this._buffStateArr[state] + 1;
    };
    ChessNpc.prototype.removeBuffState = function (state) {
        if (!this._buffStateArr[state]) {
            this._buffStateArr[state] = 0;
        }
        this._buffStateArr[state] = this._buffStateArr[state] - 1;
    };
    ChessNpc.prototype.hasBuffState = function (state) {
        var count = this._buffStateArr[state];
        if (!count || count == 0) {
            return false;
        }
        return true;
    };
    ChessNpc.prototype.setTarget = function (target) {
        if (this.curTarget) {
            this.curTarget.hitArrThisId[this.thisId] = null;
        }
        this.curTarget = target;
        if (target) {
            target.hitArrThisId[this.thisId] = 1;
            this.curTargetThisId = target.thisId;
        }
        else {
            this.curTargetThisId = null;
        }
    };
    ChessNpc.prototype.setPosition = function (x, y) {
        this._pos.x = x;
        this._pos.y = y;
    };
    ChessNpc.prototype.getPosition = function () {
        return this._pos;
    };
    Object.defineProperty(ChessNpc.prototype, "isDead", {
        get: function () {
            return this._isDead;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "posX", {
        get: function () {
            return this._pos.x;
        },
        set: function (v) {
            this._pos.x = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "posY", {
        get: function () {
            return this._pos.y;
        },
        set: function (v) {
            this._pos.y = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "isTeamA", {
        get: function () {
            return this.teamA;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "hp", {
        /**
         * 基础hp+buff增减hp
         */
        get: function () {
            var value = this._hp;
            var attrChange = this.getAttrChange('maxHp');
            if (attrChange && attrChange.length > 0) {
                for (var i = 0; i < attrChange.length; i++) {
                    var info = attrChange[i];
                    value = value + info.info;
                }
            }
            return value;
        },
        set: function (v) {
            this._hp = v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 基础hp
     */
    ChessNpc.prototype.getHp = function () {
        return this._hp;
    };
    ChessNpc.prototype.reduceHp = function (hp) {
        this._hp = this._hp - hp;
        if (this._hp > this.baseHp) {
            this._hp = this.baseHp;
        }
    };
    Object.defineProperty(ChessNpc.prototype, "maxHp", {
        get: function () {
            var value = this._maxHp;
            var attrChange = this.getAttrChange('maxHp');
            if (attrChange && attrChange.length > 0) {
                for (var i = 0; i < attrChange.length; i++) {
                    var info = attrChange[i];
                    value = value + info.info;
                }
            }
            return value;
        },
        set: function (v) {
            this._maxHp = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "mp", {
        get: function () {
            return this._mp;
        },
        set: function (v) {
            if (v > 100) {
                v = 100;
            }
            this._mp = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "maxMp", {
        get: function () {
            return this._maxMp;
        },
        set: function (v) {
            this._maxMp = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "damage", {
        get: function () {
            var value = this._damage;
            var attrChange = this.getAttrChange("damage");
            if (attrChange && attrChange.length > 0) {
                for (var i = 0; i < attrChange.length; i++) {
                    var info = attrChange[i];
                    value = value + info.info;
                }
            }
            return value;
        },
        set: function (v) {
            this._damage = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "defence", {
        get: function () {
            var value = this._defence;
            var attrChange = this.getAttrChange("defence");
            if (attrChange && attrChange.length > 0) {
                for (var i = 0; i < attrChange.length; i++) {
                    var info = attrChange[i];
                    value = value + info.info;
                }
            }
            return value;
        },
        set: function (v) {
            this._defence = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "mDefence", {
        get: function () {
            var value = (100 - this._mDefence) / 100.0;
            var attrChange = this.getAttrChange("mDefence");
            if (attrChange && attrChange.length > 0) {
                for (var i = 0; i < attrChange.length; i++) {
                    var info = attrChange[i];
                    value = value * (100 - info.info) / 100.0;
                }
            }
            var warFever = this.getAttrChange("warFever");
            if (warFever && warFever.length > 0) {
                var info = warFever[0].info;
                var hpPercent = Math.floor((this.hp / this.maxHp) * 100);
                var per = info.mDefence * (100 - hpPercent);
                value = value * (100 - per) / 100.0;
            }
            value = Math.floor(100 - value * 100);
            return value;
        },
        set: function (v) {
            this._mDefence = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "attSpeed", {
        get: function () {
            var value = this._attSpeed;
            var attrChange = this.getAttrChange("attackSpeed");
            if (attrChange && attrChange.length > 0) {
                for (var i = 0; i < attrChange.length; i++) {
                    var info = attrChange[i];
                    value = value + info.info;
                }
            }
            var warFever = this.getAttrChange("warFever");
            if (warFever && warFever.length > 0) {
                var info = warFever[0].info;
                var hpPercent = Math.floor((this.hp / this.maxHp) * 100);
                value = value + info.attackSpeed * (100 - hpPercent);
            }
            return value;
        },
        set: function (v) {
            this._attSpeed = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "attRange", {
        get: function () {
            return this._attRange;
        },
        set: function (v) {
            this._attRange = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (v) {
            this._speed = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "mvSpeed", {
        get: function () {
            return this._mvSpeed;
        },
        set: function (v) {
            this._mvSpeed = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (v) {
            this._level = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "name", {
        get: function () {
            return this.baseData.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "baseHp", {
        get: function () {
            return this.baseData.hp * Math.pow(2, this.level - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "baseMp", {
        get: function () {
            return this.baseData.mp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "baseDamage", {
        get: function () {
            return this.baseData.damage * Math.pow(2, this.level - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "baseDefence", {
        get: function () {
            return this.baseData.defence;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "baseMDefence", {
        get: function () {
            return this.baseData.mdefence;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "baseAttSpeed", {
        get: function () {
            return this.baseData.attaSpeed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "baseAttRange", {
        get: function () {
            return this.baseData.attackRange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "baseSpeed", {
        get: function () {
            return this.baseData.speed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "baseMvSpeed", {
        get: function () {
            return this.baseData.mvSpeed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "race", {
        get: function () {
            return this.baseData.race;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "career", {
        get: function () {
            return this.baseData.career;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "moveStep", {
        get: function () {
            return this.baseData.mvStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "normalSkillId", {
        get: function () {
            return this.baseData.normalSkill;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "skillId", {
        get: function () {
            return this.baseData.skill;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessNpc.prototype, "printName", {
        get: function () {
            var str = this.isTeamA ? "A:" : "B:";
            str = str + this.name + "(" + this.hp + "," + this.mp + ")";
            return str;
        },
        enumerable: true,
        configurable: true
    });
    ChessNpc.prototype.isSameTeam = function (npc) {
        return this.isTeamA == npc.isTeamA;
    };
    return ChessNpc;
}());
exports.ChessNpc = ChessNpc;
var ChessPet = /** @class */ (function (_super) {
    __extends(ChessPet, _super);
    function ChessPet(thisId, baseId, level, isTeamA, masterId) {
        var _this = _super.call(this, thisId, baseId, level, isTeamA) || this;
        _this.masterId = masterId;
        return _this;
    }
    return ChessPet;
}(ChessNpc));
exports.ChessPet = ChessPet;

cc._RF.pop();