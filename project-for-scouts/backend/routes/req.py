from flask import Flask, Blueprint, request, session, jsonify
from flask_cors import CORS, cross_origin
from ..db import mongo
from bson.objectid import ObjectId

req = Blueprint('req', __name__, url_prefix='/req')
CORS(req, supports_credentials=True)

@req.route('/add/legend', methods=['POST'])
def def_add_req():
    reqs = mongo.db.requests
    reqs.insert_one({         
        'name': request.json['name'],
        'conf': 0,
        'typ': request.json['typ']
    })
    return '200'

@req.route('/add/location', methods=['POST'])
def def_add_req2():
    reqs = mongo.db.requests
    reqs.insert_one({         
        'name': request.json['name'],
        'coordinates':
        {
            'latitude': request.json['latitude'], 
            'longitude': request.json['longitude'],
        },
        'description': request.json['description'],
        'user': session['name'],
        'collection': request.json['collection'],
        'conf': 0,
        'typ': request.json['typ']
    })
    return '200'

@req.route('/', methods=['GET'])
def def_get_req():
    myrequests = mongo.db.requests
    myreqs = []
    for reqs in myrequests.find({}):
        if (reqs['typ'] == 'location'):
            info = {
                '_id': str(reqs['_id']),
                'name': reqs['name'],
                'coordinates': {
                    'latitude': reqs['coordinates']['latitude'],
                    'longitude': reqs['coordinates']['longitude'],
                },
                'description': reqs['description'],
                'collection': reqs['collection'],
                'typ': reqs['typ'],
                'conf': reqs['conf']
            }
            myreqs.append(info)
        if (reqs['typ'] == 'legend'):
            info = {
                '_id': str(reqs['_id']),
                'name': reqs['name'],
                'typ': reqs['typ'],
                'conf': reqs['conf']
            }
            myreqs.append(info)
    myreqs = jsonify(myreqs)
    myreqs.headers.add('Access-Control-Allow-Origin', "*")
    myreqs.headers.add('Access-Control-Allow-Headers', "*")
    myreqs.headers.add('Access-Control-Allow-Methods', "*")

    return myreqs

@req.route('/delete', methods=['GET', 'POST', 'DELETE'])
def def_del_location():
    myreqs = mongo.db.requests
    delreq = myreqs.find_one({'_id': ObjectId(request.json['_id'])})
    print(delreq)
    if delreq is not None:
            myreqs.delete_one(delreq)
    return '200'