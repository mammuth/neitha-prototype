import React from 'react';
import { Link } from 'react-router-dom';


export default class Header extends React.Component {

	render() {

	    let { heading } = this.props;

		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
                        <Link to="/" className="navbar-brand">
                            {/*<Image src="logo-small.png" alt="allianz" />*/}
                        </Link>
						<p className="navbar-text text-center lead">
							<strong>{ heading }</strong>
						</p>
					</div>
				</div>
			</nav>
		);
	}
}
