import { g_RoomData } from "../Data/RoomData";
import UICardListItem from "./UICardListItem";
import { g_UIManager } from "./UIManager";
import { ChessNpcInfo } from "../AutoBattle/Input/InputCache";

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
export default class UIcardList extends cc.Component {

    @property(cc.Node)
    container: cc.Node = null;

    /**
     * 当前手牌中被选中的npc
     */
    currentSelectedNpcInfo: ChessNpcInfo;
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

    refreshList() {
        this.container.removeAllChildren();
        let playerInfo = g_RoomData.getMainPlayerInfo()
        if (!playerInfo) {
            return;
        }
        let list = playerInfo.cardList;
        for (let i = 0; i < list.length; i++) {
            const info = list[i];
            let item: UICardListItem = g_UIManager.createPanelOnly("UICardListItem");
            if (item) {
                item.setData(info.npcInfo, info.idx);
                item.node.x = -700 + 200 * info.idx;
                item.node.parent = this.container;
            }
        }
    }

    /**
     * 
     * @param thisId 选中的npcId
     */
    selectItem(npcInfo: ChessNpcInfo) {
        //二次点击则取消选中
        if (this.currentSelectedNpcInfo && npcInfo.thisId == this.currentSelectedNpcInfo.thisId) {
            this.currentSelectedNpcInfo = null;
        } else {
            this.currentSelectedNpcInfo = npcInfo;
        }
        for (let i = 0; i < this.container.children.length; i++) {
            const child = this.container.children[i];
            let item = child.getComponent(UICardListItem);
            if (item) {
                item.setSelected(this.currentSelectedNpcInfo && item.npcInfo.thisId == this.currentSelectedNpcInfo.thisId);
            }
        }
    }

    // update (dt) {}
}
