import { g_UIManager } from "./Gui/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    start() {
        g_UIManager.init();
    }
}
