import { GameConfig } from "../config/GameConfig";
import { MessageBase } from "../Message/MessagegBase";

var uiPrefabConfig = {
    // UiOperation: { name: "UIOperation", zIndex: 0 },
    UIChessTable: { name: "UIChessTable", createAfterLoad: true, zIndex: 0 },
    UIMain: { name: "UIMain", createAfterLoad: true, zIndex: 1 },
    UISetNpc: { name: "UISetNpc", zIndex: 10 },
    UISaveLayout: { name: "UISaveLayout", zIndex: 10 },
    UILoadLayoutItem: { name: "UILoadLayoutItem", zIndex: 10 },
    UILoadLayout: { name: "UILoadLayout", zIndex: 10 },
    UILogin: { name: "UILogin", zIndex: 10 },
    UIGameTable: { name: "UIGameTable", zIndex: 0 },
    UIGameMain: { name: "UIGameMain", zIndex: 10 },
    UICardList: { name: "UICardList", zIndex: 10 },
    UILobby: { name: "UILobby", zIndex: 10 },
    UIRoom: { name: "UIRoom", zIndex: 10 },
    UIRoomItem: { name: "UIRoomItem", zIndex: 10 },
    // UiReliveIntroduction : {
    //     nameInExam : "UiReliveIntroduction",
    //     namePassExam : "UiReliveIntroductionPE",
    //     // name : "UiReliveIntroduction",
    //     zIndex:0
    // }, //根据审核状态加载不同的prefab, nameInExam 表示在审核中, namePassExam 表示审核已通过

}

var dataUI = ["UIChessTable", "UIMain", "UISetNpc", "UISaveLayout", "UILoadLayout"]
var gameUI = ["UIGameTable", "UIGameMain", "UICardList"]

class UIManager {
    uiList: { [index: string]: any };
    node: cc.Node = null;
    constructor() {

    }
    init() {
        this.uiList = {};
        this.node = cc.find('Canvas/Gui');
        this.loadPrefabRes();
    }

    /**
     * 预加载所有的UIPrefab
     * uiPrefabConfig包含了需要加载的prefab和该prefab的加载状态。资源的加载是异步的，通过回调函数设置prefab的加载状态，只有加载完成的prefab才可以被创建。
     * 
     */
    loadPrefabRes() {
        for (const k in uiPrefabConfig) {
            if (uiPrefabConfig.hasOwnProperty(k)) {
                const e = uiPrefabConfig[k]
                e.prefab = null
                e.panel = null
                if (e.name != null) {
                    cc.loader.loadRes("UIPrefab/" + e.name, cc.Prefab, function (err, prefab) {
                        g_UIManager.setPrefab(prefab)
                    })
                }
            }
        }
        this.loadPrefabResByExamine();
    }

    /**
     *   根据当前审核状态加载不同的资源
     */
    loadPrefabResByExamine() {
        for (const key in uiPrefabConfig) {
            if (uiPrefabConfig.hasOwnProperty(key)) {
                const e = uiPrefabConfig[key];
                if (e.nameInExam || e.namePassExam) {
                    if (e.prefab) {
                        // 若当前prefab与审核状态不一致则卸载该资源
                        if (GameConfig.isExamine && e.prefab.name != e.nameInExam) {
                            cc.loader.releaseRes("UIPrefab/" + e.prefab.name, cc.Prefab)
                            e.prefab = null
                        } else if (!GameConfig.isExamine && e.prefab.name != e.namePassExam) {
                            cc.loader.releaseRes("UIPrefab/" + e.prefab.name, cc.Prefab)
                            e.prefab = null
                        }
                    }
                    if (e.prefab == null) {
                        if (GameConfig.isExamine && e.nameInExam) {
                            cc.loader.loadRes("UIPrefab/" + e.nameInExam, cc.Prefab, function (err, prefab: cc.Prefab) {

                                g_UIManager.setPrefab(prefab)
                            })
                        } else if (!GameConfig.isExamine && e.namePassExam) {
                            cc.loader.loadRes("UIPrefab/" + e.namePassExam, cc.Prefab, function (err, prefab: cc.Prefab) {
                                g_UIManager.setPrefab(prefab)
                            })
                        }
                    }
                }
            }
        }
    }

