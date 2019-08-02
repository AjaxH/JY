function beginloginrove(b) {
    if (b != null && "" != b) {
        $("#hidBackURL").val(b)
    }
    var a = checkLogin();
    if ("nologin" == a) {
        $.ajax({
            url: appPath + "/login_flow.html",
            type: "POST",
            success: function (c) {
                $(c).appendTo("body");
                $("#newbtn_close").click();
                $("#loginIframe").show()
            }
        })
    } else {
        if (b != null && "" != b) {
            window.location.href = appPath + b
        }
    }
}

function checkLogin() {
    var a = "nologin";
    $.ajax({
        url: appPath + "/checklogin.html",
        type: "POST",
        async: false,
        success: function (b) {
            a = b
        }
    });
    return a
}

function beginlogin() {
    var b = "";
    var f = $("#hidBackURL", parent.document).val();
    if (f != null && "" != f) {
        b = f
    } else {
        b = parent.location.href
    }
    if (b.indexOf("#") != -1) {
        b = loginBackUrl.substr(0, b.indexOf("#"))
    }
    var e = $("#regName").val().trim();
    if (!e || e === "请输入邮箱/手机/登录名") {
        $("._login_mini_error_inf:eq(0)").html("<em class='ico'></em>用户名不能为空！");
        return
    }
    var c = checkLoginNameIsExist(e);
    if (c == "N") {
        $("._login_mini_error_inf:eq(0)").html("<em class='ico'></em>用户名不存在！");
        return
    }
    var a = $("#passwordMini").val();
    if (!a) {
        $("._login_mini_error_inf:eq(1)").html("<em class='ico'></em>密码不能为空！");
        return
    }
    var d = document.getElementById("rememberPwd2").value;
    $.ajax({
        url: passportPath + "/soa/remoteMember-loginAjax.html",
        dataType: "jsonp",
        data: {
            loginName: e,
            loginPassword: a,
            isRemember: d
        },
        type: "POST",
        success: function (g) {
            if (g == "ok") {
                $("#hidBackURL", parent.document).val("");
                if (b != null && "" != b) {
                    parent.location.href = appPath + b
                } else {
                    parent.location.href = appPath
                }
            } else {
                if (g == "nothing") {
                    $("._login_mini_error_inf:eq(1)").html("<em class = 'ico'></em>用户信息不能为空");
                    return false
                } else {
                    if (g == "noLog") {
                        $("._login_mini_error_inf:eq(1)").html("<em class = 'ico'></em>保存会员登录日志失败，请重新登录！");
                        return false
                    } else {
                        if (g == "noMobile") {
                            parent.location.href = appPath + "/soa/toBindMobileInfo.html"
                        } else {
                            $("._login_mini_error_inf:eq(1)").html("<em class = 'ico'></em>" + g);
                            return false
                        }
                    }
                }
            }
        },
        error: function (g, i, h) {
            alert(g);
            alert(i);
            alert(h)
        }
    })
}

function quickLoginNew(b) {
    var e = $("#regName").val().trim();
    if (!e || e === "请输入邮箱/手机/登录名") {
        $("._login_mini_error_inf:eq(0)").html("<em class='ico'></em>用户名不能为空！");
        return
    }
    var c = checkLoginNameIsExist(e);
    if (c == "N") {
        $("._login_mini_error_inf:eq(0)").html("<em class='ico'></em>用户名不存在！");
        return
    }
    var a = $("#passwordMini").val();
    if (!a) {
        $("._login_mini_error_inf:eq(1)").html("<em class='ico'></em>密码不能为空！");
        return
    }
    var d = document.getElementById("rememberPwd2").value;
    $.ajax({
        url: appPath + "/soa/member-loginAjax.html",
        data: {
            loginName: e,
            loginPassword: a,
            isRemember: d
        },
        type: "POST",
        async: true,
        success: function (f) {
            if (f == "ok") {
                $("#hidBackURL", parent.document).val("");
                if (b != null && "" != b) {
                    parent.location.href = appPath + b
                } else {
                    parent.location.href = appPath
                }
            } else {
                if (f == "nothing") {
                    $("._login_mini_error_inf:eq(1)").html("<em class = 'ico'></em>用户信息不能为空");
                    return false
                } else {
                    if (f == "noLog") {
                        $("._login_mini_error_inf:eq(1)").html("<em class = 'ico'></em>保存会员登录日志失败，请重新登录！");
                        return false
                    } else {
                        if (f == "noMobile") {
                            parent.location.href = appPath + "/soa/toBindMobileInfo.html"
                        } else {
                            $("._login_mini_error_inf:eq(1)").html("<em class = 'ico'></em>" + f);
                            return false
                        }
                    }
                }
            }
        },
        error: function (f, h, g) {
            alert(f);
            alert(h);
            alert(g)
        }
    })
}

