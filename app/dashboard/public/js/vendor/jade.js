
define([], function() {
  var attrs, escape, rethrow;
  escape = function(html) {
    return String(html).replace(/&(?!\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  rethrow = function(err) {
    throw err;
  };
  attrs = function(obj) {
    var buf, key, val;
    buf = [];
    delete obj.terse;
    for (key in obj) {
      val = obj[key];
      buf.push("");
      if (val && typeof val === "boolean") {
        buf.push("" + key + "='" + key + "'");
      } else if (key === "class" && Array.isArray(val)) {
        buf.push("" + key + "='" + (escape(val.join(' '))) + "'");
      } else {
        buf.push("" + key + "='" + (escape(val)) + "'");
      }
    }
    return buf.join(" ");
  };
  return {
    escape: escape,
    rethrow: rethrow,
    attrs: attrs
  };
});
