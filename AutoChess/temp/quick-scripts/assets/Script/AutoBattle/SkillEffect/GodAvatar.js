(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/GodAvatar.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aa011/7EFFIYYEDnAXLrKQG', 'GodAvatar', __filename);
// Script/AutoBattle/SkillEffect/GodAvatar.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
var ChessBuff_1 = require("../Model/ChessBuff");
/**
 * 天神下凡，获得技能免疫，增加额外的血量[0]点，攻击力[1]点，护甲[2]点，魔抗[3]点，攻速[4]点
 */
var GodAvatar = /** @class */ (function (_super) {
    __extends(GodAvatar, _super);
    function GodAvatar() {
        return _super.call(this) || this;
    }
    Object.defineProperty(GodAvatar.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.godAvatar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GodAvatar.prototype, "effName", {
        get: function () {
            return "godAvatar";
        },
        enumerable: true,
        configurable: true
    });
    GodAvatar.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return;
        }
        var hp = data.skillEff.effArr[0];
        var damage = data.skillEff.effArr[1];
        var defence = data.skillEff.effArr[2];
        var mdefence = data.skillEff.effArr[3];
        var aSpeed = data.skillEff.effArr[4];
        data.defender.addAttrChange("maxHp", new ChessBuff_1.AttrChangeInfo(hp));
        data.defender.addAttrChange("damage", new ChessBuff_1.AttrChangeInfo(damage));
        data.defender.addAttrChange("defence", new ChessBuff_1.AttrChangeInfo(defence));
        data.defender.addAttrChange("mDefence", new ChessBuff_1.AttrChangeInfo(mdefence));
        data.defender.addAttrChange("attackSpeed", new ChessBuff_1.AttrChangeInfo(aSpeed));
        data.defender.addBuffState(SkillEffectEnum_1.BuffAndDotState.bkb);
        return true;
    };
    return GodAvatar;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.GodAvatar = GodAvatar;

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
        //# sourceMappingURL=GodAvatar.js.map
        