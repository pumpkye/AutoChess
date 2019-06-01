import { GameConfig } from "../GameConfig";

var uiPrefabConfig = {
    // UiOperation: { name: "UIOperation", zIndex: 0 },
    UIChessTable: { name: "UIChessTable", createAfterLoad: true, zIndex: 0 },
    UIMain: { name: "UIMain", createAfterLoad: true, zIndex: 1 },
    UISetNpc: { name: "UISetNpc" },
    UISaveLayout: { name: "UISaveLayout" },
    UILoadLayoutItem: { name: "UILoadLayoutItem" },
    UILoadLayout: { name: "UILoadLayout" },
    // UiReliveIntroduction : {
    //     nameInExam : "UiReliveIntroduction",
    //     namePassExam : "UiReliveIntroductionPE",
    //     // name : "UiReliveIntroduction",
    //     zIndex:0
    // }, //根据审核状态加载不同的prefab, nameInExam 表示在审核中, namePassExam 表示审核已通过

}

class UIManager {
    node: cc.Node = null;
    constructor() {

    }
    init() {
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
     * 根据prefab创建一个node，并将该node引用保存在uiPrefabConfig里
     * @param {string} panelName 同uiPrefabConfig的key
     * @returns {cc.Component} 
     */
    getOrCreatePanel(panelName) {
        console.log("getOrCreatePanel", panelName)
        if (uiPrefabConfig.hasOwnProperty(panelName)) {
            if (uiPrefabConfig[panelName]) {
                if (uiPrefabConfig[panelName].panel) {
                    return uiPrefabConfig[panelName].panel
                }
                let panel = this.createPanelOnly(panelName)
                if (panel) {
                    uiPrefabConfig[panelName].panel = panel
                    if (uiPrefabConfig[panelName].zIndex) {
                        panel.node.zIndex = uiPrefabConfig[panelName].zIndex
                    }
                    panel.node.parent = this.node
                }
                return panel
            }
        } else {
            console.log("创建panel失败，请检查uiPrefabConfig里是否包含该项配置")
        }
    }

    /**
     * 根据prefab创建一个node，并且不保存该node的引用
     * @param {string} panelName
     * @return {cc.Component} 与prefab名称相同uiComponet对象
     */
    createPanelOnly(panelName) {
        if (uiPrefabConfig.hasOwnProperty(panelName)) {
            if (uiPrefabConfig[panelName].prefab) {
                let panelNode = cc.instantiate(uiPrefabConfig[panelName].prefab)
                if (panelNode != null) {
                    let panel = panelNode.getComponent(uiPrefabConfig[panelName].prefab.name)
                    return panel
                }
            } else {
                console.log("创建panel失败，该panel的prefab未加载")
            }
        } else {
            console.log("创建panel失败，请检查uiPrefabConfig里是否包含该项配置")
        }
    }

    /**
     * 获取一个panel
     * @param {string} panelName 
     * @returns {cc.Component} 
     */
    getPanel(panelName) {
        if (uiPrefabConfig.hasOwnProperty(panelName)) {
            return uiPrefabConfig[panelName].panel
        }

        // if (panelName == "UIHome") {
        //     return this.uiHome
        // }
        return null
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
        if (uiPrefabConfig.hasOwnProperty(panelName) && uiPrefabConfig[panelName].panel) {
            uiPrefabConfig[panelName].panel.node.destroy()
            uiPrefabConfig[panelName].panel = null
        }

    }

    /**
    * 显示一个panel，如果这个panel未创建则创建这个panel
    * @param {string} panelName 同uiPrefabConfig的key
    * @returns {cc.Component} panel 
    */
    showPanel(panelName) {
        // if (panelName == "UIHome") {
        //     this.uiHome.node.active = true
        //     return this.uiHome
        // }
        let panel = this.getOrCreatePanel(panelName)
        if (panel) {
            panel.node.active = true
            return panel
        }
    }

    /**
     * 隐藏一个panel
     * @param {cc.Component} panel 需要隐藏的panel component
     */
    hidePanel(panel) {
        // if (panel == this.uiHome) {
        //     this.uiHome.node.active = false
        //     return this.uiHome
        // }
        if (panel != null && panel.node != null) {
            panel.node.active = false
            return panel
        }
    }
}

export var g_UIManager = new UIManager();