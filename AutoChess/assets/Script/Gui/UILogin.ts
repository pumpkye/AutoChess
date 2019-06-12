import { g_LoginData } from "../Data/LoginData";
import { g_UIManager } from "./UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UILogin extends cc.Component {
    @property(cc.EditBox)
    nameEdit: cc.EditBox = null;

    start() {

    }

    onOkClick() {
        let name;
        if (this.nameEdit.string != "") {
            name = this.nameEdit.string;
        }
        g_LoginData.login(name);
    }

    onCloseClick() {
        g_UIManager.closePanel(this);
    }

}
