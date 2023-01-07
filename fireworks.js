var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");

var lines = [];

var fmht = window.innerHeight;
var fmwt = window.innerWidth;

function sin(x) {
    return Math.sin(x);
}

function cos(x) {
    return Math.cos(x);
}

function random(a, b) {
    return Math.random() * (b - a) + a;
}

function color(x) {
    x = parseInt(x)
    var color = [
        "#ed5a65",
        "#fcd337",
        "#f8d86a",
        "#66c18c",
        "#55bb8a",
        "#29b7cb",
        "#c06f98",
    ];
    return color[x % 7];
}
var pi = Math.PI;

var hx;
var hy;
var time

//-----------------------------------
function initline() {
    var line;
    var cx = random(100, fmwt - 100);
    var cy = random(100, fmht - 100);
    hx = cx;
    hy = cy;
    for (var i = 0; i <= 200; i++) {
        line = {
            x: cx,
            y: cy,
            l: random(1, 40),
            v: random(1, 5),
            a: random(0, 2) * pi,
            c: color(random(0, 100)),
        };
        lines.push(line);
    }
    time = random(100, 1500)
    setTimeout(initline, time);
}

function move() {
    ctx.clearRect(0, 0, fmwt, fmht);
    var num = 0;

    for (i of lines) {
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(i.x, i.y);
        ctx.lineTo(i.x + i.l * cos(i.a), i.y + i.l * sin(i.a));
        i.x = i.x + i.v * cos(i.a);
        i.y = i.y + i.v * sin(i.a);
        i.v = i.v - 0.05;
        ctx.globalAlpha = i.v / 4;
        if (i.v < 0.8) lines.splice(num, 1);
        var ra = ctx.createRadialGradient(hx, hy, 20, hx, hy, 50)
        ra.addColorStop(0, "#fff");
        ra.addColorStop(0.1, "yellow");
        ra.addColorStop(1, i.c);
        ctx.strokeStyle = ra;
        ctx.lineWidth = 2;
        ctx.stroke();
        num++;
    }
}

initline();
var m = setInterval(move, 10);