import React from 'react';
import { observer } from 'mobx-react';

import Header from '../components/HeaderComponent.jsx';
import Map from '../components/MapComponent.jsx';
import StatusBar from '../components/StatusBarComponent.jsx';
import StatusDetails from '../components/StatusDetailsComponent.jsx';

import statusStore from '../stores/StatusStore.jsx';

@observer
export default class HomeContainer extends React.Component {
    handleSettingChange() {

    }

    render() {
        return (
            <div className={ statusStore.statusCssClass }>
                <Header heading="NEITHA" subheading="Handbag AntiTheft" store={ statusStore } />
                <section className="container-fluid white">
                    <div className="row">
                        <Map store={ statusStore } />
                        <StatusBar store={ statusStore } />
                    </div>
                </section>
                <section className="container-fluid white">
					<div className="content-section">
						<div className="row">
                            <div className="col-sm-12">
                                <StatusDetails store={ statusStore } />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

