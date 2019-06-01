(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/Input/InputCache.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b2be26cKvtO6JN87CRvd1DS', 'InputCache', __filename);
// Script/AutoBattle/Input/InputCache.ts

Object.defineProperty(exports, "__esModule", { value: true });
var TestInput_1 = require("./TestInput");
/**
 * 为autobattleManager提供输入源，autoBattleManager从这里读取对局阵容
 * 提供工具函数从不同输入添加输入信息
 */
var InPutCache = /** @class */ (function () {
    function InPutCache() {
    }
    /**
     * 通过BattleInfo对象设置battleInfo
     * @param battleInfo 一回合的所有对战信息
     */
    InPutCache.prototype.setBattleInfo = function (battleInfo) {
        this.battleInfo = battleInfo;
    };
    /**
     * 从json读取数据
     * @param jsonStr json字符串
     */
    InPutCache.prototype.loadBattleInfoFromJson = function (jsonStr) {
        var jsonObj = JSON.parse(jsonStr);
        this.battleInfo = new BattleInfo(jsonObj.roundIndex);
        for (var i = 0; i < jsonObj.matches.length; i++) {
            var match = jsonObj.matches[i];
            this.battleInfo.addMatch(match.a, match.b);
        }
        for (var i = 0; i < jsonObj.allLayout.length; i++) {
            var layout = jsonObj.allLayout[i];
            var layoutInfo = new LayoutInfo(layout.playerId);
            for (var j = 0; j < layout.npcList.length; j++) {
                var npc = layout.npcList[j];
                layoutInfo.addChessNpcInfo(npc.thisId, npc.baseId, npc.level, { x: npc.posX, y: npc.posY });
            }
            this.battleInfo.addLayout(layoutInfo);
        }
    };
    /**
     * test success@4.17.2019
     */
    InPutCache.prototype.testLoadJson = function () {
        this.loadBattleInfoFromJson(TestInput_1.testInputStr);
        console.log(this.battleInfo);
    };
    InPutCache.prototype.getBattleInfo = function () {
        return this.battleInfo;
    };
    InPutCache.prototype.clear = function () {
        this.battleInfo = null;
    };
    return InPutCache;
}());
exports.g_InputCache = new InPutCache();
/**
 * 单回合所有对局信息
 */
var BattleInfo = /** @class */ (function () {
    function BattleInfo(roundIndex) {
        this.roundIndex = roundIndex;
        this.matches = new Array();
        this.allLayout = new Array();
    }
    BattleInfo.prototype.clear = function () {
        this.matches = new Array();
        this.allLayout = new Array();
    };
    BattleInfo.prototype.addMatch = function (playerThisIdA, playerThisIdB) {
        this.matches.push(new MatchInfo(playerThisIdA, playerThisIdB));
    };
    BattleInfo.prototype.addLayout = function (layout) {
        this.allLayout.push(layout);
    };
    BattleInfo.prototype.clearLayout = function () {
        this.allLayout = new Array();
    };
    BattleInfo.prototype.getLayoutByPlayerId = function (playerId) {
        for (var i = 0; i < this.allLayout.length; i++) {
            var layout = this.allLayout[i];
            if (layout.playerThisId === playerId) {
                return layout;
            }
        }
        return null;
    };
    return BattleInfo;
}());
exports.BattleInfo = BattleInfo;
/**
 * 对局信息
 */
var MatchInfo = /** @class */ (function () {
    function MatchInfo(playerThisIdA, playerThisIdB) {
        this.playerThisIdA = playerThisIdA;
        this.playerThisIdB = playerThisIdB;
    }
    return MatchInfo;
}());
/**
 * 玩家布局信息
 */
var LayoutInfo = /** @class */ (function () {
    function LayoutInfo(thisId) {
        this.playerThisId = thisId;
        this.npcList = new Array();
    }
    LayoutInfo.prototype.addChessNpcInfo = function (arg1, baseId, level, pos) {
        if (typeof (arg1) === "number") {
            this.npcList.push(new ChessNpcInfo(arg1, baseId, level, pos));
        }
        else {
            this.npcList.push(arg1);
        }
    };
    return LayoutInfo;
}());
exports.LayoutInfo = LayoutInfo;
/**
 * 单个npc的位置信息
 */
var ChessNpcInfo = /** @class */ (function () {
    function ChessNpcInfo(thisId, baseId, level, pos) {
        this.thisId = thisId;
        this.baseId = baseId;
        this.level = level;
        this.pos = pos;
    }
    return ChessNpcInfo;
}());
exports.ChessNpcInfo = ChessNpcInfo;

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
        //# sourceMappingURL=InputCache.js.map
        