from datetime import datetime
from flask import Flask, request, json

app = Flask(__name__)


# def get_last_connected():
#     last_connected = getattr(g, 'last_connected', 0)
#     return last_connected
#
# def update_last_connected():
#     with app.app_context():
#         # within this block, current_app points to app.
#         print
#         current_app.name

state_history = []


def serialize_timestamp(datetime=datetime.now()):
    return datetime.strftime("%Y-%m-%d %H:%M:%S")


@app.route('/ping', methods=['GET', 'POST'])
def ping():
    # last_connected = datetime.now()
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
    data = {
        'message': 'Updated.',
        'connected': connected,
        'longitude': longitude,
        'latitude': latitude,
        'history': state_history
    }
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# @app.route('/get_status', methods=['GET'])
# def ping():


if __name__ == '__main__':
    app.run()
