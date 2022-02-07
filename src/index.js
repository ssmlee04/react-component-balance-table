import React from 'react';
import _ from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './../index.css';

const lookup = (arr, idx, prop) => {
  return parseFloat(_.get(arr, `${idx}.${prop}`, 0)).toFixed(2);
};

export class BalanceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { profile, prop = 'balance_sheet', imgProp = 'balance_table', count = 4, theme = 'light' } = this.props;
    const { copied } = this.state;
    if (!profile) {
      return (
        <div style={{ fontSize: 12 }}>Not available at this time... </div>
      );
    }
    if (profile[imgProp] && profile[imgProp].url) {
      const btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-12' : 'react-components-show-url btn btn-sm btn-warning font-12';
      const btnText = copied ? 'Copied' : 'Copy Img';
      return (
        <div className='react-components-show-button'>
          <img alt={`${profile.ticker} - ${profile.name} balance sheets`} src={profile[imgProp].url} style={{ width: '100%' }} />
          <CopyToClipboard text={profile[imgProp].url || ''}
            onCopy={() => this.setState({ copied: true })}
          >
            <button className={btnClass} value={btnText}>{btnText}</button>
          </CopyToClipboard>
        </div>
      );
    }

    const calculateBalanceSheets = (data) => {
      let divider = 1000;
      let unit = 'thousand';
      let u = 'k';
      if (!data || !data.length) return data;
      data = _.sortBy(data.filter(d => d.reportDate), (d) => {
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

      return data.map((d, i) => {
        const qq = ~~d.reportDate.slice(5, 7);
        let yy =d.reportDate.slice(0, 4);
        let qtr;
        if (qq <= 3) {
          qtr = 'Q1';
        }
        else if (qq <= 6) {
          qtr = 'Q2';
        }
        else if (qq <= 9) {
          qtr = 'Q3';
        }
        else if (qq <= 12) {
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


    const data = calculateBalanceSheets(_.get(profile, `${prop}.data`, []));
    const unit = _.get(data, '0.unit') || 'million';
    const arr = data.slice(count * -1) || [];

    return (
      <div style={{ width: '100%', padding: 5 }} className={`theme-black-${theme}`}>
        <div className={`theme-darkred-${theme} mb-2`} style={{ fontWeight: 'bold' }}>{profile.ticker} - {profile.name}&nbsp;<span className={`theme-green-${theme}`}>Balance Sheet</span></div>
        <table className='table table-sm' style={{ marginBottom: 0, fontSize: 10 }}>
          <thead className='bold'>
            <tr>
              <th className='left'>Unit: ({unit})</th>
              {_.range(arr.length).map(d => <th key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].quarterStr}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`bold theme-green-${theme}`}>Total Assets</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'totalAssets')}</td>)}
            </tr>
            <tr>
              <td className={`theme-green-${theme}`}>Intangible Assets</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'intangibleAssets')}</td>)}
            </tr>
            <tr>
              <td className={`theme-green-${theme}`}>Goodwill</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'goodwill')}</td>)}
            </tr>
            <tr>
              <td className={`theme-green-${theme}`}>Current Assets</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'currentAssets')}</td>)}
            </tr>
            <tr>
              <td className={`theme-green-${theme}`}>Current Cash</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'currentCash')}</td>)}
            </tr>
            <tr>
              <td className={`theme-green-${theme}`}>Account Receivables</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'receivables')}</td>)}
            </tr>
            <tr>
              <td className={`theme-green-${theme}`}>Inventory</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'inventory')}</td>)}
            </tr>
            <tr>
              <td className={`bold theme-red-${theme}`}>Total Liabilities</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'totalLiabilities')}</td>)}
            </tr>
            <tr>
              <td className={`theme-red-${theme}`}>Account Payables</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'accountsPayable')}</td>)}
            </tr>
            <tr>
              <td className={`theme-red-${theme}`}>Short Term Debt</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'shortTermDebt')}</td>)}
            </tr>
            <tr>
              <td className={`theme-red-${theme}`}>Long Term Debt</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'longTermDebt')}</td>)}
            </tr>
            <tr>
              <td>Current Ratio</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'currentRatio')}</td>)}
            </tr>
            <tr>
              <td>Debt Ratio</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'debtRatio')}</td>)}
            </tr>
            <tr>
              <td>Debt/Equity Ratio</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov`}>{lookup(arr, d, 'debtToEquityRatio')}</td>)}
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 12, padding: 5, paddingTop: 2 }}>Crafted by <a href='https://twitter.com/tradeideashq' target='_blank' className={`theme-darkred-${theme}`}>@tradeideashq</a> with <span style={{ fontSize: 16, color: 'red' }}>💡</span></div>
      </div>
    );
  }
}

export default BalanceTable;
