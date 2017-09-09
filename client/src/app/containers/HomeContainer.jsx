import React from 'react';
import { observer } from 'mobx-react';

import Header from '../components/HeaderComponent.jsx';
import Map from '../components/MapComponent.jsx';
import statusStore from '../stores/StatusStore.jsx';

@observer
export default class HomeContainer extends React.Component {
    render() {
        return (
            <div className={ statusStore.statusCssClass }>
                <Header heading="Neitha" store={ statusStore } />
                <section className="container-fluid white">
                    <div className="row">
                        <Map store={ statusStore } />
                    </div>
                </section>
            </div>
        );
    }
}

