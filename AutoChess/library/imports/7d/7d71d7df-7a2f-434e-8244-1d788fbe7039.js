"use strict";
cc._RF.push(module, '7d71dffei9DToJEHXiPvnA5', 'ChessBuff');
// Script/AutoBattle/Model/ChessBuff.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SkillEffectEnum_1 = require("../SkillEffect/SkillEffectEnum");
var InitSkillEffect_1 = require("../SkillEffect/InitSkillEffect");
var Printer_1 = require("../OutPut/Printer");
/**
 *
 */
var ChessBuff = /** @class */ (function () {
    /**
     *
     * @param lifeTime 持续时间，0的时候表示永久有效
     * @param deltaTime 生效间隔，0的时候表示只生效一次
     * @param chessNpc 添加目标
     * @param effData
     * @param stateId
     */
    function ChessBuff(lifeTime, deltaTime, chessNpc, effData, stateId) {
        this._lifeTime = 0;
        this._deltaTime = 0;
        this._dt = 0;
        this._isTriggerOnce = false; // 是否只触发一次效果
        this._isForever = false; //永久被动
        this._lifeTime = lifeTime;
        this._deltaTime = deltaTime;
        if (this._deltaTime == 0) {
            this._isTriggerOnce = true;
        }
        if (lifeTime == 0) {
            this._isForever = true;
        }
        this._chessNpc = chessNpc;
        this._effData = effData;
        if (stateId) {
            this._stateId = stateId;
            chessNpc.addBuffState(stateId);
            /**
             * 韧性降低负面效果
             */
            if (SkillEffectEnum_1.DebuffState[stateId]) {
                var rd = chessNpc.getAttrChange("reduceDebuffTime");
                if (rd && rd.length > 0) {
                    for (var i = 0; i < rd.length; i++) {
                        var per = rd[i].info;
                        lifeTime = lifeTime * (100 - per) / 100;
                    }
                }
                this._lifeTime = lifeTime;
            }
            Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.addDebuff, { time: this._lifeTime });
        }
        this.update(0);
    }
    ChessBuff.prototype.update = function (dt) {
        if (this._lifeTime > 0 && !this._isForever) {
            this._lifeTime = this._lifeTime - dt;
            if (this._lifeTime <= 0) {
                this.destroy();
            }
        }
        if (!this._isTriggerOnce) {
            this._dt = this._dt - dt;
            if (this._dt <= 0) {
                this.doBuffEffect();
                this._dt = this._deltaTime + this._dt;
            }
        }
    };
    ChessBuff.prototype.doBuffEffect = function () {
        if (this._effData) {
            var effId = this._effData.skillEff.effId;
            InitSkillEffect_1.skillEffects[effId].play(this._effData);
        }
    };
    /**
     * buff销毁时的操作
     */
    ChessBuff.prototype.destroy = function () {
        if (this._stateId) {
            this._chessNpc.removeBuffState(this._stateId);
        }
        if (this.attrChange && this._chessNpc) {
            for (var key in this.attrChange) {
                if (this.attrChange.hasOwnProperty(key)) {
                    var attrChange = this.attrChange[key];
                    this._chessNpc.removeAttrChange(key, attrChange.idx);
                }
            }
        }
    };
    ChessBuff.prototype.setAttrChange = function (attrName, value) {
        if (this._chessNpc) {
            var attrChangeInfo = new AttrChangeInfo(value);
            this._chessNpc.addAttrChange(attrName, attrChangeInfo);
            if (!this.attrChange) {
                this.attrChange = {};
            }
            this.attrChange[attrName] = attrChangeInfo;
        }
    };
    ChessBuff.prototype.getAttrChange = function (attrName) {
        if (this.attrChange) {
            return this.attrChange[attrName];
        }
        return null;
    };
    Object.defineProperty(ChessBuff.prototype, "isValid", {
        get: function () {
            return this._lifeTime > 0 || this._isForever;
        },
        enumerable: true,
        configurable: true
    });
    ChessBuff.prototype.checkIsValid = function () {
        return this._lifeTime > 0 || this._isForever;
    };
    return ChessBuff;
}());
exports.ChessBuff = ChessBuff;
var AttrChangeInfo = /** @class */ (function () {
    function AttrChangeInfo(info) {
        this.idx = 0;
        this.info = info;
    }
    return AttrChangeInfo;
}());
exports.AttrChangeInfo = AttrChangeInfo;
/**
 * 护盾的实现机制不是很理想，欢迎重构这部分代码或提供意见
 */
var ChessShield = /** @class */ (function (_super) {
    __extends(ChessShield, _super);
    function ChessShield(lifeTime, lifeCount, chessNpc, shieldData) {
        var _this = _super.call(this, lifeTime, 0, chessNpc) || this;
        _this._lifeCount = 0;
        _this.idx = 0;
        _this.name = "ChessShield";
        _this._lifeCount = lifeCount;
        _this.shieldData = shieldData;
        return _this;
    }
    /**
     * 执行护盾过程
     * @param arg 一个对象，既是传入值，也传出结果
     * @returns 返回值返回该次处理是否成功，如果护盾已失效，则返回false
     */
    ChessShield.prototype.doShieldEffect = function (arg) {
        this._lifeCount = this._lifeCount - 1;
        return this._lifeCount >= 0;
    };
    ChessShield.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        if (this._lifeCount <= 0) {
            this.destroy();
        }
    };
    ChessShield.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._chessNpc.removeShield(this);
    };
    Object.defineProperty(ChessShield.prototype, "isValid", {
        get: function () {
            return _super.prototype.checkIsValid.call(this) && this._lifeCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    return ChessShield;
}(ChessBuff));
exports.ChessShield = ChessShield;
var AddDamageShield = /** @class */ (function (_super) {
    __extends(AddDamageShield, _super);
    function AddDamageShield() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "AddDamageShield";
        return _this;
    }
    AddDamageShield.prototype.doShieldEffect = function (arg) {
        if (!_super.prototype.doShieldEffect.call(this, null)) {
            return false;
        }
        arg.damage = arg.damage + this.shieldData;
        return true;
    };
    return AddDamageShield;
}(ChessShield));
exports.AddDamageShield = AddDamageShield;
var MissDamageShield = /** @class */ (function (_super) {
    __extends(MissDamageShield, _super);
    function MissDamageShield() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "MissDamageShield";
        return _this;
    }
    MissDamageShield.prototype.doShieldEffect = function (arg) {
        if (!_super.prototype.doShieldEffect.call(this, null)) {
            return false;
        }
        arg.damage = 0;
        Printer_1.printBattleMsg(Printer_1.pTag.battle, Printer_1.pBattleAction.missDamage);
        return true;
    };
    return MissDamageShield;
}(ChessShield));
exports.MissDamageShield = MissDamageShield;

cc._RF.pop();