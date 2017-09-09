from datetime import datetime
from flask import Flask, request, json

app = Flask(__name__)


state_history = []


def serialize_timestamp(datetime=datetime.now()):
    """ Takes a datetime object and serializes it to our """
    return datetime.strftime("%Y-%m-%d %H:%M:%S")


@app.route('/ping', methods=['GET', 'POST'])
def ping():
    longitude = request.args.get('longitude')
    latitude = request.args.get('latitude')
    connected = request.args.get('connected')

    if None in [longitude, latitude, connected]:
        response = app.response_class(
            response='Bad request: we need the following URL parameters: longitude, latitude, connected',
            status=400,
            mimetype='application/json'
        )
        return response

    updated_data = {
        'connected': connected,
        'longitude': longitude,
        'latitude': latitude,
        'timestamp': serialize_timestamp()
    }
    state_history.append(updated_data)
    response_data = {
        'message': 'Updated.',
        'connected': connected,
        'longitude': longitude,
        'latitude': latitude,
        'history': state_history
    }
    response = app.response_class(
        response=json.dumps(response_data),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/status', methods=['GET'])
def get_status():
    if len(state_history) == 0:
        response = app.response_class(
            response='We have no reported status yet',
            status=400,
            mimetype='application/json'
        )
        return response
    response = app.response_class(
        response=json.dumps(state_history[-1]),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/history', methods=['GET'])
def get_history():
    if len(state_history) == 0:
        response = app.response_class(
            response='We have no reported history yet',
            status=400,
            mimetype='application/json'
        )
        return response
    response = app.response_class(
        response=json.dumps(state_history),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/', methods=['GET'])
def home():
    return 'The following routes exist: ping, status, history'


if __name__ == '__main__':
    app.run()
