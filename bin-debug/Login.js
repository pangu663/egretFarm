var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *登录界面
 * @author
 *
 */
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/LoginSkin.exml";
        _this.eventListen();
        _this.uname.addEventListener(egret.Event.CHANGE, function (evt) {
            this.engine = evt.target.text;
        }, _this);
        _this.passwd.addEventListener(egret.Event.CHANGE, function (evt) {
            console.log(evt.target.text);
        }, _this);
        return _this;
    }
    Login.getInstance = function () {
        if (Login.instance == null) {
            Login.instance = new Login();
        }
        return Login.instance;
    };
    Login.prototype.eventListen = function () {
        this.register_btn.touchEnabled = true;
        this.register_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toRegister, this);
        this.login_btn.touchEnabled = true;
        this.login_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toLogin, this);
        this.forget_btn.touchEnabled = true;
        this.forget_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.forgetPwd, this);
    };
    Login.prototype.toRegister = function () {
        console.log('1111111111');
        this.parent.addChild(Register.getInstance());
        this.parent.removeChild(this);
    };
    Login.prototype.toLogin = function () {
        console.log(this.engine);
        console.log('222222222');
        this.parent.addChild(Home.getInstance());
        this.parent.removeChild(this);
    };
    Login.prototype.forgetPwd = function () {
        console.log('333333333');
        this.parent.addChild(ForgetPwd.getInstance());
        this.parent.removeChild(this);
    };
    Login.prototype.sendGetRequest = function () {
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
        request.open("http://httpbin.org/get" + params, egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    Login.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log("get data : ", request.response);
        var responseLabel = new egret.TextField();
        responseLabel.size = 18;
        responseLabel.text = "GET response: \n" + request.response.substring(0, 50) + "...";
        this.addChild(responseLabel);
        responseLabel.x = 50;
        responseLabel.y = 70;
        this.statusGetLabel.text = "Get GET response!";
    };
    Login.prototype.onGetIOError = function (event) {
        console.log("get error : " + event);
    };
    Login.prototype.onGetProgress = function (event) {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    return Login;
}(eui.Component));
Login.instance = null;
__reflect(Login.prototype, "Login");
