(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('../../src/js/jquery.smoothScroll.js');

jQuery(function ($) {

	/**
  * pagetop
  */
	(function () {
		var pagetop = $('.pagetop');
		var default_top = parseInt(pagetop.css('top')) * -1;
		var slowly = 3;
		var bottom = 10;
		update();

		$(window).scroll(function () {
			update();
		});

		function update() {
			var scroll = $(window).scrollTop();
			var pagetop_top = scroll / slowly - default_top;

			// pagetop がブラウザ底より上の間 top を更新
			var window_height = $(window).height();
			var pagetop_height = pagetop.height();

			if (pagetop_top + pagetop_height <= window_height - bottom) {
				pagetop.css('top', pagetop_top);
			} else {
				pagetop.css('top', window_height - pagetop_height - bottom);
			}
		}
	})();
});

},{"../../src/js/jquery.smoothScroll.js":2}],2:[function(require,module,exports){
'use strict';

/**
 * Plugin Name: jquery.SmoothScroll
 * Plugin URI: http://2inc.org
 * Description: スムーススクロールでページ内移動するためのプラグイン。指定要素のhashをもとに移動する。
 * Version: 0.3.5
 * Author: Takashi Kitajima
 * Author URI: http://2inc.org
 * Created : July 5, 2012
 * Modified : March 7, 2013
 * License: GPL2
 *
 * easing : http://jqueryui.com/demos/effect/easing.html
 * @param	{ duration, easing )
 *
 * Copyright 2013 Takashi Kitajima (email : inc@2inc.org)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2, as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */
;(function ($) {
	$.fn.SmoothScroll = function (params) {

		var defaults = {
			duration: 1000,
			easing: 'easeOutQuint'
		};
		params = $.extend(defaults, params);

		var targetBody;

		var methods = {
			scrollStop: function scrollStop() {
				targetBody.stop(true);
			},
			getTargetBody: function getTargetBody() {
				if ($('html').scrollTop() > 0) {
					targetBody = $('html');
				} else if ($('body').scrollTop() > 0) {
					targetBody = $('body');
				}
				return targetBody;
			}
		};

		return this.each(function (i, e) {
			$(e).on('click', function () {
				var targetHash = this.hash;
				var offset = $(targetHash).eq(0).offset();
				if (!(targetHash && offset !== null)) return;

				var wst = $(window).scrollTop();
				if (wst === 0) $(window).scrollTop(wst + 1);

				targetBody = methods.getTargetBody();
				if (typeof targetBody === 'undefined') return;
				targetBody.animate({
					scrollTop: offset.top
				}, params.duration, params.easing, function () {
					location.hash = targetHash;
				});

				if (window.addEventListener) window.addEventListener('DOMMouseScroll', methods.scrollStop, false);
				window.onmousewheel = document.onmousewheel = methods.scrollStop;
				return false;
			});
		});
	};
})(jQuery);

jQuery(function ($) {
	$(window).on('load', function () {
		$('a[href^="#"]').SmoothScroll({
			duration: 1000,
			easing: 'easeOutQuint'
		});
	});

	/*! jQuery UI - v1.9.2 - 2013-03-06
 * http://jqueryui.com
 * Includes: jquery.ui.effect.js
 * Copyright (c) 2013 jQuery Foundation and other contributors Licensed MIT */
	jQuery.effects || (function (e, t) {
		var n = e.uiBackCompat !== !1,
		    r = "ui-effects-";e.effects = { effect: {} }, (function (t, n) {
			function p(e, t, n) {
				var r = a[t.type] || {};return e == null ? n || !t.def ? null : t.def : (e = r.floor ? ~ ~e : parseFloat(e), isNaN(e) ? t.def : r.mod ? (e + r.mod) % r.mod : 0 > e ? 0 : r.max < e ? r.max : e);
			}function d(e) {
				var n = o(),
				    r = n._rgba = [];return e = e.toLowerCase(), h(s, function (t, i) {
					var s,
					    o = i.re.exec(e),
					    a = o && i.parse(o),
					    f = i.space || "rgba";if (a) return s = n[f](a), n[u[f].cache] = s[u[f].cache], r = n._rgba = s._rgba, !1;
				}), r.length ? (r.join() === "0,0,0,0" && t.extend(r, c.transparent), n) : c[e];
			}function v(e, t, n) {
				return n = (n + 1) % 1, n * 6 < 1 ? e + (t - e) * n * 6 : n * 2 < 1 ? t : n * 3 < 2 ? e + (t - e) * (2 / 3 - n) * 6 : e;
			}var r = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),
			    i = /^([\-+])=\s*(\d+\.?\d*)/,
			    s = [{ re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, parse: function parse(e) {
					return [e[1], e[2], e[3], e[4]];
				} }, { re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, parse: function parse(e) {
					return [e[1] * 2.55, e[2] * 2.55, e[3] * 2.55, e[4]];
				} }, { re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function parse(e) {
					return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)];
				} }, { re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function parse(e) {
					return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)];
				} }, { re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function parse(e) {
					return [e[1], e[2] / 100, e[3] / 100, e[4]];
				} }],
			    o = t.Color = function (e, n, r, i) {
				return new t.Color.fn.parse(e, n, r, i);
			},
			    u = { rgba: { props: { red: { idx: 0, type: "byte" }, green: { idx: 1, type: "byte" }, blue: { idx: 2, type: "byte" } } }, hsla: { props: { hue: { idx: 0, type: "degrees" }, saturation: { idx: 1, type: "percent" }, lightness: { idx: 2, type: "percent" } } } },
			    a = { "byte": { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0 } },
			    f = o.support = {},
			    l = t("<p>")[0],
			    c,
			    h = t.each;l.style.cssText = "background-color:rgba(1,1,1,.5)", f.rgba = l.style.backgroundColor.indexOf("rgba") > -1, h(u, function (e, t) {
				t.cache = "_" + e, t.props.alpha = { idx: 3, type: "percent", def: 1 };
			}), o.fn = t.extend(o.prototype, { parse: function parse(r, i, s, a) {
					if (r === n) return this._rgba = [null, null, null, null], this;if (r.jquery || r.nodeType) r = t(r).css(i), i = n;var f = this,
					    l = t.type(r),
					    v = this._rgba = [];i !== n && (r = [r, i, s, a], l = "array");if (l === "string") return this.parse(d(r) || c._default);if (l === "array") return h(u.rgba.props, function (e, t) {
						v[t.idx] = p(r[t.idx], t);
					}), this;if (l === "object") return r instanceof o ? h(u, function (e, t) {
						r[t.cache] && (f[t.cache] = r[t.cache].slice());
					}) : h(u, function (t, n) {
						var i = n.cache;h(n.props, function (e, t) {
							if (!f[i] && n.to) {
								if (e === "alpha" || r[e] == null) return;f[i] = n.to(f._rgba);
							}f[i][t.idx] = p(r[e], t, !0);
						}), f[i] && e.inArray(null, f[i].slice(0, 3)) < 0 && (f[i][3] = 1, n.from && (f._rgba = n.from(f[i])));
					}), this;
				}, is: function is(e) {
					var t = o(e),
					    n = !0,
					    r = this;return h(u, function (e, i) {
						var s,
						    o = t[i.cache];return o && (s = r[i.cache] || i.to && i.to(r._rgba) || [], h(i.props, function (e, t) {
							if (o[t.idx] != null) return n = o[t.idx] === s[t.idx], n;
						})), n;
					}), n;
				}, _space: function _space() {
					var e = [],
					    t = this;return h(u, function (n, r) {
						t[r.cache] && e.push(n);
					}), e.pop();
				}, transition: function transition(e, t) {
					var n = o(e),
					    r = n._space(),
					    i = u[r],
					    s = this.alpha() === 0 ? o("transparent") : this,
					    f = s[i.cache] || i.to(s._rgba),
					    l = f.slice();return n = n[i.cache], h(i.props, function (e, r) {
						var i = r.idx,
						    s = f[i],
						    o = n[i],
						    u = a[r.type] || {};if (o === null) return;s === null ? l[i] = o : (u.mod && (o - s > u.mod / 2 ? s += u.mod : s - o > u.mod / 2 && (s -= u.mod)), l[i] = p((o - s) * t + s, r));
					}), this[r](l);
				}, blend: function blend(e) {
					if (this._rgba[3] === 1) return this;var n = this._rgba.slice(),
					    r = n.pop(),
					    i = o(e)._rgba;return o(t.map(n, function (e, t) {
						return (1 - r) * i[t] + r * e;
					}));
				}, toRgbaString: function toRgbaString() {
					var e = "rgba(",
					    n = t.map(this._rgba, function (e, t) {
						return e == null ? t > 2 ? 1 : 0 : e;
					});return n[3] === 1 && (n.pop(), e = "rgb("), e + n.join() + ")";
				}, toHslaString: function toHslaString() {
					var e = "hsla(",
					    n = t.map(this.hsla(), function (e, t) {
						return e == null && (e = t > 2 ? 1 : 0), t && t < 3 && (e = Math.round(e * 100) + "%"), e;
					});return n[3] === 1 && (n.pop(), e = "hsl("), e + n.join() + ")";
				}, toHexString: function toHexString(e) {
					var n = this._rgba.slice(),
					    r = n.pop();return e && n.push(~ ~(r * 255)), "#" + t.map(n, function (e) {
						return e = (e || 0).toString(16), e.length === 1 ? "0" + e : e;
					}).join("");
				}, toString: function toString() {
					return this._rgba[3] === 0 ? "transparent" : this.toRgbaString();
				} }), o.fn.parse.prototype = o.fn, u.hsla.to = function (e) {
				if (e[0] == null || e[1] == null || e[2] == null) return [null, null, null, e[3]];var t = e[0] / 255,
				    n = e[1] / 255,
				    r = e[2] / 255,
				    i = e[3],
				    s = Math.max(t, n, r),
				    o = Math.min(t, n, r),
				    u = s - o,
				    a = s + o,
				    f = a * .5,
				    l,
				    c;return o === s ? l = 0 : t === s ? l = 60 * (n - r) / u + 360 : n === s ? l = 60 * (r - t) / u + 120 : l = 60 * (t - n) / u + 240, f === 0 || f === 1 ? c = f : f <= .5 ? c = u / a : c = u / (2 - a), [Math.round(l) % 360, c, f, i == null ? 1 : i];
			}, u.hsla.from = function (e) {
				if (e[0] == null || e[1] == null || e[2] == null) return [null, null, null, e[3]];var t = e[0] / 360,
				    n = e[1],
				    r = e[2],
				    i = e[3],
				    s = r <= .5 ? r * (1 + n) : r + n - r * n,
				    o = 2 * r - s;return [Math.round(v(o, s, t + 1 / 3) * 255), Math.round(v(o, s, t) * 255), Math.round(v(o, s, t - 1 / 3) * 255), i];
			}, h(u, function (e, r) {
				var s = r.props,
				    u = r.cache,
				    a = r.to,
				    f = r.from;o.fn[e] = function (e) {
					a && !this[u] && (this[u] = a(this._rgba));if (e === n) return this[u].slice();var r,
					    i = t.type(e),
					    l = i === "array" || i === "object" ? e : arguments,
					    c = this[u].slice();return h(s, function (e, t) {
						var n = l[i === "object" ? e : t.idx];n == null && (n = c[t.idx]), c[t.idx] = p(n, t);
					}), f ? (r = o(f(c)), r[u] = c, r) : o(c);
				}, h(s, function (n, r) {
					if (o.fn[n]) return;o.fn[n] = function (s) {
						var o = t.type(s),
						    u = n === "alpha" ? this._hsla ? "hsla" : "rgba" : e,
						    a = this[u](),
						    f = a[r.idx],
						    l;return o === "undefined" ? f : (o === "function" && (s = s.call(this, f), o = t.type(s)), s == null && r.empty ? this : (o === "string" && (l = i.exec(s), l && (s = f + parseFloat(l[2]) * (l[1] === "+" ? 1 : -1))), a[r.idx] = s, this[u](a)));
					};
				});
			}), h(r, function (e, n) {
				t.cssHooks[n] = { set: function set(e, r) {
						var i,
						    s,
						    u = "";if (t.type(r) !== "string" || (i = d(r))) {
							r = o(i || r);if (!f.rgba && r._rgba[3] !== 1) {
								s = n === "backgroundColor" ? e.parentNode : e;while ((u === "" || u === "transparent") && s && s.style) {
									try {
										u = t.css(s, "backgroundColor"), s = s.parentNode;
									} catch (a) {}
								}r = r.blend(u && u !== "transparent" ? u : "_default");
							}r = r.toRgbaString();
						}try {
							e.style[n] = r;
						} catch (l) {}
					} }, t.fx.step[n] = function (e) {
					e.colorInit || (e.start = o(e.elem, n), e.end = o(e.end), e.colorInit = !0), t.cssHooks[n].set(e.elem, e.start.transition(e.end, e.pos));
				};
			}), t.cssHooks.borderColor = { expand: function expand(e) {
					var t = {};return h(["Top", "Right", "Bottom", "Left"], function (n, r) {
						t["border" + r + "Color"] = e;
					}), t;
				} }, c = t.Color.names = { aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff" };
		})(jQuery), (function () {
			function i() {
				var t = this.ownerDocument.defaultView ? this.ownerDocument.defaultView.getComputedStyle(this, null) : this.currentStyle,
				    n = {},
				    r,
				    i;if (t && t.length && t[0] && t[t[0]]) {
					i = t.length;while (i--) {
						r = t[i], typeof t[r] == "string" && (n[e.camelCase(r)] = t[r]);
					}
				} else for (r in t) {
					typeof t[r] == "string" && (n[r] = t[r]);
				}return n;
			}function s(t, n) {
				var i = {},
				    s,
				    o;for (s in n) {
					o = n[s], t[s] !== o && !r[s] && (e.fx.step[s] || !isNaN(parseFloat(o))) && (i[s] = o);
				}return i;
			}var n = ["add", "remove", "toggle"],
			    r = { border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1 };e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (t, n) {
				e.fx.step[n] = function (e) {
					if (e.end !== "none" && !e.setAttr || e.pos === 1 && !e.setAttr) jQuery.style(e.elem, n, e.end), e.setAttr = !0;
				};
			}), e.effects.animateClass = fu