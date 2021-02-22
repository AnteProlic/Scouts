import hashlib


from flask import Flask, Blueprint, request, session, jsonify
from ..db import mongo

user = Blueprint('user', __name__, url_prefix='/user')

@user.route('/login', methods=['POST', 'GET'])
def login():
    if 'name' in session:
        return '403'
    if request.method == 'POST':
        users = mongo.db.users
        login_user = users.find_one({'name' : request.json['username']})
        if login_user is not None:
            if hashlib.sha256(bytes(request.json['password'], 'UTF-8')).hexdigest() == login_user['password']:
                session['name'] = str(login_user['_id'])
                return '200'
        return '401'
    return '404'


@user.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        users = mongo.db.users
        existing_user = users.find_one({'name': request.json['username']})
        if existing_user is None:
            hashpass = hashlib.sha256(bytes(request.json['password'], 'UTF-8')).hexdigest()
            users.insert({'name': request.json['username'], 'email': request.json['email'], 'password': hashpass})
            return '200'
        return '403'
    return '401'


@user.route('/logout', methods=['GET'])
def logout():
    session.pop('name')
    return '200'