import request from 'request-promise';
import { observable, computed } from 'mobx';
import moment from 'moment';


const API_ENDPOINT = 'http://app.neitha.de/api';
// const API_ENDPOINT = 'http://127.0.0.1:5000/api';
const POLLING_INTERVAL = 3000;

const CONNECTION_STATUS_VALUES = {
    CONNECTED: {
        cssClass: 'status-ok',
        message: 'OK'
    },
    DISCONNECTED:  {
        cssClass: 'status-stolen',
        message: 'Stolen'
    },
    UNKNOWN:  {
        cssClass: 'status-unknown',
        message: 'Unknown'
    },
};

class StatusStore {
	@observable statusHistory = [];
	@observable lastStatus;
    @observable pendingRequests = 0;

    constructor() {
        setInterval(this.fetchStatus, POLLING_INTERVAL);
    }

    getConnectionStatus() {
        const status = this.status;
        if (status === undefined) {
            return CONNECTION_STATUS_VALUES.UNKNOWN;
        } else {
            return status.connected ? CONNECTION_STATUS_VALUES.CONNECTED : CONNECTION_STATUS_VALUES.DISCONNECTED;
        }
    }

    @computed get status() {
        return this.lastStatus;
    }

    @computed get statusCssClass() {
        return this.getConnectionStatus().cssClass;
    }

    @computed get statusMessage() {
        return this.getConnectionStatus().message;
    }

    @computed get lastUpdatedMessage() {
        if (this.getConnectionStatus() === CONNECTION_STATUS_VALUES.UNKNOWN) {
            return 'Unknown';
        }
        return moment(this.status.last_update, "YYYY-MM-DD hh:mm:ss").fromNow();
    }

    @computed get lastLocationUpdateMessage() {
        if (this.lastLocation === undefined) {
            return 'Unknown';
        }
        return moment(this.lastLocation.timestamp, "YYYY-MM-DD hh:mm:ss").fromNow();
    }

    @computed get lastLocation() {
        if (this.lastStatus === undefined) {
            return undefined;
        }
        return this.lastStatus.last_known_location;
    }

    fetchStatus() {
        // This method is called recursivly every POLLING_INTERVAL milliseconds
        const that = this;
        console.log('fetching status...');
        this.pendingRequests += 1;
        request({'uri': API_ENDPOINT + '/status', 'json': true})
            .then(function (jsonData) {
                that.lastStatus = jsonData;
                that.pendingRequests -= 1;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


const statusStore = new StatusStore();
export default statusStore;