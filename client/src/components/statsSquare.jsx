import React, { Component } from 'react';

class StatsSquare extends Component {
    render() { 
        return (  
            <div style={{borderRadius: 10, margin: 20, background: '#eee', padding: 20}}>
                <h2>{this.props.title}</h2>
                <ul className="list-group" style={{marginTop: '40px'}}>
                    {this.props.items.map(item => 
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={item.key}>
                        {item.key}
                        <span class="badge badge-light">{item.value}</span>
                    </li>)}
                </ul>
            </div>
        );
    }
}
 
export default StatsSquare;