"use strict";
cc._RF.push(module, '70e08Qp1d1ImZ2mmghCiSz6', 'MagicBall');
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