(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/Summon.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b20fcZxPjRA/4dEvwL4lwoS', 'Summon', __filename);
// Script/AutoBattle/SkillEffect/Summon.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var AutoBattleManager_1 = require("../AutoBattleManager");
var ChessNpc_1 = require("../Model/ChessNpc");
/**
 * 召唤npcId为[0]的npc，召唤[1]个
 */
var Summon = /** @class */ (function (_super) {
    __extends(Summon, _super);
    function Summon() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Summon.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.summon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Summon.prototype, "effName", {
        get: function () {
            return "summon";
        },
        enumerable: true,
        configurable: true
    });
    Summon.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.attacker || data.attacker.isDead) {
            return false;
        }
        var npcBaseId = data.skillEff.effArr[0];
        var count = data.skillEff.effArr[1];
        var npcList = AutoBattleManager_1.g_AutoBattleManager.getFriendList(data.attacker);
        var chessTable = AutoBattleManager_1.g_AutoBattleManager.chessTable;
        for (var i = 0; i < count; i++) {
            var pos = AutoBattleManager_1.g_AutoBattleManager.getNearBlankPosition(data.attacker.getPosition());
            if (pos) {
                var pet = new ChessNpc_1.ChessPet(AutoBattleManager_1.g_AutoBattleManager.generateThisId(), npcBaseId, data.attacker.level, data.attacker.isTeamA, data.attacker.thisId);
                pet.setPosition(pos.x, pos.y);
                pet.initSkillList();
                npcList.push(pet);
                chessTable[pos.x][pos.y] = pet;
            }
        }
        return true;
    };
    return Summon;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.Summon = Summon;

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
        //# sourceMappingURL=Summon.js.map
        