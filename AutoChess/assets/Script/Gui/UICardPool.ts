import { g_RoomData } from "../Data/RoomData";
import { g_UIManager } from "./UIManager";
import UICardPoolItem from "./UICardPoolItem";
import { MsgReqRefreshCardPool } from "../Message/RoomMsg";
import { g_MsgHandler } from "../Connect/MsgHandler";

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
export default class UICardPool extends cc.Component {
    @property(cc.Node)
    container: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.node.on('touchstart', function (event) {
            event.stopPropagation();
        }, this);

        this.node.on('touchend', function (event) {
            event.stopPropagation();
        }, this);
    }

    refreshPool() {
        this.container.removeAllChildren();
        let poolData = g_RoomData.cardPool;
        for (let i = 0; i < poolData.length; i++) {
            const info = poolData[i];
            let item: UICardPoolItem = g_UIManager.createPanelOnly("UICardPoolItem");
            if (item) {
                item.setData(info.baseId, info.idx);
                item.node.x = -600 + 300 * info.idx;
                item.node.parent = this.container;
            }
        }
    }

    reqRefresh() {
        let msg = new MsgReqRefreshCardPool()
        g_MsgHandler.sendMsg(msg);
    }

    lock() {

    }

    closePanel() {
        g_UIManager.closePanel(this);
    }

    // update (dt) {}
}
