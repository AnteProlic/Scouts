from flask import Flask

app = Flask(__name__)

from backend.login.app import mod
from backend.register.app import mod

app.register_blueprint(login.app.mod, url_prefix='/user')
app.register_blueprint(register.app.mod, url_prefix='/user')

if __name__ == '__main__':
    app.run(host='0.0.0.0')