function checkLoginNameIsExist(b) {
    var a = "N";
    $.ajax({
        url: appPath + "/soa/checkLoginNameIsExist.html",
        data: {
            loginName: b
        },
        type: "POST",
        async: false,
        success: function (c) {
            a = c
        }
    });
    return a
}

function focusMiniLoginName() {
    var a = $("#regName").val();
    if (a == "请输入邮箱/手机/登录名") {
        $("#regName").val("")
    }
    $("._login_mini_error_inf:eq(0)").html("")
}

function focusMiniLoginPassword() {
    $("._login_mini_error_inf:eq(1)").html("")
}
$(function () {
    if ($.cookie("loginErrNum") != null) {
        var b = $.cookie("loginErrNum");
        if (Number(b) >= 3) {
            $("#over_login").css("height", "450px");
            $("#loginYan").css("display", "inline");
            $("#loginYanInput").css("display", "inline")
        } else {
            $("#loginYan").css("display", "none");
            $("#loginYanInput").css("display", "none");
            $("#over_login").css("height", "380px")
        }
    }
    if ($.cookie("registerErrNum") != null) {
        var a = $.cookie("registerErrNum");
        if (Number(a) >= 3) {
            $("#over_login").css("height", "450px");
            $("#yanzhengma").css("display", "inline");
            $("#yanzhengmaInput").css("display", "inline")
        } else {
            $("#yanzhengma").css("display", "none");
            $("#yanzhengmaInput").css("display", "none");
            $("#over_login").css("height", "380px")
        }
    }
    $("#reGetMiniCode").click(function () {
        $("#miniptyzm").show();
        $("#minimobilyzm").hide()
    })
});

function checkMiniRegister() {
    var a;
    var b = $.trim($("#miniRegisterName").val());
    var c = /^(13|15|18|14|17|19|16)[0-9]{9}$/;
    if (document.getElementById("protocolMini").checked) {
        protocolMiniValue = document.getElementById("protocolMini").value;
        $("#labelMiniProtocol").text("");
        $("#labelMiniProtocol").removeClass("error")
    } else {
        $("#labelMiniProtocol").text("请接受条款");
        $("#labelMiniProtocol").addClass("error");
        checkMiniUser();
        checkMiniPwd();
        checkMiniRePwd();
        checkMiniYzm("pt");
        checkMiniYzm("mobil");
        return false
    }
    if (c.test(b)) {
        if (!(checkMiniUser() & checkMiniPwd() & checkMiniRePwd() & checkMiniYzm("pt") & checkMiniYzm("mobil") & (protocolMiniValue == "1"))) {
            return false
        }
    } else {
        if (!(checkMiniUser() & checkMiniPwd() & checkMiniRePwd() & (checkMiniYzm("pt") || checkMiniYzm("mobil")) & (protocolMiniValue == "1"))) {
            return false
        }
    }
    $(".newover_bg", parent.document).hide();
    $("#loginIframe", parent.document).hide()
}

