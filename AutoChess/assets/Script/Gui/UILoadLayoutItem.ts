import { g_layoutMessage } from "../Net/Layout";
import { g_UIManager } from "./UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UILoadLayoutItem extends cc.Component {
    @property(cc.Label)
    nameText: cc.Label = null;
    id: number;
    init(id: number, name: string) {
        this.nameText.string = name;
        this.id = id;
    }

    onSelect() {
        let panel = g_UIManager.getPanel("UILoadLayout")
        if (panel) {
            panel.curSelectId = this.id;
            console.log("select", this.id);
        }
    }

    async onDeleteClick() {
        let ret = await g_layoutMessage.deleteLayout(this.id);
        console.log(ret);
    }
}