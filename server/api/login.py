import flask

login_api = flask.Blueprint('login_api', __name__, url_prefix='/api/login')


@login_api.route('/', methods=['GET'])
def login_get():
    return flask.jsonify({
        'hello': 'world'
    })


@login_api.route('/token/', methods=['POST'])
def generate_token():
    return flask.jsonify({
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8'
    })
