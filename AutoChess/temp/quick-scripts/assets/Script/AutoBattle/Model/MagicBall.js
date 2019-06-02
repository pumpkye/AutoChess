(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/Model/MagicBall.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1c815dBLYlBU5tAqwgpMetV', 'MagicBall', __filename);
// Script/AutoBattle/Model/MagicBall.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 魔法弹道球
 */
var TargetType;
(function (TargetType) {
    /**
     * 指向一个点，最常见的目标类型
     */
    TargetType[TargetType["point"] = 0] = "point";
    /**
     * 指向一个方向，
     */
    TargetType[TargetType["dir"] = 1] = "dir";
})(TargetType || (TargetType = {}));
var MagicBall = /** @class */ (function () {
    function MagicBall() {
        this.targetType = TargetType.point;
    }
    return MagicBall;
}());
exports.MagicBall = MagicBall;

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
        //# sourceMappingURL=MagicBall.js.map
        