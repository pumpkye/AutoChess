(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/FlashBoom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9f206KPt8BJl4xIBFSECSk8', 'FlashBoom', __filename);
// Script/AutoBattle/SkillEffect/FlashBoom.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var AutoBattleManager_1 = require("../AutoBattleManager");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 闪光弹，使敌方目标短暂致盲，所有友军有[0]%的概率闪避攻击，持续[1]秒
 */
var FlashBoom = /** @class */ (function (_super) {
    __extends(FlashBoom, _super);
    function FlashBoom() {
        return _super.call(this) || this;
    }
    Object.defineProperty(FlashBoom.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.flashBoom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FlashBoom.prototype, "effName", {
        get: function () {
            return "flashBoom";
        },
        enumerable: true,
        configurable: true
    });
    FlashBoom.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        var per = data.skillEff.effArr[0];
        var lifeTime = data.skillEff.effArr[1];
        var hitNpc = AutoBattleManager_1.g_AutoBattleManager.getFriendList(data.attacker);
        for (var i = 0; i < hitNpc.length; i++) {
            var defender = hitNpc[i];
            var buff = new ChessBuff_1.ChessBuff(lifeTime, 0, defender);
            buff.setAttrChange("miss", per);
            defender.addBuff(buff);
        }
        return true;
    };
    return FlashBoom;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.FlashBoom = FlashBoom;

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
        //# sourceMappingURL=FlashBoom.js.map
        