from flask import Flask, Blueprint, request, session, jsonify
from flask_cors import CORS, cross_origin
from ..db import mongo
from bson.objectid import ObjectId

req = Blueprint('req', __name__, url_prefix='/req')
CORS(req, supports_credentials=True)

@req.route('/add', methods=['POST'])
def add_req():
    reqs = mongo.db.requests
    reqs.insert_one({         
        'name': request.json['name'],
        'num': request.json['num']
    })
    return '200'