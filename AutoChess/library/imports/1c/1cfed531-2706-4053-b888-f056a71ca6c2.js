"use strict";
cc._RF.push(module, '1cfedUxJwZAU7iI8FanHKbC', 'OutputCache');
// Script/AutoBattle/OutPut/OutputCache.ts

Object.defineProperty(exports, "__esModule", { value: true });
var OutputCache = /** @class */ (function () {
    function OutputCache() {
        // this.isWin = false;
        this.clear();
    }
    OutputCache.prototype.clear = function () {
        this.isWin = false;
    };
    OutputCache.prototype.getResult = function () {
        return this.isWin;
    };
    return OutputCache;
}());
exports.g_OutputCache = new OutputCache();

cc._RF.pop();