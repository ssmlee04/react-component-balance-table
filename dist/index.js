"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Analyst = void 0;

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

var Analyst =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Analyst, _React$Component);

  function Analyst(props) {
    var _this;

    _classCallCheck(this, Analyst);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Analyst).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(Analyst, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var profile = this.props.profile;
      if (!profile) return true;
      if (nextState.copied) return true;
      if (profile.ticker !== nextProps.profile.ticker) return true;
      return false;
    }
  }, {
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
          count = _this$props$count === void 0 ? 4 : _this$props$count;
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

        if (data[data.length - 1].ta > 5000000) {
          divider = 1000000;
          unit = 'milllion';
          u = 'm';
        }

        if (data[data.length - 1].ta > 5000000000) {
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
      var arr = data.slice(count * -1);
      return _react["default"].createElement("div", {
        style: {
          width: '100%',
          padding: 5,
          fontSize: 12
        }
      }, _react["default"].createElement("div", {
        style: {
          color: 'darkred',
          fontWeight: 'bold',
          marginBottom: 5,
          fontSize: 12
        }
      }, profile.ticker, " - ", profile.name, _react["default"].createElement("span", {
        style: {
          color: 'green',
          marginLeft: 3
        }
      }, "Balance Sheets")), _react["default"].createElement("table", {
        className: "table table-sm",
        style: {
          marginBottom: 0
        }
      }, _react["default"].createElement("thead", {
        className: "bold"
      }, _react["default"].createElement("th", {
        className: "left lighter"
      }, "Unit: (", unit, ")"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("th", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov")
        }, arr[d] && arr[d].quarterStr);
      })), _react["default"].createElement("tbody", null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold green"
      }, "Total Assets"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'totalAssets'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "green"
      }, "Intangible Assets"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'intangibleAssets'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "green"
      }, "Goodwill"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'goodwill'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "green"
      }, "Current Assets"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'currentAssets'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "green"
      }, "Current Cash"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'currentCash'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "green"
      }, "Account Receivables"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'receivables'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "green"
      }, "Inventory"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'inventory'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold red"
      }, "Total Liabilities"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'totalLiabilities'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "red"
      }, "Account Payables"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'accountsPayable'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "red"
      }, "Short Term Debt"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'shortTermDebt'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "red"
      }, "Long Term Debt"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'longTermDebt'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Current Ratio"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'currentRatio'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Debt Ratio"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'debtRatio'));
      })), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Debt/Equity Ratio"), _lodash["default"].range(count).map(function (d) {
        return _react["default"].createElement("td", {
          key: d,
          className: "bg-lightgray-ul-".concat(d, " hov lighter")
        }, lookup(arr, d, 'debtToEquityRatio'));
      })))), _react["default"].createElement("div", {
        style: {
          fontSize: 12,
          color: 'gray'
        }
      }, "Generated by ", _react["default"].createElement("span", {
        style: {
          color: 'darkred'
        }
      }, "@earningsfly"), " with ", _react["default"].createElement("span", {
        style: {
          fontSize: 16,
          color: 'red'
        }
      }, "\u2764\uFE0F")));
    }
  }]);

  return Analyst;
}(_react["default"].Component);

exports.Analyst = Analyst;
var _default = Analyst;
exports["default"] = _default;