(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/AutoBattle/Config/AutoBattleConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '03ca5Zxn0VBAbzrdaJBgvoS', 'AutoBattleConfig', __filename);
// Script/AutoBattle/Config/AutoBattleConfig.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
var CareerEnum;
(function (CareerEnum) {
    CareerEnum[CareerEnum["warrior"] = 1] = "warrior";
    CareerEnum[CareerEnum["magic"] = 2] = "magic";
    CareerEnum[CareerEnum["assissan"] = 3] = "assissan";
})(CareerEnum = exports.CareerEnum || (exports.CareerEnum = {}));
exports.careerBuffConfig = (_a = {},
    _a[CareerEnum.warrior] = (_b = {},
        _b[3] = 2011,
        _b[6] = 2012,
        _b),
    _a[CareerEnum.magic] = (_c = {},
        _c[3] = 2021,
        _c[6] = 2022,
        _c),
    _a[CareerEnum.assissan] = (_d = {},
        _d[3] = 2031,
        _d[6] = 2032,
        _d),
    _a);
var RaceEnum;
(function (RaceEnum) {
    RaceEnum[RaceEnum["orc"] = 1] = "orc";
    RaceEnum[RaceEnum["wild"] = 2] = "wild";
    RaceEnum[RaceEnum["human"] = 3] = "human";
    RaceEnum[RaceEnum["bloodElf"] = 4] = "bloodElf";
    RaceEnum[RaceEnum["dwarf"] = 5] = "dwarf";
    RaceEnum[RaceEnum["troll"] = 6] = "troll";
})(RaceEnum = exports.RaceEnum || (exports.RaceEnum = {}));
exports.raceBuffConfig = (_e = {},
    _e[RaceEnum.orc] = (_f = {},
        _f[2] = 3011,
        _f[4] = 3012,
        _f),
    _e[RaceEnum.wild] = (_g = {},
        _g[2] = 3021,
        _g[4] = 3022,
        _g),
    _e[RaceEnum.human] = (_h = {},
        _h[2] = 3031,
        _h[4] = 3032,
        _h),
    _e[RaceEnum.bloodElf] = (_j = {},
        _j[2] = 3041,
        _j[4] = 3042,
        _j),
    _e[RaceEnum.dwarf] = (_k = {},
        _k[2] = 3051,
        _k[4] = 3052,
        _k),
    _e[RaceEnum.troll] = (_l = {},
        _l[2] = 3061,
        _l[4] = 3062,
        _l),
    _e);
exports.dirConfig = [
    { x: 0, y: -1, },
    { x: 1, y: -1, },
    { x: 1, y: 0, },
    { x: 1, y: 1, },
    { x: 0, y: 1, },
    { x: -1, y: 1, },
    { x: -1, y: 0, },
    { x: -1, y: -1, },
];
exports.attackRangeConfig = [
    [0],
    [1, 0],
    [2, 1, 0],
    [3, 3, 2, 1],
    [4, 4, 4, 3, 2],
    [5, 5, 5, 5, 4, 3],
    [6, 6, 6, 6, 5, 4, 3],
    [7, 7, 7, 7, 6, 6, 5, 3]
];
exports.ATTACK_BASE_TIME = 1.5;
exports.damageK = {
    k1: 0.04,
    k2: 1,
    k3: 0.04,
};

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
        //# sourceMappingURL=AutoBattleConfig.js.map
        