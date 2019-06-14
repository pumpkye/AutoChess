import { g_UserData } from "../Data/UserData";
import { g_RoomData } from "../Data/RoomData";
import { GameWorsConfig } from "../Config/GameWordsConfig";
import { g_UIManager } from "./UIManager";
import UICardPool from "./UICardPool";
import { BattleInfo, LayoutInfo } from "../AutoBattle/Input/InputCache";
import { npc_data } from "../AutoBattle/Tbx/npc_data";
import { g_Util } from "../AutoBattle/Util";
import UIGameTable from "./UIGameTable";
import { MsgBattleResult } from "../Message/RoomMsg";

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
export default class UIGameMain extends cc.Component {

    @property(cc.Label)
    playerNameLabel: cc.Label = null;

    @property(cc.Label)
    roundIdxLabel: cc.Label = null;

    @property(cc.Label)
    roundStateLabel: cc.Label = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property(cc.Label)
    goldLabel: cc.Label = null;

    @property(cc.Label)
    levelLabel: cc.Label = null;

    @property(cc.Label)
    expLabel: cc.Label = null;

    countdownTime: number;

    @property(cc.Label)
    layoutACost: cc.Label = null;

    @property(cc.Label)
    layoutABuff: cc.Label = null;

    @property(cc.Label)
    battleResult: cc.Label = null;

    battleInfo: BattleInfo;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.battleInfo = new BattleInfo(1);
        this.battleInfo.addMatch(101, 102);
    }

    start() {
        this.refreshRoundInfo();
    }

    refreshRoundInfo() {
        this.playerNameLabel.string = g_UserData.name;
        this.roundIdxLabel.string = "round " + g_RoomData.roundIdx;
        this.roundStateLabel.string = GameWorsConfig.battleState[g_RoomData.roundState];
        let finishTime = g_RoomData.curStateFinishTime;
        this.countdownTime = finishTime - new Date().getTime();
        this.timeLabel.string = Math.ceil(this.countdownTime / 1000).toString();
    }

    refreshPlayerInfo() {
        let playInfo = g_RoomData.getMainPlayerInfo();
        this.goldLabel.string = "gold:" + playInfo.gold;
        this.levelLabel.string = "level:" + playInfo.level;
        this.expLabel.string = "exp:" + playInfo.exp;
    }

    setLastBattleResult(win: boolean, point: number) {
        let str = "";
        if (win) {
            str = "win - " + point + ":0";
        } else {
            str = "lost-0:" + point;
        }
        this.battleResult.string = str;
    }

    msgBattleResult(msg: MsgBattleResult['data']) {
        for (let i = 0; i < msg.resultList.length; i++) {
            const ret = msg.resultList[i];
            if (ret.playerId == g_UserData.id) {
                this.setLastBattleResult(ret.win, ret.point);
                return;
            }
        }
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
    }

    refreshBattleInfo() {
        let chessTable: UIGameTable = g_UIManager.getPanel("UIGameTable");
        let layoutInfoA = new LayoutInfo(101);
        let layoutInfoB = new LayoutInfo(102);
        for (const idx in chessTable.layout) {
            if (chessTable.layout.hasOwnProperty(idx)) {
                const npc = chessTable.layout[idx];
                let y = Math.floor(Number(idx) / 8);
                if (y < 4) {
                    layoutInfoA.addChessNpcInfo(npc);
                }
            }
        }
        this.battleInfo.clearLayout();
        this.battleInfo.addLayout(layoutInfoA);
        this.battleInfo.addLayout(layoutInfoB);
    }

    openShop() {
        let panel: UICardPool = g_UIManager.getOrCreatePanel("UICardPool");
        if (panel) {
            panel.refreshPool();
        }
    }

    update(dt) {
        this.countdownTime = this.countdownTime - dt * 1000;
        this.timeLabel.string = Math.ceil(this.countdownTime / 1000).toString();
    }
}
