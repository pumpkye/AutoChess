"use strict";
cc._RF.push(module, '82e85WpwNFGjYqiawkM5bHI', 'UILoadLayoutItem');
// Script/Gui/UILoadLayoutItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Layout_1 = require("../Net/Layout");
var UIManager_1 = require("./UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UILoadLayoutItem = /** @class */ (function (_super) {
    __extends(UILoadLayoutItem, _super);
    function UILoadLayoutItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameText = null;
        return _this;
    }
    UILoadLayoutItem.prototype.init = function (id, name) {
        this.nameText.string = name;
        this.id = id;
    };
    UILoadLayoutItem.prototype.onSelect = function () {
        var panel = UIManager_1.g_UIManager.getPanel("UILoadLayout");
        if (panel) {
            panel.curSelectId = this.id;
            console.log("select", this.id);
        }
    };
    UILoadLayoutItem.prototype.onDeleteClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Layout_1.g_layoutMessage.deleteLayout(this.id)];
                    case 1:
                        ret = _a.sent();
                        console.log(ret);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Label)
    ], UILoadLayoutItem.prototype, "nameText", void 0);
    UILoadLayoutItem = __decorate([
        ccclass
    ], UILoadLayoutItem);
    return UILoadLayoutItem;
}(cc.Component));
exports.default = UILoadLayoutItem;

cc._RF.pop();