    /**
     * @param prefab 通过loadRes加载的prefab
     */
    setPrefab(prefab: cc.Prefab) {
        let ret = false
        if (uiPrefabConfig != null) {
            if (uiPrefabConfig.hasOwnProperty(prefab.name) && uiPrefabConfig[prefab.name].name == prefab.name) {
                uiPrefabConfig[prefab.name].prefab = prefab
                ret = true
            } else {
                for (const key in uiPrefabConfig) {
                    if (uiPrefabConfig.hasOwnProperty(key)) {
                        const e = uiPrefabConfig[key];
                        if ((e.name != null && e.name == prefab.name)
                            || (e.nameInExam != null && e.nameInExam == prefab.name)
                            || (e.namePassExam != null && e.namePassExam == prefab.name)) {
                            e.prefab = prefab
                            ret = true
                        }
                    }
                }
            }
        }
        if (!ret) {
            console.log("load prefab", prefab.name, "fail,can not find it in config")
        } else if (uiPrefabConfig[prefab.name].createAfterLoad) {
            g_UIManager.getOrCreatePanel(prefab.name);
        }
        return ret
    }

    /**
     * 根据prefab创建一个node，并将该node引用保存在UIManager的uiList里
     * @param panelName 同uiPrefabConfig的key 
     */
    getOrCreatePanel(panelName: string) {
        console.log("getOrCreatePanel", panelName)
        if (this.uiList[panelName]) {
            return this.uiList[panelName];
        }

        if (uiPrefabConfig.hasOwnProperty(panelName)) {
            if (uiPrefabConfig[panelName]) {
                let panel = this.createPanelOnly(panelName);
                if (panel) {
                    this.uiList[panelName] = panel;
                    if (uiPrefabConfig[panelName].zIndex) {
                        panel.node.zIndex = uiPrefabConfig[panelName].zIndex;
                    }
                    panel.node.parent = this.node;
                }
                return panel;
            }
        } else {
            console.log("创建panel失败，请检查uiPrefabConfig里是否包含该项配置")
        }
    }

    /**
     * 根据prefab创建一个node，并且不保存该node的引用
     * @param panelName
     * @return {cc.Component} 与prefab名称相同uiComponet对象
     */
    createPanelOnly(panelName: string) {
        if (uiPrefabConfig.hasOwnProperty(panelName)) {
            if (uiPrefabConfig[panelName].prefab) {
                let panelNode = cc.instantiate(uiPrefabConfig[panelName].prefab);
                if (panelNode != null) {
                    let panel = panelNode.getComponent(uiPrefabConfig[panelName].prefab.name);
                    return panel;
                }
            } else {
                console.log("创建panel失败，该panel的prefab未加载");
            }
        } else {
            console.log("创建panel失败，请检查uiPrefabConfig里是否包含该项配置");
        }
    }

    /**
     * 获取一个panel
     * @param panelName  
     */
    getPanel(panelName: string) {
        return this.uiList[panelName];
    }

    closePanel(panelName: string);
    closePanel(panel: cc.Component);
    /**
     * 关闭一个panel
     * @param {string} panelName 
     */
    closePanel(arg1: string | cc.Component) {
        let panelName = "";
        if (typeof (arg1) === "string") {
            panelName = arg1;
        } else {
            panelName = arg1.node.name;
        }
        if (this.uiList[panelName]) {
            this.uiList[panelName].node.destroy();
            delete (this.uiList[panelName]);
        }

    }

    /**
    * 显示一个panel，如果这个panel未创建则创建这个panel
    * @param panelName 同uiPrefabConfig的key
    * @returns panel 
    */
    showPanel(panelName: string) {
        let panel = this.getOrCreatePanel(panelName);
        if (panel) {
            panel.node.active = true;
            return panel;
        }
    }

    /**
     * 隐藏一个panel
     * @param panel 需要隐藏的panel
     */
    hidePanel(panel: cc.Component) {
        if (panel != null && panel.node != null) {
            panel.node.active = false;
            return panel;
        }
    }

    closeAllDataUI() {
        for (let i = 0; i < dataUI.length; i++) {
            const name = dataUI[i];
            this.closePanel(name);
        }
    }

    closeAllGameUI() {
        for (let i = 0; i < gameUI.length; i++) {
            const name = gameUI[i];
            this.closePanel(name);
        }
    }

    /**
     * 向管理器中维护的ui分发消息
     * @param msg 
     */
    dispatchMsg(msg: MessageBase) {
        for (const name in this.uiList) {
            if (this.uiList.hasOwnProperty(name)) {
                const panel = this.uiList[name];
                if (typeof (panel[msg.name]) === "function") {
                    panel[msg.name](msg.data);
                }
            }
        }
    }
}

export const g_UIManager = new UIManager();