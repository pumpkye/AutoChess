export class PlatformUtilBase {
    constructor() {
        console.log("init PlatformUtilBase");
    }
    //account    
    getOpenId() {
        return "0";
    }

    //file system
    loadUserFileData(obj: { fileName: string, success?: Function, fail?: Function }) {

    }

    saveUserFileData(obj: { fileName: string, success?: Function, fail?: Function }) {

    }

    //social
    shareGame(arg?) {

    }

    shareToGroup(arg?) {

    }

    showAd(arg?) {

    }

    hideAd(arg?) {

    }

    //sub canvas
    postMessage(arg?) {

    }

    initSharedCanvas(arg?) {

    }

    getSubCanvasTex(): cc.Canvas {
        return null;
    }

}

