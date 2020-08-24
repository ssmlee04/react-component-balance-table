import React from 'react';
import _ from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './../index.css';

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
    const { profile } = this.props;
    const { copied } = this.state;
    if (!profile) {
      return (
        <div style={{ fontSize: 12 }}>Not available at this time... </div>
      );
    }
    if (profile.balance_table && profile.balance_table.url) {
      const btnClass = copied ? 'react-components-show-url btn btn-sm btn-danger disabled font-10' : 'react-components-show-url btn btn-sm btn-warning font-10';
      const btnText = copied ? 'Copied' : 'Copy Img';
      return (
        <div className='react-components-show-button'>
          <img alt={`${profile.ticker} - ${profile.name} balance sheets`} src={profile.balance_table.url} style={{ width: '100%' }} />
          <CopyToClipboard text={profile.balance_table.url || ''}
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
      if (data[0].ta > 10000000) {
        divider = 1000000;
        unit = 'milllion';
        u = 'm';
      }
      if (data[0].ta > 10000000000) {
        divider = 1000000000;
        unit = 'billion';
        u = 'b';
      }
      data = _.sortBy(data.filter(d => d.reportDate), (d) => {
        return d.reportDate;
      });

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
        d.currentLongTermDebt = d.cld / divider;
        return d;
      });
    };


    const data = calculateBalanceSheets(_.get(profile, 'balance_sheet.data', []));
    const unit = _.get(data, '0.unit') || 'million';
    const arr = data.slice(-4);

    return (
      <div style={{ width: '100%', padding: 5, fontSize: 12 }}>
        <div style={{ color: 'darkred', fontWeight: 'bold' }}>{profile.ticker} - {profile.name}</div>
        <table className='table table-sm'>
          <thead className='bold'>
            <th className='left lighter'>Unit: ({unit})</th>
            <th className='bg-lightgray-ultra-5'>{arr[0] && arr[0].quarterStr}</th>
            <th className='bg-lightgray-ultra-4'>{arr[1] && arr[1].quarterStr}</th>
            <th className='bg-lightgray-ultra-3'>{arr[2] && arr[2].quarterStr}</th>
            <th className='bg-lightgray-ultra-2'>{arr[3] && arr[3].quarterStr}</th>
          </thead>
          <tbody>
            <tr>
              <td className='bold'>Total Assets</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].totalAssets && parseFloat(arr[0].totalAssets).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].totalAssets && parseFloat(arr[1].totalAssets).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].totalAssets && parseFloat(arr[2].totalAssets).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].totalAssets && parseFloat(arr[3].totalAssets).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Other Assets</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].otherAssets && parseFloat(arr[0].otherAssets).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].otherAssets && parseFloat(arr[1].otherAssets).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].otherAssets && parseFloat(arr[2].otherAssets).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].otherAssets && parseFloat(arr[3].otherAssets).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Intangible Assets</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].intangibleAssets && parseFloat(arr[0].intangibleAssets).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].intangibleAssets && parseFloat(arr[1].intangibleAssets).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].intangibleAssets && parseFloat(arr[2].intangibleAssets).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].intangibleAssets && parseFloat(arr[3].intangibleAssets).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Goodwill</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].goodwill && parseFloat(arr[0].goodwill).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].goodwill && parseFloat(arr[1].goodwill).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].goodwill && parseFloat(arr[2].goodwill).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].goodwill && parseFloat(arr[3].goodwill).toFixed(2)}</td>
            </tr>
            <tr>
              <td className='green'>Current Assets</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].currentAssets && parseFloat(arr[0].currentAssets).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].currentAssets && parseFloat(arr[1].currentAssets).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].currentAssets && parseFloat(arr[2].currentAssets).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].currentAssets && parseFloat(arr[3].currentAssets).toFixed(2)}</td>
            </tr>
            <tr>
              <td className='green'>Current Cash</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].currentCash && parseFloat(arr[0].currentCash).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].currentCash && parseFloat(arr[1].currentCash).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].currentCash && parseFloat(arr[2].currentCash).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].currentCash && parseFloat(arr[3].currentCash).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Account Payables</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].accountsPayable && parseFloat(arr[0].accountsPayable).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].accountsPayable && parseFloat(arr[1].accountsPayable).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].accountsPayable && parseFloat(arr[2].accountsPayable).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].accountsPayable && parseFloat(arr[3].accountsPayable).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Account Receivables</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].receivables && parseFloat(arr[0].receivables).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].receivables && parseFloat(arr[1].receivables).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].receivables && parseFloat(arr[2].receivables).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].receivables && parseFloat(arr[3].receivables).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Inventory</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].inventory && parseFloat(arr[0].inventory).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].inventory && parseFloat(arr[1].inventory).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].inventory && parseFloat(arr[2].inventory).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].inventory && parseFloat(arr[3].inventory).toFixed(2)}</td>
            </tr>
            <tr>
              <td className='red'>Total Liabilities</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].totalLiabilities && parseFloat(arr[0].totalLiabilities).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].totalLiabilities && parseFloat(arr[1].totalLiabilities).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].totalLiabilities && parseFloat(arr[2].totalLiabilities).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].totalLiabilities && parseFloat(arr[3].totalLiabilities).toFixed(2)}</td>
            </tr>
            <tr>
              <td className='red'>Long Term Debt</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].longTermDebt && parseFloat(arr[0].longTermDebt).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].longTermDebt && parseFloat(arr[1].longTermDebt).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].longTermDebt && parseFloat(arr[2].longTermDebt).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].longTermDebt && parseFloat(arr[3].longTermDebt).toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ fontSize: 10 }}>Current Long<br /> Term Debt</td>
              <td className='bg-lightgray-ultra-5'>{arr[0] && arr[0].currentLongTermDebt && parseFloat(arr[0].currentLongTermDebt).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-4'>{arr[1] && arr[1].currentLongTermDebt && parseFloat(arr[1].currentLongTermDebt).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-3'>{arr[2] && arr[2].currentLongTermDebt && parseFloat(arr[2].currentLongTermDebt).toFixed(2)}</td>
              <td className='bg-lightgray-ultra-2'>{arr[3] && arr[3].currentLongTermDebt && parseFloat(arr[3].currentLongTermDebt).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Analyst;
