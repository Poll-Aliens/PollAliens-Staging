"use strict";
$("#submitBtn").on("click", function () {
    localStorage.setItem("fname", $("#fname").val());
    localStorage.setItem("lname", $("#lname").val());
    localStorage.setItem("pnum", $("#pnum").val());
    localStorage.setItem("email", $("#email").val());
    localStorage.setItem("message", $("#message").val());
    window.location.assign("/");
    alert("storing data");
});
$(function () {
    if ("fname" in localStorage) {
        $("#fname").val(localStorage.getItem("fname"));
    }
    if ("lname" in localStorage) {
        $("#lname").val(localStorage.getItem("lname"));
    }
    if ("pnum" in localStorage) {
        $("#pnum").val(localStorage.getItem("pnum"));
    }
    if ("email" in localStorage) {
        $("#email").val(localStorage.getItem("email"));
    }
    if ("message" in localStorage) {
        $("#message").val(localStorage.getItem("message"));
    }
    console.log("success");
});
(function () {
    function Start() {
        console.log("App Started!");
        let XHR = new XMLHttpRequest();
        XHR.open("GET", "../data/data.json");
        XHR.send();
        XHR.addEventListener("readystatechange", function () {
            if (XHR.readyState == 4 && XHR.status == 200) {
                console.log("JSON Data:");
                console.log("===========");
                console.log(XHR.responseText);
            }
        });
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map