"use strict";
cc._RF.push(module, '82e508DvTtL0axeaI2WDh19', 'UIHome');
// Script/Gui/UIHome.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIHome = /** @class */ (function (_super) {
    __extends(UIHome, _super);
    function UIHome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        return _this;
    }
    UIHome.prototype.start = function () {
        // init logic
        this.label.string = this.text;
    };
    __decorate([
        property(cc.Label)
    ], UIHome.prototype, "label", void 0);
    __decorate([
        property
    ], UIHome.prototype, "text", void 0);
    UIHome = __decorate([
        ccclass
    ], UIHome);
    return UIHome;
}(cc.Component));
exports.default = UIHome;

cc._RF.pop();