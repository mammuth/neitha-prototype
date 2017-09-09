import datetime
from flask import Flask, request, json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


state_history = []
TIME_STRING_FORMAT = "%Y-%m-%d %H:%M:%S"


def serialize_timestamp(dt):
    """ Takes a datetime object and serializes it to our time format """
    return dt.strftime(TIME_STRING_FORMAT)


def deserialize_timestamp(string):
    """ Takes a string and returns a datetime object """
    return datetime.datetime.strptime(string, TIME_STRING_FORMAT)


@app.route('/ping', methods=['GET', 'POST'])
def ping():
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    connected = request.args.get('connected')

    if not any([longitude, latitude, connected]):
        response = app.response_class(
            response='Bad request: You should at least tell me whether the beacon is connected or not ("connected"). '
                     'Optional parameters: latitude, longitude',
            status=400,
            mimetype='application/json'
        )
        return response

    connected = connected.lower() in ['true', '1', 'ok', 'connected', 'ja', 'yes']
    updated_data = {
        'connected': connected,
        'timestamp': serialize_timestamp(datetime.datetime.now())
    }

    try:
        lat = float(latitude)/100
        lon = float(longitude)/100
    except ValueError:
        print("Lat/Long are no floats. Not gonna save that shit!")
    else:
        updated_data.update({
            'latitude': lat,
            'longitude': lon
        })

    state_history.append(updated_data)

    response_data = {
        'status': updated_data,
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
