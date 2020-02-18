"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Analyst = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reactCopyToClipboard = require("react-copy-to-clipboard");

require("./../index.css");

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

      var profile = this.props.profile;
      var copied = this.state.copied;

      if (!profile) {
        return _react["default"].createElement("div", {
          style: {
            fontSize: 12
          }
        }, "Not available at this time... ");
      }

      if (profile.balance_table && profile.balance_table.url) {
        var btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-10' : 'react-components-show-url btn btn-sm btn-warning font-10';
        var btnText = copied ? 'Copied' : 'Copy Img';
        return _react["default"].createElement("div", {
          className: "react-components-show-button"
        }, _react["default"].createElement("img", {
          alt: "".concat(profile.ticker, " - ").concat(profile.name, " analyst opinions"),
          src: profile.balance_table.url,
          style: {
            width: '100%'
          }
        }), _react["default"].createElement(_reactCopyToClipboard.CopyToClipboard, {
          text: profile.balance_table.url || '',
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

        if (data[0].rev > 1000000) {
          divider = 1000000;
          unit = 'milllion';
          u = 'm';
        }

        if (data[0].rev > 1000000000) {
          divider = 1000000000;
          unit = 'billion';
          u = 'b';
        }

        data = _lodash["default"].sortBy(data.filter(function (d) {
          return d.reportDate;
        }), function (d) {
          return d.reportDate;
        });
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
          d.currentLongTermDebt = d.cld / divider;
          return d;
        });
      };

      var data = calculateBalanceSheets(_lodash["default"].get(profile, 'balance_sheet.data', []));
      var unit = _lodash["default"].get(data, '0.unit') || 'million';
      var arr = data.slice(-4);
      return _react["default"].createElement("div", {
        style: {
          width: '100%',
          padding: 5,
          fontSize: 12
        }
      }, _react["default"].createElement("div", {
        style: {
          color: 'darkred',
          fontWeight: 'bold'
        }
      }, profile.ticker, " - ", profile.name), _react["default"].createElement("table", {
        className: "table table-sm"
      }, _react["default"].createElement("thead", {
        className: "bold"
      }, _react["default"].createElement("th", {
        className: "left lighter"
      }, "Unit: (", unit, ")"), _react["default"].createElement("th", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].quarterStr), _react["default"].createElement("th", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].quarterStr), _react["default"].createElement("th", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].quarterStr), _react["default"].createElement("th", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].quarterStr)), _react["default"].createElement("tbody", null, _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "bold"
      }, "Total Assets"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].totalAssets && parseFloat(arr[0].totalAssets).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].totalAssets && parseFloat(arr[1].totalAssets).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].totalAssets && parseFloat(arr[2].totalAssets).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].totalAssets && parseFloat(arr[3].totalAssets).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Other Assets"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].otherAssets && parseFloat(arr[0].otherAssets).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].otherAssets && parseFloat(arr[1].otherAssets).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].otherAssets && parseFloat(arr[2].otherAssets).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].otherAssets && parseFloat(arr[3].otherAssets).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Intangible Assets"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].intangibleAssets && parseFloat(arr[0].intangibleAssets).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].intangibleAssets && parseFloat(arr[1].intangibleAssets).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].intangibleAssets && parseFloat(arr[2].intangibleAssets).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].intangibleAssets && parseFloat(arr[3].intangibleAssets).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Goodwill"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].goodwill && parseFloat(arr[0].goodwill).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].goodwill && parseFloat(arr[1].goodwill).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].goodwill && parseFloat(arr[2].goodwill).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].goodwill && parseFloat(arr[3].goodwill).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "green"
      }, "Current Assets"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].currentAssets && parseFloat(arr[0].currentAssets).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].currentAssets && parseFloat(arr[1].currentAssets).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].currentAssets && parseFloat(arr[2].currentAssets).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].currentAssets && parseFloat(arr[3].currentAssets).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "green"
      }, "Current Cash"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].currentCash && parseFloat(arr[0].currentCash).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].currentCash && parseFloat(arr[1].currentCash).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].currentCash && parseFloat(arr[2].currentCash).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].currentCash && parseFloat(arr[3].currentCash).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Account Payables"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].accountsPayable && parseFloat(arr[0].accountsPayable).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].accountsPayable && parseFloat(arr[1].accountsPayable).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].accountsPayable && parseFloat(arr[2].accountsPayable).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].accountsPayable && parseFloat(arr[3].accountsPayable).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Account Receivables"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].receivables && parseFloat(arr[0].receivables).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].receivables && parseFloat(arr[1].receivables).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].receivables && parseFloat(arr[2].receivables).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].receivables && parseFloat(arr[3].receivables).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", null, "Inventory"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].inventory && parseFloat(arr[0].inventory).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].inventory && parseFloat(arr[1].inventory).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].inventory && parseFloat(arr[2].inventory).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].inventory && parseFloat(arr[3].inventory).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "red"
      }, "Total Liabilities"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].totalLiabilities && parseFloat(arr[0].totalLiabilities).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].totalLiabilities && parseFloat(arr[1].totalLiabilities).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].totalLiabilities && parseFloat(arr[2].totalLiabilities).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].totalLiabilities && parseFloat(arr[3].totalLiabilities).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        className: "red"
      }, "Long Term Debt"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].longTermDebt && parseFloat(arr[0].longTermDebt).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].longTermDebt && parseFloat(arr[1].longTermDebt).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].longTermDebt && parseFloat(arr[2].longTermDebt).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].longTermDebt && parseFloat(arr[3].longTermDebt).toFixed(2))), _react["default"].createElement("tr", null, _react["default"].createElement("td", {
        style: {
          fontSize: 10
        }
      }, "Current Long", _react["default"].createElement("br", null), " Term Debt"), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-5"
      }, arr[0] && arr[0].currentLongTermDebt && parseFloat(arr[0].currentLongTermDebt).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-4"
      }, arr[1] && arr[1].currentLongTermDebt && parseFloat(arr[1].currentLongTermDebt).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-3"
      }, arr[2] && arr[2].currentLongTermDebt && parseFloat(arr[2].currentLongTermDebt).toFixed(2)), _react["default"].createElement("td", {
        className: "bg-lightgray-ultra-2"
      }, arr[3] && arr[3].currentLongTermDebt && parseFloat(arr[3].currentLongTermDebt).toFixed(2))))));
    }
  }]);

  return Analyst;
}(_react["default"].Component);

exports.Analyst = Analyst;
var _default = Analyst;
exports["default"] = _default;