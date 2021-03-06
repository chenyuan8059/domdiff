global.tressa = require('tressa');
global.domdiff = require('../cjs').default;
global.document = {
  createTextNode: function (value) {
    return Object.defineProperty(
      {value: value},
      'nextSibling',
      {get: function () {
        var cn = document.body.childNodes;
        return cn[cn.indexOf(this) + 1] || null;
      }}
    );
  },
  body: {
    childNodes: [],
    insertBefore: function (before, after) {
      var cn = this.childNodes;
      var i = cn.indexOf(before);
      if (-1 < i) cn.splice(i, 1);
      if (after == null) cn.push(before);
      else cn.splice(cn.indexOf(after), 0, before);
    },
    removeChild: function (child) {
      var cn = this.childNodes;
      cn.splice(cn.indexOf(child), 1);
    }
  }
};

require('./test.js');
