import request from 'request-promise';
import { observable, computed } from 'mobx';


const API_ENDPOINT = 'http://box.maxi-muth.de:5000';
// const API_ENDPOINT = 'http://127.0.0.1:5000';
const POLLING_INTERVAL = 3000;


class StatusStore {
	@observable statusHistory = [];
    @observable pendingRequests = 0;

    constructor() {
        this.fetchHistory();
    }

    @computed get status() {
        // const [first, ...last] = this.statusHistory;
        if (this.statusHistory.length === 0)
            return undefined;
        const last = this.statusHistory.slice(-1)[0];
        return last;
    }

    @computed get verboseStatus() {
        let status = 'Unknown';
        if (this.status !== undefined) {
            // TodO
        }
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
                setTimeout(function () {
                    that.fetchHistory();
                }, POLLING_INTERVAL);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


const statusStore = new StatusStore();
export default statusStore;