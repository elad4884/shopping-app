import React, { Component } from 'react';
import StatsSquare from './statsSquare';
import config from '../config.json'

class Stats extends Component {
    state = { 
        sales: [
        ],
        topFiveSold: [],
        topFiveUniqueSold: [],
        fivePastDays: []
    }

     componentDidMount() {

        fetch(`${config.SERVER_URL}/api/sales/topSold/5`)
        .then(res => res.json())
        .then((json) => this.setState({ topFiveSold: json }));

        fetch(`${config.SERVER_URL}/api/sales/topUniqueSold/5`)
        .then(res => res.json())
        .then((json) => this.setState({ topFiveUniqueSold: json }));

        fetch(`${config.SERVER_URL}/api/sales/pastDays/5`)
        .then(res => res.json())
        .then((json) => this.setState({ fivePastDays: json }));

    }

    render() { 
        return ( 
            <div style={{maxWidth: '1200px', margin: 'auto'}}>
                <h1>Stats</h1>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: 30}}>
                    <StatsSquare title="Top 5 sel" items={this.state.topFiveSold.map(p => p = {key: p.title, value: p.amount})} />
                    <StatsSquare title="Top 5 unique sel" items={this.state.topFiveUniqueSold.map(p => p = {key: p.title, value: p.amount})} />
                    <StatsSquare title="Past 5 days $" items={this.state.fivePastDays.map(p => p = {key: p.date, value: `${p.paid.toFixed(2)}$`})} />
                </div>
            </div>
         );
    }
}
 
export default Stats;