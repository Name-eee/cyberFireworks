var canvas = document.getElementById("cvs");
var ctx = canvas.getContext("2d");
var stars = [];
var clientW = document.body.clientWidth;
var clientH = document.body.clientHeight;
var fmht = window.innerHeight;
var fmwt = window.innerWidth;
canvas.height = window.innerHeight - 5;
canvas.width = window.innerWidth - 5;

function windowSize() {
    if (window.innerHeight != fmht || window.innerWidth != fmwt) {
        canvas.height = window.innerHeight - 5;
        canvas.width = window.innerWidth - 5;
        fmht = window.innerHeight;
        fmwt = window.innerWidth;
        var d = setInterval(draw, 100);
    }
}

function initStar() {
    var star;
    for (var i = 0; i <= 40; i++) {
        star = {
            px: Math.random() * fmwt,
            py: Math.random() * fmht - 100,
            r: Math.random() * 5 + 10,
        };
        stars.push(star);
    }
}

function opacity() {
    function animation() {
        if (ctx.globalAlpha == 1) ctx.globalAlpha = 0;
        ctx.globalAlpha += 0.01;
    }
    animation();
    var a = setInterval(animation, 100);
}

function draw() {
    initStar();
    var img = new Image();
    opacity();
    img.onload = function() {
        for (var i = 0; i <= 40; i++) {
            ctx.drawImage(img, stars[i].px, stars[i].py, stars[i].r, stars[i].r);
        }
    };
    img.src = "imgs/star2.png";
}

setInterval(windowSize, 100);
var d = setInterval(draw, 100);
