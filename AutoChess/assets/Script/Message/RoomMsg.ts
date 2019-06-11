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

    }
}

export class MsgResEnterRoom extends MessageBase {
    name = "msgResEnterRoom";
    data: {
        roomId: number;
    }
}

/**
 * 刷新房间内的玩家
 */
export class MsgRefreshRoomPlayer extends MessageBase {
    name = "msgRefreshRoomPlayer";
    data: {
        roomId: number;
        playerList: Array<PlayerInfo>;
    }
}

/**
 * 玩家数据
 */
interface PlayerInfo {
    id: number;
    name: string;
    level: number;
    exp: number;
    gold: number;
    winContinueCount: number;
    loseContinueCount: number;
    //手牌
    cardList: Array<{ idx: number, baseId: number }>;
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