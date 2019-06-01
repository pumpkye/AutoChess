(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Gui/UILoadLayout.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2c3eahRq8xP3ZKk2wigKXOc', 'UILoadLayout', __filename);
// Script/Gui/UILoadLayout.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIManager_1 = require("./UIManager");
var Layout_1 = require("../Net/Layout");
var ChessNpc_1 = require("../AutoBattle/Model/ChessNpc");
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
var UILoadLayout = /** @class */ (function (_super) {
    __extends(UILoadLayout, _super);
    function UILoadLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.container = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    UILoadLayout.prototype.start = function () {
        this.init();
    };
    UILoadLayout.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, i, layout, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("UILoadLayout init");
                        return [4 /*yield*/, Layout_1.g_layoutMessage.listAllLayout()];
                    case 1:
                        ret = _a.sent();
                        console.log(ret);
                        if (ret.success) {
                            for (i = 0; i < ret.layoutList.length; i++) {
                                layout = ret.layoutList[i];
                                item = UIManager_1.g_UIManager.createPanelOnly("UILoadLayoutItem");
                                if (item) {
                                    item.node.parent = this.container;
                                    item.init(layout.id, layout.name);
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // update (dt) {}
    UILoadLayout.prototype.layoutA = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, chessTable, i, npc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Layout_1.g_layoutMessage.getLayout(this.curSelectId)];
                    case 1:
                        ret = _a.sent();
                        if (ret.success) {
                            chessTable = UIManager_1.g_UIManager.getPanel("UIChessTable");
                            if (chessTable) {
                                for (i = 0; i < ret.layout.npcList.length; i++) {
                                    npc = ret.layout.npcList[i];
                                    chessTable.setGridLabel(npc.pos.x, npc.pos.y, new ChessNpc_1.ChessNpc(0, npc.baseId, npc.level, true));
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UILoadLayout.prototype.layoutB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, chessTable, i, npc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Layout_1.g_layoutMessage.getLayout(this.curSelectId)];
                    case 1:
                        ret = _a.sent();
                        if (ret.success) {
                            chessTable = UIManager_1.g_UIManager.getPanel("UIChessTable");
                            if (chessTable) {
                                for (i = 0; i < ret.layout.npcList.length; i++) {
                                    npc = ret.layout.npcList[i];
                                    chessTable.setGridLabel(7 - npc.pos.x, 7 - npc.pos.y, new ChessNpc_1.ChessNpc(0, npc.baseId, npc.level, false));
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UILoadLayout.prototype.onCloseClick = function () {
        UIManager_1.g_UIManager.closePanel(this);
    };
    __decorate([
        property(cc.Node)
    ], UILoadLayout.prototype, "container", void 0);
    UILoadLayout = __decorate([
        ccclass
    ], UILoadLayout);
    return UILoadLayout;
}(cc.Component));
exports.default = UILoadLayout;

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
        //# sourceMappingURL=UILoadLayout.js.map
        