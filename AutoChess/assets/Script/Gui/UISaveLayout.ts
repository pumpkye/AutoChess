import { g_UIManager } from "./UIManager";
import { printDefault } from "../AutoBattle/OutPut/Printer";
import UIChessTable from "./UIChessTable";
import { g_layoutMessage } from "../Net/Layout";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UISaveLayout extends cc.Component {
    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    gridPos = { x: 0, y: 0 };
    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad() {
    // }
    start() {

    }

    async onOkClick() {
        if (this.editBox.string == "") {
            printDefault("名字不能为空");
            return;
        }
        let npcList = new Array();
        let chessTable: UIChessTable = g_UIManager.getPanel("UIChessTable");
        for (const key in chessTable.layout) {
            if (chessTable.layout.hasOwnProperty(key)) {
                const npc = chessTable.layout[key];
                npcList.push(npc);
            }
        }
        let ret: any = await g_layoutMessage.saveLayout(this.editBox.string, npcList);
        // let saveLayout = new SaveLayout(this.editBox.string, npcList);
        // let ret: any = await saveLayout.send();
        console.log(ret);
        if (ret.success) {
            g_UIManager.closePanel(this);
        }
    }

    onCloseClick() {
        g_UIManager.closePanel(this)
    }
    // update (dt) {}

}
