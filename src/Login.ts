/**
 *登录界面
 * @author 
 *
 */
class Login extends eui.Component{
    //单例模式
    private statusGetLabel:egret.TextField;
	private static instance:Login = null;
	public static getInstance(){
		if(Login.instance == null){
			Login.instance = new Login();
		}
		return Login.instance;
	}
	public register_btn: eui.Label;
	public login_btn: eui.Label;
	public forget_btn:eui.Label;
	public constructor() {
    	super();
    	this.skinName = "resource/eui_skins/LoginSkin.exml";
    	this.eventListen();
	}
	public eventListen(){
        this.register_btn.touchEnabled = true;
        this.register_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toRegister,this);
        this.login_btn.touchEnabled = true;
        this.login_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.toLogin,this);
        this.forget_btn.touchEnabled = true;
        this.forget_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.forgetPwd,this);
	}
	public toRegister(){
	    console.log('1111111111');
	    this.parent.addChild(Register.getInstance());
	    this.parent.removeChild(this);
	}
	public toLogin(){

	    console.log('222222222');
	    this.parent.addChild(Home.getInstance());
	    this.parent.removeChild(this);
	}
	public forgetPwd(){
            console.log('333333333');
            this.parent.addChild(ForgetPwd.getInstance());
            this.parent.removeChild(this);
	}
    private sendGetRequest():void {
        var statusGetLabel = new egret.TextField();
        this.statusGetLabel = statusGetLabel;
        statusGetLabel.size = 10;
        statusGetLabel.text = "GET request being sent to httpbin.org";
        this.addChild(statusGetLabel);
        statusGetLabel.x = 50;
        statusGetLabel.y = 40;
        var params = "?p1=getP1&p2=getP2";
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://httpbin.org/get"+params,egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }
     private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log("get data : ",request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.text = "GET response: \n" + request.response.substring(0, 50) + "...";
        this.addChild(responseLabel);
        responseLabel.x = 50;
        responseLabel.y = 70;
        this.statusGetLabel.text = "Get GET response!";
    }
    private onGetIOError(event:egret.IOErrorEvent):void {
        console.log("get error : " + event);
    }
    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }

}
