import React from 'react';

import Header from '../components/HeaderComponent.jsx';
import Map from '../components/MapComponent.jsx';

export default class HomeContainer extends React.Component {
    render() {

        return (
            <div>
                <Header heading="Neitha"/>
                <section className="container-fluid white">
                    <div className="content-section">
                        <Map />
                    </div>
                </section>
            </div>
        );
    }
}

