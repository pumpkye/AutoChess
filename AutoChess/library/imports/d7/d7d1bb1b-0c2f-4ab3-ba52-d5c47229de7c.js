"use strict";
cc._RF.push(module, 'd7d1bsbDC9Ks7pS1cRyKd58', 'AutoBattleConfig');
// Script/AutoBattle/Config/AutoBattleConfig.ts

// export enum CareerEnum {
//     wuzhe = 1,
//     cike = 2,
//     zhenshou = 3,
//     qiudaozhe = 4,
//     yumowu = 5,
//     xianshushi = 6,
//     wushushi = 7,
//     lieshou = 8,
//     hunshushi = 9,
//     lishi = 10,
// }
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
// export var careerBuffConfig = {
//     [CareerEnum.wuzhe]: {
//         [3]: 9101,
//         [6]: 9102,
//     },
//     [CareerEnum.cike]: {
//         [3]: 9103,
//         [6]: 9104,
//     },
//     [CareerEnum.zhenshou]: {
//         [2]: 9105,
//         [4]: 9106,
//     },
//     [CareerEnum.qiudaozhe]: {
//         [3]: 9111,
//         [6]: 9112,
//     },
//     [CareerEnum.yumowu]: {
//         [1]: 9110,
//     },
//     [CareerEnum.xianshushi]: {
//         [2]: 0,
//     },
//     [CareerEnum.wushushi]: {
//         [2]: 9107,
//     },
//     [CareerEnum.lieshou]: {
//         [3]: 9108,
//         [6]: 9109,
//     },
//     [CareerEnum.hunshushi]: {
//         [2]: 9113,
//         [4]: 9114,
//     },
//     [CareerEnum.lishi]: {
//         [2]: 9115,
//         [4]: 9116,
//         [6]: 9117,
//     },
// }
// export enum RaceEnum {
//     yao,
//     shen,
//     shou,
//     xiuluo,
//     ling,
//     mo,
//     ren,
//     gui,
//     yi,
//     kui,
//     ming,
// }
// export var raceBuffConfig = {
//     [RaceEnum.yao]: {
//         [2]: 9001,
//         [4]: 9002,
//     },
//     [RaceEnum.shen]: {
//         [2]: 9016,
//         [4]: 9017,
//         [6]: 9018,
//     },
//     [RaceEnum.shou]: {
//         [3]: 9003,
//         [6]: 9004,
//     },
//     [RaceEnum.xiuluo]: {
//         [1]: 9005,
//     },
//     [RaceEnum.ling]: {
//         [3]: 9019,
//         [6]: 9020,
//     },
//     [RaceEnum.mo]: {
//         [1]: 9006,
//     },
//     [RaceEnum.ren]: {
//         [2]: 9007,
//         [4]: 9008,
//     },
//     [RaceEnum.gui]: {
//         [2]: 9009,
//         [4]: 9010,
//     },
//     [RaceEnum.yi]: {
//         [2]: 9011,
//         [4]: 9012,
//         [5]: 9013,
//     },
//     [RaceEnum.kui]: {
//         [3]: 9021,
//     },
//     [RaceEnum.ming]: {
//         [2]: 9014,
//         [4]: 9015,
//     },
// }
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