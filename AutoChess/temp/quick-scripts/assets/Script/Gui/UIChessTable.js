(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Gui/UIChessTable.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4a595W3VYFI74R1xJIMQY75', 'UIChessTable', __filename);
// Script/Gui/UIChessTable.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIManager_1 = require("./UIManager");
var InputCache_1 = require("../AutoBattle/Input/InputCache");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIChessTable = /** @class */ (function (_super) {
    __extends(UIChessTable, _super);
    function UIChessTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gridArr = new Array();
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    UIChessTable.prototype.start = function () {
        var lines = this.node.children;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var grids = line.children;
            for (var j = 0; j < grids.length; j++) {
                var grid = grids[j];
                grid.name = "grid" + j + i;
                grid.on('click', this.onGridClick, this);
                this.gridArr.push(grid);
                var label = cc.find("Background/npcName", grid).getComponent(cc.Label);
                label.string = "";
            }
        }
        this.layout = new Array();
    };
    UIChessTable.prototype.clear = function () {
        this.layout = new Array();
        for (var i = 0; i < this.gridArr.length; i++) {
            var node = this.gridArr[i];
            var label = cc.find("Background/npcName", node).getComponent(cc.Label);
            label.string = "";
        }
    };
    UIChessTable.prototype.onGridClick = function (event) {
        var gridName = event.target.parent.name;
        var x = gridName.substr(4, 1);
        var y = gridName.substr(5, 1);
        var panel = UIManager_1.g_UIManager.getOrCreatePanel("UISetNpc");
        panel.setGridPos(Number(x), Number(y));
    };
    UIChessTable.prototype.setGridLabel = function (x, y, npc) {
        console.log(npc);
        var idx = y * 8 + x;
        var node = this.gridArr[idx];
        var label = cc.find("Background/npcName", node).getComponent(cc.Label);
        label.string = npc.name;
        if (y > 3) {
            x = 7 - x;
            y = 7 - y;
        }
        var chessNpcInfo = new InputCache_1.ChessNpcInfo(0, npc.baseId, npc.level, { x: x, y: y });
        console.log(chessNpcInfo);
        if (!npc.baseId) {
            delete (this.layout[idx]);
        }
        else {
            this.layout[idx] = chessNpcInfo;
        }
    };
    UIChessTable = __decorate([
        ccclass
    ], UIChessTable);
    return UIChessTable;
}(cc.Component));
exports.default = UIChessTable;

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
        //# sourceMappingURL=UIChessTable.js.map
        