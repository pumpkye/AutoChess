"use strict";
cc._RF.push(module, '1e609knftdDDZ5Fs6YXJPiS', 'Helloworld');
// Script/Helloworld.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIManager_1 = require("./Gui/UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Helloworld = /** @class */ (function (_super) {
    __extends(Helloworld, _super);
    function Helloworld() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // @property(cc.Label)
    // label: cc.Label = null;
    // @property
    // text: string = 'hello';
    Helloworld.prototype.start = function () {
        // init logic
        // this.label.string = this.text;
        UIManager_1.g_UIManager.init();
        // g_InputCache.testLoadJson();
        // g_AutoBattle.test();
    };
    Helloworld = __decorate([
        ccclass
    ], Helloworld);
    return Helloworld;
}(cc.Component));
exports.default = Helloworld;

cc._RF.pop();