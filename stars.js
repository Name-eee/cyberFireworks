var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");

var stars = [];
var num = 50;

var fmht = window.innerHeight;
var fmwt = window.innerWidth;

canvas.height = window.innerHeight - 5;
canvas.width = window.innerWidth - 5;

cvs.height = window.innerHeight - 5;
cvs.width = window.innerWidth - 5;

function windowSize() {
    if (window.innerHeight != fmht || window.innerWidth != fmwt) {
        canvas.height = window.innerHeight - 5;
        canvas.width = window.innerWidth - 5;
        cvs.height = window.innerHeight - 5;
        cvs.width = window.innerWidth - 5;
        fmht = window.innerHeight;
        fmwt = window.innerWidth;
        var d = setInterval(draw, 100);
    }
}

function initStar() {
    var star;
    for (var i = 0; i <= num; i++) {
        star = {
            px: Math.random() * canvas.width,
            py: Math.random() * canvas.height - 100,
            r: Math.random() * 5 + 5,
        };
        stars.push(star);
    }
}

function opacity() {
    function animation() {
        if (context.globalAlpha >= 1) context.globalAlpha = 0;
        context.globalAlpha += 0.01;
    }
    animation();
    var a = setInterval(animation, 100);
}

function draw() {
    initStar();
    var img = new Image();
    opacity();
    img.onload = function() {
        for (var i = 0; i <= num; i++) {
            context.drawImage(img, stars[i].px, stars[i].py, stars[i].r, stars[i].r);
        }
    };
    img.src = "imgs/star2.png";
}

setInterval(windowSize, 100);
var d = setInterval(draw, 100);