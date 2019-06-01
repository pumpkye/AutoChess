import { printDefault } from "../AutoBattle/OutPut/Printer";
import { BattleInfo, LayoutInfo, g_InputCache } from "../AutoBattle/Input/InputCache";
import UIChessTable from "./UIChessTable";
import { g_AutoBattle } from "../AutoBattle/AutoBattle";
import { g_UIManager } from "./UIManager";
import UISaveLayout from "./UISaveLayout";
import UILoadLayout from "./UILoadLayout";

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

    @property
    text: string = 'hello';

    battleInfo: BattleInfo;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.battleInfo = new BattleInfo(1);
        this.battleInfo.addMatch(101, 102);
    }

    startBattle() {
        console.log("onStartBattleTouch");
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
        console.log(this.battleInfo);
        g_InputCache.setBattleInfo(this.battleInfo);
        g_AutoBattle.doAutoBattle();
    }

    clearLayout() {
        let chessTable = g_UIManager.getPanel("UIChessTable");
        chessTable.clear();
    }

    saveLayout() {
        let panel: UISaveLayout = g_UIManager.getOrCreatePanel("UISaveLayout");

    }

    loadLayout() {
        let panel: UILoadLayout = g_UIManager.getOrCreatePanel("UILoadLayout")
    }
    // update (dt) {}
}