function checkMiniUser() {
    var b = $("#oldValueMini").val();
    var f = $.trim($("#miniRegisterName").val());
    var e = f.length;
    if (f == "") {
        $("#miniRegisterName").val("请输入邮箱/手机号");
        $("#miniRegisterName").addClass("text bian-02");
        $("#miniErrorRegisterNameDiv").text("请输入邮箱/手机号");
        $("#miniErrorRegisterNameDiv").show();
        $("#miniErrorRegisterName").addClass("error");
        if ($("#miniptyzm").show() || $("#minimobilyzm").show()) {
            $("#miniptyzm").show();
            $("#minimobilyzm").hide()
        }
        return false
    } else {
        if (e < 4 || e > 50) {
            $("#miniErrorRegisterNameDiv").text("用户名长度应在4-50个字符之间！");
            $("#miniErrorRegisterNameDiv").show();
            $("#miniErrorRegisterName").addClass("error");
            return false
        } else {
            if (checkMiniRegisterName(f) != "Y") {
                var d = /^(13|15|18|14|17|19|16)[0-9]{9}$/;
                var a = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
                if (d.test(f)) {
                    var c = new Object();
                    c.phone = f;
                    c.mobileToken = $("#minimobiletoken").val();
                    $.ajax({
                        url: appPath + "/checkPhoneisSend.html",
                        data: c,
                        type: "post",
                        async: false,
                        success: function (g) {
                            if (g == "no") {
                                showOrHideMini("#minimobilyzm", "#miniptyzm")
                            } else {
                                if (b != "" && b == f) {
                                    showOrHideMini("#miniptyzm", "#minimobilyzm");
                                    $("#spangetMiniCode").show()
                                } else {
                                    $("#oldValueMini").val(f);
                                    refreshCodeMini("#minimobilymvalue", "#miniptymvalue");
                                    showOrHideMini("#minimobilyzm", "#miniptyzm")
                                }
                            }
                        },
                        error: function (h, g) {
                            showError("系统错误，请稍候再试！")
                        }
                    })
                } else {
                    if (a.test(f)) {
                        if ($("#minimobilyzm").show()) {
                            $("#minimobilyzm").hide()
                        }
                        $("#miniptyzm").show();
                        $("#ministoreemail").val(f)
                    } else {
                        $("#miniErrorRegisterNameDiv").text("请输入正确的邮箱或手机号！");
                        $("#miniErrorRegisterNameDiv").show();
                        $("#miniRegisterName").addClass("text bian-02");
                        $("#miniErrorRegisterName").addClass("error");
                        return false
                    }
                }
                $("#miniErrorRegisterNameDiv").text("");
                $("#miniErrorRegisterNameDiv").show();
                $("#miniErrorRegisterName").addClass("correct");
                return true
            } else {
                $("#miniErrorRegisterNameDiv").text("该用户名已被注册或已被认证，请重新输入！");
                $("#miniErrorRegisterNameDiv").show();
                $("#miniErrorRegisterName").addClass("error");
                return false
            }
        }
    }
}

function keyLoginMini(a) {
    if (event.keyCode == 13) {
        document.getElementById("ptLoginMini").click()
    }
}

function checkMminiUserOnFocus() {
    if ($("#miniRegisterName").val() == "请输入邮箱/手机号") {
        $("#miniRegisterName").val("")
    }
    $("#miniRegisterName").removeClass("text bian-02");
    $("#miniRegisterName").addClass("text bian-01");
    $("#miniErrorRegisterNameDiv").text("请输入邮箱/手机号");
    $("#miniErrorRegisterNameDiv").hide();
    $("#miniErrorRegisterName").removeClass("correct");
    $("#miniErrorRegisterName").removeClass("error")
}

function checkMiniPwd() {
    checkMiniRePwd();
    var b = $("#miniPwd").val();
    var a = b.length;
    var c = /^\d{1,10}$/;
    if (b == "") {
        $("#miniErrorRegisterPwdDiv").text("请输入密码");
        $("#miniErrorRegisterPwdDiv").show();
        updateCssMini("miniPwd", "miniErrorRegisterPwd")
    } else {
        if (c.test(b)) {
            $("#miniErrorRegisterPwdDiv").text("该密码比较简单，建议您更改为复杂密码");
            $("#miniErrorRegisterPwdDiv").show();
            updateCssMini("miniPwd", "miniErrorRegisterPwd")
        } else {
            if (a < 6 || a > 20) {
                $("#miniErrorRegisterPwdDiv").text("密码长度只能在6~20位字符之间");
                $("#miniErrorRegisterPwdDiv").show();
                updateCssMini("miniPwd", "miniErrorRegisterPwd")
            } else {
                $("#miniPwd").removeClass("text bian-02");
                $("#miniPwd").addClass("text bian-01");
                $("#miniErrorRegisterPwd").removeClass("error");
                $("#miniErrorRegisterPwdDiv").text("");
                $("#miniErrorRegisterPwdDiv").hide();
                $("#miniErrorRegisterPwd").addClass("correct");
                return true
            }
        }
    }
}

