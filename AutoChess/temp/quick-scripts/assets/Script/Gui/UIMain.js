(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Gui/UIMain.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '37017cWNrRFcLpkgFWjEENS', 'UIMain', __filename);
// Script/Gui/UIMain.ts

Object.defineProperty(exports, "__esModule", { value: true });
var InputCache_1 = require("../AutoBattle/Input/InputCache");
var AutoBattle_1 = require("../AutoBattle/AutoBattle");
var UIManager_1 = require("./UIManager");
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIMain = /** @class */ (function (_super) {
    __extends(UIMain, _super);
    function UIMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startBattleBtn = null;
        _this.text = 'hello';
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    UIMain.prototype.start = function () {
        this.battleInfo = new InputCache_1.BattleInfo(1);
        this.battleInfo.addMatch(101, 102);
    };
    UIMain.prototype.startBattle = function () {
        console.log("onStartBattleTouch");
        var thisId = 0;
        var chessTable = UIManager_1.g_UIManager.getPanel("UIChessTable");
        console.log(chessTable.layout);
        var layoutInfoA = new InputCache_1.LayoutInfo(101);
        var layoutInfoB = new InputCache_1.LayoutInfo(102);
        for (var idx in chessTable.layout) {
            if (chessTable.layout.hasOwnProperty(idx)) {
                var npc = chessTable.layout[idx];
                thisId = thisId + 1;
                var y = Math.floor(Number(idx) / 8);
                npc.thisId = thisId;
                if (y > 3) {
                    layoutInfoB.addChessNpcInfo(npc);
                }
                else {
                    layoutInfoA.addChessNpcInfo(npc);
                }
            }
        }
        this.battleInfo.clearLayout();
        this.battleInfo.addLayout(layoutInfoA);
        this.battleInfo.addLayout(layoutInfoB);
        console.log(this.battleInfo);
        InputCache_1.g_InputCache.setBattleInfo(this.battleInfo);
        AutoBattle_1.g_AutoBattle.doAutoBattle();
    };
    UIMain.prototype.clearLayout = function () {
        var chessTable = UIManager_1.g_UIManager.getPanel("UIChessTable");
        chessTable.clear();
    };
    UIMain.prototype.saveLayout = function () {
        var panel = UIManager_1.g_UIManager.getOrCreatePanel("UISaveLayout");
    };
    UIMain.prototype.loadLayout = function () {
        var panel = UIManager_1.g_UIManager.getOrCreatePanel("UILoadLayout");
    };
    __decorate([
        property(cc.Button)
    ], UIMain.prototype, "startBattleBtn", void 0);
    __decorate([
        property
    ], UIMain.prototype, "text", void 0);
    UIMain = __decorate([
        ccclass
    ], UIMain);
    return UIMain;
}(cc.Component));
exports.default = UIMain;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=UIMain.js.map
        