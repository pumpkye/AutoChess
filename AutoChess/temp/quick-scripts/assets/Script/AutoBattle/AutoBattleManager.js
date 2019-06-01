(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/AutoBattleManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '95961fIxINC3YDmnNKgm27s', 'AutoBattleManager', __filename);
// Script/AutoBattle/AutoBattleManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ChessNpc_1 = require("./Model/ChessNpc");
var AutoBattleConfig_1 = require("./Config/AutoBattleConfig");
var ChessSkill_1 = require("./Model/ChessSkill");
var Printer_1 = require("./OutPut/Printer");
var OutPutCache_1 = require("./OutPut/OutPutCache");
var Enum_Mode;
(function (Enum_Mode) {
    Enum_Mode[Enum_Mode["normal"] = 1] = "normal";
    Enum_Mode[Enum_Mode["quick"] = 2] = "quick";
    Enum_Mode[Enum_Mode["test"] = 3] = "test";
})(Enum_Mode = exports.Enum_Mode || (exports.Enum_Mode = {}));
/**
 * 单局对战的管理器
 */
var AutoBattleManager = /** @class */ (function () {
    function AutoBattleManager() {
        this._mode = 0;
        this._matchIdx = -1;
        this._allMyNpcCount = 0;
        this._allEnemyNpcCount = 0;
        this._curTime = 0;
        this._deltaTime = 0;
        this._isStart = false;
        this._thisIdSeed = 0;
        this._mode = Enum_Mode.test;
        this.clear();
    }
    /**
     * update
     */
    AutoBattleManager.prototype.update = function (dt) {
        if (!this._isStart) {
            return;
        }
        this._curTime += dt;
        var tempList = new Array();
        for (var i = 0; i < this._npcListA.length; i++) {
            var e = this._npcListA[i];
            if (!e.isDead) {
                tempList.push(e);
            }
        }
        for (var i = 0; i < this._npcListB.length; i++) {
            var e = this._npcListB[i];
            if (!e.isDead) {
                tempList.push(e);
            }
        }
        tempList.sort(function (a, b) {
            if (a.speed == b.speed) {
                return b.thisId - a.thisId;
            }
            else {
                return b.speed - a.speed;
            }
        });
        for (var i = 0; i < tempList.length; i++) {
            var e = tempList[i];
            if (!e.isDead) {
                e.update(dt);
            }
        }
        for (var i = 0; i < tempList.length; i++) {
            var e = tempList[i];
            if (!e.isDead) {
                e.attack();
            }
        }
        this._npcListA = this.removeDeath(this._npcListA);
        this._npcListB = this.removeDeath(this._npcListB);
        this.checkGameResult();
        this._deltaTime = this._deltaTime + dt;
        if (this._deltaTime > 1000) {
            this.printChessTable();
            this._deltaTime = this._deltaTime - 1000;
        }
        if (this._mode == Enum_Mode.quick || this._mode == Enum_Mode.test) {
            return this.update(50);
        }
    };
    AutoBattleManager.prototype.checkGameResult = function () {
        if (this._curTime >= 60 * 1000) {
            this._isStart = false;
            // console.log("Game finish when time over");
        }
        else if (this._npcListA.length == 0) {
            this._isStart = false;
            // console.log("Game over!");
        }
        else if (this._npcListB.length == 0) {
            this._isStart = false;
            OutPutCache_1.g_OutputCache.isWin = true;
            // console.log("Win!");
        }
        if (!this._isStart) {
            this.printChessTable();
            console.log("Game total time:", this._curTime);
        }
    };
    AutoBattleManager.prototype.removeDeath = function (npcList) {
        var tempList = new Array();
        for (var i = 0; i < npcList.length; i++) {
            var e = npcList[i];
            if (e.isDead) {
                delete (this._chessTable[e.posX][e.posY]);
            }
            else {
                tempList.push(e);
            }
        }
        return tempList;
    };
    AutoBattleManager.prototype.start = function (layoutA, layoutB, matchIdx) {
        if (!layoutA || !layoutB) {
            return;
        }
        OutPutCache_1.g_OutputCache.isWin = false;
        this._matchIdx = matchIdx;
        Printer_1.printDefault("autobattleManager start");
        this.clear();
        // this._mode == Enum_Mode.test;
        this.init(layoutA, layoutB);
        this._curTime = 0;
        this.prepareBattle();
        this._isStart = true;
        if (this.mode == Enum_Mode.quick) {
            this.update(50);
        }
    };
    AutoBattleManager.prototype.init = function (layoutA, layoutB) {
        Printer_1.printDefault('curMode' + this.mode);
        this.initNpcList(layoutA, layoutB);
        this.initChessTable();
    };
    /**
    * 初始化输入
    */
    AutoBattleManager.prototype.initNpcList = function (layoutA, layoutB) {
        this._npcListA = new Array();
        this._npcListB = new Array();
        for (var i = 0; i < layoutA.npcList.length; i++) {
            var npc = layoutA.npcList[i];
            var chessNpc = new ChessNpc_1.ChessNpc(npc.thisId, npc.baseId, npc.level, true);
            chessNpc.setPosition(npc.pos.x, npc.pos.y);
            this._npcListA.push(chessNpc);
        }
        for (var i = 0; i < layoutB.npcList.length; i++) {
            var npc = layoutB.npcList[i];
            var chessNpc = new ChessNpc_1.ChessNpc(npc.thisId, npc.baseId, npc.level, false);
            chessNpc.setPosition(7 - npc.pos.x, 7 - npc.pos.y);
            this._npcListB.push(chessNpc);
        }
    };
    /**
     * 初始化棋盘
     */
    AutoBattleManager.prototype.initChessTable = function () {
        this._chessTable = new Array();
        for (var i = 0; i < 8; i++) {
            this._chessTable[i] = new Array();
        }
        for (var i = 0; i < this._npcListA.length; i++) {
            var npc = this._npcListA[i];
            this._chessTable[npc.posX][npc.posY] = npc;
        }
        for (var i = 0; i < this._npcListB.length; i++) {
            var npc = this._npcListB[i];
            this._chessTable[npc.posX][npc.posY] = npc;
        }
        this.printChessTable();
    };
    /**
     * 添加种族buff、职业buff, npc技能初始化
     */
    AutoBattleManager.prototype.prepareBattle = function () {
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.prepare, "初始化我方种族buff");
        this.checkRaceBuff(this._npcListA);
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.prepare, "初始化我方职业buff");
        this.checkCareerBuff(this._npcListA);
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.prepare, "初始化敌方种族buff");
        this.checkRaceBuff(this._npcListB);
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.prepare, "初始化敌方职业buff");
        this.checkCareerBuff(this._npcListB);
        for (var i = 0; i < this._npcListA.length; i++) {
            var npc = this._npcListA[i];
            npc.initSkillList();
        }
        for (var i = 0; i < this._npcListB.length; i++) {
            var npc = this._npcListB[i];
            npc.initSkillList();
        }
        this.printChessTable();
    };
    AutoBattleManager.prototype.checkRaceBuff = function (npcList) {
        for (var key in AutoBattleConfig_1.raceBuffConfig) {
            if (AutoBattleConfig_1.raceBuffConfig.hasOwnProperty(key)) {
                var tempList = new Array();
                for (var i = 0; i < npcList.length; i++) {
                    var npc = npcList[i];
                    if (npc.race == Number(key)) {
                        tempList[npc.baseId] = npc;
                    }
                }
                var element = AutoBattleConfig_1.raceBuffConfig[key];
                var raceNum = 0;
                for (var baseId in tempList) {
                    if (tempList.hasOwnProperty(baseId)) {
                        var npc = tempList[baseId];
                        raceNum += 1;
                        if (element[raceNum]) {
                            Printer_1.printDefault("raceNum:" + raceNum);
                            // console.log("触发种族buff:", element[raceNum]);
                            var raceSkill = new ChessSkill_1.RaceSkill(element[raceNum], Number(key), npc.isTeamA);
                            raceSkill.play();
                        }
                    }
                }
            }
        }
    };
    AutoBattleManager.prototype.checkCareerBuff = function (npcList) {
        for (var key in AutoBattleConfig_1.careerBuffConfig) {
            if (AutoBattleConfig_1.careerBuffConfig.hasOwnProperty(key)) {
                var element = AutoBattleConfig_1.careerBuffConfig[key];
                var careerNum = 0;
                var tempList = new Array();
                for (var i = 0; i < npcList.length; i++) {
                    var npc = npcList[i];
                    if (npc.career == Number(key)) {
                        tempList[npc.baseId] = npc;
                    }
                }
                for (var baseId in tempList) {
                    if (tempList.hasOwnProperty(baseId)) {
                        var npc = tempList[baseId];
                        careerNum += 1;
                        if (element[careerNum]) {
                            // console.log("触发职业buff:", element[careerNum]);
                            var careerSkill = new ChessSkill_1.CareerSkill(element[careerNum], Number(key), npc.isTeamA);
                            careerSkill.play();
                        }
                    }
                }
                for (var i = 0; i < tempList.length; i++) {
                }
            }
        }
    };
    /**
     * 返回一个[1,num]的随机数
     * @param num
     */
    AutoBattleManager.prototype.getRandomNumber = function (num) {
        if (this._mode == Enum_Mode.quick || this._mode == Enum_Mode.test) {
            var rad = Math.floor(Math.random() * num) + 1;
            this._randomSet.push(rad);
            return rad;
        }
        else {
            var rad = this._randomSet.shift();
            if (!rad || rad > num) {
                if (!rad) {
                    Printer_1.printErrMsg(Printer_1.pErrTag.randomNum, { max: num, rad: "null" });
                    // console.log("no enough random number");
                }
                else {
                    Printer_1.printErrMsg(Printer_1.pErrTag.randomNum, { max: num, rad: rad });
                    // console.log("get error random number")
                }
                console.log("no enough random num");
                rad = Math.floor(Math.random() * num) + 1;
            }
        }
        return 0;
    };
    /**
     * 添加dps记录
     */
    AutoBattleManager.prototype.addDpsInfo = function (thisId, baseId, isTeamA, dps) {
        if (this._dpsInfo[thisId]) {
            var dpsInfo = this._dpsInfo[thisId];
            dpsInfo.addDps(dps, this.curTime);
        }
        else {
            var dpsInfo = new DpsInfo(this.matchIdx, thisId, baseId, isTeamA);
            dpsInfo.addDps(dps, this.curTime);
            this._dpsInfo[thisId] = dpsInfo;
        }
    };
    AutoBattleManager.prototype.getDpsInfo = function (thisId) {
        return this._dpsInfo[thisId];
    };
    Object.defineProperty(AutoBattleManager.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (v) {
            this._mode = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoBattleManager.prototype, "chessTable", {
        get: function () {
            return this._chessTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoBattleManager.prototype, "curTime", {
        get: function () {
            return this._curTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoBattleManager.prototype, "matchIdx", {
        get: function () {
            return this._matchIdx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoBattleManager.prototype, "npcListA", {
        get: function () {
            return this._npcListA;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoBattleManager.prototype, "npcListB", {
        get: function () {
            return this._npcListB;
        },
        enumerable: true,
        configurable: true
    });
    AutoBattleManager.prototype.getFriendList = function (chessNpc) {
        if (chessNpc && !chessNpc.isTeamA) {
            return this._npcListB;
        }
        return this._npcListA;
    };
    AutoBattleManager.prototype.getEnemyList = function (chessNpc) {
        if (chessNpc && !chessNpc.isTeamA) {
            return this._npcListA;
        }
        return this._npcListB;
    };
    AutoBattleManager.prototype.getChessNpc = function (posX, posY) {
        if (this.chessTable && this.chessTable[posX] && this.chessTable[posX][posY]) {
            return this.chessTable[posX][posY];
        }
    };
    AutoBattleManager.prototype.getChessNpcByThisId = function (thisId) {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var chessNpc = this.chessTable[i][j];
                if (chessNpc && chessNpc.thisId == thisId) {
                    return chessNpc;
                }
            }
        }
    };
    AutoBattleManager.prototype.getNearBlankPosition = function (center) {
        var chessTable = this.chessTable;
        for (var i = 1; i < 9; i++) {
            for (var dir = 0; dir < 8; dir++) {
                var dirT = AutoBattleConfig_1.dirConfig[dir];
                var x = center.x + dirT.x * i;
                var y = center.y + dirT.y * i;
                if (this.isInChessTable(x, y) && !chessTable[x][y]) {
                    return { x: x, y: y };
                }
            }
        }
    };
    AutoBattleManager.prototype.isInChessTable = function (x, y) {
        return (x >= 0 && x < 8 && y >= 0 && y < 8);
    };
    /**
     * 约定：生成的thisId>100000,若有服务器生成的thisId，注意一下这里不要冲突
     */
    AutoBattleManager.prototype.generateThisId = function () {
        this._thisIdSeed = this._thisIdSeed + 1;
        return 100000 + this._thisIdSeed;
    };
    /**
     * clear
     */
    AutoBattleManager.prototype.clear = function () {
        Printer_1.printDefault("auto BattleManager clear");
        this._npcListA = null;
        this._npcListB = null;
        this._chessTable = null;
        this._isStart = false;
        this._curTime = 0;
        this._deltaTime = 0;
        this._allEnemyNpcCount = 0;
        this._allMyNpcCount = 0;
        this._thisIdSeed = 0;
        this._randomSet = new Array();
        this._dpsInfo = new Array();
    };
    /**
     * 打印棋盘
     */
    AutoBattleManager.prototype.printChessTable = function () {
        var str = "curTime:" + this.curTime + "=======================================\n";
        for (var i = -1; i < 8; i++) {
            str += (i + 1) + "\t\t";
        }
        str += "\n";
        for (var j = 0; j < 8; j++) {
            var s = (j + 1) + "\t\t";
            for (var i = -1; i < 8; i++) {
                if (this.chessTable[i] && this.chessTable[i][j]) {
                    var npc = this.chessTable[i][j];
                    if (!npc.isDead) {
                        s = "" + s + npc.printName;
                    }
                    else {
                        s = s + "\t";
                    }
                }
                else {
                    s = s + "\t";
                }
                s = s + "\t";
            }
            str = str + s + "\n";
        }
        str = str + "==================================================================\n";
        Printer_1.printChessTable(str);
        // console.log(str);
    };
    return AutoBattleManager;
}());
exports.g_AutoBattleManager = new AutoBattleManager();
var DpsInfo = /** @class */ (function () {
    function DpsInfo(matchIdx, thisId, baseId, isTeamA) {
        this.matchIdx = 0;
        this.isTeamA = false;
        this.matchIdx = matchIdx;
        this.thisId = thisId;
        this.baseId = baseId;
        this.isTeamA = isTeamA;
        this.dps = 0;
        this.time = 0;
    }
    DpsInfo.prototype.addDps = function (dps, time) {
        this.dps = this.dps + dps;
        this.time = time;
    };
    return DpsInfo;
}());

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
        //# sourceMappingURL=AutoBattleManager.js.map
        