"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BalanceTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactCopyToClipboard = require("react-copy-to-clipboard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var lookup = function lookup(arr, idx, prop) {
  return parseFloat(_lodash["default"].get(arr, "".concat(idx, ".").concat(prop), 0)).toFixed(2);
};

var BalanceTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BalanceTable, _React$Component);

  function BalanceTable(props) {
    var _this;

    _classCallCheck(this, BalanceTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BalanceTable).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(BalanceTable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          profile = _this$props.profile,
          _this$props$prop = _this$props.prop,
          prop = _this$props$prop === void 0 ? 'balance_sheet' : _this$props$prop,
          _this$props$imgProp = _this$props.imgProp,
          imgProp = _this$props$imgProp === void 0 ? 'balance_table' : _this$props$imgProp,
          _this$props$count = _this$props.count,
          count = _this$props$count === void 0 ? 4 : _this$props$count,
          _this$props$theme = _this$props.theme,
          theme = _this$props$theme === void 0 ? 'light' : _this$props$theme;
      var copied = this.state.copied;

      if (!profile) {
        return _react["default"].createElement("div", {
          style: {
            fontSize: 12
          }
        }, "Not available at this time... ");
      }

      if (profile[imgProp] && profile[imgProp].url) {
        var btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-12' : 'react-components-show-url btn btn-sm btn-warning font-12';
        var btnText = copied ? 'Copied' : 'Copy Img';
        return _react["default"].createElement("div", {
          className: "react-components-show-button"
        }, _react["default"].createElement("img", {
          alt: "".concat(profile.ticker, " - ").concat(profile.name, " balance sheets"),
          src: profile[imgProp].url,
          style: {
            width: '100%'
          }
        }), _react["default"].createElement(_reactCopyToClipboard.CopyToClipboard, {
          text: profile[imgProp].url || '',
          onCopy: function onCopy() {
            return _this2.setState({
              copied: true
            });
          }
        }, _react["default"].createElement("button", {
          className: btnClass,
          value: btnText
        }, btnText)));
      }

      var calculateBalanceSheets = function calculateBalanceSheets(data) {
        var divider = 1000;
        var unit = 'thousand';
        var u = 'k';
        if (!data || !data.length) return data;
        data = _lodash["default"].sortBy(data.filter(function (d) {
          return d.reportDate;
        }), function (d) {
          return d.reportDate;
        });

        if (data[data.length - 1].ta > 10000000) {
          divider = 1000000;
          unit = 'milllion';
          u = 'm';
        }

        if (data[data.length - 1].ta > 10000000000) {
          divider = 1000000000;
          unit = 'billion';
          u = 'b';
        }

        return data.map(function (d, i) {
          var qq = ~~d.reportDate.slice(5, 7);
          var yy = d.reportDate.slice(0, 4);
          var qtr;

          if (qq <= 3) {
            qtr = 'Q1';
          } else if (qq <= 6) {
            qtr = 'Q2';
          } else if (qq <= 9) {
            qtr = 'Q3';
          } else if (qq <= 12) {
            qtr = 'Q4';
          }

          d.quarterStr = yy + qtr;
          d.unit = unit;
          d.u = u;
          d.totalAssets = d.ta / divider;
          d.otherAssets = d.oa / divider;
          d.intangibleAssets = d.ia / divider;
          d.goodwill = d.gw / divider;
          d.currentAssets = d.ca / divider;
          d.currentCash = d.cc / divider;
          d.accountsPayable = d.ap / divider;
          d.receivables = d.rec / divider;
          d.inventory = d.inv / divider;
          d.totalLiabilities = d.tl / divider;
          d.longTermDebt = d.ld / divider;
          d.shortTermDebt = d.std / divider;
          d.totalDebts = ((d.std || 0) + (d.ld || 0)) / divider;
          d.totalCurrentLiabilities = d.tcl / divider;
          d.totalShareHolderEquity = d.tse / divider;
          d.debtToEquityRatio = d.totalDebts / d.totalShareHolderEquity;
          d.debtRatio = d.totalDebts / d.totalAssets;
          d.currentRatio = d.currentAssets / d.totalCurrentLiabilities;
          return d;
        });
      };

      var data = calculateBalanceSheets(_lodash["default"].get(profile, "".concat(prop, ".data"), []));
      var unit = _lodash["default"].get(data, '0.unit') || 'million';
      var arr = data.slice(count * -1) || [];
      return _react["default"].createElement("div", {
        style: {
          width: '100%',
          padding: 5
        },
        className: "theme-black-".concat(theme)
      }, _react["default"].createElement("div", {
        className: "theme-darkred-".concat(theme, " mb-2"),
        style: {
          fontWeight: 'bold'
        }
      }, profile.ticker, " - ", profile.name, "\xA0", _react["default"].createElement("span", {
        className: "theme-green-".concat(theme)
      }, "Balance Sheet")), _react["default"].createElement("table", {
        className: "table table-sm",
        style: {
          marginBottom: 0,
          fontSize: 10
        }
      }, _react["default"].createElement("thead", {
        className: "bold"
      }, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        className: "left"
      }, "Unit: (", unit, ")"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("th", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].quarterStr);
      }))), _react["default"].createElement("tbody", null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold theme-green-".concat(theme)
      }, "Total Assets"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'totalAssets'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "theme-green-".concat(theme)
      }, "Intangible Assets"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'intangibleAssets'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "theme-green-".concat(theme)
      }, "Goodwill"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'goodwill'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "theme-green-".concat(theme)
      }, "Current Assets"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'currentAssets'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "theme-green-".concat(theme)
      }, "Current Cash"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'currentCash'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "theme-green-".concat(theme)
      }, "Account Receivables"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'receivables'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "theme-green-".concat(theme)
      }, "Inventory"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'inventory'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold theme-red-".concat(theme)
      }, "Total Liabilities"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'totalLiabilities'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "theme-red-".concat(theme)
      }, "Account Payables"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'accountsPayable'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "theme-red-".concat(theme)
      }, "Short Term Debt"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'shortTermDebt'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "theme-red-".concat(theme)
      }, "Long Term Debt"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'longTermDebt'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Current Ratio"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'currentRatio'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Debt Ratio"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'debtRatio'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Debt/Equity Ratio"), _lodash["default"].range(arr.length).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, lookup(arr, d, 'debtToEquityRatio'));
      })))), _react["default"].createElement("div", {
        style: {
          fontSize: 12,
          padding: 5,
          paddingTop: 2
        }
      }, "Crafted by ", _react["default"].createElement("a", {
        href: "https://twitter.com/tradeideashq",
        target: "_blank",
        className: "theme-darkred-".concat(theme)
      }, "@tradeideashq"), " with ", _react["default"].createElement("span", {
        style: {
          fontSize: 16,
          color: 'red'
        }
      }, "\uD83D\uDCA1")));
    }
  }]);

  return BalanceTable;
}(_react["default"].Component);

exports.BalanceTable = BalanceTable;
var _default = BalanceTable;
exports["default"] = _default;