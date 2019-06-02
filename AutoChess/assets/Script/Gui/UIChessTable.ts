import { g_UIManager } from "./UIManager";
import UISetNpc from "./UISetNpc";
import { ChessNpc } from "../AutoBattle/Model/ChessNpc";
import { ChessNpcInfo } from "../AutoBattle/Input/InputCache";
import UIMain from "./UIMain";
import { npc_data } from "../AutoBattle/Tbx/npc_data";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIChessTable extends cc.Component {
    gridArr = new Array<cc.Node>();

    layout: Array<ChessNpcInfo>;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let lines = this.node.children;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            let grids = line.children;
            for (let j = 0; j < grids.length; j++) {
                const grid = grids[j];
                grid.name = `grid${j}${i}`;
                grid.on('click', this.onGridClick, this);
                this.gridArr.push(grid);
                let label = cc.find("Background/npcName", grid).getComponent(cc.Label);
                label.string = "";
            }
        }
        this.layout = new Array<ChessNpcInfo>();
    }

    clear() {
        this.layout = new Array();
        for (let i = 0; i < this.gridArr.length; i++) {
            const node = this.gridArr[i];
            let label = cc.find("Background/npcName", node).getComponent(cc.Label);
            label.string = "";
        }
    }

    onGridClick(event) {
        let gridName: string = event.target.parent.name;
        let x = gridName.substr(4, 1);
        let y = gridName.substr(5, 1);

        let panel: UISetNpc = g_UIManager.getOrCreatePanel("UISetNpc");
        panel.setGridPos(Number(x), Number(y));
    }

    setGridLabel(x: number, y: number, npc: ChessNpc) {
        console.log(npc);
        let idx = y * 8 + x;
        let node = this.gridArr[idx];
        if (y > 3) {
            x = 7 - x;
            y = 7 - y;
        }
        if (!npc.baseId) {
            delete (this.layout[idx]);
        } else if (npc_data[npc.baseId]) {
            let label = cc.find("Background/npcName", node).getComponent(cc.Label);
            label.string = npc.name;
            let chessNpcInfo = new ChessNpcInfo(0, npc.baseId, npc.level, { x: x, y: y })
            console.log(chessNpcInfo);
            this.layout[idx] = chessNpcInfo;
        }
        let panel: UIMain = g_UIManager.getPanel("UIMain")
        if (panel) {
            panel.refreshCostBuff();
        }
    }
    // update (dt) {}
}
