import React from 'react';

import Header from '../components/HeaderComponent.jsx';
import Map from '../components/MapComponent.jsx';
import statusStore from '../stores/StatusStore.jsx';

export default class HomeContainer extends React.Component {
    render() {
        return (
            <div>
                <Header heading="Neitha"/>
                <section className="container-fluid white">
                    <div className="row">
                        <Map store={ statusStore } />
                    </div>
                </section>
            </div>
        );
    }
}

