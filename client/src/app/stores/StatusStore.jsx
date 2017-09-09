import request from 'request-promise';
import { observable, computed } from 'mobx';
import moment from 'moment';


const API_ENDPOINT = 'http://box.maxi-muth.de:5000/api';
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
    @observable pendingRequests = 0;

    constructor() {
        this.fetchHistory();
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
        if (this.statusHistory.length === 0)
            return undefined;
        const last = this.statusHistory.slice(-1)[0];
        return last;
    }

    @computed get statusCssClass() {
        return this.getConnectionStatus().cssClass;
    }

    @computed get statusMessage() {
        return this.getConnectionStatus().message;
    }

    @computed get lastUpdatedMessage() {
        if (this.getConnectionStatus() === CONNECTION_STATUS_VALUES.UNKNOWN) {
            return 'Unknown'
        }
        return moment(this.status.timestamp, "YYYY-MM-DD hh:mm:ss").fromNow();
    }

    fetchHistory() {
        // This method is called recursivly every POLLING_INTERVAL milliseconds
        const that = this;
        console.log('fetching history...');
        this.pendingRequests += 1;
        request({'uri': API_ENDPOINT + '/history', 'json': true})
            .then(function (jsonData) {
                that.statusHistory = jsonData;
                that.pendingRequests -= 1;
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function() {
                setTimeout(function () {
                    that.fetchHistory();
                }, POLLING_INTERVAL);
            });
    }
}


const statusStore = new StatusStore();
export default statusStore;