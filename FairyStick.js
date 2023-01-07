var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var balls = [];
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
//-----------------------------------------------
function initball() {
    var ball;
    var cx = fmwt / 2;
    var cy = fmht / 2;
    for (var i = 0; i <= 150; i++) {
        ball = {
            x: cx,
            y: cy,
            r: random(1, 3),
            v: random(1, 5),
            a: random(0, 2) * pi,
            c: color(i),
        };
        balls.push(ball);
    }
}

function initline() {
    var line;
    var cx = fmwt / 2;
    var cy = fmht / 2;
    for (var i = 0; i <= 100; i++) {
        line = {
            x: cx,
            y: cy,
            l: random(1, 20),
            v: random(1, 4),
            a: random(0, 2) * pi,
            c: color(i),
        };
        lines.push(line);
    }
}

function stick() {
    context.save();
    context.beginPath();
    context.moveTo(fmwt / 2, fmht / 2);
    context.lineTo(fmwt / 3, fmht - 5);
    context.lineWidth = 5;
    context.strokeStyle = "#fff";
    context.globalAlpha = 0.8;
    context.lineCap = "round";
    context.stroke();
    context.restore();
}

function move() {
    ctx.clearRect(0, 0, fmwt, fmht);
    initball();
    initline();

    for (var i = 0; i <= 150; i++) {
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2 * pi);
        balls[i].x = balls[i].x + balls[i].v * cos(balls[i].a);
        balls[i].y = balls[i].y + balls[i].v * sin(balls[i].a);
        balls[i].v = balls[i].v - 0.05;
        ctx.globalAlpha = balls[i].v / 4;
        if (balls[i].v < 1) balls.splice(i, 1);
        // ctx.fillStyle = balls[i].c;
        var ra = ctx.createRadialGradient(fmwt / 2, fmht / 2, 10, fmwt / 2, fmht / 2, 100)
        ra.addColorStop(0, "#fff");
        ra.addColorStop(0.1, "yellow");
        ra.addColorStop(0.2, "orange");
        ra.addColorStop(1, balls[i].c);
        ctx.fillStyle = ra;
        ctx.fill();
    }

    for (var i = 0; i <= 100; i++) {
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(lines[i].x, lines[i].y);
        ctx.lineTo(lines[i].x + lines[i].l * cos(lines[i].a), lines[i].y + lines[i].l * sin(lines[i].a));
        lines[i].x = lines[i].x + lines[i].v * cos(lines[i].a);
        lines[i].y = lines[i].y + lines[i].v * sin(lines[i].a);
        lines[i].v = lines[i].v - 0.05;
        ctx.globalAlpha = lines[i].v / 4;
        if (lines[i].v < 1) lines.splice(i, 1);
        // ctx.strokeStyle = lines[i].c;
        var ra = ctx.createRadialGradient(fmwt / 2, fmht / 2, 10, fmwt / 2, fmht / 2, 100)
        ra.addColorStop(0, "#fff");
        ra.addColorStop(0.1, "yellow");
        ra.addColorStop(0.2, "orange");
        ra.addColorStop(1, lines[i].c);
        ctx.strokeStyle = ra;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function flame() {
    context.beginPath();
    context.arc(fmwt / 2, fmht / 2, 20, 0, 2 * pi);
    var gra = context.createRadialGradient(fmwt / 2, fmht / 2, 10, fmwt / 2, fmht / 2, 25);
    gra.addColorStop(0, "rgba(255,255,255,0.9)");
    gra.addColorStop(0.2, "rgba(255,255,255,0.7)");
    gra.addColorStop(0.3, "rgba(255,255,0,0.5)");
    gra.addColorStop(0.5, "rgba(255,100,0,0.3)");
    gra.addColorStop(1, "rgba(255,0,0,0.001)")
    context.fillStyle = gra;
    context.fill();
}


stick();

var m = setInterval(move, 10);
flame();