function checkMiniPwdOnfocus() {
    $("#miniPwd").removeClass("text bian-02");
    $("#miniPwd").addClass("text bian-01");
    $("#miniErrorRegisterPwdDiv").text("6~20位字符,不建议使用纯数字、字母或符号！");
    $("#miniErrorRegisterPwdDiv").hide();
    $("#miniErrorRegisterPwd").removeClass("error");
    $("#miniErrorRegisterPwd").removeClass("correct")
}

function checkMiniRePwd() {
    var a = $("#reminiRegisterPwd").val();
    var b = $("#miniPwd").val();
    var c = a.length;
    if (c < 6 || c > 20) {
        $("#reminiErrorRegisterPwdDiv").text("密码长度应在6~20个字符之间！");
        $("#reminiErrorRegisterPwdDiv").show();
        updateCssMini("reminiRegisterPwd", "reminiErrorRegisterPwd")
    } else {
        if (a != b) {
            $("#reminiErrorRegisterPwdDiv").text("两次密码输入不一致！");
            $("#reminiErrorRegisterPwdDiv").show();
            updateCssMini("reminiRegisterPwd", "reminiErrorRegisterPwd")
        } else {
            $("#reminiRegisterPwd").removeClass("text bian-02");
            $("#reminiRegisterPwd").addClass("text bian-01");
            $("#reminiErrorRegisterPwdDiv").text("");
            $("#reminiErrorRegisterPwdDiv").hide();
            $("#reminiErrorRegisterPwd").removeClass("error");
            $("#reminiErrorRegisterPwd").addClass("correct");
            return true
        }
    }
}

function checkMiniRePwdOnfocus() {
    $("#reminiRegisterPwd").removeClass("text bian-02");
    $("#reminiRegisterPwd").addClass("text bian-01");
    $("#reminiErrorRegisterPwdDiv").text("请再次输入密码！");
    $("#reminiErrorRegisterPwdDiv").hide();
    $("#reminiErrorRegisterPwd").removeClass("error");
    $("#reminiErrorRegisterPwd").removeClass("correct")
}

function checkMiniYzm(c) {
    var a = $("#miniRegisterName").val();
    var g = "N";
    if (c == "pt") {
        $("#storeCodeMini").val("");
        var e = $("#miniptymvalue").val();
        if (e == "") {
            $("#minilabelym").addClass("error");
            $("#miniptymvalue").removeClass("text bian-01");
            $("#miniptymvalue").addClass("text bian-02");
            return false
        } else {
            var b = appPath + "/valacode.html";
            $.ajax({
                url: b,
                data: {
                    ptYmValue: e
                },
                type: "post",
                async: false,
                success: function (h) {
                    g = h
                },
                error: function (i, h) {
                    showError("系统错误，请稍候再试！")
                }
            });
            if (g != "Y") {
                $("#minilabelym").removeClass("correct");
                $("#minilabelym").addClass("error");
                $("#miniptymvalue").removeClass("text bian-01");
                $("#miniptymvalue").addClass("text bian-02");
                refreshMiniRegisterCode();
                return false
            } else {
                var d = /^(13|15|18|14|17|19|16)[0-9]{9}$/;
                if (d.test(a)) {
                    showOrHideMini("#miniptyzm", "#minimobilyzm");
                    $("#spangetMiniCode").show();
                    $("#spanreGetMiniCode").hide();
                    secondsRegisterMini = 0
                }
                $("#storeCode").val(e);
                $("#minilabelmobil").removeClass("error");
                $("#minilabelmobil").html("");
                $("#minilabelym").removeClass("error");
                $("#minilabelym").addClass("correct");
                $("#miniptymvalue").removeClass("text bian-02");
                $("#miniptymvalue").addClass("text bian-01");
                return true
            }
        }
    } else {
        if (c == "mobil") {
            var f = $("#minimobilymvalue").val();
            if (f == "") {
                $("#minilabelmobil").addClass("error");
                $("#minimobilymvalue").removeClass("text bian-01");
                $("#minimobilymvalue").addClass("text bian-02");
                return false
            } else {
                return validateMiniMobilCode("minilabelmobilDiv", "minilabelmobil", "minimobilymvalue", "miniRegisterName")
            }
        } else {
            return false
        }
    }
}

