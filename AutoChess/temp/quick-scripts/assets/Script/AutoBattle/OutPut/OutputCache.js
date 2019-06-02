(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/OutPut/OutputCache.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f6082UTpmNHHKYgLQdQsilc', 'OutputCache', __filename);
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
        //# sourceMappingURL=OutputCache.js.map
        