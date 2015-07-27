/* To scale points */
var s = 30;

/* Src nodes */
var Rt = [2 * s + 30, 0 * s + 30];
var L = [1 * s + 30, 1 * s + 30];
var R = [3 * s + 30, 1 * s + 30];
var LL = [0 * s + 30, 2 * s + 30];
var LR = [2 * s + 30, 2 * s + 30];

/* Dest nodes */
var RtDest = [2 * s + 30, 1 * s + 30];
var LDest = [1 * s + 30, 0 * s + 30];
var RDest = [3 * s + 30, 2 * s + 30];
var LLDest = [0 * s + 30, 1 * s + 30];
var LRDest = [1 * s + 30, 2 * s + 30];

var start = null; /* Timestamp to hold animation start time */
var animTime = 1000; /* Controls animation speed */

/* LERP: convex combination */
function interpolate(x, y, t) {
    return [(1-t)*x[0] + t*y[0], (1-t)*x[1] + t*y[1]];
}

function drawNode(x, y) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var path = new Path2D();
    path.arc(x, y, 10, 0, 2.1*Math.PI, 1);
    context.fill(path);
}

function drawEdge(A, B, C, D)
{   var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(A, B);
    context.lineTo(C, D);
    context.lineWidth = 1.4;
    context.stroke();
}

/* Animation step */
function step(t) {
    if(!start) start = t;
    var progress = t - start;
    
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    var curTime = progress / animTime;
    
    var newRt = interpolate(Rt, RtDest, curTime);
    var newL = interpolate(L, LDest, curTime);
    var newR = interpolate(R, RDest, curTime);
    var newLL = interpolate(LL, LLDest, curTime);
    var newLR = interpolate(LR, LRDest, curTime);
    
    drawNode(newRt[0], newRt[1]);
    drawNode(newL[0], newL[1]);
    drawNode(newR[0], newR[1]);
    drawNode(newLL[0], newLL[1]);
    drawNode(newLR[0], newLR[1]);

    drawEdge(newL[0], newL[1], newLL[0], newLL[1]);
    drawEdge(newRt[0], newRt[1], newR[0], newR[1]);
    drawEdge(newRt[0], newRt[1], newL[0], newL[1]);
    var A, B;
    A = interpolate(L, RtDest, curTime);
    B = interpolate(LR, LRDest, curTime);
    drawEdge(A[0], A[1], B[0], B[1]);

    if(progress < animTime)
        window.requestAnimationFrame(step);
}

/* Start animation */
window.requestAnimationFrame(step);