function focusYzm(a) {
    if (a == "pt") {
        $("#minilabelym").removeClass("error");
        $("#minilabelymDiv").text("");
        $("#minilabelymDiv").hide();
        $("#miniptymvalue").removeClass("text bian-02");
        $("#miniptymvalue").addClass("text bian-01")
    } else {
        $("#minilabelmobil").removeClass("error");
        $("#minilabelmobilDiv").text("");
        $("#minilabelmobilDiv").hide();
        $("#minimobilymvalue").removeClass("text bian-02");
        $("#minimobilymvalue").addClass("text bian-01")
    }
}

function refreshMiniRegisterCode() {
    $("#miniymimg").attr("src", appPath + "/system/keyword.html?" + Math.random() + 100)
}
var loopObjRegisterMini = null;
var secondsRegisterMini = 0;

function getMiniMobileCode(e, g, f, d) {
    if (!d) {
        refreshCodeMini("#minimobilymvalue", "#miniptymvalue")
    } else {
        var a = $("#miniptymvalue").val()
    }
    var c = $("#minimobiletoken").val();
    var b = $("#" + e).val();
    if (secondsRegisterMini > 0) {
        return
    }
    if ($("#" + f).attr("disabled")) {
        return
    }
    $("#" + f).attr("disabled", "disabled");
    $("#" + g).html("");
    $("#" + g).removeClass("correct");
    $("#" + g).removeClass("error");
    $.post(appPath + "/memberCenter/getValidateCount.html", {
        phone: b
    }, function (h) {
        if (h == "have") {
            $("#" + g).text("手机已被人验证");
            $("#" + f).removeAttr("disabled")
        } else {
            $.post(appPath + "/memberCenter/sendPhoneCodeLogin.html", {
                newCode: a,
                mobileToken: c,
                phoneNum: b
            }, function (i) {
                if (i == "yes") {
                    secondsRegisterMini = 60;
                    loopObjRegisterMini = window.setInterval(function () {
                        doUpdateMiniRegister(f)
                    }, 1000)
                } else {
                    if (i == "nno") {
                        $("#" + g).html("您的普通验证码输入错误，请刷新页面重试");
                        $("#" + g).removeClass("correct");
                        $("#" + g).addClass("error");
                        $("#" + f).removeAttr("disabled")
                    } else {
                        $("#" + g).html("您今天5次手机验证机会用完了，等明天再来验证吧");
                        $("#" + g).removeClass("correct");
                        $("#" + g).addClass("error");
                        $("#" + f).removeAttr("disabled")
                    }
                }
            })
        }
    })
}

function doUpdateMiniRegister(a) {
    secondsRegisterMini -= 1;
    if (secondsRegisterMini <= 0) {
        $("#spangetMiniCode").hide();
        $("#spanreGetMiniCode").show();
        $("#" + a).removeAttr("disabled");
        $("#" + a).html("获取验证码");
        clearInterval(loopObjRegisterMini)
    } else {
        $("#" + a).html(secondsRegisterMini + "秒后可重发")
    }
}

