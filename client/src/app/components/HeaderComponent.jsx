import React from 'react';
import { Link } from 'react-router-dom';

import Image from './ImageComponent.jsx';

export default class Header extends React.Component {

	render() {

	    let { heading, subheading, store } = this.props;

		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
                        <Link to="/" className="navbar-brand">
                            <Image src="logo-dark.png" />
                        </Link>
						<p className="navbar-text text-center lead">
							<strong>{ heading }</strong> &ndash; { subheading }
						</p>
					</div>
				</div>
			</nav>
		);
	}
}
