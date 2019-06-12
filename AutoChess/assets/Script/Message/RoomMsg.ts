import { MessageBase } from "./MessagegBase";

/**
 * 加入一个有空位的房间
 */
export class MsgReqEnterFreeRoom extends MessageBase {
    name = "msgReqEnterFreeRoom";
    data: {

    }
}

export class MsgReqEnterRoom extends MessageBase {
    name = "msgReqEnterRoom";
    data: {
        roomId: number;
    }
}

export class MsgResEnterRoom extends MessageBase {
    name = "msgResEnterRoom";
    data: {
        roomId: number;
    }
}

/**
 * 开始游戏
 */
export class MsgReqStartGame extends MessageBase {
    name = "msgReqStartGame";
    data: {}
}

export class MsgResStartGame extends MessageBase {
    name = "msgResStartGame";
    data: {
        isStart: boolean;
    }
}

export enum RoundState {
    none,
    /**
     * 布局阶段
     */
    layout,
    /**
     * 战斗倒计时
     */
    prepare,
    /**
     * 战斗
     */
    battle,
    /**
     * 战斗结算
     */
    battleEnd,
}

/**
 * 回合状态
 */
export class MsgRoundState extends MessageBase {
    name = "msgRoundState";
    data: {
        /**
         * 第几回合
         */
        roundIdx: number;
        /**
         * 0-none;
         * 
         * 1-layout;
         * 
         * 2-prepare;
         * 
         * 3-battle;
         * 
         * 4-battleEnd;
         */
        state: number;
        /**
         * 当前回合state结束时刻，ms
         */
        finishTime: number;
    }
}

/**
 * 刷新房间内的玩家
 */
export class MsgRefreshRoomPlayer extends MessageBase {
    name = "msgRefreshRoomPlayer";
    data: {
        roomId: number;
        /**
         * 是否刷新全部，true的时候刷新房间内所有玩家，false的时候只刷新列表中的一个或者几个玩家
         */
        refreshAll: boolean;
        playerList: Array<PlayerInfo>;
    }
}

/**
 * 玩家数据
 */
export interface PlayerInfo {
    id: number;
    name: string;
    level: number;
    exp: number;
    gold: number;
    winContinueCount: number;
    loseContinueCount: number;
    //手牌
    cardList: Array<{ idx: number, npcInfo: ChessNpcInfo }>;
    //布局
    layoutList: Array<ChessNpcInfo>;
}

interface ChessNpcInfo {
    thisId: number;
    baseId: number;
    level: number;
    pos: {
        x: number,
        y: number,
    }
}

/**
 * 刷新某个玩家的卡池
 */
export class MsgRefreshCardPool extends MessageBase {
    name = "msgRefreshCardPool";
    data: {
        //每个人都只收到自己的卡池，这里的userId做校验用
        userId: number,
        cardPool: Array<{ idx: number, baseId: number }>;
    }
}

/**
 * 从商店购买卡牌
 */
export class MsgBuyCard extends MessageBase {
    name = "msgBuyCard";
    data: {
        /**
         * 在卡池中的idx
         */
        idx: number;
    }
}

/**
 * 移动棋盘上的npc
 */
export class MsgMoveNpc extends MessageBase {
    name = "msgMoveNpc";
    data: {
        thisId: number;
        pos: {
            x: number;
            y: number;
        }
    }
}

/**
 * 将手牌npc放到棋盘上
 */
export class MsgPutNpcToBoard extends MessageBase {
    name = "msgPutNpcToBoard";
    data: {
        /**
         * 在手牌中的位置idx
         */
        idx: number;
        pos: {
            x: number;
            y: number;
        }
    }
}

/**
 * 将npc撤回手牌
 */
export class MsgGetBackNpc extends MessageBase {
    name = "msgGetBackNpc";
    data: {
        thisId: number;
    }
}

export class MsgBattleResult extends MessageBase {
    name = "msgBattleResult";
    data: {
        resultList: Array<Result>;
    }
}

interface Result {
    /**
     * 主场玩家id
     */
    playerId: number;
    /**
     * 客场玩家id
     */
    enemyId: number;
    /**
     * true为赢，false为平或输
     */
    win: boolean;
    /**
     * 比分，代表获胜一方剩余npc数量
     */
    point: number;
}