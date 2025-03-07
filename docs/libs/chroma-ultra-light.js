/**
 * chroma.js - JavaScript library for color conversions
 * 
 * Copyright (c) 2023, Regorxxx
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 
 * 3. The name Regorxxx may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * -------------------------------------------------------
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * -------------------------------------------------------
 * 
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 * 
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 * 
 * ------------------------------------------------------
 * 
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 * 
 * @preserve
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.chroma = factory());
})(this, (function () { 'use strict';

    var limit$1 = function (x, min, max) {
        if ( min === void 0 ) min=0;
        if ( max === void 0 ) max=1;

        return x < min ? min : x > max ? max : x;
    };

    var limit = limit$1;

    var clip_rgb$1 = function (rgb) {
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for (var i=0; i<=3; i++) {
            if (i < 3) {
                if (rgb[i] < 0 || rgb[i] > 255) { rgb._clipped = true; }
                rgb[i] = limit(rgb[i], 0, 255);
            } else if (i === 3) {
                rgb[i] = limit(rgb[i], 0, 1);
            }
        }
        return rgb;
    };

    // ported from jQuery's $.type
    var classToType = {};
    for (var i = 0, list = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; i < list.length; i += 1) {
        var name = list[i];

        classToType[("[object " + name + "]")] = name.toLowerCase();
    }
    var type$8 = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
    };

    var type$7 = type$8;

    var unpack$l = function (args, keyOrder) {
        if ( keyOrder === void 0 ) keyOrder=null;

    	// if called with more than 3 arguments, we return the arguments
        if (args.length >= 3) { return Array.prototype.slice.call(args); }
        // with less than 3 args we check if first arg is object
        // and use the keyOrder string to extract and sort properties
    	if (type$7(args[0]) == 'object' && keyOrder) {
    		return keyOrder.split('')
    			.filter(function (k) { return args[0][k] !== undefined; })
    			.map(function (k) { return args[0][k]; });
    	}
    	// otherwise we just return the first argument
    	// (which we suppose is an array of args)
        return args[0];
    };

    var type$6 = type$8;

    var last$9 = function (args) {
        if (args.length < 2) { return null; }
        var l = args.length-1;
        if (type$6(args[l]) == 'string') { return args[l].toLowerCase(); }
        return null;
    };

    var PI = Math.PI;

    var utils = {
    	clip_rgb: clip_rgb$1,
    	limit: limit$1,
    	type: type$8,
    	unpack: unpack$l,
    	last: last$9,
    	PI: PI,
    	TWOPI: PI*2,
    	PITHIRD: PI/3,
    	DEG2RAD: PI / 180,
    	RAD2DEG: 180 / PI
    };

    var input$5 = {
    	format: {},
    	autodetect: []
    };

    var last$8 = utils.last;
    var clip_rgb = utils.clip_rgb;
    var type$5 = utils.type;
    var _input = input$5;

    var Color$6 = function Color() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var me = this;
        if (type$5(args[0]) === 'object' &&
            args[0].constructor &&
            args[0].constructor === this.constructor) {
            // the argument is already a Color instance
            return args[0];
        } else if (type$5(args[0]) === 'array' && args.length === 1) {
            args = [].concat( args[0] );
        }

        // last argument could be the mode
        var mode = last$8(args);
        var autodetect = false;

        if (!mode) {
            autodetect = true;
            if (!_input.sorted) {
                _input.autodetect = _input.autodetect.sort(function (a,b) { return b.p - a.p; });
                _input.sorted = true;
            }
            // auto-detect format
            for (var i = 0, list = _input.autodetect; i < list.length; i += 1) {
                var chk = list[i];

                mode = chk.test.apply(chk, args);
                if (mode) { break; }
            }
        }

        if (_input.format[mode]) {
            var rgb = _input.format[mode].apply(null, autodetect ? args : args.slice(0,-1));
            me._rgb = clip_rgb(rgb);
        } else {
            throw new Error('unknown format: ' + args);
        }

        // add alpha channel
        if (me._rgb.length === 3) { me._rgb.push(1); }
    };

    Color$6.prototype.toString = function toString () {
        if (type$5(this.hex) == 'function') { return this.hex(); }
        return ("[" + (this._rgb.join(',')) + "]");
    };

    var Color_1 = Color$6;

    var chroma$7 = function () {
    	var args = [], len = arguments.length;
    	while ( len-- ) args[ len ] = arguments[ len ];

    	return new (Function.prototype.bind.apply( chroma$7.Color, [ null ].concat( args) ));
    };

    chroma$7.Color = Color_1;
    chroma$7.version = '2.7.0';
    chroma$7.hueNaN = true; // Whether treat black/white as having NaN hue or zero on specific color spaces (LCH, ...)

    var chroma_1 = chroma$7;

    var unpack$k = utils.unpack;
    var last$7 = utils.last;
    var rnd$4 = function (a) { return Math.round(a*100)/100; };

    /*
     * supported arguments:
     * - hsl2css(h,s,l)
     * - hsl2css(h,s,l,a)
     * - hsl2css([h,s,l], mode)
     * - hsl2css([h,s,l,a], mode)
     * - hsl2css({h,s,l,a}, mode)
     */
    var hsl2css$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hsla = unpack$k(args, 'hsla');
        var mode = last$7(args) || 'lsa';
        hsla[0] = rnd$4(hsla[0] || 0);
        hsla[1] = rnd$4(hsla[1]*100) + '%';
        hsla[2] = rnd$4(hsla[2]*100) + '%';
        if (mode === 'hsla' || (hsla.length > 3 && hsla[3]<1)) {
            hsla[3] = hsla.length > 3 ? hsla[3] : 1;
            mode = 'hsla';
        } else {
            hsla.length = 3;
        }
        return (mode + "(" + (hsla.join(',')) + ")");
    };

    var hsl2css_1 = hsl2css$1;

    var unpack$j = utils.unpack;
    var chroma$6 = chroma_1;

    /*
     * supported arguments:
     * - rgb2hsl(r,g,b)
     * - rgb2hsl(r,g,b,a)
     * - rgb2hsl([r,g,b])
     * - rgb2hsl([r,g,b,a])
     * - rgb2hsl({r,g,b,a})
     */
    var rgb2hsl$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$j(args, 'rgba');
        var r = args[0];
        var g = args[1];
        var b = args[2];

        r /= 255;
        g /= 255;
        b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);

        var l = (max + min) / 2;
        var s, h;

        if (max === min){
            s = 0;
            h = chroma$6.hueNaN ? Number.NaN : 0;
        } else {
            s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        }

        if (r == max) { h = (g - b) / (max - min); }
        else if (g == max) { h = 2 + (b - r) / (max - min); }
        else if (b == max) { h = 4 + (r - g) / (max - min); }

        h *= 60;
        if (h < 0) { h += 360; }
        else if (!chroma$6.hueNaN && isNaN(h)) {h = 0;}
        if (args.length>3 && args[3]!==undefined) { return [h,s,l,args[3]]; }
        return [h,s,l];
    };

    var rgb2hsl_1 = rgb2hsl$1;

    var unpack$i = utils.unpack;
    var last$6 = utils.last;
    var rnd$3 = function (a) { return Math.round(a*100)/100; };

    /*
     * supported arguments:
     * - lch2css(l,c,h)
     * - lch2css(l,c,h,a)
     * - lch2css([l,c,h], mode)
     * - lch2css([l,c,h,a], mode)
     * - lch2css({l,c,h,a}, mode)
     */
    var lch2css$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var lcha = unpack$i(args, 'lch');
        var mode = last$6(args) || 'lch';
        lcha[0] = rnd$3(lcha[0]) + '%';
        lcha[1] = rnd$3(lcha[1]) + '%';
        lcha[2] = rnd$3(lcha[2] || 0);
        if (mode === 'lcha' || (lcha.length > 3 && lcha[3]<1)) {
            lcha[3] = '/ ' + (lcha.length > 3 ? lcha[3] : 1);
        } else {
            lcha.length = 3;
        }
        return ("lch(" + (lcha.join(' ')) + ")");
    };

    var lch2css_1 = lch2css$1;

    var labConstants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,

        // D65 standard referent
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,

        t0: 0.137931034,  // 4 / 29
        t1: 0.206896552,  // 6 / 29
        t2: 0.12841855,   // 3 * t1 * t1
        t3: 0.008856452,  // t1 * t1 * t1
    };

    var LAB_CONSTANTS$1 = labConstants;
    var unpack$h = utils.unpack;
    var pow$3 = Math.pow;

    var rgb2lab$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$h(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r,g,b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
    };

    var rgb_xyz = function (r) {
        if ((r /= 255) <= 0.04045) { return r / 12.92; }
        return pow$3((r + 0.055) / 1.055, 2.4);
    };

    var xyz_lab = function (t) {
        if (t > LAB_CONSTANTS$1.t3) { return pow$3(t, 1 / 3); }
        return t / LAB_CONSTANTS$1.t2 + LAB_CONSTANTS$1.t0;
    };

    var rgb2xyz = function (r,g,b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS$1.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS$1.Yn);
        var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS$1.Zn);
        return [x,y,z];
    };

    var rgb2lab_1 = rgb2lab$2;

    var unpack$g = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt = Math.sqrt;
    var atan2 = Math.atan2;
    var round$6 = Math.round;
    var chroma$5 = chroma_1;

    var lab2lch$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$g(args, 'lab');
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt(a * a + b * b);
        var h = (atan2(b, a) * RAD2DEG + 360) % 360;
        if (round$6(c*10000) === 0) {h = chroma$5.hueNaN ? Number.NaN : 0;}
        return [l, c, h];
    };

    var lab2lch_1 = lab2lch$2;

    var unpack$f = utils.unpack;
    var rgb2lab$1 = rgb2lab_1;
    var lab2lch$1 = lab2lch_1;

    var rgb2lch$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$f(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab$1(r,g,b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch$1(l,a,b_);
    };

    var rgb2lch_1 = rgb2lch$1;

    var unpack$e = utils.unpack;
    var last$5 = utils.last;
    var rnd$2 = function (a) { return Math.round(a*100)/100; };

    /*
     * supported arguments:
     * - lab2css(l,c,h)
     * - lab2css(l,c,h,a)
     * - lab2css([l,c,h], mode)
     * - lab2css([l,c,h,a], mode)
     * - lab2css({l,c,h,a}, mode)
     */
    var lab2css$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var laba = unpack$e(args, 'lab');
        var mode = last$5(args) || 'lab';
        laba[0] = rnd$2(laba[0]) + '%';
        laba[1] = rnd$2(laba[1]) + '%';
        laba[2] = rnd$2(laba[2]) + '%';
        if (mode === 'laba' || (laba.length > 3 && laba[3]<1)) {
            laba[3] = '/ ' + (laba.length > 3 ? laba[3] : 1);
        } else {
            laba.length = 3;
        }
        return ("lab(" + (laba.join(' ')) + ")");
    };

    var lab2css_1 = lab2css$1;

    var unpack$d = utils.unpack;
    var last$4 = utils.last;
    var rnd$1 = function (a) { return Math.round(a*100)/100; };

    /*
     * supported arguments:
     * - oklab2css(l,c,h)
     * - oklab2css(l,c,h,a)
     * - oklab2css([l,c,h], mode)
     * - oklab2css([l,c,h,a], mode)
     * - oklab2css({l,c,h,a}, mode)
     */
    var oklab2css$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var laba = unpack$d(args, 'lab');
        var mode = last$4(args) || 'lab';
        laba[0] = rnd$1(laba[0]*100) + '%';
        laba[1] = rnd$1(laba[1]*100) + '%';
        laba[2] = rnd$1(laba[2]*100) + '%';
        if (mode === 'laba' || (laba.length > 3 && laba[3]<1)) {
            laba[3] = '/ ' + (laba.length > 3 ? laba[3] : 1);
        } else {
            laba.length = 3;
        }
        return ("oklab(" + (laba.join(' ')) + ")");
    };

    var oklab2css_1 = oklab2css$1;

    var unpack$c = utils.unpack;
    var cbrt = Math.cbrt;
    var pow$2 = Math.pow;
    var sign$1 = Math.sign;

    var rgb2oklab$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        // OKLab color space implementation taken from
        // https://bottosson.github.io/posts/oklab/
        var ref = unpack$c(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = [rgb2lrgb(r / 255), rgb2lrgb(g / 255), rgb2lrgb(b / 255)];
        var lr = ref$1[0];
        var lg = ref$1[1];
        var lb = ref$1[2];
        var l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
        var m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
        var s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

        return [
            0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
        ];
    };

    var rgb2oklab_1 = rgb2oklab$2;

    function rgb2lrgb(c) {
        var abs = Math.abs(c);
        if (abs < 0.04045) {
            return c / 12.92;
        }
        return (sign$1(c) || 1) * pow$2((abs + 0.055) / 1.055, 2.4);
    }

    var unpack$b = utils.unpack;
    var last$3 = utils.last;
    var rnd = function (a) { return Math.round(a*100)/100; };
    var min = Math.min;

    /*
     * supported arguments:
     * - oklch2css(l,c,h)
     * - oklch2css(l,c,h,a)
     * - oklch2css([l,c,h], mode)
     * - oklch2css([l,c,h,a], mode)
     * - oklch2css({l,c,h,a}, mode)
     */
    var oklch2css$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var lcha = unpack$b(args, 'lch');
        var mode = last$3(args) || 'lch';
        lcha[0] = rnd(lcha[0]*100) + '%';
        lcha[1] = min(rnd(lcha[1] / 0.4 *100), 100) + '%';
        lcha[2] = rnd(lcha[2] || 0);
        if (mode === 'lcha' || (lcha.length > 3 && lcha[3]<1)) {
            lcha[3] = '/ ' + (lcha.length > 3 ? lcha[3] : 1);
        } else {
            lcha.length = 3;
        }
        return ("oklch(" + (lcha.join(' ')) + ")");
    };

    var oklch2css_1 = oklch2css$1;

    var unpack$a = utils.unpack;
    var rgb2oklab$1 = rgb2oklab_1;
    var lab2lch = lab2lch_1;

    var rgb2oklch$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$a(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2oklab$1(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch(l, a, b_);
    };

    var rgb2oklch_1 = rgb2oklch$1;

    var unpack$9 = utils.unpack;
    var last$2 = utils.last;
    var hsl2css = hsl2css_1;
    var rgb2hsl = rgb2hsl_1;
    var lch2css = lch2css_1;
    var rgb2lch = rgb2lch_1;
    var lab2css = lab2css_1;
    var rgb2lab = rgb2lab_1;
    var oklab2css = oklab2css_1;
    var rgb2oklab = rgb2oklab_1;
    var oklch2css = oklch2css_1;
    var rgb2oklch = rgb2oklch_1;
    var round$5 = Math.round;

    /*
     * supported arguments:
     * - rgb2css(r,g,b)
     * - rgb2css(r,g,b,a)
     * - rgb2css([r,g,b], mode)
     * - rgb2css([r,g,b,a], mode)
     * - rgb2css({r,g,b,a}, mode)
     */
    var rgb2css$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$9(args, 'rgba');
        var mode = last$2(args) || 'rgb';
        if (mode.substring(0,3) == 'hsl') {
            return hsl2css(rgb2hsl(rgba), mode);
        } else if (mode.substring(0,3) == 'lch') {
            return lch2css(rgb2lch(rgba), mode);
        } else if (mode.substring(0,3) == 'lab') {
            return lab2css(rgb2lab(rgba).concat( [rgba.length > 3 ? rgba[3] : 1]), mode);
        }else if (mode.substring(0,5) == 'oklab') {
            return oklab2css(rgb2oklab(rgba).concat( [rgba.length > 3 ? rgba[3] : 1]), 'lab');
        } else if (mode.substring(0,5) == 'oklch') {
            return oklch2css(rgb2oklch(rgba).concat( [rgba.length > 3 ? rgba[3] : 1]), 'lch');
        }
        rgba[0] = round$5(rgba[0]);
        rgba[1] = round$5(rgba[1]);
        rgba[2] = round$5(rgba[2]);
        if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
            rgba[3] = rgba.length > 3 ? rgba[3] : 1;
            mode = 'rgba';
        }
        return (mode + "(" + (rgba.slice(0,mode==='rgb'?3:4).join(',')) + ")");
    };

    var rgb2css_1 = rgb2css$1;

    var unpack$8 = utils.unpack;
    var round$4 = Math.round;

    var hsl2rgb$1 = function () {
        var assign;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$8(args, 'hsl');
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r,g,b;
        if (s === 0) {
            r = g = b = l*255;
        } else {
            var t3 = [0,0,0];
            var c = [0,0,0];
            var t2 = l < 0.5 ? l * (1+s) : l+s-l*s;
            var t1 = 2 * l - t2;
            var h_ = h / 360;
            t3[0] = h_ + 1/3;
            t3[1] = h_;
            t3[2] = h_ - 1/3;
            for (var i=0; i<3; i++) {
                if (t3[i] < 0) { t3[i] += 1; }
                if (t3[i] > 1) { t3[i] -= 1; }
                if (6 * t3[i] < 1)
                    { c[i] = t1 + (t2 - t1) * 6 * t3[i]; }
                else if (2 * t3[i] < 1)
                    { c[i] = t2; }
                else if (3 * t3[i] < 2)
                    { c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6; }
                else
                    { c[i] = t1; }
            }
            (assign = [round$4(c[0]*255),round$4(c[1]*255),round$4(c[2]*255)], r = assign[0], g = assign[1], b = assign[2]);
        }
        if (args.length > 3) {
            // keep alpha channel
            return [r,g,b,args[3]];
        }
        return [r,g,b,1];
    };

    var hsl2rgb_1 = hsl2rgb$1;

    var LAB_CONSTANTS = labConstants;
    var unpack$7 = utils.unpack;
    var pow$1 = Math.pow;

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var lab2rgb$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$7(args, 'lab');
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x,y,z, r,g,b_;

        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;

        y = LAB_CONSTANTS.Yn * lab_xyz(y);
        x = LAB_CONSTANTS.Xn * lab_xyz(x);
        z = LAB_CONSTANTS.Zn * lab_xyz(z);

        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);  // D65 -> sRGB
        g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

        return [r,g,b_,args.length > 3 ? args[3] : 1];
    };

    var xyz_rgb = function (r) {
        return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$1(r, 1 / 2.4) - 0.055)
    };

    var lab_xyz = function (t) {
        return t > LAB_CONSTANTS.t1 ? t * t * t : LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0)
    };

    var lab2rgb_1 = lab2rgb$2;

    var unpack$6 = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin = Math.sin;
    var cos = Math.cos;

    var lch2lab$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
        These formulas were invented by David Dalrymple to obtain maximum contrast without going
        out of gamut if the parameters are in the range 0-1.

        A saturation multiplier was added by Gregor Aisch
        */
        var ref = unpack$6(args, 'lch');
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) { h = 0; }
        h = h * DEG2RAD;
        return [l, cos(h) * c, sin(h) * c]
    };

    var lch2lab_1 = lch2lab$2;

    var unpack$5 = utils.unpack;
    var lch2lab$1 = lch2lab_1;
    var lab2rgb$1 = lab2rgb_1;

    var lch2rgb$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$5(args, 'lch');
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab$1 (l,c,h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb$1 (L,a,b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var lch2rgb_1 = lch2rgb$1;

    var unpack$4 = utils.unpack;
    var pow = Math.pow;
    var sign = Math.sign;

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var oklab2rgb$2 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$4(args, 'lab');
        var L = args[0];
        var a = args[1];
        var b = args[2];

        var l = pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
        var m = pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
        var s = pow(L - 0.0894841775 * a - 1.291485548 * b, 3);

        return [
            255 * lrgb2rgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
            255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
            255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
            args.length > 3 ? args[3] : 1
        ];
    };

    var oklab2rgb_1 = oklab2rgb$2;

    function lrgb2rgb(c) {
        var abs = Math.abs(c);
        if (abs > 0.0031308) {
            return (sign(c) || 1) * (1.055 * pow(abs, 1 / 2.4) - 0.055);
        }
        return c * 12.92;
    }

    var unpack$3 = utils.unpack;
    var lch2lab = lch2lab_1;
    var oklab2rgb$1 = oklab2rgb_1;

    var oklch2rgb$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$3(args, 'lch');
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = oklab2rgb$1(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var oklch2rgb_1 = oklch2rgb$1;

    var hsl2rgb = hsl2rgb_1;
    var lab2rgb = lab2rgb_1;
    var lch2rgb = lch2rgb_1;
    var oklab2rgb = oklab2rgb_1;
    var oklch2rgb = oklch2rgb_1;
    var input$4 = input$5;

    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_LABA = /^lab\(\s*(\d+(?:\.\d+)?)%?\s* (-?\d+(?:\.\d+)?)%?\s* \s*(-?\d+(?:\.\d+)?)%?\s*(?:\/\s*([01]|[01]?\.\d+))?\)$/;
    var RE_LCHA = /^lch\(\s*(\d+(?:\.\d+)?)%?\s* (\d+(?:\.\d+)?)%?\s* \s*(-?\d+(?:\.\d+)?)\s*(?:\/\s*([01]|[01]?\.\d+))?\)$/;
    var RE_OKLABA = /^oklab\(\s*(\d+(?:\.\d+)?%?)\s* (-?\d+(?:\.\d+)?%?)\s* \s*(-?\d+(?:\.\d+)?%?)\s*(?:\/\s*([01]|[01]?\.\d+))?\)$/;
    var RE_OKLCHA = /^oklch\(\s*(\d+(?:\.\d+)?%?)\s* (\d+(?:\.\d+)?%?)\s* \s*(-?\d+(?:\.\d+)?)\s*(?:\/\s*([01]|[01]?\.\d+))?\)$/;

    var round$3 = Math.round;
    var abs = Math.abs;

    var css2rgb$1 = function (css) {
        css = css.toLowerCase().trim();
        var m;

        if (input$4.format.named) {
            try {
                return input$4.format.named(css);
            } catch (e) {
                // eslint-disable-next-line
            }
        }

        // rgb(250,20,0)
        if ((m = css.match(RE_RGB))) {
            var rgb = m.slice(1,4);
            for (var i=0; i<3; i++) {
                rgb[i] = Number(rgb[i]);
            }
            rgb[3] = 1;  // default alpha
            return rgb;
        }

        // rgba(250,20,0,0.4)
        if ((m = css.match(RE_RGBA))) {
            var rgb$1 = m.slice(1,5);
            for (var i$1=0; i$1<4; i$1++) {
                rgb$1[i$1] = Number(rgb$1[i$1]);
            }
            return rgb$1;
        }

        // rgb(100%,0%,0%)
        if ((m = css.match(RE_RGB_PCT))) {
            var rgb$2 = m.slice(1,4);
            for (var i$2=0; i$2<3; i$2++) {
                rgb$2[i$2] = round$3(Number(rgb$2[i$2]) * 2.55);
            }
            rgb$2[3] = 1;  // default alpha
            return rgb$2;
        }

        // rgba(100%,0%,0%,0.4)
        if ((m = css.match(RE_RGBA_PCT))) {
            var rgb$3 = m.slice(1,5);
            for (var i$3=0; i$3<3; i$3++) {
                rgb$3[i$3] = round$3(Number(rgb$3[i$3]) * 2.55);
            }
            rgb$3[3] = Number(rgb$3[3]);
            return rgb$3;
        }

        // hsl(0,100%,50%)
        if ((m = css.match(RE_HSL))) {
            var hsl = m.slice(1,4);
            for (var i$4 = 0; i$4 <= 2; i$4++) {hsl[i$4] = Number(hsl[i$4]);}
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            var rgb$4 = hsl2rgb(hsl);
            rgb$4[3] = 1;
            return rgb$4;
        }

        // hsla(0,100%,50%,0.5)
        if ((m = css.match(RE_HSLA))) {
            var hsl$1 = m.slice(1,4);
            for (var i$5 = 0; i$5 <= 2; i$5++) {hsl$1[i$5] = Number(hsl$1[i$5]);}
            hsl$1[1] *= 0.01;
            hsl$1[2] *= 0.01;
            var rgb$5 = hsl2rgb(hsl$1);
            rgb$5[3] = Number(m[4]);  // default alpha = 1
            return rgb$5;
        }
        
        // lab(48.25% -28.85% -8.48% / 1)
        if ((m = css.match(RE_LABA))) {
            var lab = m.slice(1,4);
            for (var i$6 = 0; i$6 <= 2; i$6++) {lab[i$6] = Number(lab[i$6]);}
            var rgb$6 = lab2rgb(lab).map(function (i) { return abs(round$3(i)); });
            rgb$6[3] = Number(m[4]); // default alpha = 1
            if (!rgb$6[3] && rgb$6[3] !== 0) {rgb$6[3] = 1;}
            return rgb$6;
        }
        
        // lch(54.31% 9.27% 194.77 / 1)
        if ((m = css.match(RE_LCHA))) {
            var lch = m.slice(1,4);
            for (var i$7 = 0; i$7 <= 2; i$7++) {lch[i$7] = Number(lch[i$7]);}
            var rgb$7 = lch2rgb(lch).map(function (i) { return abs(round$3(i)); });
            rgb$7[3] = Number(m[4]); // default alpha = 1
            if (!rgb$7[3] && rgb$7[3] !== 0) {rgb$7[3] = 1;}
            return rgb$7;
        }
        
        // oklab(54.31% -8.96% -2.36% / 1)
        if ((m = css.match(RE_OKLABA))) {
            var lab$1 = m.slice(1,4);
            for (var i$8 = 0; i$8 <= 2; i$8++) {
                if (lab$1[i$8].endsWith('%')) {lab$1[i$8] = Number(lab$1[i$8].replace('%', '')) * 0.01;}
                else {lab$1[i$8] = Number(lab$1[i$8]);}
            }
            var rgb$8 = oklab2rgb(lab$1).map(function (i) { return abs(round$3(i)); });
            rgb$8[3] = Number(m[4]); // default alpha = 1
            if (!rgb$8[3] && rgb$8[3] !== 0) {rgb$8[3] = 1;}
            return rgb$8;
        }
        
        // oklch(54.31% 9.27% 194.77 / 1)
        if ((m = css.match(RE_OKLCHA))) {
            var lch$1 = m.slice(1,4);
            for (var i$9 = 0; i$9 <= 1; i$9++) {
                if (lch$1[i$9].endsWith('%')) {
                    lch$1[i$9] = Number(lch$1[i$9].replace('%', '')) * 0.01;
                    if (i$9 === 1) {lch$1[i$9] *= 0.4;}
                } else {lch$1[i$9] = Number(lch$1[i$9]);}
            }
            var rgb$9 = oklch2rgb(lch$1).map(function (i) { return abs(round$3(i)); });
            rgb$9[3] = Number(m[4]); // default alpha = 1
            if (!rgb$9[3] && rgb$9[3] !== 0) {rgb$9[3] = 1;}
            return rgb$9;
        }
    };

    css2rgb$1.test = function (s) {
        return RE_RGB.test(s) ||
            RE_RGBA.test(s) ||
            RE_RGB_PCT.test(s) ||
            RE_RGBA_PCT.test(s) ||
            RE_HSL.test(s) ||
            RE_HSLA.test(s) ||
            RE_LABA.test(s) ||
            RE_LCHA.test(s) ||
            RE_OKLABA.test(s) ||
            RE_OKLCHA.test(s);
    };

    var css2rgb_1 = css2rgb$1;

    var chroma$4 = chroma_1;
    var Color$5 = Color_1;
    var input$3 = input$5;
    var type$4 = utils.type;

    var rgb2css = rgb2css_1;
    var css2rgb = css2rgb_1;

    Color$5.prototype.css = function(mode) {
        return rgb2css(this._rgb, mode);
    };

    chroma$4.css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$5, [ null ].concat( args, ['css']) ));
    };

    input$3.format.css = css2rgb;

    input$3.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$4(h) === 'string' && css2rgb.test(h)) {
                return 'css';
            }
        }
    });

    var unpack$2 = utils.unpack;
    var last$1 = utils.last;
    var round$2 = Math.round;

    var rgb2hex$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$2(args, 'rgba');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last$1(args) || 'auto';
        if (a === undefined) { a = 1; }
        if (mode === 'auto') {
            mode = a < 1 ? 'rgba' : 'rgb';
        }
        r = round$2(r);
        g = round$2(g);
        b = round$2(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16); //#.toUpperCase();
        str = str.substring(str.length - 6);
        var hxa = '0' + round$2(a * 255).toString(16);
        hxa = hxa.substring(hxa.length - 2);
        switch (mode.toLowerCase()) {
            case 'rgba': return ("#" + str + hxa);
            case 'argb': return ("#" + hxa + str);
            default: return ("#" + str);
        }
    };

    var rgb2hex_1 = rgb2hex$1;

    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

    var hex2rgb = function (hex) {
        if (hex.match(RE_HEX)) {
            // remove optional leading #
            if (hex.length === 4 || hex.length === 7) {
                hex = hex.substring(1);
            }
            // expand short-notation to full six-digit
            if (hex.length === 3) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            var u = parseInt(hex, 16);
            var r = u >> 16;
            var g = u >> 8 & 0xFF;
            var b = u & 0xFF;
            return [r,g,b,1];
        }

        // match rgba hex format, eg #FF000077
        if (hex.match(RE_HEXA)) {
            if (hex.length === 5 || hex.length === 9) {
                // remove optional leading #
                hex = hex.substring(1);
            }
            // expand short-notation to full eight-digit
            if (hex.length === 4) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
            }
            var u$1 = parseInt(hex, 16);
            var r$1 = u$1 >> 24 & 0xFF;
            var g$1 = u$1 >> 16 & 0xFF;
            var b$1 = u$1 >> 8 & 0xFF;
            var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
            return [r$1,g$1,b$1,a];
        }

        // we used to check for css colors here
        // if _input.css? and rgb = _input.css hex
        //     return rgb

        throw new Error(("unknown hex color: " + hex));
    };

    var hex2rgb_1 = hex2rgb;

    var chroma$3 = chroma_1;
    var Color$4 = Color_1;
    var type$3 = utils.type;
    var input$2 = input$5;

    var rgb2hex = rgb2hex_1;

    Color$4.prototype.hex = function(mode) {
        return rgb2hex(this._rgb, mode);
    };

    chroma$3.hex = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$4, [ null ].concat( args, ['hex']) ));
    };

    input$2.format.hex = hex2rgb_1;
    input$2.autodetect.push({
        p: 4,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$3(h) === 'string' && [3,4,5,6,7,8,9].indexOf(h.length) >= 0) {
                return 'hex';
            }
        }
    });

    var chroma$2 = chroma_1;
    var Color$3 = Color_1;
    var input$1 = input$5;
    var unpack$1 = utils.unpack;
    var type$2 = utils.type;
    var round$1 = Math.round;

    Color$3.prototype.rgb = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        if (rnd === false) { return this._rgb.slice(0,3); }
        return this._rgb.slice(0,3).map(round$1);
    };

    Color$3.prototype.rgba = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        return this._rgb.slice(0,4).map(function (v,i) {
            return i<3 ? (rnd === false ? v : round$1(v)) : v;
        });
    };

    chroma$2.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$3, [ null ].concat( args, ['rgb']) ));
    };

    input$1.format.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$1(args, 'rgba');
        if (rgba[3] === undefined) { rgba[3] = 1; }
        return rgba;
    };

    input$1.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$1(args, 'rgba');
            if (type$2(args) === 'array' && (args.length === 3 ||
                args.length === 4 && type$2(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
                return 'rgb';
            }
        }
    });

    var unpack = utils.unpack;
    var last = utils.last;
    var round = Math.round;

    var rgb2and$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack(args, 'rgba');
        var mode = (rgba[3] !== 1 ? last(args) : 'rgb') || 'rgb';
        rgba[0] = round(rgba[0]);
        rgba[1] = round(rgba[1]);
        rgba[2] = round(rgba[2]);
        if (mode === 'rgba' || (rgba.length > 3 && rgba[3] < 1 && last(args) !== 'rgb')) {
            rgba[3] = rgba.length > 3 ? rgba[3] : 1;
            mode = 'rgba';
        }
        return 	mode === 'rgba' 
    		? ((rgba[3] << 24) | (rgba[0] << 16) | (rgba[1] << 8) | (rgba[2])) 
    		: (0xff000000 | (rgba[0] << 16) | (rgba[1] << 8) | (rgba[2]));
    };

    var rgb2and_1 = rgb2and$1;

    var type$1 = utils.type;

    var and2rgb = function (and) {
        if (type$1(and) == "number") {
            var alpha = (and >> 24 & 0xFF) / 255;
            if (alpha >= 0 && alpha <= 1) {
    			var a = and - 0xFF000000;
                var r = a >> 16 & 0xFF;
                var g = (a >> 8) & 0xFF;
                var b = a & 0xFF;
                return [r,g,b,alpha];
            }
        }
        throw new Error("unknown android color: "+and);
    };

    var and2rgb_1 = and2rgb;

    var chroma$1 = chroma_1;
    var Color$2 = Color_1;
    var input = input$5;
    var type = utils.type;

    var rgb2and = rgb2and_1;

    Color$2.prototype.android = function(mode) {
        return rgb2and(this._rgb, mode);
    };

    chroma$1.android = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color$2, [ null ].concat( args, ['android']) ));
    };

    input.format.android = and2rgb_1;

    input.autodetect.push({
        p: 5,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            if (args.length === 1 && type(args[0]) === 'number') {
                var alpha = (args[0] >> 24 & 0xFF) / 255;
                if (alpha >= 0 && alpha <= 1) {
                    var a = args[0] - 0xFF000000;
                    var r = a >> 16 & 0xFF;
                    var g = (a >> 8) & 0xFF;
                    var b = a & 0xFF;
                    if ([r,g,b].every(function (val) { return val >= 0 && val <= 255; })) {
                        return 'android';
                    }
                }
            }
        }
    });

    var Color$1 = Color_1;

    Color$1.prototype.get = function (mc) {
        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel) - (mode.substring(0, 2) === 'ok' ? 2 : 0);
            if (i > -1) { return src[i]; }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var Color = Color_1;

    var valid = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        try {
            new (Function.prototype.bind.apply( Color, [ null ].concat( args) ));
            return true;
        } catch (e) {
            return false;
        }
    };

    var chroma = chroma_1;

    // feel free to comment out anything to rollup
    // a smaller chroma.js built

    // io --> convert colors





    // operators --> modify existing Colors


    // other utility methods
    chroma.valid = valid;

    var indexUltraLight = chroma;

    return indexUltraLight;

}));
