/**
 * http://usejsdoc.org/
 */

exports.handleConsole = () => {
	let chunk = process.stdin.read();
	if (chunk !== null) {
		chunk = chunk.replace("\n", "").replace("\r", "");
		if (chunk == 'x') {
			console.log('server | process ended!');
			process.exit()
		} else {
			console.log("server | unknown order: " + chunk);
		}
	}
};

exports.getTime = function()  {

    var date = new Date();

    var hours  = date.getHours();
    hours = (hours < 10 ? "0" : "") + hours;
    
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var msec  = date.getMilliseconds();
    msec = (msec < 10 ? "00" : (msec < 100 ? "0" : "")) + msec;
    
    return  hours + ":" + min + ":" + sec+":" + msec;

}

exports.getTimeHHMMSS = function() {

    var date = new Date();

    var hours  = date.getHours();
    hours = (hours < 10 ? "0" : "") + hours;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return  hours + ":" + min + ":" + sec;

}


Buffer.prototype.toByteArray = function () {
	  return Array.prototype.slice.call(this, 0)
	}

Date.prototype.myFormat = function() {
  var yyyy = this.getFullYear();
  var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
  var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
  var hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
  var min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
  var ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
  return "".concat(yyyy)+mm+dd+hh+'_'+min+ss;
 };
 
 
 /**
  * Converts an HSL color value to RGB. Conversion formula
  * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
  * Assumes h, s, and l are contained in the set [0, 1] and
  * returns r, g, and b in the set [0, 255].
  *
  * @param   {number}  h       The hue
  * @param   {number}  s       The saturation
  * @param   {number}  l       The lightness
  * @return  {Array}           The RGB representation
  */
exports.hslToRgb = function (h, s, l){
     var r, g, b;

     if(s == 0){
         r = g = b = l; // achromatic
     }else{
         var hue2rgb = function hue2rgb(p, q, t){
             if(t < 0) t += 1;
             if(t > 1) t -= 1;
             if(t < 1/6) return p + (q - p) * 6 * t;
             if(t < 1/2) return q;
             if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
             return p;
         }

         var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
         var p = 2 * l - q;
         r = hue2rgb(p, q, h + 1/3);
         g = hue2rgb(p, q, h);
         b = hue2rgb(p, q, h - 1/3);
     }

     return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
 }
 
 /**
  * Converts an RGB color value to HSL. Conversion formula
  * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
  * Assumes r, g, and b are contained in the set [0, 255] and
  * returns h, s, and l in the set [0, 1].
  *
  * @param   {number}  r       The red color value
  * @param   {number}  g       The green color value
  * @param   {number}  b       The blue color value
  * @return  {Array}           The HSL representation
  */
exports.rgbToHsl = function (r, g, b){
     r /= 255, g /= 255, b /= 255;
     var max = Math.max(r, g, b), min = Math.min(r, g, b);
     var h, s, l = (max + min) / 2;

     if(max == min){
         h = s = 0; // achromatic
     }else{
         var d = max - min;
         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
         switch(max){
             case r: h = (g - b) / d + (g < b ? 6 : 0); break;
             case g: h = (b - r) / d + 2; break;
             case b: h = (r - g) / d + 4; break;
         }
         h /= 6;
     }

     return [h, s, l];
};


exports.clone = function(o) {
    if (typeof o === 'string' || o instanceof String)
        return (' ' + o).slice(1);
    var out, v, key;
    out = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        out[key] = (typeof v === "object") ? exports.clone(v) : v;
    }
    return out;
};


exports.ansi2html = function(str) {
    var props = {}
      , open = false

    var stylemap =
      { bold: "font-weight"
      , underline: "text-decoration"
      , color: "color"
      , background: "background"
      }

    function style() {
      var key, val, style = []
      for (var key in props) {
        val = props[key]
        if (!val) continue
        if (val == true) {
          style.push(stylemap[key] + ':' + key)
        } else {
          style.push(stylemap[key] + ':' + val)
        }
      }
      return style.join(';')
    }


    function tag(code) {
      var i
        , tag = ''
        , n = ansi2htmlTable[code]

      if (open) tag += '</span>'
      open = false

      if (n) {
        for (i in n) props[i] = n[i]
        tag += '<span style="' + style() + '">'
        open = true
      } else {
        props = {}
      }

      return tag
    }

    return (str.replace(/\[(\d+;)?(\d+)*m/g, function(match, b1, b2) {
      var i, code, res = ''
      if (b2 == '' || b2 == null) b2 = '0'
      for (i = 1; i < arguments.length - 2; i++) {
        if (!arguments[i]) continue
        code = parseInt(arguments[i])
        res += tag(code)
      }
      return res
    }) + tag()).replace(/[^\x20-\x7F]/g, "");
  }

  /* not implemented:
   *   italic
   *   blink
   *   invert
   *   strikethrough
   */
var  ansi2htmlTable =
  { 0: null
  , 1: { bold: true }
  , 3: { italic: true }
  , 4: { underline: true }
  , 5: { blink: true }
  , 6: { blink: true }
  , 7: { invert: true }
  , 9: { strikethrough: true }
  , 23: { italic: false }
  , 24: { underline: false }
  , 25: { blink: false }
  , 27: { invert: false }
  , 29: { strikethrough: false }
  , 30: { color: 'black' }
  , 31: { color: 'red' }
  , 32: { color: 'lightgreen' }
  , 33: { color: 'yellow' }
  , 34: { color: 'blue' }
  , 35: { color: 'magenta' }
  , 36: { color: 'lightblue' }
  , 37: { color: 'white' }
  , 39: { color: null }
  , 40: { background: 'black' }
  , 41: { background: 'red' }
  , 42: { background: 'green' }
  , 43: { background: 'yellow' }
  , 44: { background: 'blue' }
  , 45: { background: 'magenta' }
  , 46: { background: 'cyan' }
  , 47: { background: 'white' }
  , 49: { background: null }
  }