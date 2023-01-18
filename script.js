gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

gsap.set("#car", { xPercent: -50, yPercent: -50, transformOrigin: "center center" })
gsap.set("#paris-dot", { xPercent: -50, yPercent: -50, transformOrigin: "center center" })
gsap.set("#anvers-dot", { xPercent: -50, yPercent: -50, transformOrigin: "center center" })
gsap.set("#amsterdam-dot", { xPercent: -50, yPercent: -50, transformOrigin: "center center" })
gsap.set("#brussels-dot", { xPercent: -50, yPercent: -80, transformOrigin: "center center" })


var tl = gsap.timeline({ delay: 0.1, defaults: { duration: 3, ease: "none", immediateRender: true } });

var tween = gsap.from("#path", { drawSVG: 0, duration: 3, ease: "none" });
tl.add(tween);
tween = gsap.to("#car", {
        motionPath: {
            path: "#path",
            align: "#path",
            autoRotate: true
    },
    duration: 3,
    ease: "none",
    onComplete: function () {
        $("#parisdiv").css('display', 'flex');
    }
    }, 0);
tl.add(tween, "0");


tl.addLabel("paris");
//tween = gsap.to("#parisdiv", {
//    motionPath: {
//        path: "#paris-dot",
//        align: "#paris-dot",
//    },
//    opacity: 1,
//    translate: '1em',
//    duration: 0,
//    ease: "none"
//}, 0);
//tl.add(tween, "paris");
tl.addLabel("paris", "+=2");

var tween = gsap.from("#path-p-b", { drawSVG: 0, duration: 4, ease: "none" });
tl.add(tween, "paris");
tween = gsap.to("#car", {
    motionPath: {
        path: "#path-p-b",
        align: "#path-p-b",
        autoRotate: true
    },
    duration: 4,
    ease: "none"
}, 0);
tl.add(tween, "paris");

tl.addLabel("brussels");
var tween = gsap.from("#path-b-a", { drawSVG: 0, duration: 2, ease: "none" });
tl.add(tween, "brussels");
tween = gsap.to("#car", {
    motionPath: {
        path: "#path-b-a",
        align: "#path-b-a",
        autoRotate: true
    },
    duration: 2,
    ease: "none"
}, 0);
tl.add(tween, "brussels");

tl.addLabel("anvers");
var tween = gsap.from("#path-a-a", { drawSVG: 0, duration: 2, ease: "none" });
tl.add(tween, "anvers");
tween = gsap.to("#car", {
    motionPath: {
        path: "#path-a-a",
        align: "#path-a-a",
        autoRotate: true
    },
    duration: 2,
    ease: "none",
    onComplete: function () {
        $("#amsterdamdiv").css('display', 'flex');
    }
}, 0);
tl.add(tween, "anvers");


tl.addLabel("amsterdam");
//tween = gsap.to("#amsterdamdiv", {
//    motionPath: {
//        path: "#amsterdam-dot",
//        align: "#amsterdam-dot",
//    },
//    opacity: 1,
//    translate: '-' + $("#amsterdamdiv").width() * 1.5 + 'px',
//    duration: 0,
//    ease: "none"
//}, 0);
//tl.add(tween, "amsterdam");

tl.addLabel("amsterdam", "+=2");
var tween = gsap.from("#path-a-a-r", { drawSVG: 0, duration: 3, ease: "none" });
tl.add(tween, "amsterdam");
tween = gsap.to("#car", {
    motionPath: {
        path: "#path-a-a-r",
        align: "#path-a-a-r",
        autoRotate: true
    },
    duration: 3,
    ease: "none",
    onComplete: function () {
        $("#anversdiv").css('display', 'flex');
    }
}, 0);
tl.add(tween, "amsterdam");


tl.addLabel("anvers2");
//tween = gsap.to("#anversdiv", {
//    motionPath: {
//        path: "#anvers-dot",
//        align: "#anvers-dot",
//    },
//    opacity: 1,
//    translate: '-' + $("#anversdiv").width() * 1.5 + 'px',
//    duration: 0,
//    ease: "none"
//}, 0);
//tl.add(tween, "anvers2");



tl.addLabel("anvers2", "+=2");
var tween = gsap.from("#path-b-a-r", { drawSVG: 0, duration: 3, ease: "none" });
tl.add(tween, "anvers2");
tween = gsap.to("#car", {
    motionPath: {
        path: "#path-b-a-r",
        align: "#path-b-a-r",
        autoRotate: true
    },
    duration: 3,
    ease: "none",
    onComplete: function () {
        $("#brusselsdiv").css('display', 'flex');
    }
}, 0);
tl.add(tween, "anvers2");


tl.addLabel("brussels2");
//tween = gsap.to("#brusselsdiv", {
//    motionPath: {
//        path: "#brussels-dot",
//        align: "#brussels-dot",
//    },
//    opacity: 1,
//    translate: '1em',
//    duration: 0,
//    ease: "none"
//}, 0);
//tl.add(tween, "brussels2");




tl.addLabel("brussels2", "+=2");
var tween = gsap.from("#path-p-b-r", { drawSVG: 0, duration: 3, ease: "none" });
tl.add(tween, "brussels2");
tween = gsap.to("#car", {
    motionPath: {
        path: "#path-p-b-r",
        align: "#path-p-b-r",
        autoRotate: true
    },
    duration: 3,
    ease: "none"
}, 0);
tl.add(tween, "brussels2");


tl.addLabel("paris2");
var tween = gsap.from("#path-p-r-r", { drawSVG: 0, duration: 3, ease: "none" });
tl.add(tween, "paris2");
tween = gsap.to("#car", {
    motionPath: {
        path: "#path-p-r-r",
        align: "#path-p-r-r",
        autoRotate: true
    },
    duration: 3,
    ease: "none"
}, 0);
tl.add(tween, "paris2");



tl.add(TweenLite.to(".RNSPAR", 1, { css: { className: 'departure-board RNSPAR' } }), 0.11);
tl.add(TweenLite.to(".PARAMS", 1, { css: { className: 'departure-board PARAMS mt-1' } }), "paris");
tl.add(TweenLite.to(".AMSANR", 1, { css: { className: 'departure-board AMSANR mt-1' } }), "amsterdam");
tl.add(TweenLite.to(".ANRBRU", 1, { css: { className: 'departure-board ANRBRU mt-1' } }), "anvers2");
tl.add(TweenLite.to(".BRURNS", 1, { css: { className: 'departure-board BRURNS mt-1' } }), "brussels2");
