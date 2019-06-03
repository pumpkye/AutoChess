"use strict";
cc._RF.push(module, '37017cWNrRFcLpkgFWjEENS', 'UIMain');
// Script/Gui/UIMain.ts

Object.defineProperty(exports, "__esModule", { value: true });
var InputCache_1 = require("../AutoBattle/Input/InputCache");
var AutoBattle_1 = require("../AutoBattle/AutoBattle");
var UIManager_1 = require("./UIManager");
var npc_data_1 = require("../AutoBattle/Tbx/npc_data");
var Util_1 = require("../AutoBattle/Util");
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIMain = /** @class */ (function (_super) {
    __extends(UIMain, _super);
    function UIMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startBattleBtn = null;
        _this.layoutACost = null;
        _this.layoutABuff = null;
        _this.layoutBCost = null;
        _this.layoutBBuff = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    UIMain.prototype.start = function () {
        this.battleInfo = new InputCache_1.BattleInfo(1);
        this.battleInfo.addMatch(101, 102);
    };
    /**
     * 刷新阵容cost和buff
     */
    UIMain.prototype.refreshCostBuff = function () {
        this.refreshBattleInfo();
        var layoutA = this.battleInfo.getLayoutByPlayerId(101);
        var sumCost = 0;
        for (var i = 0; i < layoutA.npcList.length; i++) {
            var npc = layoutA.npcList[i];
            sumCost = sumCost + npc_data_1.npc_data[npc.baseId].quality * Math.pow(3, npc.level - 1);
        }
        this.layoutACost.string = sumCost.toString();
        var buffStr = Util_1.g_Util.getCareerAndRaceBuffStr(layoutA.npcList);
        this.layoutABuff.string = buffStr;
        sumCost = 0;
        var layoutB = this.battleInfo.getLayoutByPlayerId(102);
        for (var i = 0; i < layoutB.npcList.length; i++) {
            var npc = layoutB.npcList[i];
            sumCost = sumCost + npc_data_1.npc_data[npc.baseId].quality * Math.pow(3, npc.level - 1);
        }
        this.layoutBCost.string = sumCost.toString();
        buffStr = Util_1.g_Util.getCareerAndRaceBuffStr(layoutB.npcList);
        this.layoutBBuff.string = buffStr;
    };
    UIMain.prototype.refreshBattleInfo = function () {
        var thisId = 0;
        var chessTable = UIManager_1.g_UIManager.getPanel("UIChessTable");
        console.log(chessTable.layout);
        var layoutInfoA = new InputCache_1.LayoutInfo(101);
        var layoutInfoB = new InputCache_1.LayoutInfo(102);
        for (var idx in chessTable.layout) {
            if (chessTable.layout.hasOwnProperty(idx)) {
                var npc = chessTable.layout[idx];
                thisId = thisId + 1;
                var y = Math.floor(Number(idx) / 8);
                npc.thisId = thisId;
                if (y > 3) {
                    layoutInfoB.addChessNpcInfo(npc);
                }
                else {
                    layoutInfoA.addChessNpcInfo(npc);
                }
            }
        }
        this.battleInfo.clearLayout();
        this.battleInfo.addLayout(layoutInfoA);
        this.battleInfo.addLayout(layoutInfoB);
    };
    UIMain.prototype.startBattle = function () {
        console.log("onStartBattleTouch");
        this.refreshBattleInfo();
        console.log(this.battleInfo);
        InputCache_1.g_InputCache.setBattleInfo(this.battleInfo);
        AutoBattle_1.g_AutoBattle.doAutoBattle();
    };
    UIMain.prototype.clearLayout = function () {
        var chessTable = UIManager_1.g_UIManager.getPanel("UIChessTable");
        chessTable.clear();
        this.refreshCostBuff();
    };
    UIMain.prototype.saveLayout = function () {
        var panel = UIManager_1.g_UIManager.getOrCreatePanel("UISaveLayout");
    };
    UIMain.prototype.loadLayout = function () {
        var panel = UIManager_1.g_UIManager.getOrCreatePanel("UILoadLayout");
    };
    __decorate([
        property(cc.Button)
    ], UIMain.prototype, "startBattleBtn", void 0);
    __decorate([
        property(cc.Label)
    ], UIMain.prototype, "layoutACost", void 0);
    __decorate([
        property(cc.Label)
    ], UIMain.prototype, "layoutABuff", void 0);
    __decorate([
        property(cc.Label)
    ], UIMain.prototype, "layoutBCost", void 0);
    __decorate([
        property(cc.Label)
    ], UIMain.prototype, "layoutBBuff", void 0);
    UIMain = __decorate([
        ccclass
    ], UIMain);
    return UIMain;
}(cc.Component));
exports.default = UIMain;

cc._RF.pop();