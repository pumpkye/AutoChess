import { g_UIManager } from "./UIManager";
import { MsgReqStartGame } from "../Message/RoomMsg";
import { g_MsgHandler } from "../Connect/MsgHandler";
import { g_RoomData } from "../Data/RoomData";
import UIRoomItem from "./UIRoomItem";

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
export default class UIRoom extends cc.Component {

    @property(cc.Node)
    container: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    closePanel() {
        g_UIManager.closePanel(this);
    }

    startGame() {
        let msg = new MsgReqStartGame()
        g_MsgHandler.sendMsg(msg);
    }

    refreshPlayerList() {
        this.container.removeAllChildren();
        let playerList = g_RoomData.playerList;
        for (const thisId in playerList) {
            if (playerList.hasOwnProperty(thisId)) {
                const info = playerList[thisId];
                let item: UIRoomItem = g_UIManager.createPanelOnly("UIRoomItem");
                if (item) {
                    item.setData(info.name);
                    item.node.parent = this.container;
                }
            }
        }
    }
}
