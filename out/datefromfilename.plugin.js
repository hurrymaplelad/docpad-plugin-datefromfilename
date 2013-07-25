// Generated by CoffeeScript 1.4.0
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = function(BasePlugin) {
  var DateFromFileNamePlugin;
  return DateFromFileNamePlugin = (function(_super) {

    __extends(DateFromFileNamePlugin, _super);

    function DateFromFileNamePlugin() {
      return DateFromFileNamePlugin.__super__.constructor.apply(this, arguments);
    }

    DateFromFileNamePlugin.prototype.name = 'datefromfilename';

    DateFromFileNamePlugin.prototype.config = {
      removeDate: false,
      dateRegExp: /\b(\d{4})[-_ ]?(\d{2})[-_ ]?(\d{2})[-_ ]?/
    };

    DateFromFileNamePlugin.prototype.renderBefore = function(opts, next) {
      var collection, dateRegExp, removeDate, templateData, _ref;
      collection = opts.collection, templateData = opts.templateData;
      _ref = this.config, removeDate = _ref.removeDate, dateRegExp = _ref.dateRegExp;
      collection.forEach(function(document) {
        var date;
        if (!(date = document.get('basename').match(dateRegExp))) {
          return;
        }
        if (removeDate) {
          document.id = document.id.replace(dateRegExp, '');
          document.set('basename', document.get('basename').replace(dateRegExp, ''));
          document.set('outPath', document.get('outPath').replace(dateRegExp, ''));
          document.set('url', document.get('url').replace(dateRegExp, ''));
        }
        if (!document.getMeta().get('date')) {
          date = new Date(date[1] + '-' + date[2] + '-' + date[3]);
          document.getMeta().set('date', date);
          return document.set('date', date);
        }
      });
      return next();
    };

    return DateFromFileNamePlugin;

  })(BasePlugin);
};
