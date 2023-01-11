gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

gsap.set("#car", { xPercent: -50, yPercent: -50, transformOrigin: "center center" })

//var tl4 = gsap.timeline({ delay: 21.6, defaults: { duration: 3, ease: "none", immediateRender: true } });
//tl4.from("#path-p-r", { drawSVG: 0 })
//    .to("#car", {
//        motionPath: {
//            path: "#path-p-r",
//            align: "#path-p-r",
//            autoRotate: true
//        }
//    }, 0);



//var tl3 = gsap.timeline({ delay: 13, defaults: { duration: 3, ease: "none", immediateRender: true } });
//tl3.from("#path-a-a", { drawSVG: 0 })
//    .to("#car", {
//        motionPath: {
//            path: "#path-a-a",
//            align: "#path-a-a",
//            autoRotate: true
//        },
//    }, 0);
//tl3.tweenTo(0.8, { delay: 13 });
//tl3.tweenFromTo(0.8, 1.1, { delay: 16.8 });
//tl3.tweenFromTo(1.1, 3, { delay: 19.9 });

//var tl2 = gsap.timeline({ delay: 8, defaults: { duration: 3, ease: "none", immediateRender: true } });
//tl2.from("#path-p-a", { drawSVG: 0 })
//    .to("#car", {
//        motionPath: {
//            path: "#path-p-a",
//            align: "#path-p-a",
//            autoRotate: true
//        }
//    }, 0);

//var tlinfo2 = gsap.timeline({ delay: 8, defaults: { duration: 3, ease: "none", immediateRender: true } });
//tlinfo2.from("#path-p-a", { drawSVG: 0 })
//    .to("#infosAmsterdam", {
//        motionPath: {
//            path: "#path-p-a",
//            align: "#path-p-a",
//        }
//    }, 0);
//tlinfo2.tweenTo(3, { delay: 11 });


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
    ease: "none"
    }, 0);
tl.add(tween, "0");

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
    ease: "none"
}, 0);
tl.add(tween, "anvers");

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
    ease: "none"
}, 0);
tl.add(tween, "amsterdam");

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
    ease: "none"
}, 0);
tl.add(tween, "anvers2");

tl.addLabel("brussels2");
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
