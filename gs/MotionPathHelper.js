/*!
 * MotionPathHelper 3.11.3
 * https://greensock.com
 *
 * @license Copyright 2022, GreenSock. All rights reserved.
 * *** DO NOT DEPLOY THIS FILE ***
 * This is a trial version that only works locally and on domains like codepen.io and codesandbox.io.
 * Loading it on an unauthorized domain violates the license and will cause a redirect.
 * Get the unrestricted file by joining Club GreenSock at https://greensock.com/club
 * @author: Jack Doyle, jack@greensock.com
 */

!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(((t = t || self).window = t.window || {}));
})(this, function (t) {
    "use strict";
    function n(t) {
        return Math.round(1e5 * t) / 1e5 || 0;
    }
    function o(t, e) {
        return (
            (e.totalLength = t.totalLength), t.samples ? ((e.samples = t.samples.slice(0)), (e.lookup = t.lookup.slice(0)), (e.minLength = t.minLength), (e.resolution = t.resolution)) : t.totalPoints && (e.totalPoints = t.totalPoints), e
        );
    }
    var P,
        w = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        C = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
        W = Math.PI / 180,
        j = Math.sin,
        F = Math.cos,
        Q = Math.abs,
        U = Math.sqrt,
        A = 1e8;
    function copyRawPath(t) {
        for (var e = [], n = 0; n < t.length; n++) e[n] = o(t[n], t[n].slice(0));
        return o(t, e);
    }
    function transformRawPath(t, e, n, i, s, a, o) {
        for (var r, h, l, c, d, u = t.length; -1 < --u;) for (h = (r = t[u]).length, l = 0; l < h; l += 2) (c = r[l]), (d = r[l + 1]), (r[l] = c * e + d * i + a), (r[l + 1] = c * n + d * s + o);
        return (t._dirty = 1), t;
    }
    function arcToSegment(t, e, n, i, s, a, o, r, h) {
        if (t !== r || e !== h) {
            (n = Q(n)), (i = Q(i));
            var l = (s % 360) * W,
                c = F(l),
                d = j(l),
                u = Math.PI,
                g = 2 * u,
                p = (t - r) / 2,
                f = (e - h) / 2,
                _ = c * p + d * f,
                m = -d * p + c * f,
                v = _ * _,
                b = m * m,
                y = v / (n * n) + b / (i * i);
            1 < y && ((n = U(y) * n), (i = U(y) * i));
            var P = n * n,
                A = i * i,
                w = (P * A - P * b - A * v) / (P * b + A * v);
            w < 0 && (w = 0);
            var C = (a === o ? -1 : 1) * U(w),
                x = ((n * m) / i) * C,
                S = ((-i * _) / n) * C,
                E = c * x - d * S + (t + r) / 2,
                k = d * x + c * S + (e + h) / 2,
                M = (_ - x) / n,
                D = (m - S) / i,
                H = (-_ - x) / n,
                T = (-m - S) / i,
                N = M * M + D * D,
                R = (D < 0 ? -1 : 1) * Math.acos(M / U(N)),
                L = (M * T - D * H < 0 ? -1 : 1) * Math.acos((M * H + D * T) / U(N * (H * H + T * T)));
            isNaN(L) && (L = u), !o && 0 < L ? (L -= g) : o && L < 0 && (L += g), (R %= g), (L %= g);
            var O,
                B = Math.ceil(Q(L) / (g / 4)),
                X = [],
                I = L / B,
                G = ((4 / 3) * j(I / 2)) / (1 + F(I / 2)),
                q = c * n,
                z = d * n,
                V = d * -i,
                Y = c * i;
            for (O = 0; O < B; O++) (_ = F((s = R + O * I))), (m = j(s)), (M = F((s += I))), (D = j(s)), X.push(_ - G * m, m + G * _, M + G * D, D - G * M, M, D);
            for (O = 0; O < X.length; O += 2) (_ = X[O]), (m = X[O + 1]), (X[O] = _ * q + m * V + E), (X[O + 1] = _ * z + m * Y + k);
            return (X[O - 2] = r), (X[O - 1] = h), X;
        }
    }
    function stringToRawPath(t) {
        function xd(t, e, n, i) {
            (c = (n - t) / 3), (d = (i - e) / 3), r.push(t + c, e + d, n - c, i - d, n, i);
        }
        var e,
            n,
            i,
            s,
            a,
            o,
            r,
            h,
            l,
            c,
            d,
            u,
            g,
            p,
            f,
            _ =
                (t + "")
                    .replace(C, function (t) {
                        var e = +t;
                        return e < 1e-4 && -1e-4 < e ? 0 : e;
                    })
                    .match(w) || [],
            m = [],
            v = 0,
            b = 0,
            y = _.length,
            P = 0,
            A = "ERROR: malformed path: " + t;
        if (!t || !isNaN(_[0]) || isNaN(_[1])) return console.log(A), m;
        for (e = 0; e < y; e++)
            if (((g = a), isNaN(_[e]) ? (o = (a = _[e].toUpperCase()) !== _[e]) : e--, (i = +_[e + 1]), (s = +_[e + 2]), o && ((i += v), (s += b)), e || ((h = i), (l = s)), "M" === a))
                r && (r.length < 8 ? --m.length : (P += r.length)), (v = h = i), (b = l = s), (r = [i, s]), m.push(r), (e += 2), (a = "L");
            else if ("C" === a) o || (v = b = 0), (r = r || [0, 0]).push(i, s, v + 1 * _[e + 3], b + 1 * _[e + 4], (v += 1 * _[e + 5]), (b += 1 * _[e + 6])), (e += 6);
            else if ("S" === a) (c = v), (d = b), ("C" !== g && "S" !== g) || ((c += v - r[r.length - 4]), (d += b - r[r.length - 3])), o || (v = b = 0), r.push(c, d, i, s, (v += 1 * _[e + 3]), (b += 1 * _[e + 4])), (e += 4);
            else if ("Q" === a) (c = v + (2 / 3) * (i - v)), (d = b + (2 / 3) * (s - b)), o || (v = b = 0), (v += 1 * _[e + 3]), (b += 1 * _[e + 4]), r.push(c, d, v + (2 / 3) * (i - v), b + (2 / 3) * (s - b), v, b), (e += 4);
            else if ("T" === a) (c = v - r[r.length - 4]), (d = b - r[r.length - 3]), r.push(v + c, b + d, i + (2 / 3) * (v + 1.5 * c - i), s + (2 / 3) * (b + 1.5 * d - s), (v = i), (b = s)), (e += 2);
            else if ("H" === a) xd(v, b, (v = i), b), (e += 1);
            else if ("V" === a) xd(v, b, v, (b = i + (o ? b - v : 0))), (e += 1);
            else if ("L" === a || "Z" === a) "Z" === a && ((i = h), (s = l), (r.closed = !0)), ("L" === a || 0.5 < Q(v - i) || 0.5 < Q(b - s)) && (xd(v, b, i, s), "L" === a && (e += 2)), (v = i), (b = s);
            else if ("A" === a) {
                if (
                    ((p = _[e + 4]),
                        (f = _[e + 5]),
                        (c = _[e + 6]),
                        (d = _[e + 7]),
                        (n = 7),
                        1 < p.length && (p.length < 3 ? ((d = c), (c = f), n--) : ((d = f), (c = p.substr(2)), (n -= 2)), (f = p.charAt(1)), (p = p.charAt(0))),
                        (u = arcToSegment(v, b, +_[e + 1], +_[e + 2], +_[e + 3], +p, +f, (o ? v : 0) + 1 * c, (o ? b : 0) + 1 * d)),
                        (e += n),
                        u)
                )
                    for (n = 0; n < u.length; n++) r.push(u[n]);
                (v = r[r.length - 2]), (b = r[r.length - 1]);
            } else console.log(A);
        return (e = r.length) < 6 ? (m.pop(), (e = 0)) : r[0] === r[e - 2] && r[1] === r[e - 1] && (r.closed = !0), (m.totalPoints = P + e), m;
    }
    function bezierToPoints(t, e, n, i, s, a, o, r, h, l, c) {
        var d,
            u = (t + n) / 2,
            g = (e + i) / 2,
            p = (n + s) / 2,
            f = (i + a) / 2,
            _ = (s + o) / 2,
            m = (a + r) / 2,
            v = (u + p) / 2,
            b = (g + f) / 2,
            y = (p + _) / 2,
            P = (f + m) / 2,
            A = (v + y) / 2,
            w = (b + P) / 2,
            C = o - t,
            x = r - e,
            S = Q((n - o) * x - (i - r) * C),
            E = Q((s - o) * x - (a - r) * C);
        return (
            l || ((l = [t, e, o, r]), (c = 2)),
            l.splice(c || l.length - 2, 0, A, w),
            h * (C * C + x * x) < (S + E) * (S + E) && ((d = l.length), bezierToPoints(t, e, u, g, v, b, A, w, h, l, c), bezierToPoints(A, w, y, P, _, m, o, r, h, l, c + 2 + (l.length - d))),
            l
        );
    }
    function pointsToSegment(t, e) {
        Q(t[0] - t[2]) < 1e-4 && Q(t[1] - t[3]) < 1e-4 && (t = t.slice(2));
        var i,
            s,
            a,
            o,
            r,
            h,
            l,
            c,
            d,
            u,
            g,
            p,
            f,
            _,
            m = t.length - 2,
            v = +t[0],
            b = +t[1],
            y = +t[2],
            P = +t[3],
            A = [v, b, v, b],
            w = y - v,
            C = P - b,
            x = Math.abs(t[m] - v) < 0.001 && Math.abs(t[m + 1] - b) < 0.001;
        for (x && (t.push(y, P), (y = v), (P = b), (v = t[m - 2]), (b = t[m - 1]), t.unshift(v, b), (m += 4)), e = e || 0 === e ? +e : 1, a = 2; a < m; a += 2)
            (i = v),
                (s = b),
                (v = y),
                (b = P),
                (y = +t[a + 2]),
                (P = +t[a + 3]),
                (v === y && b === P) ||
                ((o = w),
                    (r = C),
                    (w = y - v),
                    (C = P - b),
                    (c = (((h = U(o * o + r * r)) + (l = U(w * w + C * C))) * e * 0.25) / U(Math.pow(w / l + o / h, 2) + Math.pow(C / l + r / h, 2))),
                    (g = v - ((d = v - (v - i) * (h ? c / h : 0)) + ((((u = v + (y - v) * (l ? c / l : 0)) - d) * ((3 * h) / (h + l) + 0.5)) / 4 || 0))),
                    (_ = b - ((p = b - (b - s) * (h ? c / h : 0)) + ((((f = b + (P - b) * (l ? c / l : 0)) - p) * ((3 * h) / (h + l) + 0.5)) / 4 || 0))),
                    (v === i && b === s) || A.push(n(d + g), n(p + _), n(v), n(b), n(u + g), n(f + _)));
        return v !== y || b !== P || A.length < 4 ? A.push(n(y), n(P), n(y), n(P)) : (A.length -= 2), 2 === A.length ? A.push(v, b, v, b, v, b) : x && (A.splice(0, 6), (A.length = A.length - 6)), A;
    }
    function simplifyPoints(t, e) {
        var n,
            i,
            s,
            a,
            o,
            r,
            h,
            l = parseFloat(t[0]),
            c = parseFloat(t[1]),
            d = [l, c],
            u = t.length - 2;
        for (e = Math.pow(e || 1, 2), n = 2; n < u; n += 2) e < (a = l - (i = parseFloat(t[n]))) * a + (o = c - (s = parseFloat(t[n + 1]))) * o && (d.push(i, s), (l = i), (c = s));
        return (
            d.push(parseFloat(t[u]), parseFloat(t[1 + u])),
            (function simplifyStep(t, e, n, i, s) {
                var a,
                    o,
                    r,
                    h,
                    l,
                    c,
                    d,
                    u,
                    g,
                    p,
                    f,
                    _,
                    m = i,
                    v = t[e],
                    b = t[e + 1],
                    y = t[n],
                    P = t[n + 1];
                for (o = e + 2; o < n; o += 2)
                    (h = t[o]),
                        (l = t[o + 1]),
                        (p = void 0),
                        (_ = (g = P) - (d = b)),
                        ((f = (u = y) - (c = v)) || _) && (1 < (p = ((h - c) * f + (l - d) * _) / (f * f + _ * _)) ? ((c = u), (d = g)) : 0 < p && ((c += f * p), (d += _ * p))),
                        m < (r = Math.pow(h - c, 2) + Math.pow(l - d, 2)) && ((a = o), (m = r));
                i < m && (2 < a - e && simplifyStep(t, e, a, i, s), s.push(t[a], t[a + 1]), 2 < n - a && simplifyStep(t, a, n, i, s));
            })(d, 0, (h = d.length - 2), e, (r = [d[0], d[1]])),
            r.push(d[h], d[1 + h]),
            r
        );
    }
    function getClosestProgressOnBezier(t, e, n, i, s, a, o, r, h, l, c, d, u, g) {
        var p,
            f,
            _,
            m,
            v = (s - i) / a,
            b = 0,
            y = i;
        for (P = A; y <= s;)
            (p = (f = (m = 1 - y) * m * m * o + 3 * m * m * y * h + 3 * m * y * y * c + y * y * y * u - e) * f + (_ = m * m * m * r + 3 * m * m * y * l + 3 * m * y * y * d + y * y * y * g - n) * _) < P && ((P = p), (b = y)), (y += v);
        return 1 < t ? getClosestProgressOnBezier(t - 1, e, n, Math.max(b - v, 0), Math.min(b + v, 1), a, o, r, h, l, c, d, u, g) : b;
    }
    function B(t) {
        var e = t.ownerDocument || t;
        !(x in t.style) && "msTransform" in t.style && (S = (x = "msTransform") + "Origin");
        for (; e.parentNode && (e = e.parentNode););
        if (((p = window), (v = new D()), e)) {
            (f = (g = e).documentElement), (_ = e.body), ((b = g.createElementNS("http://www.w3.org/2000/svg", "g")).style.transform = "none");
            var n = e.createElement("div"),
                i = e.createElement("div");
            _.appendChild(n), n.appendChild(i), (n.style.position = "static"), (n.style[x] = "translate3d(0,0,1px)"), (y = i.offsetParent !== n), _.removeChild(n);
        }
        return e;
    }
    function H(t) {
        return t.ownerSVGElement || ("svg" === (t.tagName + "").toLowerCase() ? t : null);
    }
    function J(t, e) {
        if (t.parentNode && (g || B(t))) {
            var n = H(t),
                i = n ? n.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml",
                s = n ? (e ? "rect" : "g") : "div",
                a = 2 !== e ? 0 : 100,
                o = 3 === e ? 100 : 0,
                r = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;",
                h = g.createElementNS ? g.createElementNS(i.replace(/^https/, "http"), s) : g.createElement(s);
            return (
                e &&
                (n
                    ? ((m = m || J(t)), h.setAttribute("width", 0.01), h.setAttribute("height", 0.01), h.setAttribute("transform", "translate(" + a + "," + o + ")"), m.appendChild(h))
                    : (u || ((u = J(t)).style.cssText = r), (h.style.cssText = r + "width:0.1px;height:0.1px;top:" + o + "px;left:" + a + "px"), u.appendChild(h))),
                h
            );
        }
        throw "Need document and parent.";
    }
    function M(t, e) {
        var n,
            i,
            s,
            a,
            o,
            r,
            h = H(t),
            l = t === h,
            c = h ? E : k,
            d = t.parentNode;
        if (t === p) return t;
        if ((c.length || c.push(J(t, 1), J(t, 2), J(t, 3)), (n = h ? m : u), h))
            l
                ? ((a =
                    -(s = (function _getCTM(t) {
                        var e,
                            n = t.getCTM();
                        return (
                            n || ((e = t.style[x]), (t.style[x] = "none"), t.appendChild(b), (n = b.getCTM()), t.removeChild(b), e ? (t.style[x] = e) : t.style.removeProperty(x.replace(/([A-Z])/g, "-$1").toLowerCase())), n || v.clone()
                        );
                    })(t)).e / s.a),
                    (o = -s.f / s.d),
                    (i = v))
                : t.getBBox
                    ? ((s = t.getBBox()),
                        (a =
                            (i = (i = t.transform ? t.transform.baseVal : {}).numberOfItems
                                ? 1 < i.numberOfItems
                                    ? (function _consolidate(t) {
                                        for (var e = new D(), n = 0; n < t.numberOfItems; n++) e.multiply(t.getItem(n).matrix);
                                        return e;
                                    })(i)
                                    : i.getItem(0).matrix
                                : v).a *
                            s.x +
                            i.c * s.y),
                        (o = i.b * s.x + i.d * s.y))
                    : ((i = new D()), (a = o = 0)),
                e && "g" === t.tagName.toLowerCase() && (a = o = 0),
                (l ? h : d).appendChild(n),
                n.setAttribute("transform", "matrix(" + i.a + "," + i.b + "," + i.c + "," + i.d + "," + (i.e + a) + "," + (i.f + o) + ")");
        else {
            if (((a = o = 0), y)) for (i = t.offsetParent, s = t; (s = s && s.parentNode) && s !== i && s.parentNode;) 4 < (p.getComputedStyle(s)[x] + "").length && ((a = s.offsetLeft), (o = s.offsetTop), (s = 0));
            if ("absolute" !== (r = p.getComputedStyle(t)).position && "fixed" !== r.position) for (i = t.offsetParent; d && d !== i;) (a += d.scrollLeft || 0), (o += d.scrollTop || 0), (d = d.parentNode);
            ((s = n.style).top = t.offsetTop - o + "px"), (s.left = t.offsetLeft - a + "px"), (s[x] = r[x]), (s[S] = r[S]), (s.position = "fixed" === r.position ? "fixed" : "absolute"), t.parentNode.appendChild(n);
        }
        return n;
    }
    function N(t, e, n, i, s, a, o) {
        return (t.a = e), (t.b = n), (t.c = i), (t.d = s), (t.e = a), (t.f = o), t;
    }
    var g,
        p,
        f,
        _,
        u,
        m,
        v,
        b,
        y,
        e,
        x = "transform",
        S = x + "Origin",
        E = [],
        k = [],
        D =
            (((e = Matrix2D.prototype).inverse = function inverse() {
                var t = this.a,
                    e = this.b,
                    n = this.c,
                    i = this.d,
                    s = this.e,
                    a = this.f,
                    o = t * i - e * n || 1e-10;
                return N(this, i / o, -e / o, -n / o, t / o, (n * a - i * s) / o, -(t * a - e * s) / o);
            }),
                (e.multiply = function multiply(t) {
                    var e = this.a,
                        n = this.b,
                        i = this.c,
                        s = this.d,
                        a = this.e,
                        o = this.f,
                        r = t.a,
                        h = t.c,
                        l = t.b,
                        c = t.d,
                        d = t.e,
                        u = t.f;
                    return N(this, r * e + l * i, r * n + l * s, h * e + c * i, h * n + c * s, a + d * e + u * i, o + d * n + u * s);
                }),
                (e.clone = function clone() {
                    return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f);
                }),
                (e.equals = function equals(t) {
                    var e = this.a,
                        n = this.b,
                        i = this.c,
                        s = this.d,
                        a = this.e,
                        o = this.f;
                    return e === t.a && n === t.b && i === t.c && s === t.d && a === t.e && o === t.f;
                }),
                (e.apply = function apply(t, e) {
                    void 0 === e && (e = {});
                    var n = t.x,
                        i = t.y,
                        s = this.a,
                        a = this.b,
                        o = this.c,
                        r = this.d,
                        h = this.e,
                        l = this.f;
                    return (e.x = n * s + i * o + h || 0), (e.y = n * a + i * r + l || 0), e;
                }),
                Matrix2D);
    function Matrix2D(t, e, n, i, s, a) {
        void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === i && (i = 1), void 0 === s && (s = 0), void 0 === a && (a = 0), N(this, t, e, n, i, s, a);
    }
    function getGlobalMatrix(t, e, n, i) {
        if (!t || !t.parentNode || (g || B(t)).documentElement === t) return new D();
        var s = (function _forceNonZeroScale(t) {
            for (var e, n; t && t !== _;)
                (n = t._gsap) && n.uncache && n.get(t, "x"), n && !n.scaleX && !n.scaleY && n.renderTransform && ((n.scaleX = n.scaleY = 1e-4), n.renderTransform(1, n), e ? e.push(n) : (e = [n])), (t = t.parentNode);
            return e;
        })(t),
            a = H(t) ? E : k,
            o = M(t, n),
            r = a[0].getBoundingClientRect(),
            h = a[1].getBoundingClientRect(),
            l = a[2].getBoundingClientRect(),
            c = o.parentNode,
            d =
                !i &&
                (function _isFixed(t) {
                    return "fixed" === p.getComputedStyle(t).position || ((t = t.parentNode) && 1 === t.nodeType ? _isFixed(t) : void 0);
                })(t),
            u = new D(
                (h.left - r.left) / 100,
                (h.top - r.top) / 100,
                (l.left - r.left) / 100,
                (l.top - r.top) / 100,
                r.left +
                (d
                    ? 0
                    : (function _getDocScrollLeft() {
                        return p.pageXOffset || g.scrollLeft || f.scrollLeft || _.scrollLeft || 0;
                    })()),
                r.top +
                (d
                    ? 0
                    : (function _getDocScrollTop() {
                        return p.pageYOffset || g.scrollTop || f.scrollTop || _.scrollTop || 0;
                    })())
            );
        if ((c.removeChild(o), s)) for (r = s.length; r--;) ((h = s[r]).scaleX = h.scaleY = 0), h.renderTransform(1, h);
        return e ? u.inverse() : u;
    }
    function aa() {
        return !1;
    }
    function na(t) {
        t.preventDefault && (t.preventDefault(), t.preventManipulation && t.preventManipulation());
    }
    function oa(t) {
        return T.createElementNS ? T.createElementNS("http://www.w3.org/1999/xhtml", t) : T.createElement(t);
    }
    function pa(t, e, n) {
        var i,
            s = T.createElementNS("http://www.w3.org/2000/svg", t),
            a = /([a-z])([A-Z])/g;
        for (i in (((n = n || {}).class = n.class || "path-editor"), n)) void 0 !== s.style[i] ? (s.style[i] = n[i]) : s.setAttributeNS(null, i.replace(a, "$1-$2").toLowerCase(), n[i]);
        return e.appendChild(s), s;
    }
    function ra(t) {
        return ((t.transform && t.transform.baseVal.consolidate()) || at).matrix;
    }
    function ua(t) {
        return ~~(1e3 * t + (t < 0 ? -0.5 : 0.5)) / 1e3;
    }
    function xa(t) {
        if (!t.target._gsSelection && !$ && 100 < Y() - Z) {
            for (var e = st.length; -1 < --e;) st[e].deselect();
            st.length = 0;
        }
    }
    function Ba(t, e, n, i) {
        if (t.addEventListener) {
            var s = X[e];
            (i = i || { passive: !1 }), t.addEventListener(s || e, n, i), s && e !== s && "pointer" !== s.substr(0, 7) && t.addEventListener(e, n, i);
        } else t.attachEvent && t.attachEvent("on" + e, n);
    }
    function Ca(t, e, n) {
        if (t.removeEventListener) {
            var i = X[e];
            t.removeEventListener(i || e, n), i && e !== i && "pointer" !== i.substr(0, 7) && t.removeEventListener(e, n);
        } else t.detachEvent && t.detachEvent("on" + e, n);
    }
    function Ea(t) {
        (ot = t.touches && _dragCount < t.touches.length), Ca(t.target, "touchend", Ea);
    }
    function Fa(t) {
        (ot = t.touches && _dragCount < t.touches.length), Ba(t.target, "touchend", Ea);
    }
    function Ga(e, n) {
        return function (t) {
            return e.call(n, t);
        };
    }
    function Ha(t, e, n) {
        var i = e.vars[t];
        return i && i.call(e.vars.callbackScope || e, n || e), e;
    }
    function Ja() {
        (I.style.display = "block"), I.select(), (I.style.display = "none");
    }
    function La(t) {
        (T = document),
            (c = window),
            (i = T.body),
            (s = s || t || c.gsap || console.warn("Please gsap.registerPlugin(PathEditor)")),
            (r = (s && s.core.context) || function () { }),
            (a = oa("div")),
            ((I = oa("textarea")).style.display = "none"),
            i && i.appendChild(I),
            (X = (function (t) {
                for (
                    var e = t.split(","),
                    n = (void 0 !== a.onpointerdown ? "pointerdown,pointermove,pointerup,pointercancel" : void 0 !== a.onmspointerdown ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : t).split(","),
                    i = {},
                    s = 4;
                    -1 < --s;

                )
                    (i[e[s]] = n[s]), (i[n[s]] = e[s]);
                return i;
            })("touchstart,touchmove,touchend,touchcancel")),
            (SVGElement.prototype.getTransformToElement =
                SVGElement.prototype.getTransformToElement ||
                function (t) {
                    return t.getScreenCTM().inverse().multiply(this.getScreenCTM());
                }),
            T.addEventListener(
                "keydown",
                function (t) {
                    var e,
                        n,
                        i,
                        s,
                        a = t.keyCode || t.which,
                        o = t.key || a;
                    if ("Shift" === o || 16 === a) L = !0;
                    else if ("Control" === o || 17 === a) l = !0;
                    else if ("Meta" === o || 91 === a) d = !0;
                    else if ("Alt" === o || 18 === a) for (R = !0, e = st.length; -1 < --e;) st[e]._onPressAlt();
                    else if (("z" === o || 90 === a) && (l || d) && 1 < tt.length) {
                        if ((tt.shift(), (n = tt[0]))) {
                            for ((s = n.path).path.setAttribute("d", n.d), s.path.setAttribute("transform", n.transform), s.init(), i = s._anchors, e = 0; e < i.length; e++)
                                -1 !== n.selectedIndexes.indexOf(i[e].i) && s._selectedAnchors.push(i[e]);
                            s._updateAnchors(), s.update(), s.vars.onUndo && s.vars.onUndo.call(s);
                        }
                    } else if ("Delete" === o || "Backspace" === o || 8 === a || 46 === a || 63272 === a || ("d" === a && (l || d))) for (e = st.length; -1 < --e;) st[e]._deleteSelectedAnchors();
                    else if (("a" === o || 65 === a) && (d || l)) for (e = st.length; -1 < --e;) st[e].select(!0);
                },
                !0
            ),
            T.addEventListener(
                "keyup",
                function (t) {
                    var e = t.key || t.keyCode || t.which;
                    if ("Shift" === e || 16 === e) L = !1;
                    else if ("Control" === e || 17 === e) l = !1;
                    else if ("Meta" === e || 91 === e) d = !1;
                    else if ("Alt" === e || 18 === e) {
                        R = !1;
                        for (var n = st.length; -1 < --n;) st[n]._onReleaseAlt();
                    }
                },
                !0
            ),
            (h = !!c.PointerEvent),
            Ba(T, "mouseup", xa),
            Ba(T, "touchend", xa),
            Ba(T, "touchcancel", aa),
            Ba(c, "touchmove", aa),
            i && i.addEventListener("touchstart", aa),
            (G = 1);
    }
    function Ma(t) {
        var e,
            n,
            i = this,
            s = getGlobalMatrix(i.target.parentNode, !0);
        (this._matrix = this.target.transform.baseVal.getItem(0).matrix),
            (this._ctm = s),
            X[t.type]
                ? ((e = -1 !== t.type.indexOf("touch") ? t.currentTarget || t.target : T),
                    Ba(e, "touchend", i._onRelease),
                    Ba(e, "touchmove", i._onMove),
                    Ba(e, "touchcancel", i._onRelease),
                    Ba(T, "touchstart", Fa),
                    Ba(c, "touchforcechange", na))
                : ((e = null), Ba(T, "mousemove", i._onMove)),
            h || Ba(T, "mouseup", i._onRelease),
            na(t),
            Ja(),
            t.changedTouches ? ((t = i.touch = t.changedTouches[0]), (i.touchID = t.identifier)) : t.pointerId ? (i.touchID = t.pointerId) : (i.touch = i.touchID = null),
            (i._startPointerY = i.pointerY = t.pageY),
            (i._startPointerX = i.pointerX = t.pageX),
            (i._startElementX = i._matrix.e),
            (i._startElementY = i._matrix.f),
            1 === this._ctm.a && 0 === this._ctm.b && 0 === this._ctm.c && 1 === this._ctm.d
                ? (this._ctm = null)
                : ((n = i._startPointerX * this._ctm.a + i._startPointerY * this._ctm.c + this._ctm.e), (i._startPointerY = i._startPointerX * this._ctm.b + i._startPointerY * this._ctm.d + this._ctm.f), (i._startPointerX = n)),
            (i.isPressed = $ = !0),
            (i.touchEventTarget = e),
            i.vars.onPress && i.vars.onPress.call(i.vars.callbackScope || i, i.pointerEvent);
    }
    function Na(t) {
        var e,
            n,
            i = this,
            s = t;
        if (i._enabled && !ot && i.isPressed && t) {
            if ((e = (i.pointerEvent = t).changedTouches)) {
                if ((t = e[0]) !== i.touch && t.identifier !== i.touchID) {
                    for (n = e.length; -1 < --n && (t = e[n]).identifier !== i.touchID;);
                    if (n < 0) return;
                }
            } else if (t.pointerId && i.touchID && t.pointerId !== i.touchID) return;
            na(s), i.setPointerPosition(t.pageX, t.pageY), i.vars.onDrag && i.vars.onDrag.call(i.vars.callbackScope || i, i.pointerEvent);
        }
    }
    function Oa(t, e) {
        var n = this;
        if (
            n._enabled &&
            n.isPressed &&
            (!t ||
                null == n.touchID ||
                e ||
                !(
                    (t.pointerId && t.pointerId !== n.touchID) ||
                    (t.changedTouches &&
                        !(function _hasTouchID(t, e) {
                            for (var n = t.length; -1 < --n;) if (t[n].identifier === e) return !0;
                            return !1;
                        })(t.changedTouches, n.touchID))
                ))
        ) {
            !(function _interacted() {
                Z = Y();
            })(),
                (n.isPressed = $ = !1);
            var i,
                s,
                a = t,
                o = n.isDragging,
                r = n.touchEventTarget;
            if (
                (r ? (Ca(r, "touchend", n._onRelease), Ca(r, "touchmove", n._onMove), Ca(r, "touchcancel", n._onRelease), Ca(T, "touchstart", Fa)) : Ca(T, "mousemove", n._onMove),
                    h || (Ca(T, "mouseup", n._onRelease), t && t.target && Ca(t.target, "mouseup", n._onRelease)),
                    o ? (n.isDragging = !1) : n.vars.onClick && n.vars.onClick.call(n.vars.callbackScope || n, a),
                    t)
            ) {
                if ((i = t.changedTouches) && (t = i[0]) !== n.touch && t.identifier !== n.touchID) {
                    for (s = i.length; -1 < --s && (t = i[s]).identifier !== n.touchID;);
                    if (s < 0) return;
                }
                (n.pointerEvent = a), (n.pointerX = t.pageX), (n.pointerY = t.pageY);
            }
            return (
                a && !o && n.vars.onDragRelease ? n.vars.onDragRelease.call(n, n.pointerEvent) : (a && na(a), n.vars.onRelease && n.vars.onRelease.call(n.vars.callbackScope || n, n.pointerEvent)),
                o && n.vars.onDragEnd && n.vars.onDragEnd.call(n.vars.callbackScope || n, n.pointerEvent),
                !0
            );
        }
    }
    function Pa(t, e, n, i) {
        var s,
            a = t[e],
            o = a.length - (a.closed ? 6 : 0),
            r = [];
        for (s = 0; s < o; s += 6) r.push(new lt(n, t, e, s, i));
        return a.closed && (r[0].isClosedStart = !0), r;
    }
    function Qa(t, e, n) {
        var i = t[n] - t[e],
            s = t[n + 1] - t[e + 1];
        return Math.sqrt(i * i + s * s);
    }
    var T,
        h,
        c,
        i,
        s,
        r,
        l,
        R,
        L,
        d,
        O,
        a,
        X,
        I,
        G,
        q,
        z = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        V = "#4e7fff",
        Y =
            (Math.PI,
                Date.now ||
                function () {
                    return new Date().getTime();
                }),
        Z = 0,
        $ = 0,
        K = {},
        tt = [],
        et = {},
        nt = [],
        it = ",",
        st = [],
        at = { matrix: new D() },
        ot = 0,
        rt =
            (((q = DraggableSVG.prototype).setPointerPosition = function setPointerPosition(t, e) {
                var n, i, s, a, o;
                (this.pointerX = t),
                    (this.pointerY = e),
                    this._ctm && ((o = t * this._ctm.a + e * this._ctm.c + this._ctm.e), (e = t * this._ctm.b + e * this._ctm.d + this._ctm.f), (t = o)),
                    (i = e - this._startPointerY) < 1 && -1 < i && (i = 0),
                    (n = t - this._startPointerX) < 1 && -1 < n && (n = 0),
                    (s = ((1e3 * (this._startElementX + n)) | 0) / 1e3),
                    (a = ((1e3 * (this._startElementY + i)) | 0) / 1e3),
                    this.snap && !L && ((et.x = s), (et.y = a), this.snap.call(this, et), (s = et.x), (a = et.y)),
                    (this.x === s && this.y === a) || ((this._matrix.f = this.y = a), (this._matrix.e = this.x = s), !this.isDragging && this.isPressed && ((this.isDragging = !0), Ha("onDragStart", this, this.pointerEvent)));
            }),
                (q.enabled = function enabled(t) {
                    return arguments.length
                        ? ((this._enabled = t)
                            ? (h || Ba(this.target, "mousedown", this._onPress), Ba(this.target, "touchstart", this._onPress), Ba(this.target, "click", this._onClick, !0))
                            : ((e = this.isDragging),
                                Ca(this.target, "mousedown", this._onPress),
                                Ca(this.target, "touchstart", this._onPress),
                                Ca(c, "touchforcechange", na),
                                Ca(this.target, "click", this._onClick),
                                this.touchEventTarget && (Ca(this.touchEventTarget, "touchcancel", this._onRelease), Ca(this.touchEventTarget, "touchend", this._onRelease), Ca(this.touchEventTarget, "touchmove", this._onMove)),
                                Ca(T, "mouseup", this._onRelease),
                                Ca(T, "mousemove", this._onMove),
                                (this.isDragging = this.isPressed = !1),
                                e && Ha("onDragEnd", this, this.pointerEvent)),
                            this)
                        : this._enabled;
                    var e;
                }),
                (q.endDrag = function endDrag(t) {
                    this._onRelease(t);
                }),
                DraggableSVG);
    function DraggableSVG(t, e) {
        (this.target = "string" == typeof t ? T.querySelectorAll(t)[0] : t),
            (this.vars = e || {}),
            (this._onPress = Ga(Ma, this)),
            (this._onMove = Ga(Na, this)),
            (this._onRelease = Ga(Oa, this)),
            this.target.setAttribute("transform", (this.target.getAttribute("transform") || "") + " translate(0,0)"),
            (this._matrix = ra(this.target)),
            (this.x = this._matrix.e),
            (this.y = this._matrix.f),
            (this.snap = e.snap),
            isNaN(e.maxX) && isNaN(e.minX) ? (this._bounds = 0) : ((this._bounds = 1), (this.maxX = +e.maxX), (this.minX = +e.minX)),
            this.enabled(!0);
    }
    var ht,
        lt =
            (((ht = Anchor.prototype).onPress = function onPress() {
                Ha("onPress", this);
            }),
                (ht.onClick = function onClick() {
                    Ha("onClick", this);
                }),
                (ht.onDrag = function onDrag() {
                    var t = this.segment;
                    this.vars.onDrag.call(this.vars.callbackScope || this, this, this._draggable.x - t[this.i], this._draggable.y - t[this.i + 1]);
                }),
                (ht.onDragEnd = function onDragEnd() {
                    Ha("onDragEnd", this);
                }),
                (ht.onRelease = function onRelease() {
                    Ha("onRelease", this);
                }),
                (ht.update = function update(t, e, n) {
                    t && (this.rawPath = t), arguments.length <= 1 ? ((e = this.j), (n = this.i)) : ((this.j = e), (this.i = n));
                    var i = this.smooth,
                        s = this.rawPath[e],
                        a = 0 === n && s.closed ? s.length - 4 : n - 2;
                    (this.segment = s),
                        (this.smooth = 0 < n && n < s.length - 2 && Math.abs(Math.atan2(s[n + 1] - s[1 + a], s[n] - s[a]) - Math.atan2(s[n + 3] - s[n + 1], s[n + 2] - s[n])) < 0.09 ? 2 : 0),
                        this.smooth !== i && this.element.setAttribute("d", this.smooth ? this.editor._circleHandle : this.editor._squareHandle),
                        this.element.setAttribute("transform", "translate(" + s[n] + "," + s[n + 1] + ")");
                }),
                Anchor);
    function Anchor(t, e, n, i, s) {
        (this.editor = t),
            (this.element = pa("path", t._selection, { fill: V, stroke: V, strokeWidth: 2, vectorEffect: "non-scaling-stroke" })),
            this.update(e, n, i),
            (this.element._gsSelection = !0),
            (this.vars = s || {}),
            (this._draggable = new rt(this.element, { callbackScope: this, onDrag: this.onDrag, snap: this.vars.snap, onPress: this.onPress, onRelease: this.onRelease, onClick: this.onClick, onDragEnd: this.onDragEnd }));
    }
    var ct,
        dt =
            (((ct = PathEditor.prototype)._onRelease = function _onRelease(t) {
                var e = this._editingAnchor;
                e && ((K.x = e.segment[e.i]), (K.y = e.segment[e.i + 1])), Ca(c, "touchforcechange", na), Ha("onRelease", this, t);
            }),
                (ct.init = function init() {
                    var t,
                        e,
                        n = this.path.getAttribute("d"),
                        i = stringToRawPath(n),
                        s = this.path.getAttribute("transform") || "translate(0,0)",
                        a = !this._rawPath || i.totalPoints !== this._rawPath.totalPoints || i.length !== this._rawPath.length,
                        o = {
                            callbackScope: this,
                            snap: this.vars.anchorSnap,
                            onDrag: this._onDragAnchor,
                            onPress: this._onPressAnchor,
                            onRelease: this._onRelease,
                            onClick: this._onClickAnchor,
                            onDragEnd: this._onDragEndAnchor,
                            maxX: this.vars.maxX,
                            minX: this.vars.minX,
                        };
                    if (a && this._anchors && this._anchors.length) {
                        for (e = 0; e < this._anchors.length; e++) this._anchors[e].element.parentNode.removeChild(this._anchors[e].element), this._anchors[e]._draggable.enabled(!1);
                        this._selectedAnchors.length = 0;
                    }
                    if (((this._rawPath = i), a)) {
                        if (((this._anchors = Pa(i, 0, this, o)), 1 < (t = i.length))) for (e = 1; e < t; e++) this._anchors = this._anchors.concat(Pa(i, e, this, o));
                    } else for (e = this._anchors.length; -1 < --e;) this._anchors[e].update(i);
                    return (
                        this._selection.appendChild(this._handle1),
                        this._selection.appendChild(this._handle2),
                        this._selectionPath.setAttribute("d", n),
                        this._selectionHittest.setAttribute("d", n),
                        this._g.setAttribute(
                            "transform",
                            (function _getConcatenatedTransforms(t) {
                                for (var e = ra(t), n = t.ownerSVGElement; (t = t.parentNode) && t.ownerSVGElement === n;) e.multiply(ra(t));
                                return "matrix(" + e.a + "," + e.b + "," + e.c + "," + e.d + "," + e.e + "," + e.f + ")";
                            })(this.path.parentNode) || "translate(0,0)"
                        ),
                        this._selection.setAttribute("transform", s),
                        this._selectionHittest.setAttribute("transform", s),
                        this._updateAnchors(),
                        this
                    );
                }),
                (ct._saveState = function _saveState() {
                    !(function _addHistory(t) {
                        var e,
                            n = [],
                            i = t._selectedAnchors;
                        for (e = 0; e < i.length; e++) n[e] = i[e].i;
                        tt.unshift({ path: t, d: t.path.getAttribute("d"), transform: t.path.getAttribute("transform") || "", selectedIndexes: n }), 30 < tt.length && (tt.length = 30);
                    })(this);
                }),
                (ct._onClickSelectionPath = function _onClickSelectionPath(t) {
                    if ("hidden" === this._selection.style.visibility) this.select();
                    else if (R || (t && t.altKey)) {
                        var e,
                            i,
                            s,
                            a,
                            o,
                            r,
                            h = {
                                callbackScope: this,
                                snap: this.vars.anchorSnap,
                                onDrag: this._onDragAnchor,
                                onPress: this._onPressAnchor,
                                onRelease: this._onRelease,
                                onClick: this._onClickAnchor,
                                onDragEnd: this._onDragEndAnchor,
                                maxX: this.vars.maxX,
                                minX: this.vars.minX,
                            },
                            l = this._selection.getScreenCTM().inverse();
                        for (
                            this._draggable && this._draggable._onRelease(t),
                            l && ((a = t.clientX * l.a + t.clientY * l.c + l.e), (o = t.clientX * l.b + t.clientY * l.d + l.f)),
                            r = (function getClosestData(t, e, n, i) {
                                var s,
                                    a,
                                    o,
                                    r,
                                    h = { j: 0, i: 0, t: 0 },
                                    l = A;
                                for (a = 0; a < t.length; a++)
                                    for (r = t[a], s = 0; s < r.length; s += 6)
                                        (o = getClosestProgressOnBezier(1, e, n, 0, 1, i || 20, r[s], r[s + 1], r[s + 2], r[s + 3], r[s + 4], r[s + 5], r[s + 6], r[s + 7])), P < l && ((l = P), (h.j = a), (h.i = s), (h.t = o));
                                return h;
                            })(this._rawPath, a, o),
                            (function subdivideSegment(t, e, i) {
                                if (i <= 0 || 1 <= i) return 0;
                                var s = t[e],
                                    a = t[e + 1],
                                    o = t[e + 2],
                                    r = t[e + 3],
                                    h = t[e + 4],
                                    l = t[e + 5],
                                    c = s + (o - s) * i,
                                    d = o + (h - o) * i,
                                    u = a + (r - a) * i,
                                    g = r + (l - r) * i,
                                    p = c + (d - c) * i,
                                    f = u + (g - u) * i,
                                    _ = h + (t[e + 6] - h) * i,
                                    m = l + (t[e + 7] - l) * i;
                                return (
                                    (d += (_ - d) * i),
                                    (g += (m - g) * i),
                                    t.splice(e + 2, 4, n(c), n(u), n(p), n(f), n(p + (d - p) * i), n(f + (g - f) * i), n(d), n(g), n(_), n(m)),
                                    t.samples && t.samples.splice(((e / 6) * t.resolution) | 0, 0, 0, 0, 0, 0, 0, 0),
                                    6
                                );
                            })(this._rawPath[r.j], r.i, r.t),
                            e = r.i + 6,
                            i = 0;
                            i < this._anchors.length;
                            i++
                        )
                            this._anchors[i].i >= e && (this._anchors[i].i += 6);
                        (s = new lt(this, this._rawPath, r.j, e, h)),
                            this._selection.appendChild(this._handle1),
                            this._selection.appendChild(this._handle2),
                            s._draggable._onPress(t),
                            (O = s),
                            this._anchors.push(s),
                            (this._selectedAnchors.length = 0),
                            this._selectedAnchors.push(s),
                            this._updateAnchors(),
                            this.update(),
                            this._saveState();
                    }
                    Ja(), Ba(c, "touchforcechange", na), Ha("onPress", this);
                }),
                (ct._onClickHandle1 = function _onClickHandle1() {
                    var t = this._editingAnchor,
                        e = t.i,
                        n = t.segment,
                        i = t.isClosedStart ? n.length - 4 : e - 2;
                    R && Math.abs(n[e] - n[i]) < 5 && Math.abs(n[e + 1] - n[1 + i]) < 5 && this._onClickAnchor(t);
                }),
                (ct._onClickHandle2 = function _onClickHandle2() {
                    var t = this._editingAnchor,
                        e = t.i,
                        n = t.segment;
                    R && Math.abs(n[e] - n[e + 2]) < 5 && Math.abs(n[e + 1] - n[e + 3]) < 5 && this._onClickAnchor(t);
                }),
                (ct._onDragEndAnchor = function _onDragEndAnchor() {
                    (O = null), this._saveState();
                }),
                (ct.isSelected = function isSelected() {
                    return 0 < this._selectedAnchors.length;
                }),
                (ct.select = function select(t) {
                    if (((this._selection.style.visibility = "visible"), (this._editingAnchor = null), (this.path._gsSelection = !0) === t)) for (var e = this._anchors.length; -1 < --e;) this._selectedAnchors[e] = this._anchors[e];
                    return -1 === st.indexOf(this) && st.push(this), this._updateAnchors(), this;
                }),
                (ct.deselect = function deselect() {
                    return (this._selection.style.visibility = "hidden"), (this._selectedAnchors.length = 0), (this._editingAnchor = null), (this.path._gsSelection = !1), st.splice(st.indexOf(this), 1), this._updateAnchors(), this;
                }),
                (ct._onDragPath = function _onDragPath() {
                    var t = this._selectionHittest.getAttribute("transform") || "translate(0,0)";
                    this._selection.setAttribute("transform", t), this.path.setAttribute("transform", t);
                }),
                (ct._onPressAnchor = function _onPressAnchor(t) {
                    -1 === this._selectedAnchors.indexOf(t) ? (L || (this._selectedAnchors.length = 0), this._selectedAnchors.push(t)) : L && (this._selectedAnchors.splice(this._selectedAnchors.indexOf(t), 1), t._draggable.endDrag()),
                        (K.x = t.segment[t.i]),
                        (K.y = t.segment[t.i + 1]),
                        this._updateAnchors(),
                        Ha("onPress", this);
                }),
                (ct._deleteSelectedAnchors = function _deleteSelectedAnchors() {
                    for (var t, e, n, i = this._selectedAnchors, s = i.length; -1 < --s;)
                        for (
                            (t = i[s]).element.parentNode.removeChild(t.element),
                            t._draggable.enabled(!1),
                            (e = t.i) ? (e < t.segment.length - 2 ? t.segment.splice(e - 2, 6) : t.segment.splice(e - 4, 6)) : t.segment.splice(e, 6),
                            i.splice(s, 1),
                            this._anchors.splice(this._anchors.indexOf(t), 1),
                            n = 0;
                            n < this._anchors.length;
                            n++
                        )
                            this._anchors[n].i >= e && (this._anchors[n].i -= 6);
                    this._updateAnchors(), this.update(), this._saveState(), this.vars.onDeleteAnchor && this.vars.onDeleteAnchor.call(this.vars.callbackScope || this);
                }),
                (ct._onClickAnchor = function _onClickAnchor(t) {
                    var e,
                        n,
                        i,
                        s,
                        a,
                        o,
                        r = t.i,
                        h = t.segment,
                        l = t.isClosedStart ? h.length - 4 : r - 2,
                        c = 1e3,
                        d = !r || r >= h.length - 2;
                    R && O !== t && this._editingAnchor
                        ? ((t.smooth = !t.smooth),
                            d && !t.isClosedStart && (t.smooth = !1),
                            t.element.setAttribute("d", t.smooth ? this._circleHandle : this._squareHandle),
                            !t.smooth || (d && !t.isClosedStart)
                                ? t.smooth ||
                                (d && !t.isClosedStart) ||
                                ((r || t.isClosedStart) && ((h[l] = h[r]), (h[1 + l] = h[r + 1])), r < h.length - 2 && ((h[r + 2] = h[r]), (h[r + 3] = h[r + 1])), this._updateAnchors(), this.update(), this._saveState())
                                : ((e = ((e = Math.atan2(h[r + 1] - h[1 + l], h[r] - h[l])) + (n = Math.atan2(h[r + 3] - h[r + 1], h[r + 2] - h[r]))) / 2),
                                    (i = Qa(h, l, r)),
                                    (s = Qa(h, r, r + 2)),
                                    i < 0.2 && ((i = Qa(h, r, l - 4) / 4), (e = n || Math.atan2(h[r + 7] - h[l - 3], h[r + 6] - h[l - 4]))),
                                    s < 0.2 && ((s = Qa(h, r, r + 6) / 4), (n = e || Math.atan2(h[r + 7] - h[l - 3], h[r + 6] - h[l - 4]))),
                                    (a = Math.sin(e)),
                                    (o = Math.cos(e)),
                                    Math.abs(n - e) < Math.PI / 2 && ((a = -a), (o = -o)),
                                    (h[l] = (((h[r] + o * i) * c) | 0) / c),
                                    (h[1 + l] = (((h[r + 1] + a * i) * c) | 0) / c),
                                    (h[r + 2] = (((h[r] - o * s) * c) | 0) / c),
                                    (h[r + 3] = (((h[r + 1] - a * s) * c) | 0) / c),
                                    this._updateAnchors(),
                                    this.update(),
                                    this._saveState()))
                        : L || ((this._selectedAnchors.length = 0), this._selectedAnchors.push(t)),
                        (O = null),
                        this._updateAnchors();
                }),
                (ct._updateAnchors = function _updateAnchors() {
                    var t,
                        e,
                        n,
                        i = 1 === this._selectedAnchors.length ? this._selectedAnchors[0] : null,
                        s = i ? i.segment : null;
                    for (this._editingAnchor = i, t = 0; t < this._anchors.length; t++) this._anchors[t].element.style.fill = -1 !== this._selectedAnchors.indexOf(this._anchors[t]) ? V : "white";
                    i && (this._handle1.setAttribute("d", i.smooth ? this._circleHandle : this._squareHandle), this._handle2.setAttribute("d", i.smooth ? this._circleHandle : this._squareHandle)),
                        (t = i ? i.i : 0),
                        i && (t || i.isClosedStart)
                            ? ((e = i.isClosedStart ? s[s.length - 4] : s[t - 2]),
                                (n = i.isClosedStart ? s[s.length - 3] : s[t - 1]),
                                (this._handle1.style.visibility = this._line1.style.visibility = R || e !== s[t] || n !== s[t + 1] ? "visible" : "hidden"),
                                this._handle1.setAttribute("transform", "translate(" + e + it + n + ")"),
                                this._line1.setAttribute("points", e + it + n + it + s[t] + it + s[t + 1]))
                            : (this._handle1.style.visibility = this._line1.style.visibility = "hidden"),
                        i && t < s.length - 2
                            ? ((e = s[t + 2]),
                                (n = s[t + 3]),
                                (this._handle2.style.visibility = this._line2.style.visibility = R || e !== s[t] || n !== s[t + 1] ? "visible" : "hidden"),
                                this._handle2.setAttribute("transform", "translate(" + e + it + n + ")"),
                                this._line2.setAttribute("points", s[t] + it + s[t + 1] + it + e + it + n))
                            : (this._handle2.style.visibility = this._line2.style.visibility = "hidden");
                }),
                (ct._onPressAlt = function _onPressAlt() {
                    var t = this._editingAnchor;
                    t && ((t.i || t.isClosedStart) && (this._handle1.style.visibility = this._line1.style.visibility = "visible"), t.i < t.segment.length - 2 && (this._handle2.style.visibility = this._line2.style.visibility = "visible"));
                }),
                (ct._onReleaseAlt = function _onReleaseAlt() {
                    var t,
                        e,
                        n,
                        i = this._editingAnchor;
                    i &&
                        ((t = i.segment),
                            (e = i.i),
                            (n = i.isClosedStart ? t.length - 4 : e - 2),
                            t[e] === t[n] && t[e + 1] === t[1 + n] && (this._handle1.style.visibility = this._line1.style.visibility = "hidden"),
                            t[e] === t[e + 2] && t[e + 1] === t[e + 3] && (this._handle2.style.visibility = this._line2.style.visibility = "hidden"));
                }),
                (ct._onPressHandle1 = function _onPressHandle1() {
                    this._editingAnchor.smooth && (this._oppositeHandleLength = Qa(this._editingAnchor.segment, this._editingAnchor.i, this._editingAnchor.i + 2)), Ha("onPress", this);
                }),
                (ct._onPressHandle2 = function _onPressHandle2() {
                    this._editingAnchor.smooth && (this._oppositeHandleLength = Qa(this._editingAnchor.segment, this._editingAnchor.isClosedStart ? this._editingAnchor.segment.length - 4 : this._editingAnchor.i - 2, this._editingAnchor.i)),
                        Ha("onPress", this);
                }),
                (ct._onReleaseHandle = function _onReleaseHandle(t) {
                    this._onRelease(t), this._saveState();
                }),
                (ct._onDragHandle1 = function _onDragHandle1() {
                    var t,
                        e = this._editingAnchor,
                        n = e.segment,
                        i = e.i,
                        s = e.isClosedStart ? n.length - 4 : i - 2,
                        a = 1e3,
                        o = this._handle1._draggable.x,
                        r = this._handle1._draggable.y;
                    (n[s] = o = ((o * a) | 0) / a),
                        (n[1 + s] = r = ((r * a) | 0) / a),
                        e.smooth &&
                        (R
                            ? ((e.smooth = !1), e.element.setAttribute("d", this._squareHandle), this._handle1.setAttribute("d", this._squareHandle), this._handle2.setAttribute("d", this._squareHandle))
                            : ((t = Math.atan2(n[i + 1] - r, n[i] - o)),
                                (o = this._oppositeHandleLength * Math.cos(t)),
                                (r = this._oppositeHandleLength * Math.sin(t)),
                                (n[i + 2] = (((n[i] + o) * a) | 0) / a),
                                (n[i + 3] = (((n[i + 1] + r) * a) | 0) / a))),
                        this.update();
                }),
                (ct._onDragHandle2 = function _onDragHandle2() {
                    var t,
                        e = this._editingAnchor,
                        n = e.segment,
                        i = e.i,
                        s = e.isClosedStart ? n.length - 4 : i - 2,
                        a = 1e3,
                        o = this._handle2._draggable.x,
                        r = this._handle2._draggable.y;
                    (n[i + 2] = o = ((o * a) | 0) / a),
                        (n[i + 3] = r = ((r * a) | 0) / a),
                        e.smooth &&
                        (R
                            ? ((e.smooth = !1), e.element.setAttribute("d", this._squareHandle), this._handle1.setAttribute("d", this._squareHandle), this._handle2.setAttribute("d", this._squareHandle))
                            : ((t = Math.atan2(n[i + 1] - r, n[i] - o)),
                                (o = this._oppositeHandleLength * Math.cos(t)),
                                (r = this._oppositeHandleLength * Math.sin(t)),
                                (n[s] = (((n[i] + o) * a) | 0) / a),
                                (n[1 + s] = (((n[i + 1] + r) * a) | 0) / a))),
                        this.update();
                }),
                (ct._onDragAnchor = function _onDragAnchor(t, e, n) {
                    var i,
                        s,
                        a,
                        o,
                        r,
                        h = this._selectedAnchors,
                        l = h.length,
                        c = 1e3;
                    for (s = 0; s < l; s++)
                        (i = (o = h[s]).i),
                            (a = o.segment),
                            i
                                ? ((a[i - 2] = (((a[i - 2] + e) * c) | 0) / c), (a[i - 1] = (((a[i - 1] + n) * c) | 0) / c))
                                : o.isClosedStart && ((a[(r = a.length - 2)] = ua(a[r] + e)), (a[1 + r] = ua(a[1 + r] + n)), (a[r - 2] = ua(a[r - 2] + e)), (a[r - 1] = ua(a[r - 1] + n))),
                            (a[i] = (((a[i] + e) * c) | 0) / c),
                            (a[i + 1] = (((a[i + 1] + n) * c) | 0) / c),
                            i < a.length - 2 && ((a[i + 2] = (((a[i + 2] + e) * c) | 0) / c), (a[i + 3] = (((a[i + 3] + n) * c) | 0) / c)),
                            o !== t && o.element.setAttribute("transform", "translate(" + a[i] + it + a[i + 1] + ")");
                    this.update();
                }),
                (ct.enabled = function enabled(t) {
                    if (!arguments.length) return this._enabled;
                    for (var e = this._anchors.length; -1 < --e;) this._anchors[e]._draggable.enabled(t);
                    return (
                        (this._enabled = t),
                        this._handle1._draggable.enabled(t),
                        this._handle2._draggable.enabled(t),
                        this._draggable && this._draggable.enabled(t),
                        t
                            ? this._selection.parentNode || (this.path.ownerSVGElement.appendChild(this._selectionHittest), this.path.ownerSVGElement.appendChild(this._selection), this.init(), this._saveState())
                            : (this.deselect(), this._selectionHittest.parentNode && this._selectionHittest.parentNode.removeChild(this._selectionHittest), this._selection.parentNode && this._selection.parentNode.removeChild(this._selection)),
                        this._updateAnchors(),
                        this.update()
                    );
                }),
                (ct.update = function update(t) {
                    var e,
                        n,
                        i,
                        s,
                        a,
                        o = "",
                        r = this._editingAnchor;
                    if (
                        (t && this.init(),
                            r &&
                            ((e = r.i),
                                (n = r.segment),
                                (e || r.isClosedStart) &&
                                ((i = n[(a = r.isClosedStart ? n.length - 4 : e - 2)]),
                                    (s = n[1 + a]),
                                    this._handle1.setAttribute("transform", "translate(" + i + it + s + ")"),
                                    this._line1.setAttribute("points", i + it + s + it + n[e] + it + n[e + 1])),
                                e < n.length - 2 && ((i = n[e + 2]), (s = n[e + 3]), this._handle2.setAttribute("transform", "translate(" + i + it + s + ")"), this._line2.setAttribute("points", n[e] + it + n[e + 1] + it + i + it + s))),
                            t)
                    )
                        o = this.path.getAttribute("d");
                    else {
                        for (e = 0; e < this._rawPath.length; e++) 7 < (n = this._rawPath[e]).length && (o += "M" + n[0] + it + n[1] + "C" + n.slice(2).join(it));
                        this.path.setAttribute("d", o), this._selectionPath.setAttribute("d", o), this._selectionHittest.setAttribute("d", o);
                    }
                    return this.vars.onUpdate && this._enabled && Ha("onUpdate", this, o), this;
                }),
                (ct.getRawPath = function getRawPath(t, e, n) {
                    if (t) {
                        var i = ra(this.path);
                        return transformRawPath(copyRawPath(this._rawPath), 1, 0, 0, 1, i.e + (e || 0), i.f + (n || 0));
                    }
                    return this._rawPath;
                }),
                (ct.getString = function getString(t, e, i) {
                    if (t) {
                        var s = ra(this.path);
                        return (function rawPathToString(t) {
                            !(function _isNumber(t) {
                                return "number" == typeof t;
                            })(t[0]) || (t = [t]);
                            var e,
                                i,
                                s,
                                a,
                                o = "",
                                r = t.length;
                            for (i = 0; i < r; i++) {
                                for (a = t[i], o += "M" + n(a[0]) + "," + n(a[1]) + " C", e = a.length, s = 2; s < e; s++) o += n(a[s++]) + "," + n(a[s++]) + " " + n(a[s++]) + "," + n(a[s++]) + " " + n(a[s++]) + "," + n(a[s]) + " ";
                                a.closed && (o += "z");
                            }
                            return o;
                        })(transformRawPath(copyRawPath(this._rawPath), 1, 0, 0, 1, s.e + (e || 0), s.f + (i || 0)));
                    }
                    return this.path.getAttribute("d");
                }),
                (ct.getNormalizedSVG = function getNormalizedSVG(t, e, n, i) {
                    var s,
                        a,
                        o,
                        r,
                        h,
                        l,
                        c = this._rawPath[0],
                        d = -1 * c[0],
                        u = 0 === e ? 0 : -(e || c[1]),
                        g = c.length,
                        p = 1 / (c[g - 2] + d),
                        f = -t || c[g - 1] + u;
                    for (f = f ? 1 / f : -p, p *= 1e3, f *= 1e3, a = nt.length = 0; a < g; a += 2) (nt[a] = (((c[a] + d) * p) | 0) / 1e3), (nt[a + 1] = (((c[a + 1] + u) * f) | 0) / 1e3);
                    if (i) {
                        for (s = [], g = nt.length, a = 2; a < g; a += 6)
                            (o = nt[a - 2]), (r = nt[a - 1]), (h = nt[a + 4]), (l = nt[a + 5]), s.push(o, r, h, l), bezierToPoints(o, r, nt[a], nt[a + 1], nt[a + 2], nt[a + 3], h, l, 0.001, s, s.length - 2);
                        for (o = s[0], g = s.length, a = 2; a < g; a += 2) {
                            if ((h = s[a]) < o || 1 < h || h < 0) {
                                i();
                                break;
                            }
                            o = h;
                        }
                    }
                    return n && 8 === g && 0 === nt[0] && 0 === nt[1] && 1 === nt[g - 2] && 1 === nt[g - 1] ? nt.slice(2, 6).join(",") : ((nt[2] = "C" + nt[2]), "M" + nt.join(","));
                }),
                (ct.kill = function kill() {
                    this.enabled(!1), this._g.parentNode && this._g.parentNode.removeChild(this._g);
                }),
                (ct.revert = function revert() {
                    this.kill();
                }),
                PathEditor);
    function PathEditor(t, e) {
        (e = e || {}),
            G || La(),
            (this.vars = e),
            (this.path = "string" == typeof t ? T.querySelectorAll(t)[0] : t),
            (this._g = pa("g", this.path.ownerSVGElement, { class: "path-editor-g path-editor" })),
            (this._selectionHittest = pa("path", this._g, { stroke: "transparent", strokeWidth: 16, fill: "none", vectorEffect: "non-scaling-stroke" })),
            (this._selection = e._selection || pa("g", this._g, { class: "path-editor-selection path-editor" })),
            (this._selectionPath = pa("path", this._selection, { stroke: V, strokeWidth: 2, fill: "none", vectorEffect: "non-scaling-stroke" })),
            (this._selectedAnchors = []),
            (this._line1 = pa("polyline", this._selection, { stroke: V, strokeWidth: 2, vectorEffect: "non-scaling-stroke" })),
            (this._line2 = pa("polyline", this._selection, { stroke: V, strokeWidth: 2, vectorEffect: "non-scaling-stroke" })),
            (this._line1.style.pointerEvents = this._line2.style.pointerEvents = this._selectionPath.style.pointerEvents = "none"),
            (this._enabled = !0);
        var n = this.path.parentNode.getScreenCTM().inverse(),
            i = ((n.a + n.d) / 2) * (e.handleSize || 5);
        (this._squareHandle = (function _getSquarePathData(t) {
            return ["M-" + (t = ua(t)), -t, t, -t, t, t, -t, t + "z"].join(it);
        })(i)),
            (this._circleHandle = (function _getCirclePathData(t) {
                var e = ua(0.552284749831 * t);
                return "M" + (t = ua(t)) + ",0C" + [t, e, e, t, 0, t, -e, t, -t, e, -t, 0, -t, -e, -e, -t, 0, -t, e, -t, t, -e, t, 0].join(it) + "z";
            })(1.15 * i)),
            (this._handle1 = pa("path", this._selection, { d: this._squareHandle, fill: V, stroke: "transparent", strokeWidth: 6 })),
            (this._handle2 = pa("path", this._selection, { d: this._squareHandle, fill: V, stroke: "transparent", strokeWidth: 6 })),
            (this._handle1._draggable = new rt(this._handle1, { onDrag: this._onDragHandle1, callbackScope: this, onPress: this._onPressHandle1, onRelease: this._onReleaseHandle, onClick: this._onClickHandle1, snap: e.handleSnap })),
            (this._handle2._draggable = new rt(this._handle2, { onDrag: this._onDragHandle2, callbackScope: this, onPress: this._onPressHandle2, onRelease: this._onReleaseHandle, onClick: this._onClickHandle2, snap: e.handleSnap })),
            (this._handle1.style.visibility = this._handle2.style.visibility = "hidden");
        for (var s = [this._handle1, this._handle2, this._line1, this._line2, this._selection, this._selectionPath, this._selectionHittest], a = s.length; -1 < --a;) s[a]._gsSelection = !0;
        !1 !== e.draggable &&
            (this._draggable = new rt(this._selectionHittest, { callbackScope: this, onPress: this.select, onRelease: this._onRelease, onDrag: this._onDragPath, onDragEnd: this._saveState, maxX: this.vars.maxX, minX: this.vars.minX })),
            this.init(),
            (this._selection.style.visibility = !1 === e.selected ? "hidden" : "visible"),
            !1 !== e.selected && ((this.path._gsSelection = !0), st.push(this)),
            this._saveState(),
            h || (Ba(this._selectionHittest, "mousedown", Ga(this._onClickSelectionPath, this)), Ba(this._selectionHittest, "mouseup", Ga(this._onRelease, this))),
            Ba(this._selectionHittest, "touchstart", Ga(this._onClickSelectionPath, this)),
            Ba(this._selectionHittest, "touchend", Ga(this._onRelease, this)),
            r(this);
    }
    (dt.simplifyPoints = simplifyPoints),
        (dt.pointsToSegment = pointsToSegment),
        (dt.simplifySVG = function (t, e) {
            var n, i, s, a, o, r, h, l, c, d, u;
            if (
                ((d = (e = e || {}).tolerance || 1),
                    (c = e.precision || 1 / d),
                    void 0 === e.cornerThreshold || e.cornerThreshold,
                    "string" != typeof t && (t = (n = t).getAttribute("d")),
                    ("#" !== t.charAt(0) && "." !== t.charAt(0)) || ((n = T.querySelector(t)) && (t = n.getAttribute("d"))),
                    (i = !1 !== e.curved || /[achqstvz]/gi.test(t) ? stringToRawPath(t)[0] : t.match(z)),
                    !1 !== e.curved)
            ) {
                for (l = i, i = [], u = l.length, s = 2; s < u; s += 6)
                    (a = +l[s - 2]), (r = +l[s - 1]), (o = +l[s + 4]), (h = +l[s + 5]), i.push(ua(a), ua(r), ua(o), ua(h)), bezierToPoints(a, r, +l[s], +l[s + 1], +l[s + 2], +l[s + 3], o, h, 1 / (2e5 * c), i, i.length - 2);
                (i = pointsToSegment(simplifyPoints(i, d), e.curviness))[2] = "C" + i[2];
            } else i = simplifyPoints(i, d);
            return (t = "M" + i.join(",")), n && n.setAttribute("d", t), t;
        }),
        (dt.create = function (t, e) {
            return new dt(t, e);
        }),
        (dt.editingAxis = K),
        (dt.getSnapFunction = function (t) {
            var r = t.radius || 2,
                e = 1e20,
                h = t.x || 0 === t.x ? t.x : t.width ? 0 : -e,
                l = t.y || 0 === t.y ? t.y : t.height ? 0 : -e,
                c = h + (t.width || 1e40),
                d = l + (t.height || 1e40),
                u = !1 !== t.containX,
                g = !1 !== t.containY,
                p = t.axis,
                f = t.gridSize;
            return (
                (r *= r),
                function (t) {
                    var e,
                        n,
                        i,
                        s,
                        a = t.x,
                        o = t.y;
                    (u && a < h) || (i = a - h) * i < r ? (a = h) : ((u && c < a) || (i = c - a) * i < r) && (a = c),
                        (g && o < l) || (s = o - l) * s < r ? (o = l) : ((g && d < o) || (s = d - o) * s < r) && (o = d),
                        p && ((i = a - p.x), (s = o - p.y), i * i < r && (a = p.x), s * s < r && (o = p.y)),
                        f && (i = (e = h + Math.round((a - h) / f) * f) - a) * i + (s = (n = l + Math.round((o - l) / f) * f) - o) * s < r && ((a = e), (o = n)),
                        (t.x = a),
                        (t.y = o);
                }
            );
        }),
        (dt.version = "3.11.3"),
        (dt.register = La);
    function db() {
        return String.fromCharCode.apply(null, arguments);
    }
    function hb(t) {
        return "string" == typeof t;
    }
    function ib(t, e) {
        var n = pt.createElementNS ? pt.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : pt.createElement(t);
        return n.style ? n : pt.createElement(t);
    }
    function ob(t, e, n) {
        return hb(t) && Ct.test(t) ? pt.querySelector(t) : Array.isArray(t) ? bt(vt([{ x: ut.getProperty(e, "x"), y: ut.getProperty(e, "y") }].concat(t), n)) : hb(t) || (t && "path" === (t.tagName + "").toLowerCase()) ? t : 0;
    }
    function tb(t, e) {
        var n = "Please gsap.registerPlugin(MotionPathPlugin)";
        (gt = window),
            (ut = ut || t || gt.gsap || console.warn(n)) && dt.register(ut),
            (pt = document),
            (_t = pt.body),
            (ft = pt.documentElement),
            ut && ((mt = ut.plugins.motionPath), (yt = ut.core.context || function () { })),
            mt
                ? ((function _initCopyToClipboard() {
                    ((Pt = ib("textarea")).style.display = "none"), _t.appendChild(Pt);
                })(),
                    (vt = mt.arrayToRawPath),
                    (bt = mt.rawPathToString))
                : !0 === e && console.warn(n);
    }
    debugger;
    var ut,
        gt,
        pt,
        ft,
        _t,
        mt,
        vt,
        bt,
        yt,
        Pt,
        At = "MotionPathHelper",
        wt = db(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
        Ct =
            ((function (t) {
                var e = "undefined" != typeof window,
                    n = 0 === (e ? window.location.href : "").indexOf(db(102, 105, 108, 101, 58, 47, 47)) || -1 !== t.indexOf(db(108, 111, 99, 97, 108, 104, 111, 115, 116)) || -1 !== t.indexOf(db(49, 50, 55, 46, 48, 32, 48, 46, 49)),
                    i = [
                        "github.io",
                        wt,
                        db(99, 111, 100, 101, 112, 101, 110, 46, 105, 111),
                        db(99, 111, 100, 101, 112, 101, 110, 46, 112, 108, 117, 109, 98, 105, 110, 103),
                        db(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118),
                        db(99, 111, 100, 101, 112, 101, 110, 46, 97, 112, 112),
                        db(99, 111, 100, 101, 112, 101, 110, 46, 119, 101, 98, 115, 105, 116, 101),
                        db(112, 101, 110, 115, 46, 99, 108, 111, 117, 100),
                        db(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109),
                        db(99, 100, 112, 110, 46, 105, 111),
                        db(112, 101, 110, 115, 46, 105, 111),
                        db(103, 97, 110, 110, 111, 110, 46, 116, 118),
                        db(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116),
                        db(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116),
                        db(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107),
                        db(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116),
                        db(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109),
                        db(112, 108, 110, 107, 114, 46, 99, 111),
                        db(104, 111, 116, 106, 97, 114, 46, 99, 111, 109),
                        db(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109),
                        db(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103),
                        db(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111),
                        db(99, 115, 98, 46, 97, 112, 112),
                        db(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 99, 111, 109),
                        db(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 105, 111),
                        db(99, 111, 100, 105, 101, 114, 46, 105, 111),
                        db(109, 111, 116, 105, 111, 110, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109),
                        db(115, 116, 97, 99, 107, 111, 118, 101, 114, 102, 108, 111, 119, 46, 99, 111, 109),
                        db(115, 116, 97, 99, 107, 101, 120, 99, 104, 97, 110, 103, 101, 46, 99, 111, 109),
                        db(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116),
                    ],
                    s = i.length;
                for (
                    setTimeout(function checkWarn() {
                        e &&
                            ("loading" === document.readyState || "interactive" === document.readyState
                                ? document.addEventListener("readystatechange", checkWarn)
                                : (document.removeEventListener("readystatechange", checkWarn),
                                    e &&
                                    window.console &&
                                    !window._gsapWarned &&
                                    "object" == typeof window.gsap &&
                                    !1 !== window.gsap.config().trialWarn &&
                                    (console.log(db(37, 99, 87, 97, 114, 110, 105, 110, 103), db(102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 51, 48, 112, 120, 59, 99, 111, 108, 111, 114, 58, 114, 101, 100, 59)),
                                        console.log(
                                            db(65, 32, 116, 114, 105, 97, 108, 32, 118, 101, 114, 115, 105, 111, 110, 32, 111, 102, 32) +
                                            At +
                                            db(
                                                32,
                                                105,
                                                115,
                                                32,
                                                108,
                                                111,
                                                97,
                                                100,
                                                101,
                                                100,
                                                32,
                                                116,
                                                104,
                                                97,
                                                116,
                                                32,
                                                111,
                                                110,
                                                108,
                                                121,
                                                32,
                                                119,
                                                111,
                                                114,
                                                107,
                                                115,
                                                32,
                                                108,
                                                111,
                                                99,
                                                97,
                                                108,
                                                108,
                                                121,
                                                32,
                                                97,
                                                110,
                                                100,
                                                32,
                                                111,
                                                110,
                                                32,
                                                100,
                                                111,
                                                109,
                                                97,
                                                105,
                                                110,
                                                115,
                                                32,
                                                108,
                                                105,
                                                107,
                                                101,
                                                32,
                                                99,
                                                111,
                                                100,
                                                101,
                                                112,
                                                101,
                                                110,
                                                46,
                                                105,
                                                111,
                                                32,
                                                97,
                                                110,
                                                100,
                                                32,
                                                99,
                                                111,
                                                100,
                                                101,
                                                115,
                                                97,
                                                110,
                                                100,
                                                98,
                                                111,
                                                120,
                                                46,
                                                105,
                                                111,
                                                46,
                                                32,
                                                42,
                                                42,
                                                42,
                                                32,
                                                68,
                                                79,
                                                32,
                                                78,
                                                79,
                                                84,
                                                32,
                                                68,
                                                69,
                                                80,
                                                76,
                                                79,
                                                89,
                                                32,
                                                84,
                                                72,
                                                73,
                                                83,
                                                32,
                                                70,
                                                73,
                                                76,
                                                69,
                                                32,
                                                42,
                                                42,
                                                42,
                                                32,
                                                76,
                                                111,
                                                97,
                                                100,
                                                105,
                                                110,
                                                103,
                                                32,
                                                105,
                                                116,
                                                32,
                                                111,
                                                110,
                                                32,
                                                97,
                                                110,
                                                32,
                                                117,
                                                110,
                                                97,
                                                117,
                                                116,
                                                104,
                                                111,
                                                114,
                                                105,
                                                122,
                                                101,
                                                100,
                                                32,
                                                115,
                                                105,
                                                116,
                                                101,
                                                32,
                                                118,
                                                105,
                                                111,
                                                108,
                                                97,
                                                116,
                                                101,
                                                115,
                                                32,
                                                116,
                                                104,
                                                101,
                                                32,
                                                108,
                                                105,
                                                99,
                                                101,
                                                110,
                                                115,
                                                101,
                                                32,
                                                97,
                                                110,
                                                100,
                                                32,
                                                119,
                                                105,
                                                108,
                                                108,
                                                32,
                                                99,
                                                97,
                                                117,
                                                115,
                                                101,
                                                32,
                                                97,
                                                32,
                                                114,
                                                101,
                                                100,
                                                105,
                                                114,
                                                101,
                                                99,
                                                116,
                                                46,
                                                32,
                                                80,
                                                108,
                                                101,
                                                97,
                                                115,
                                                101,
                                                32,
                                                106,
                                                111,
                                                105,
                                                110,
                                                32,
                                                67,
                                                108,
                                                117,
                                                98,
                                                32,
                                                71,
                                                114,
                                                101,
                                                101,
                                                110,
                                                83,
                                                111,
                                                99,
                                                107,
                                                32,
                                                116,
                                                111,
                                                32,
                                                103,
                                                101,
                                                116,
                                                32,
                                                102,
                                                117,
                                                108,
                                                108,
                                                32,
                                                97,
                                                99,
                                                99,
                                                101,
                                                115,
                                                115,
                                                32,
                                                116,
                                                111,
                                                32,
                                                116,
                                                104,
                                                101,
                                                32,
                                                98,
                                                111,
                                                110,
                                                117,
                                                115,
                                                32,
                                                112,
                                                108,
                                                117,
                                                103,
                                                105,
                                                110,
                                                115,
                                                32,
                                                116,
                                                104,
                                                97,
                                                116,
                                                32,
                                                98,
                                                111,
                                                111,
                                                115,
                                                116,
                                                32,
                                                121,
                                                111,
                                                117,
                                                114,
                                                32,
                                                97,
                                                110,
                                                105,
                                                109,
                                                97,
                                                116,
                                                105,
                                                111,
                                                110,
                                                32,
                                                115,
                                                117,
                                                112,
                                                101,
                                                114,
                                                112,
                                                111,
                                                119,
                                                101,
                                                114,
                                                115,
                                                46,
                                                32,
                                                68,
                                                105,
                                                115,
                                                97,
                                                98,
                                                108,
                                                101,
                                                32,
                                                116,
                                                104,
                                                105,
                                                115,
                                                32,
                                                119,
                                                97,
                                                114,
                                                110,
                                                105,
                                                110,
                                                103,
                                                32,
                                                119,
                                                105,
                                                116,
                                                104,
                                                32,
                                                103,
                                                115,
                                                97,
                                                112,
                                                46,
                                                99,
                                                111,
                                                110,
                                                102,
                                                105,
                                                103,
                                                40,
                                                123,
                                                116,
                                                114,
                                                105,
                                                97,
                                                108,
                                                87,
                                                97,
                                                114,
                                                110,
                                                58,
                                                32,
                                                102,
                                                97,
                                                108,
                                                115,
                                                101,
                                                125,
                                                41,
                                                59
                                            )
                                        ),
                                        console.log(
                                            db(
                                                37,
                                                99,
                                                71,
                                                101,
                                                116,
                                                32,
                                                117,
                                                110,
                                                114,
                                                101,
                                                115,
                                                116,
                                                114,
                                                105,
                                                99,
                                                116,
                                                101,
                                                100,
                                                32,
                                                102,
                                                105,
                                                108,
                                                101,
                                                115,
                                                32,
                                                97,
                                                116,
                                                32,
                                                104,
                                                116,
                                                116,
                                                112,
                                                115,
                                                58,
                                                47,
                                                47,
                                                103,
                                                114,
                                                101,
                                                101,
                                                110,
                                                115,
                                                111,
                                                99,
                                                107,
                                                46,
                                                99,
                                                111,
                                                109,
                                                47,
                                                99,
                                                108,
                                                117,
                                                98
                                            ),
                                            db(102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 49, 54, 112, 120, 59, 99, 111, 108, 111, 114, 58, 35, 52, 101, 57, 56, 49, 53)
                                        ),
                                        (window._gsapWarned = 1))));
                    }, 50);
                    -1 < --s;

                )
                    if (-1 !== t.indexOf(i[s])) return;
                n ||
                    setTimeout(function () {
                        e &&
                            (window.location.href = db(104, 116, 116, 112, 115, 58, 47, 47) + wt + db(47, 114, 101, 113, 117, 105, 114, 101, 115, 45, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 47) + "?plugin=" + At + "&source=trial");
                    }, 3e3);
            })("undefined" != typeof window ? window.location.host : ""),
                /(^[#\.][a-z]|[a-y][a-z])/i),
        xt = { matrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 } },
        St =
            ((MotionPathHelper.prototype.getString = function getString() {
                return this.editor.getString(!0, -this.offset.x, -this.offset.y);
            }),
                MotionPathHelper);
    function MotionPathHelper(t, e) {
        var n = this;
        void 0 === e && (e = {}), mt || tb(e.gsap, 1);
        var i,
            s,
            a,
            o,
            r,
            h,
            l,
            c,
            d,
            u,
            g,
            p,
            f,
            _ = ib("div"),
            m = this,
            v = { x: 0, y: 0 };
        t instanceof ut.core.Tween
            ? (i = (c = t).targets()[0])
            : ((i = ut.utils.toArray(t)[0]),
                (c = (function _findMotionPathTween(t) {
                    for (var e = ut.getTweensOf(t), n = 0; n < e.length; n++) {
                        if (e[n].vars.motionPath) return e[n];
                        e[n].timeline && e.push.apply(e, e[n].timeline.getChildren());
                    }
                })(i))),
            (s = ob(e.path, i, e)),
            (this.offset = v),
            (h = (function _getPositionOnPage(t) {
                var e = t.getBoundingClientRect(),
                    n = ft.clientTop - (gt.pageYOffset || ft.scrollTop || _t.scrollTop || 0),
                    i = ft.clientLeft - (gt.pageXOffset || ft.scrollLeft || _t.scrollLeft || 0);
                return { left: e.left + i, top: e.top + n, right: e.right + i, bottom: e.bottom + n };
            })(i)),
            (o = parseFloat(ut.getProperty(i, "x", "px"))),
            (r = parseFloat(ut.getProperty(i, "y", "px"))),
            (a = i.getCTM && "svg" !== i.tagName.toLowerCase()),
            c && !s && (s = ob(c.vars.motionPath.path || c.vars.motionPath, i, c.vars.motionPath)),
            _.setAttribute("class", "copy-motion-path"),
            (_.style.cssText =
                "border-radius:8px; background-color:rgba(85, 85, 85, 0.7); color:#fff; cursor:pointer; padding:6px 12px; font-family:Signika Negative, Arial, sans-serif; position:fixed; left:50%; transform:translate(-50%, 0); font-size:19px; bottom:10px"),
            (_.innerText = "COPY MOTION PATH"),
            (_._gsHelper = m),
            (ut.utils.toArray(e.container)[0] || _t).appendChild(_),
            (function _addCopyToClipboard(n, i, s) {
                n.addEventListener("click", function (t) {
                    if (t.target._gsHelper) {
                        var e = i(t.target);
                        if ((Pt.value = e) && Pt.select) {
                            console.log(e), (Pt.style.display = "block"), Pt.select();
                            try {
                                pt.execCommand("copy"), Pt.blur(), s && s(n);
                            } catch (t) {
                                console.warn("Copy didn't work; this browser doesn't permit that.");
                            }
                            Pt.style.display = "none";
                        }
                    }
                });
            })(
                _,
                function () {
                    return m.getString();
                },
                function () {
                    return ut.fromTo(_, { backgroundColor: "white" }, { duration: 0.5, backgroundColor: "rgba(85, 85, 85, 0.6)" });
                }
            ),
            (l = s && s.ownerSVGElement)
                ? (e.pathColor && ut.set(s, { stroke: e.pathColor }), e.pathWidth && ut.set(s, { strokeWidth: e.pathWidth }), e.pathOpacity && ut.set(s, { opacity: e.pathOpacity }))
                : ((d = (a && i.ownerSVGElement && i.ownerSVGElement.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"),
                    a
                        ? ((l = i.ownerSVGElement),
                            (u = i.getBBox()),
                            (o = (g = (function _getConsolidatedMatrix(t) {
                                return (t.transform.baseVal.consolidate() || xt).matrix;
                            })(i)).e),
                            (r = g.f),
                            (v.x = u.x),
                            (v.y = u.y))
                        : ((l = ib("svg", d)),
                            _t.appendChild(l),
                            l.setAttribute("viewBox", "0 0 100 100"),
                            l.setAttribute("class", "motion-path-helper"),
                            (l.style.cssText = "overflow:visible; background-color: transparent; position:absolute; z-index:5000; width:100px; height:100px; top:" + (h.top - r) + "px; left:" + (h.left - o) + "px;")),
                    (u =
                        hb(s) && !Ct.test(s)
                            ? s
                            : (function _getInitialPath(t, e) {
                                var n,
                                    i = [0, 31, 8, 58, 24, 75, 40, 90, 69, 100, 100, 100];
                                for (n = 0; n < i.length; n += 2) (i[n] += t), (i[n + 1] += e);
                                return "M" + t + "," + e + "C" + i.join(",");
                            })(o, r)),
                    (s = ib("path", d)).setAttribute("d", u),
                    s.setAttribute("vector-effect", "non-scaling-stroke"),
                    (s.style.cssText = "fill:transparent; stroke-width:" + (e.pathWidth || 3) + "; stroke:" + (e.pathColor || "#555") + "; opacity:" + (e.pathOpacity || 0.6)),
                    l.appendChild(s)),
            (v.x || v.y) && ut.set(s, { x: v.x, y: v.y }),
            "selected" in e || (e.selected = !0),
            "anchorSnap" in e ||
            (e.anchorSnap = function (t) {
                t.x * t.x + t.y * t.y < 16 && (t.x = t.y = 0);
            }),
            (f = c && "nested" === c.parent.data ? c.parent.parent : c),
            (e.onPress = function () {
                f.pause(0);
            }),
            (p = function refreshPath() {
                c.invalidate(), f.restart();
            }),
            (e.onRelease = e.onDeleteAnchor = p),
            (this.editor = dt.create(s, e)),
            e.center && ut.set(i, { transformOrigin: "50% 50%", xPercent: -50, yPercent: -50 }),
            c
                ? (c.vars.motionPath.path ? (c.vars.motionPath.path = s) : (c.vars.motionPath = { path: s }),
                    f.parent !== ut.globalTimeline &&
                    ut.globalTimeline.add(
                        f,
                        (function _getGlobalTime(t) {
                            for (var e = t.totalTime(); t;) (e = t.startTime() + e / (t.timeScale() || 1)), (t = t.parent);
                            return e;
                        })(f) - f.delay()
                    ),
                    f.repeat(-1).repeatDelay(1))
                : (c = f = ut.to(i, {
                    motionPath: { path: s, start: e.start || 0, end: "end" in e ? e.end : 1, autoRotate: "autoRotate" in e && e.autoRotate, align: s, alignOrigin: e.alignOrigin },
                    duration: e.duration || 5,
                    ease: e.ease || "power1.inOut",
                    repeat: -1,
                    repeatDelay: 1,
                    paused: !e.path,
                })),
            (this.animation = c),
            yt(this),
            (this.kill = this.revert = function () {
                n.editor.kill(), _.parentNode && _.parentNode.removeChild(_), a || (l.parentNode && l.parentNode.removeChild(l)), f && f.revert();
            });
    }
    (St.register = tb),
        (St.create = function (t, e) {
            return new St(t, e);
        }),
        (St.editPath = function (t, e) {
            return dt.create(t, e);
        }),
        (St.version = "3.11.3"),
        (t.MotionPathHelper = St),
        (t.default = St);
    if (typeof window === "undefined" || window !== t) {
        Object.defineProperty(t, "__esModule", { value: !0 });
    } else {
        delete t.default;
    }
});
