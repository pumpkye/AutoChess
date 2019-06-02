(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/Model/ChessMonster.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2c9a8rXLiVNAJ7cEOICNEyU', 'ChessMonster', __filename);
// Script/AutoBattle/Model/ChessMonster.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ChessNpc_1 = require("./ChessNpc");
/**
 * @description 野怪
 */
var ChessMonster = /** @class */ (function (_super) {
    __extends(ChessMonster, _super);
    function ChessMonster(thisId, baseId, level, teamA) {
        return _super.call(this, thisId, baseId, level, teamA) || this;
    }
    return ChessMonster;
}(ChessNpc_1.ChessNpc));
exports.ChessMonster = ChessMonster;

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
        //# sourceMappingURL=ChessMonster.js.map
        