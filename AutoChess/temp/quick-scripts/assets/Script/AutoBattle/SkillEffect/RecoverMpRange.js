(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/RecoverMpRange.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aad4dxKxz5EDq5Q33vtHF8O', 'RecoverMpRange', __filename);
// Script/AutoBattle/SkillEffect/RecoverMpRange.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var AutoBattleManager_1 = require("../AutoBattleManager");
var Printer_1 = require("../OutPut/Printer");
/**
 * 为所有友军回复[0]点魔法
 */
var RecoverMpRange = /** @class */ (function (_super) {
    __extends(RecoverMpRange, _super);
    function RecoverMpRange() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RecoverMpRange.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.recoverMpRange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecoverMpRange.prototype, "effName", {
        get: function () {
            return "recoverMpRange";
        },
        enumerable: true,
        configurable: true
    });
    RecoverMpRange.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var mp = data.skillEff.effArr[0];
        var hitNpc = AutoBattleManager_1.g_AutoBattleManager.getFriendList(data.attacker);
        for (var i = 0; i < hitNpc.length; i++) {
            var npc = hitNpc[i];
            Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.recoverMp, { npc: npc, mp: mp });
            npc.mp = npc.mp + mp;
        }
        return true;
    };
    return RecoverMpRange;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.RecoverMpRange = RecoverMpRange;

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
        //# sourceMappingURL=RecoverMpRange.js.map
        