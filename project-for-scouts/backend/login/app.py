from flask import Flask, Blueprint
from backend.config import dev_config

mod = Blueprint('/login', __name__)

APP = Flask(__name__)

@mod.route('/login')
def login():
    return 'This is login.'

if __name__ == '__main__':
    APP.run(host='0.0.0.0')