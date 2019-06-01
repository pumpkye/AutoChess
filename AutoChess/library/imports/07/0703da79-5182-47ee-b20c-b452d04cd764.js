"use strict";
cc._RF.push(module, '0703dp5UYJH7rIMtFLQTNdk', 'ChessMonster');
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