(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Gui/UISaveLayout.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '46ffeSGCSFJqpQU4my7BacJ', 'UISaveLayout', __filename);
// Script/Gui/UISaveLayout.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIManager_1 = require("./UIManager");
var Printer_1 = require("../AutoBattle/OutPut/Printer");
var Layout_1 = require("../Net/Layout");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UISaveLayout = /** @class */ (function (_super) {
    __extends(UISaveLayout, _super);
    function UISaveLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editBox = null;
        _this.gridPos = { x: 0, y: 0 };
        return _this;
        // update (dt) {}
    }
    // @property(cc.Label)
    // label: cc.Label = null;
    // @property
    // text: string = 'hello';
    // LIFE-CYCLE CALLBACKS:
    // onLoad() {
    // }
    UISaveLayout.prototype.start = function () {
    };
    UISaveLayout.prototype.onOkClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var npcList, chessTable, key, npc, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.editBox.string == "") {
                            Printer_1.printDefault("名字不能为空");
                            return [2 /*return*/];
                        }
                        npcList = new Array();
                        chessTable = UIManager_1.g_UIManager.getPanel("UIChessTable");
                        for (key in chessTable.layout) {
                            if (chessTable.layout.hasOwnProperty(key)) {
                                npc = chessTable.layout[key];
                                npcList.push(npc);
                            }
                        }
                        return [4 /*yield*/, Layout_1.g_layoutMessage.saveLayout(this.editBox.string, npcList)];
                    case 1:
                        ret = _a.sent();
                        // let saveLayout = new SaveLayout(this.editBox.string, npcList);
                        // let ret: any = await saveLayout.send();
                        console.log(ret);
                        if (ret.success) {
                            UIManager_1.g_UIManager.closePanel(this);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UISaveLayout.prototype.onCloseClick = function () {
        UIManager_1.g_UIManager.closePanel(this);
    };
    __decorate([
        property(cc.EditBox)
    ], UISaveLayout.prototype, "editBox", void 0);
    UISaveLayout = __decorate([
        ccclass
    ], UISaveLayout);
    return UISaveLayout;
}(cc.Component));
exports.default = UISaveLayout;

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
        //# sourceMappingURL=UISaveLayout.js.map
        