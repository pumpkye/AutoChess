/**
 * GameConfig.js
 * @description 基础配置
 * @author pumpkye
 */

export var GameConfig = {
    /**
     * 版本控制
     */
    version: 1,         //内部版本号，整型
    isExamine: true,    //审核标记，审核状态下有些功能被禁用
    platform: 0,        //平台类型，默认为0，即web，可以被浏览器运行。1-微信
    httpEnabled: true,  //是否启用http

    reconnect: {
        maxCount: 5, //最大自动重连次数
        /**
         * 每次断线重连的时间间隔
         */
        deltaTime: {
            [1]: 500,
            [2]: 1000,
            [3]: 2000,
            [4]: 3000,
            [5]: 5000,
        }
    }
}