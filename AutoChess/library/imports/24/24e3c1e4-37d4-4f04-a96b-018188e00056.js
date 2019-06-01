"use strict";
cc._RF.push(module, '24e3cHkN9RPBKlrAYGI4ABW', 'AutoBattle');
// Script/AutoBattle/AutoBattle.ts

Object.defineProperty(exports, "__esModule", { value: true });
var InputCache_1 = require("./Input/InputCache");
var Printer_1 = require("./OutPut/Printer");
var TestInput_1 = require("./Input/TestInput");
var AutoBattleManager_1 = require("./AutoBattleManager");
var ChessNpcBaseData_1 = require("./TbxModel/ChessNpcBaseData");
/**
 * autoBattle 入口
 */
var AutoBattle = /** @class */ (function () {
    function AutoBattle() {
    }
    AutoBattle.prototype.init = function () {
    };
    AutoBattle.prototype.loadConfig = function () {
    };
    /**
     * 自走棋战斗
     */
    AutoBattle.prototype.doAutoBattle = function (mode) {
        var battleInfo = InputCache_1.g_InputCache.getBattleInfo();
        if (!battleInfo) {
            Printer_1.printErrMsg(Printer_1.pErrTag.inputNull);
            return false;
        }
        AutoBattleManager_1.g_AutoBattleManager.mode = AutoBattleManager_1.Enum_Mode.quick;
        if (mode) {
            AutoBattleManager_1.g_AutoBattleManager.mode = mode;
        }
        Printer_1.printDefault(battleInfo);
        for (var i = 0; i < battleInfo.matches.length; i++) {
            var match = battleInfo.matches[i];
            var layoutA = battleInfo.getLayoutByPlayerId(match.playerThisIdA);
            var layoutB = battleInfo.getLayoutByPlayerId(match.playerThisIdB);
            if (layoutA && layoutB) {
                AutoBattleManager_1.g_AutoBattleManager.start(layoutA, layoutB, i);
            }
        }
    };
    AutoBattle.prototype.test = function () {
        InputCache_1.g_InputCache.loadBattleInfoFromJson(TestInput_1.testInputStr);
        this.doAutoBattle();
        //load testInput
        //
    };
    AutoBattle.prototype.checkInput = function () {
    };
    /**
     * 获取ChessNpc的基础数据
     * @param baseId
     */
    AutoBattle.prototype.getNpcDataByBaseId = function (baseId) {
        var baseData = new ChessNpcBaseData_1.ChessNpcBaseData(baseId);
    };
    return AutoBattle;
}());
/**
 * 提供外部调用AutoBattle的接口
 */
exports.g_AutoBattle = new AutoBattle();

cc._RF.pop();