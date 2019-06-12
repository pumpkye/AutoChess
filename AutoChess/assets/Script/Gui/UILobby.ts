import { MsgReqEnterFreeRoom } from "../Message/RoomMsg";
import { g_MsgHandler } from "../Connect/MsgHandler";
import { g_UIManager } from "./UIManager";

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
export default class UILobby extends cc.Component {

    @property(cc.Label)
    playerNameLabel: cc.Label = null;

    @property
    text: string = 'hello';

    start() {

    }

    setName(name: string) {
        this.playerNameLabel.string = name;
    }

    reqEnterRoom() {
        let msg = new MsgReqEnterFreeRoom();
        g_MsgHandler.sendMsg(msg);
    }

    closePanel() {
        g_UIManager.closePanel(this);
    }
}
