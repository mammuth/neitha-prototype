import React from 'react';
import { Link } from 'react-router-dom';


export default class StatusDetails extends React.Component {

	render() {

	    let { store } = this.props;

		return (
			<div className="status-details">
				{/* The input switch doesn't do anything yet... */}
                <input type="checkbox" id="id-name--1" name="set-name" className="switch-input" checked="checked" onChange={ this.handleSettingChange } />
                <label htmlFor="id-name--1" className="switch-label">Protection is enabled</label>
                <div className="keyValuePair">
                    <div className="key">Last Update:</div>
                    <div className="value">{ store.lastUpdatedMessage }</div>
                </div>
                <div className="keyValuePair">
                    <div className="key">Last Location Update:</div>
                    <div className="value">{ store.lastLocationUpdateMessage }</div>
                </div>


            </div>
		);
	}
}
