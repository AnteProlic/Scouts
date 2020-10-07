from flask import Flask, Blueprint, request, session, redirect, url_for
from backend.config import dev_config
from flask_pymongo import PyMongo
import hashlib

mod = Blueprint('/login', __name__)

APP = Flask(__name__)
dev_config(APP)
mongo = PyMongo(APP)

@mod.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        users = mongo.db.users
        login_user = users.find_one({'name' : request.form['username']})
        if login_user is not None:
            if hashlib.sha256(bytes(request.form['password'], 'UTF-8')).hexdigest() == login_user['password']:
                return redirect('http://localhost:3000/login')
            else:
                return 'Incorrect username/password combination!'
    return redirect('http://localhost:3000/login')

if __name__ == '__main__':
    APP.run(host='0.0.0.0')