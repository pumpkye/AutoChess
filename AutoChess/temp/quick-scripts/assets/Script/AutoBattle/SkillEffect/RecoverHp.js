(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/SkillEffect/RecoverHp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1ebfbsAkTtLgKQ/n7QMZfYm', 'RecoverHp', __filename);
// Script/AutoBattle/SkillEffect/RecoverHp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillEffect_1 = require("./BaseSkillEffect");
var SkillEffectEnum_1 = require("./SkillEffectEnum");
/**
 * 回复[0]点血量
 */
var RecoverHp = /** @class */ (function (_super) {
    __extends(RecoverHp, _super);
    function RecoverHp() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RecoverHp.prototype, "effectId", {
        get: function () {
            return SkillEffectEnum_1.SkillEffectEnum.recoverHp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecoverHp.prototype, "effName", {
        get: function () {
            return "recoverHp";
        },
        enumerable: true,
        configurable: true
    });
    RecoverHp.prototype.play = function (data) {
        _super.prototype.play.call(this, data);
        if (!data.defender || data.defender.isDead) {
            return false;
        }
        data.defender.hp = data.defender.getHp() + data.skillEff.effArr[0];
        return true;
    };
    return RecoverHp;
}(BaseSkillEffect_1.BaseSkillEffect));
exports.RecoverHp = RecoverHp;

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
        //# sourceMappingURL=RecoverHp.js.map
        