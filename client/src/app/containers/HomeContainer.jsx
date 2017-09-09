import React from 'react';
import { observer } from 'mobx-react';

import Header from '../components/HeaderComponent.jsx';
import Map from '../components/MapComponent.jsx';
import StatusBar from '../components/StatusBarComponent.jsx';

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
                    {/* The input switch doesn't do anything yet... */}
                    <input type="checkbox" id="id-name--1" name="set-name" className="switch-input" checked="checked" onChange={ this.handleSettingChange } />
                    <label htmlFor="id-name--1" className="switch-label">Alarm is turned on</label>
                    <p>Last update: { statusStore.lastUpdatedMessage }</p>
                </section>
            </div>
        );
    }
}

