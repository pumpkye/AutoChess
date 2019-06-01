(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Net/Layout.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '95099yHUYNDILVujhKQifc3', 'Layout', __filename);
// Script/Net/Layout.ts

Object.defineProperty(exports, "__esModule", { value: true });
var NetUtil_1 = require("./NetUtil");
var InputCache_1 = require("../AutoBattle/Input/InputCache");
var LayoutMessage = /** @class */ (function () {
    function LayoutMessage() {
        this.url = '/layout';
        this.url = NetUtil_1.g_NetUtil.formatUrl(this.url);
    }
    /**
     * 拉取所有layout
     */
    LayoutMessage.prototype.listAllLayout = function () {
        return __awaiter(this, void 0, Promise, function () {
            var ret, res, i, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetUtil_1.g_NetUtil.sendHttpRequest(this.url, "GET")];
                    case 1:
                        ret = _a.sent();
                        res = {
                            success: ret.success,
                            layoutList: new Array(),
                        };
                        for (i = 0; i < ret.ret.length; i++) {
                            e = ret.ret[i];
                            res.layoutList.push({ id: e.id, name: e.name });
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * 通过Id拉取某个layout详情
     */
    LayoutMessage.prototype.getLayout = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var url, ret, res, layoutObj, i, npc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.url + '/' + id;
                        return [4 /*yield*/, NetUtil_1.g_NetUtil.sendHttpRequest(url, "GET")];
                    case 1:
                        ret = _a.sent();
                        console.log(ret);
                        res = {
                            success: ret.success,
                            layout: {
                                id: ret.ret.id,
                                name: ret.ret.name,
                                npcList: new Array(),
                            }
                        };
                        layoutObj = JSON.parse(ret.ret.layout_str);
                        for (i = 0; i < layoutObj.length; i++) {
                            npc = layoutObj[i];
                            res.layout.npcList.push(new InputCache_1.ChessNpcInfo(npc.thisId, npc.baseId, npc.level, { x: npc.pos.x, y: npc.pos.y }));
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * 保存layout
     */
    LayoutMessage.prototype.saveLayout = function (name, npcList) {
        return __awaiter(this, void 0, void 0, function () {
            var jsonObj, body, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonObj = {
                            name: name,
                            layout: npcList,
                        };
                        body = JSON.stringify(jsonObj);
                        return [4 /*yield*/, NetUtil_1.g_NetUtil.sendHttpRequest(this.url, "POST", body)];
                    case 1:
                        ret = _a.sent();
                        console.log(ret);
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /**
     * 删除layout
     * @param id
     */
    LayoutMessage.prototype.deleteLayout = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.url + '/' + id;
                        return [4 /*yield*/, NetUtil_1.g_NetUtil.sendHttpRequest(url, "DELETE")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return LayoutMessage;
}());
exports.g_layoutMessage = new LayoutMessage();

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
        //# sourceMappingURL=Layout.js.map
        