function validateMiniMobilCode(d, a, b, c) {
    var e = false;
    var f = $("#" + b).val();
    if (f.length == 6) {
        $.ajax({
            url: appPath + "/memberCenter/validatePhoneLogin.html",
            data: {
                codePhone: f,
                mobile: $("#" + c).val()
            },
            type: "post",
            async: false,
            success: function (g) {
                if (g == "errorCode") {
                    $("#" + a).removeClass("correct");
                    $("#" + a).addClass("error");
                    $("#" + b).removeClass("text bian-01");
                    $("#" + b).addClass("text bian-02");
                    e = false
                } else {
                    if (g == "no") {
                        $("#" + a).removeClass("correct");
                        $("#" + a).addClass("error");
                        $("#" + b).removeClass("text bian-01");
                        $("#" + b).addClass("text bian-02");
                        e = false
                    } else {
                        $("#mobileState").val("Y");
                        $("#" + a).removeClass("error");
                        $("#" + a).addClass("correct");
                        $("#" + b).removeClass("text bian-02");
                        $("#" + b).addClass("text bian-01");
                        e = true
                    }
                }
            },
            error: function () {
                showError("系统错误，请稍候再试！")
            }
        })
    } else {
        $("#" + a).removeClass("correct");
        $("#" + a).addClass("error");
        $("#" + b).removeClass("text bian-01");
        $("#" + b).addClass("text bian-02");
        e = false
    }
    return e
}

function checkMiniRegisterName(b) {
    var a = "N";
    $.ajax({
        url: appPath + "/member-checkLoginName2.html",
        data: "loginName=" + b,
        type: "post",
        async: false,
        success: function (c) {
            a = c
        },
        error: function () {
            showError("系统错误，请稍候再试！")
        }
    });
    return a
}

function updateCssMini(a, b) {
    $("#" + a).removeClass("text bian-01");
    $("#" + a).addClass("text bian-02");
    $("#" + b).removeClass("focus");
    $("#" + b).removeClass("correct");
    $("#" + b).addClass("error");
    return false
}

function tregisterMember() {
    checkadd()
}

function retrunUrls() {
    window.location.href = appPath + "/register.html?backURL=" + Urls
}

function beginRegister() {
    var a = window.location.pathname;
    if ((appPath + "/") == a) {
        parent.location.href = appPath + "/register.html"
    } else {
        parent.location.href = appPath + "/register.html?backURL=" + a.substring(appPath.length)
    }
}

function showOrHideMini(b, a) {
    if ($(b).show()) {
        $(b).hide()
    }
    $(a).show()
}

function refreshCodeMini(a, b) {
    $(a).val("");
    $(b).val("");
    $("#minilabelym").removeClass("correct");
    $("#minilabelmobil").removeClass("correct");
    $("#minilabelym").removeClass("error");
    $("#minilabelmobil").removeClass("error");
    refreshMiniRegisterCode()
}

