(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/WarCry.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '084a0sutkpN1YMs52Tmd6cN', 'WarCry', __filename);
// Script/AutoBattle/SkillEffect/WarCry.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var AutoBattleManager_1 = require("../AutoBattleManager");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 战吼，使得自己和周围[0]格单位受到的伤害减少[1]%,持续[2]秒
 */
var WarCry = /** @class */ (function (_super) {
    __extends(WarCry, _super);
    function WarCry() {
        return _super.call(this) || this;
    }
    Object.defineProperty(WarCry.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.warCry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WarCry.prototype, "effName", {
        get: function () {
            return "warCry";
        },
        enumerable: true,
        configurable: true
    });
    WarCry.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.attacker || data.attacker.isDead) {
            return false;
        }
        var range = data.skillEff.effArr[0];
        var per = data.skillEff.effArr[1];
        var lifeTime = data.skillEff.effArr[2];
        var hitNpc = this.getRandomNpc(AutoBattleManager_1.g_AutoBattleManager.getFriendList(data.attacker), 100, range, { x: data.attacker.posX, y: data.attacker.posY });
        for (var i = 0; i < hitNpc.length; i++) {
            var npc = hitNpc[i];
            var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, npc);
            buff.setAttrChange("warCry", per);
            npc.addBuff(buff);
        }
        return true;
    };
    return WarCry;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.WarCry = WarCry;

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
        //# sourceMappingURL=WarCry.js.map
        