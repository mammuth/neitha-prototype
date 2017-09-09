import React from 'react';

export default class Image extends React.Component {
	render() {
		let { src, alt } = this.props;

		return (
			<img src={require(`../../assets/images/${ src }`)} alt={ alt } />
		);
	}
}
