(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Gui/UISetNpc.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a844eIymQREy6KXg/keCxTZ', 'UISetNpc', __filename);
// Script/Gui/UISetNpc.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIManager_1 = require("./UIManager");
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
var UISetNpc = /** @class */ (function (_super) {
    __extends(UISetNpc, _super);
    function UISetNpc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editBox = null;
        _this.gridText = null;
        _this.nameText = null;
        _this.hpText = null;
        _this.damageText = null;
        _this.gridPos = { x: 0, y: 0 };
        return _this;
    }
    // @property(cc.Label)
    // label: cc.Label = null;
    // @property
    // text: string = 'hello';
    // LIFE-CYCLE CALLBACKS:
    // onLoad() {
    // }
    UISetNpc.prototype.start = function () {
        this.hpText.string = "hp: 0";
        this.damageText.string = "damage: 0";
    };
    UISetNpc.prototype.onOkClick = function () {
        var baseId = Math.floor(Number(this.editBox.string) / 10);
        var level = Number(this.editBox.string) % 10;
        var npcData = new ChessNpc_1.ChessNpc(0, baseId, level, true);
        var chessTable = UIManager_1.g_UIManager.getPanel("UIChessTable");
        chessTable.setGridLabel(this.gridPos.x, this.gridPos.y, npcData);
        UIManager_1.g_UIManager.closePanel(this);
    };
    UISetNpc.prototype.onCloseClick = function () {
        UIManager_1.g_UIManager.closePanel(this);
    };
    // update (dt) {}
    UISetNpc.prototype.setGridPos = function (x, y) {
        this.gridPos.x = x;
        this.gridPos.y = y;
        this.gridText.string = "pos:(" + (x + 1) + "," + (y + 1) + ")";
    };
    UISetNpc.prototype.refreshInfo = function () {
        var baseId = Math.floor(Number(this.editBox.string) / 10);
        var level = Number(this.editBox.string) % 10;
        var npcData = new ChessNpc_1.ChessNpc(0, baseId, level, true);
        this.nameText.string = npcData.name;
        this.hpText.string = "hp: " + npcData.hp;
        this.damageText.string = "damage: " + npcData.damage;
    };
    __decorate([
        property(cc.EditBox)
    ], UISetNpc.prototype, "editBox", void 0);
    __decorate([
        property(cc.Label)
    ], UISetNpc.prototype, "gridText", void 0);
    __decorate([
        property(cc.Label)
    ], UISetNpc.prototype, "nameText", void 0);
    __decorate([
        property(cc.Label)
    ], UISetNpc.prototype, "hpText", void 0);
    __decorate([
        property(cc.Label)
    ], UISetNpc.prototype, "damageText", void 0);
    UISetNpc = __decorate([
        ccclass
    ], UISetNpc);
    return UISetNpc;
}(cc.Component));
exports.default = UISetNpc;

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
        //# sourceMappingURL=UISetNpc.js.map
        