function EmailMiniAutoComplete(a) {
    this.config = {
        targetCls: ".mini-register",
        parentCls: ".parentCls",
        hiddenCls: ".hiddenCls",
        searchForm: ".jqtransformdone",
        hoverBg: "hoverBg",
        inputValColor: "black",
        mailArr: ["@qq.com", "@gmail.com", "@126.com", "@163.com", "@hotmail.com", "@yahoo.com", "@yahoo.com.cn", "@live.com", "@sohu.com", "@sina.com"],
        isSelectHide: true,
        callback: null
    };
    this.cache = {
        onlyFlag: true,
        currentIndex: -1,
        oldIndex: -1
    };
    this.init(a)
}
EmailMiniAutoComplete.prototype = {
    constructor: EmailMiniAutoComplete,
    init: function (b) {
        this.config = $.extend(this.config, b || {});
        var a = this,
            c = a.config,
            d = a.cache;
        $(c.targetCls).each(function (e, f) {
            $(f).keyup(function (m) {
                var l = m.target,
                    k = $.trim($(this).val()),
                    h = m.keyCode,
                    i = $(this).outerHeight(),
                    j = $(this).outerWidth(),
                    g = $(this).closest(c.parentCls);
                $(g).css({
                    position: "relative"
                });
                if (k == "") {
                    $(f).attr({
                        "data-html": ""
                    });
                    $(c.hiddenCls, g).val("");
                    d.currentIndex = -1;
                    d.oldIndex = -1;
                    $(".auto-tip", g) && !$(".auto-tip", g).hasClass("hidden") && $(".auto-tip", g).addClass("hidden");
                    a._removeBg(g)
                } else {
                    $(f).attr({
                        "data-html": k
                    });
                    $(c.hiddenCls, g).val(k);
                    $(".auto-tip", g) && $(".auto-tip", g).hasClass("hidden") && $(".auto-tip", g).removeClass("hidden");
                    a._renderHTML({
                        keycode: h,
                        e: m,
                        target: l,
                        targetVal: k,
                        height: i,
                        width: j,
                        parentNode: g
                    })
                }
            })
        });
        $(c.searchForm).each(function (e, f) {
            $(f).keydown(function (h) {
                var g = h.keyCode;
                if (g == 13) {
                    return false
                }
            })
        });
        $(document).click(function (h) {
            h.stopPropagation();
            var g = h.target,
                f = c.targetCls.replace(/^\./, "");
            if (!$(g).hasClass(f)) {
                $(".auto-tip") && $(".auto-tip").each(function (e, i) {
                    !$(i).hasClass("hidden") && $(i).addClass("hidden")
                })
            }
        })
    },
    _renderHTML: function (a) {
        var b = this,
            g = b.config,
            h = b.cache,
            e;
        var d = b._keyCode(a.keycode);
        $(".auto-tip", a.parentNode).hasClass("hidden") && $(".auto-tip", a.parentNode).removeClass("hidden");
        if (d > -1) {
            b._keyUpAndDown(a.targetVal, a.e, a.parentNode)
        } else {
            if (/@/.test(a.targetVal)) {
                e = a.targetVal.replace(/@.*/, "")
            } else {
                e = a.targetVal
            }
            if (h.onlyFlag) {
                $(a.parentNode).append('<input type="hidden" class="hiddenCls"/>');
                var f = '<ul class="auto-tip">';
                for (var c = 0; c < g.mailArr.length; c++) {
                    f += '<li class="p-index' + c + '"><span class="output-num"></span><em class="em" data-html="' + g.mailArr[c] + '">' + g.mailArr[c] + "</em></li>"
                }
                f += "</ul>";
                h.onlyFlag = false;
                $(a.parentNode).append(f);
                $(".auto-tip", a.parentNode).css({
                    position: "absolute",
                    top: a.height,
                    width: a.width - 2 + "px",
                    left: 0,
                    border: "1px solid #ccc",
                    "z-index": 10000
                })
            }
            $(".auto-tip li", a.parentNode).each(function (i, j) {
                $(".output-num", j).html(e);
                !$(".output-num", j).hasClass(g.inputValColor) && $(".output-num", j).addClass(g.inputValColor);
                var k = $.trim($(".em", j).attr("data-html"));
                $(j).attr({
                    "data-html": e + "" + k
                })
            });
            b._accurateMate({
                target: a.target,
                parentNode: a.parentNode
            });
            b._itemHover(a.parentNode);
            b._executeClick(a.parentNode)
        }
    },
    _accurateMate: function (f) {
        var l = this,
            g = l.config,
            a = l.cache;
        var h = $.trim($(f.target, f.parentNode).attr("data-html")),
            c = [];
        if (/@/.test(h)) {
            var e = h.replace(/@.*/, ""),
                k = h.replace(/.*@/, "");
            $.map(g.mailArr, function (m) {
                var j = new RegExp(k);
                if (j.test(m)) {
                    c.push(m)
                }
            });
            if (c.length > 0) {
                $(".auto-tip", f.parentNode).html("");
                $(".auto-tip", f.parentNode) && $(".auto-tip", f.parentNode).hasClass("hidden") && $(".auto-tip", f.parentNode).removeClass("hidden");
                var d = "";
                for (var b = 0, i = c.length; b < i; b++) {
                    d += '<li class="p-index' + b + '"><span class="output-num"></span><em class="em" data-html="' + c[b] + '">' + c[b] + "</em></li>"
                }
                $(".auto-tip", f.parentNode).html(d);
                $(".auto-tip li", f.parentNode).each(function (j, m) {
                    $(".output-num", m).html(e);
                    !$(".output-num", m).hasClass(g.inputValColor) && $(".output-num", m).addClass(g.inputValColor);
                    var n = $.trim($(".em", m).attr("data-html"));
                    $(m).attr("data-html", "");
                    $(m).attr({
                        "data-html": e + "" + n
                    })
                });
                a.currentIndex = -1;
                a.oldIndex = -1;
                $(".auto-tip .output-num", f.parentNode).html(e);
                l._itemHover(f.parentNode);
                l._executeClick(f.parentNode)
            } else {
                $(".auto-tip", f.parentNode) && !$(".auto-tip", f.parentNode).hasClass("hidden") && $(".auto-tip", f.parentNode).addClass("hidden");
                $(".auto-tip", f.parentNode).html("")
            }
        }
    },
    _itemHover: function (a) {
        var b = this,
            c = b.config,
            d = b.cache;
        $(".auto-tip li", a).hover(function (e, f) {
            !$(this).hasClass(c.hoverBg) && $(this).addClass(c.hoverBg)
        }, function () {
            $(this).hasClass(c.hoverBg) && $(this).removeClass(c.hoverBg)
        })
    },
    _removeBg: function (a) {
        var b = this,
            c = b.config;
        $(".auto-tip li", a).each(function (d, e) {
            $(e).hasClass(c.hoverBg) && $(e).removeClass(c.hoverBg)
        })
    },
    _keyUpAndDown: function (c, f, d) {
        var k = this,
            a = k.cache,
            h = k.config;
        if ($(".auto-tip li", d) && $(".auto-tip li").length > 0) {
            var b = $(".auto-tip li", d).length,
                j = f.keyCode;
            a.oldIndex = a.currentIndex;
            if (j == 38) {
                if (a.currentIndex == -1) {
                    a.currentIndex = b - 1
                } else {
                    a.currentIndex = a.currentIndex - 1;
                    if (a.currentIndex < 0) {
                        a.currentIndex = b - 1
                    }
                }
                if (a.currentIndex !== -1) {
                    !$(".auto-tip .p-index" + a.currentIndex, d).hasClass(h.hoverBg) && $(".auto-tip .p-index" + a.currentIndex, d).addClass(h.hoverBg).siblings().removeClass(h.hoverBg);
                    var g = $(".auto-tip .p-index" + a.currentIndex, d).attr("data-html");
                    $(h.targetCls, d).val(g);
                    $(h.hiddenCls, d).val(g)
                }
            } else {
                if (j == 40) {
                    if (a.currentIndex == b - 1) {
                        a.currentIndex = 0
                    } else {
                        a.currentIndex++;
                        if (a.currentIndex > b - 1) {
                            a.currentIndex = 0
                        }
                    }
                    if (a.currentIndex !== -1) {
                        !$(".auto-tip .p-index" + a.currentIndex, d).hasClass(h.hoverBg) && $(".auto-tip .p-index" + a.currentIndex, d).addClass(h.hoverBg).siblings().removeClass(h.hoverBg);
                        var g = $(".auto-tip .p-index" + a.currentIndex, d).attr("data-html");
                        $(h.targetCls, d).val(g);
                        $(h.hiddenCls, d).val(g)
                    }
                } else {
                    if (j == 13) {
                        var i = $(".auto-tip .p-index" + a.oldIndex, d).attr("data-html");
                        $(h.targetCls, d).val(i);
                        $(h.hiddenCls, d).val(i);
                        if (h.isSelectHide) {
                            !$(".auto-tip", d).hasClass("hidden") && $(".auto-tip", d).addClass("hidden")
                        }
                        h.callback && $.isFunction(h.callback) && h.callback();
                        a.currentIndex = -1;
                        a.oldIndex = -1
                    }
                }
            }
        }
    },
    _keyCode: function (d) {
        var a = ["17", "18", "38", "40", "37", "39", "33", "34", "35", "46", "36", "13", "45", "44", "145", "19", "20", "9"];
        for (var c = 0, b = a.length; c < b; c++) {
            if (d == a[c]) {
                return c
            }
        }
        return -1
    },
    _executeClick: function (b) {
        var a = this,
            c = a.config;
        $(".auto-tip li", b).unbind("click");
        $(".auto-tip li", b).bind("click", function (f) {
            var d = $(this).attr("data-html");
            $(c.targetCls, b).val(d);
            $(c.targetCls, b).blur();
            if (c.isSelectHide) {
                !$(".auto-tip", b).hasClass("hidden") && $(".auto-tip", b).addClass("hidden")
            }
            $(c.hiddenCls, b).val(d);
            c.callback && $.isFunction(c.callback) && c.callback()
        })
    }
};