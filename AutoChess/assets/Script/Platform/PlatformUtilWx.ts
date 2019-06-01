import { PlatformUtilBase } from "./PlatformUtilBase";

export class PlatformUtilWx extends PlatformUtilBase {
    constructor() {
        super();
        console.log("init PlatformUtilWx")
    }

    getOpenId() {
        return "0";
    }

    loadUserFileData(obj) {
        // const fs = wx.getFileSystemManager()
        // fs.readFile({
        //     filePath: `${wx.env.USER_DATA_PATH}/${obj.fileName}`,
        //     encoding: 'utf8',
        //     success(data) {
        //         let jsonStr = data.data
        //         // console.log('load filestr', jsonStr)
        //         let fileData = JSON.parse(jsonStr)
        //         fileData.msg = "success"
        //         if (obj.callback && typeof (obj.callback) == "function") {
        //             obj.callback(fileData)
        //         }
        //     },
        //     fail(data) {
        //         if (obj.callback && typeof (obj.callback) == "function") {
        //             obj.callback({ msg: "fail" })
        //         }
        //         console.log('文件不存在', obj.fileName)
        //     },
        // })
    }

    saveUserFileData(obj) {
        // fileContent = JSON.stringify(obj.content)
        // const fs = wx.getFileSystemManager()
        // fs.writeFileSync(`${wx.env.USER_DATA_PATH}/${obj.fileName}`, fileContent, 'utf8')
    }


    shareGame(showScore) {
        // let idx = 0
        // if (!IS_EXAMINE) {
        //     idx = Math.floor(Math.random() * 6)
        // }
        // let urlStr = WxConfig.adList[idx].url
        // let titleStr = WxConfig.adList[idx].title
        // if (showScore) {
        //     titleStr = WxConfig.adList[idx].scoreTitle + g_GameScene.getFormatTime()
        // }
        // wx.shareAppMessage({
        //     title: titleStr,
        //     imageUrl: urlStr,
        //     success(res) {
        //         if (!IS_EXAMINE) {
        //             // let gameScene = cc.find("Canvas").getComponent("GameScene")
        //             g_GameScene.addReliveCount()
        //         }
        //     },
        //     fail(res) {
        //         // console.log('share fail')
        //     }
        // })
    }

    shareToGroup() {
        // let idx = 0
        // if (!IS_EXAMINE) {
        //     idx = Math.floor(Math.random() * 6)
        // }
        // let titleStr = WxConfig.adList[idx].title
        // let urlStr = WxConfig.adList[idx].url
        // wx.shareAppMessage({
        //     title: titleStr,
        //     imageUrl: urlStr,
        //     success(res) {
        //         // let gameScene = cc.find("Canvas").getComponent("GameScene")
        //         g_UiManager.uiRank.touchNode.active = true
        //         g_UiManager.uiRank.rankBgNode.active = true
        //         g_UiManager.uiRank.closeBtn.active = true
        //         // console.log('分享成功',res)
        //         if (res.shareTickets != undefined && res.shareTickets.length > 0) {
        //             // console.log('post message 5')
        //             window.wx.postMessage({
        //                 messageType: 5,
        //                 MAIN_MENU_NUM: "x1",
        //                 shareTicket: res.shareTickets[0]
        //             });
        //         }
        //     },
        //     fail(res) {
        //         // console.log('分享失败')
        //     }
        // });
    }

    initAd() {
        // this.bannerAd = wx.createBannerAd({
        //     adUnitId: window.AD.adId,
        //     style: {
        //         left: 0,
        //         bottom: 0,
        //         width: 750,
        //     }
        // })

        // this.bannerAd.show()
    }

    showAd() {
        // if (this.bannerAd) {
        //     this.bannerAd.show()
        // }
    }

    hideAd() {
        // if (this.bannerAd) {
        //     this.bannerAd.hide()
        // }
    }

    postMessage(obj) {
        // window.wx.postMessage(obj)
    }

    initSharedCanvas() {
        // this.tex = new cc.Texture2D();
        // sharedCanvas.width = 750;
        // sharedCanvas.height = 1334;
    }

    getSubCanvasTex() {
        // if (!this.tex) {
        //     return
        // }
        // this.tex.initWithElement(sharedCanvas);
        // this.tex.handleLoadedTexture();
        // return this.tex
        return null
    }

    init() {
        //     console.log('wxUtil onload')
        //     wx.showShareMenu({ withShareTicket: true })
        //     wx.onShareAppMessage(function () {
        //         let idx = 0
        //         if (!IS_EXAMINE) {
        //             idx = Math.floor(Math.random() * 6)
        //         }
        //         let titleStr = window.AD_LIST[idx].title
        //         let urlStr = window.AD_LIST[idx].url
        //         return {
        //             title: titleStr,
        //             imageUrl: urlStr,
        //             success(res) {
        //                 if (!IS_EXAMINE) {
        //                     // let gameScene = cc.find("Canvas").getComponent("GameScene")
        //                     // gameScene.addReliveCount()
        //                     g_GameScene.addReliveCount()
        //                 }
        //             },
        //             fail(res) {
        //             }
        //         }
        //     })
        //     wx.onShow(function () {
        //         // let gameScene = g_GameScene
        //         // if (g_UiManager.uiPause.isActive() && g_UiManager.uiPause.startNode.active) {
        //         //     g_UiManager.uiPause.playMusic()
        //         // } else if (gameScene.curSoundType != null) {
        //         //     gameScene.playMusic(gameScene.curSoundType)
        //         // }
        //     })
        //     wx.onHide(function () {
        //         // console.log('onHide')
        //     })
    }
}