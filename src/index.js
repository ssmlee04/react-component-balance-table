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
    const { profile, prop = 'balance_sheet', imgProp = 'balance_table', count = 4 } = this.props;
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
      <div style={{ width: '100%', padding: 5, fontSize: 12 }}>
        <div style={{ color: 'darkred', fontWeight: 'bold', marginBottom: 5, fontSize: 12 }}>{profile.ticker} - {profile.name}<span style={{ color: 'green', marginLeft: 3 }}>Balance Sheets</span></div>
        <table className='table table-sm' style={{ marginBottom: 0, fontSize: 10 }}>
          <thead className='bold'>
            <th className='left lighter'>Unit: ({unit})</th>
            {_.range(arr.length).map(d => <th key={d} className={`bg-lightgray-ul-${d} hov`}>{arr[d] && arr[d].quarterStr}</th>)}
          </thead>
          <tbody>
            <tr>
              <td className='bold green'>Total Assets</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'totalAssets')}</td>)}
            </tr>
            <tr>
              <td className='green'>Intangible Assets</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'intangibleAssets')}</td>)}
            </tr>
            <tr>
              <td className='green'>Goodwill</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'goodwill')}</td>)}
            </tr>
            <tr>
              <td className='green'>Current Assets</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'currentAssets')}</td>)}
            </tr>
            <tr>
              <td className='green'>Current Cash</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'currentCash')}</td>)}
            </tr>
            <tr>
              <td className='green'>Account Receivables</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'receivables')}</td>)}
            </tr>
            <tr>
              <td className='green'>Inventory</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'inventory')}</td>)}
            </tr>
            <tr>
              <td className='bold red'>Total Liabilities</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'totalLiabilities')}</td>)}
            </tr>
            <tr>
              <td className='red'>Account Payables</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'accountsPayable')}</td>)}
            </tr>
            <tr>
              <td className='red'>Short Term Debt</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'shortTermDebt')}</td>)}
            </tr>
            <tr>
              <td className='red'>Long Term Debt</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'longTermDebt')}</td>)}
            </tr>
            <tr>
              <td>Current Ratio</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'currentRatio')}</td>)}
            </tr>
            <tr>
              <td>Debt Ratio</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'debtRatio')}</td>)}
            </tr>
            <tr>
              <td>Debt/Equity Ratio</td>
              {_.range(arr.length).map(d => <td key={d} className={`bg-lightgray-ul-${d} hov lighter`}>{lookup(arr, d, 'debtToEquityRatio')}</td>)}
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 12, color: 'gray' }}>Generated by <span style={{ color: 'darkred' }}>@earningsfly</span> with <span style={{ fontSize: 16, color: 'red' }}>❤️</span></div>
      </div>
    );
  }
}

export default Analyst;
