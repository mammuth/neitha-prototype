import React from 'react';
import { observer } from 'mobx-react';


@observer
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
