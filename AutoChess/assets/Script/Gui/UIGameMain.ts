import { g_UserData } from "../Data/UserData";
import { g_RoomData } from "../Data/RoomData";
import { WorsConfig } from "../config/WordsConfig";

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
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.refreshRoundInfo();
    }

    refreshRoundInfo() {
        this.playerNameLabel.string = g_UserData.name;
        this.roundIdxLabel.string = "round " + g_RoomData.roundIdx;
        this.roundStateLabel.string = WorsConfig.battleState[g_RoomData.roundState];
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

    update(dt) {
        this.countdownTime = this.countdownTime - dt * 1000;
        this.timeLabel.string = Math.ceil(this.countdownTime / 1000).toString();
    }
}
