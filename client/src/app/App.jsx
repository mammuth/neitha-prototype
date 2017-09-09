import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect, hashHistory } from 'react-router-dom';

import HomeContainer from './containers/HomeContainer.jsx';

export default class App extends React.Component {
	render() {
		return (
			<Router history={ hashHistory }>
				<div className="app">
					<Switch>
						<Route path="/" component={ HomeContainer } />
					</Switch>
				</div>
			</Router>
		)
	}
}