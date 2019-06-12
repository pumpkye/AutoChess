import { g_UIManager } from "./UIManager";
import { g_layoutMessage } from "../Net/Layout";
import UILoadLayoutItem from "./UILoadLayoutItem";
import UIChessTable from "./UIChessTable";
import { ChessNpc } from "../AutoBattle/Model/ChessNpc";

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
export default class UILoadLayout extends cc.Component {
    @property(cc.Node)
    container: cc.Node = null;

    curSelectId: number;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.init();
    }

    async init() {
        console.log("UILoadLayout init");
        this.container.removeAllChildren();
        let ret = await g_layoutMessage.listAllLayout();
        console.log(ret);
        if (ret.success) {
            for (let i = 0; i < ret.layoutList.length; i++) {
                const layout = ret.layoutList[i];
                let item: UILoadLayoutItem = g_UIManager.createPanelOnly("UILoadLayoutItem");
                if (item) {
                    item.node.parent = this.container;
                    item.init(layout.id, layout.name);
                }
            }
        }
    }

    // update (dt) {}
    async layoutA() {
        let ret = await g_layoutMessage.getLayout(this.curSelectId);
        if (ret.success) {
            let chessTable: UIChessTable = g_UIManager.getPanel("UIChessTable");
            if (chessTable) {
                for (let i = 0; i < ret.layout.npcList.length; i++) {
                    const npc = ret.layout.npcList[i];
                    chessTable.setGridLabel(npc.pos.x, npc.pos.y, new ChessNpc(0, npc.baseId, npc.level, true));
                }
            }
        }
    }

    async layoutB() {
        let ret = await g_layoutMessage.getLayout(this.curSelectId);
        if (ret.success) {
            let chessTable: UIChessTable = g_UIManager.getPanel("UIChessTable");
            if (chessTable) {
                for (let i = 0; i < ret.layout.npcList.length; i++) {
                    const npc = ret.layout.npcList[i];
                    chessTable.setGridLabel(7 - npc.pos.x, 7 - npc.pos.y, new ChessNpc(0, npc.baseId, npc.level, false));
                }
            }
        }
    }

    onCloseClick() {
        g_UIManager.closePanel(this);
    }
}
