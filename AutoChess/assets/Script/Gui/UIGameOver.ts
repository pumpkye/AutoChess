import { g_UIManager } from "./UIManager";
import { g_UserData } from "../Data/UserData";

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
export default class UIGameOver extends cc.Component {

    @property(cc.Label)
    retLabel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    setResult(ret: string) {
        this.retLabel.string = ret;
    }

    onOkClick() {
        g_UIManager.closeAllGameUI();
        let panel = g_UIManager.getOrCreatePanel("UILobby");
        if (panel) {
            panel.setName(g_UserData.name);
        }
        g_UIManager.closePanel(this);
    }
    // update (dt) {}
}
