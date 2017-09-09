import React from 'react';
import { Link } from 'react-router-dom';


export default class StatusBar extends React.Component {

	render() {

	    let { store } = this.props;

		return (
			<div className="status-bar bg-status">
				<p className="status-bar-text">
                	<strong>Status:</strong> { store.statusMessage }
                </p>
            </div>
		);
	}
}
