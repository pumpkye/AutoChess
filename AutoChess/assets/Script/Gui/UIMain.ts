import { printDefault } from "../AutoBattle/OutPut/Printer";
import { BattleInfo, LayoutInfo, g_InputCache } from "../AutoBattle/Input/InputCache";
import UIChessTable from "./UIChessTable";
import { g_AutoBattle } from "../AutoBattle/AutoBattle";
import { g_UIManager } from "./UIManager";
import UISaveLayout from "./UISaveLayout";
import UILoadLayout from "./UILoadLayout";
import { npc_data } from "../AutoBattle/Tbx/npc_data";
import { g_Util } from "../AutoBattle/Util";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIMain extends cc.Component {

    @property(cc.Button)
    startBattleBtn: cc.Button = null;

    @property(cc.Label)
    layoutACost: cc.Label = null;

    @property(cc.Label)
    layoutABuff: cc.Label = null;

    @property(cc.Label)
    layoutBCost: cc.Label = null;

    @property(cc.Label)
    layoutBBuff: cc.Label = null;

    battleInfo: BattleInfo;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.battleInfo = new BattleInfo(1);
        this.battleInfo.addMatch(101, 102);
    }

    /**
     * 刷新阵容cost和buff
     */
    refreshCostBuff() {
        this.refreshBattleInfo();
        let layoutA = this.battleInfo.getLayoutByPlayerId(101);
        let sumCost = 0;
        for (let i = 0; i < layoutA.npcList.length; i++) {
            const npc = layoutA.npcList[i];
            sumCost = sumCost + npc_data[npc.baseId].quality * Math.pow(3, npc.level - 1);
        }
        this.layoutACost.string = sumCost.toString();
        let buffStr = g_Util.getCareerAndRaceBuffStr(layoutA.npcList);
        this.layoutABuff.string = buffStr;
        sumCost = 0;
        let layoutB = this.battleInfo.getLayoutByPlayerId(102);
        for (let i = 0; i < layoutB.npcList.length; i++) {
            const npc = layoutB.npcList[i];
            sumCost = sumCost + npc_data[npc.baseId].quality * Math.pow(3, npc.level - 1);
        }
        this.layoutBCost.string = sumCost.toString();
        buffStr = g_Util.getCareerAndRaceBuffStr(layoutB.npcList);
        this.layoutBBuff.string = buffStr;
    }

    refreshBattleInfo() {
        let thisId = 0;
        let chessTable: UIChessTable = g_UIManager.getPanel("UIChessTable");
        console.log(chessTable.layout)
        let layoutInfoA = new LayoutInfo(101);
        let layoutInfoB = new LayoutInfo(102);
        for (const idx in chessTable.layout) {
            if (chessTable.layout.hasOwnProperty(idx)) {
                const npc = chessTable.layout[idx];
                thisId = thisId + 1;
                let y = Math.floor(Number(idx) / 8);
                npc.thisId = thisId;
                if (y > 3) {
                    layoutInfoB.addChessNpcInfo(npc);
                } else {
                    layoutInfoA.addChessNpcInfo(npc);
                }
            }
        }
        this.battleInfo.clearLayout()
        this.battleInfo.addLayout(layoutInfoA);
        this.battleInfo.addLayout(layoutInfoB);
    }

    startBattle() {
        console.log("onStartBattleTouch");
        this.refreshBattleInfo();
        console.log(this.battleInfo);
        g_InputCache.setBattleInfo(this.battleInfo);
        g_AutoBattle.doAutoBattle();
    }

    clearLayout() {
        let chessTable = g_UIManager.getPanel("UIChessTable");
        chessTable.clear();
        this.refreshCostBuff();
    }

    saveLayout() {
        let panel: UISaveLayout = g_UIManager.getOrCreatePanel("UISaveLayout");

    }

    loadLayout() {
        let panel: UILoadLayout = g_UIManager.getOrCreatePanel("UILoadLayout")
    }
    // update (dt) {}
}
