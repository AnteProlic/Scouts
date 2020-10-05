from flask import Flask, Blueprint, request, session, redirect, url_for
from backend.config import dev_config
from flask_pymongo import PyMongo
import hashlib

mod = Blueprint('/register', __name__)

APP = Flask(__name__)
dev_config(APP)
mongo = PyMongo(APP)

@mod.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        users = mongo.db.users
        existing_user = users.find_one({'name': request.form['username']})
        if existing_user is None:
            hashpass = hashlib.sha256(bytes(request.form['password'], "UTF-8")).hexdigest()
            users.insert({'name': request.form['username'], 'email': request.form['email'], 'password': hashpass})
            return 'Great success!'
        else:
            return 'Username taken'
    return redirect('http://localhost:3000/register')

if __name__ == '__main__':
    APP.run(host='0.0.0.0')