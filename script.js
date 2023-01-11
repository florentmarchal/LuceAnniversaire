gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

gsap.set("#car", { xPercent: -50, yPercent: -50, transformOrigin: "center center" })

var tl4 = gsap.timeline({ delay: 21.6, defaults: { duration: 3, ease: "none", immediateRender: true } });
tl4.from("#path-p-r", { drawSVG: 0 })
    .to("#car", {
        motionPath: {
            path: "#path-p-r",
            align: "#path-p-r",
            autoRotate: true
        }
    }, 0);



var tl3 = gsap.timeline({ delay: 13, defaults: { duration: 3, ease: "none", immediateRender: true } });
tl3.from("#path-a-a", { drawSVG: 0 })
    .to("#car", {
        motionPath: {
            path: "#path-a-a",
            align: "#path-a-a",
            autoRotate: true
        },
    }, 0);
tl3.tweenTo(0.8, { delay: 13 });
tl3.tweenFromTo(0.8, 1.1, { delay: 16.8 });
tl3.tweenFromTo(1.1, 3, { delay: 19.9 });

var tl2 = gsap.timeline({ delay: 8, defaults: { duration: 3, ease: "none", immediateRender: true } });
tl2.from("#path-p-a", { drawSVG: 0 })
    .to("#car", {
        motionPath: {
            path: "#path-p-a",
            align: "#path-p-a",
            autoRotate: true
        }
    }, 0);

//var tlinfo2 = gsap.timeline({ delay: 8, defaults: { duration: 3, ease: "none", immediateRender: true } });
//tlinfo2.from("#path-p-a", { drawSVG: 0 })
//    .to("#infosAmsterdam", {
//        motionPath: {
//            path: "#path-p-a",
//            align: "#path-p-a",
//        }
//    }, 0);
//tlinfo2.tweenTo(3, { delay: 11 });


var tl = gsap.timeline({ delay: 3, defaults: { duration: 3, ease: "none", immediateRender: true } });
tl.from("#path", { drawSVG: 0 })
    .to("#car", {
        motionPath: {
            path: "#path",
            align: "#path",
            autoRotate: true
        }
    }, 0);


tl.add(TweenLite.to(".RNSPAR", 1, { css: { className: 'departure-board RNSPAR' } }), 0.11);
tl2.add(TweenLite.to(".PARAMS", 1, { css: { className: 'departure-board PARAMS mt-1' } }), 0.1);
tl3.add(TweenLite.to(".AMSANR", 1, { css: { className: 'departure-board AMSANR mt-1' } }), 0.1);
tl3.add(TweenLite.to(".ANRBRU", 1, { css: { className: 'departure-board ANRBRU mt-1' } }), 1);
tl3.add(TweenLite.to(".BRURNS", 1, { css: { className: 'departure-board BRURNS mt-1' } }), 2);
