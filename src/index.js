import React from 'react';
import _ from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './../index.css';

const lookup = (arr, idx, prop) => {
  return parseFloat(_.get(arr, `${idx}.${prop}`, 0)).toFixed(2);
};

export class Analyst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { profile } = this.props;
    if (!profile) return true;
    if (nextState.copied) return true;
    if (profile.ticker !== nextProps.profile.ticker) return true;
    return false;
  }

  render() {
    const { profile, prop = 'balance_sheet', imgProp = 'balance_table' } = this.props;
    const { copied } = this.state;
    if (!profile) {
      return (
        <div style={{ fontSize: 8 }}>Not available at this time... </div>
      );
    }
    if (profile[imgProp] && profile[imgProp].url) {
      const btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-8' : 'react-components-show-url btn btn-sm btn-warning font-8';
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
      if (data[data.length - 1].ta > 2000000) {
        divider = 1000000;
        unit = 'milllion';
        u = 'm';
      }
      if (data[data.length - 1].ta > 2000000000) {
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
    const arr = data.slice(-4);

    return (
      <div style={{ width: '100%', padding: 5, fontSize: 7 }}>
        <div style={{ color: 'darkred', fontWeight: 'bold', marginBottom: 5, fontSize: 7 }}>{profile.ticker} - {profile.name}<span style={{ color: 'green', marginLeft: 3 }}>Balance Sheets</span></div>
        <table className='table table-sm' style={{ marginBottom: 0 }}>
          <thead className='bold'>
            <th className='left lighter'>Unit: ({unit})</th>
            <th className='bg-lightgray-ultra-5'>{arr[0] && arr[0].quarterStr}</th>
            <th className='bg-lightgray-ultra-4'>{arr[1] && arr[1].quarterStr}</th>
            <th className='bg-lightgray-ultra-3'>{arr[2] && arr[2].quarterStr}</th>
            <th className='bg-lightgray-ultra-2'>{arr[3] && arr[3].quarterStr}</th>
          </thead>
          <tbody>
            <tr>
              <td className='bold green'>Total Assets</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'totalAssets')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'totalAssets')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'totalAssets')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'totalAssets')}</td>
            </tr>
            <tr>
              <td className='green'>Other Assets</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'otherAssets')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'otherAssets')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'otherAssets')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'otherAssets')}</td>
            </tr>
            <tr>
              <td className='green'>Intangible Assets</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'intangibleAssets')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'intangibleAssets')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'intangibleAssets')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'intangibleAssets')}</td>
            </tr>
            <tr>
              <td className='green'>Goodwill</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'goodwill')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'goodwill')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'goodwill')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'goodwill')}</td>
            </tr>
            <tr>
              <td className='green'>Current Assets</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'currentAssets')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'currentAssets')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'currentAssets')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'currentAssets')}</td>
            </tr>
            <tr>
              <td className='green'>Current Cash</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'currentCash')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'currentCash')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'currentCash')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'currentCash')}</td>
            </tr>
            <tr>
              <td className='green'>Account Receivables</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'receivables')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'receivables')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'receivables')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'receivables')}</td>
            </tr>
            <tr>
              <td className='green'>Inventory</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'inventory')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'inventory')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'inventory')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'inventory')}</td>
            </tr>
            <tr>
              <td className='bold red'>Total Liabilities</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'totalLiabilities')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'totalLiabilities')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'totalLiabilities')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'totalLiabilities')}</td>
            </tr>
            <tr>
              <td className='red'>Account Payables</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'accountsPayable')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'accountsPayable')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'accountsPayable')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'accountsPayable')}</td>
            </tr>
            <tr>
              <td className='red'>Short Term Debt</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'shortTermDebt')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'shortTermDebt')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'shortTermDebt')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'shortTermDebt')}</td>
            </tr>
            <tr>
              <td className='red'>Long Term Debt</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'longTermDebt')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'longTermDebt')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'longTermDebt')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'longTermDebt')}</td>
            </tr>
            <tr>
              <td>Current Ratio</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'currentRatio')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'currentRatio')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'currentRatio')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'currentRatio')}</td>
            </tr>
            <tr>
              <td>Debt Ratio</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'debtRatio')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'debtRatio')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'debtRatio')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'debtRatio')}</td>
            </tr>
            <tr>
              <td>Debt/Equity Ratio</td>
              <td className='bg-lightgray-ultra-5'>{lookup(arr, 0, 'debtToEquityRatio')}</td>
              <td className='bg-lightgray-ultra-4'>{lookup(arr, 1, 'debtToEquityRatio')}</td>
              <td className='bg-lightgray-ultra-3'>{lookup(arr, 2, 'debtToEquityRatio')}</td>
              <td className='bg-lightgray-ultra-2'>{lookup(arr, 3, 'debtToEquityRatio')}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 8, color: 'gray' }}>Generated by <span style={{ color: 'darkred' }}>@earningsfly</span> with <span style={{ fontSize: 16, color: 'red' }}>❤️</span></div>
      </div>
    );
  }
}

export default Analyst;
