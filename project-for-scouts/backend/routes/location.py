from flask import Flask, Blueprint, request, session, jsonify
from flask_cors import CORS, cross_origin
from ..db import mongo
from bson.objectid import ObjectId

location = Blueprint('location', __name__, url_prefix='/location')
CORS(location, supports_credentials=True)

@location.route('/add', methods=['POST'])
def def_location():
    locations = mongo.db.locations
    locations.insert_one({
        'name': request.json['name'],
        'coordinates':
        {
            'latitude': request.json['latitude'], 
            'longitude': request.json['longitude'],
        },
        'description': request.json['description'],
        'user': session['name'],
        'collection': request.json['collection']
        })
    return '200'

@location.route('/', methods=['GET'])
def def_get_location():
    mylocations = mongo.db.locations
    mylocs = []
    for locs in mylocations.find({}):
        info = {
        '_id': str(locs['_id']),
        'name': locs['name'],
        'coordinates': {
            'latitude': locs['coordinates']['latitude'],
            'longitude': locs['coordinates']['longitude'],
        },
        'description': locs['description'],
        'collection': locs['collection']
        }
        mylocs.append(info)
    mylocs = jsonify(mylocs)
    mylocs.headers.add('Access-Control-Allow-Origin', "*")
    mylocs.headers.add('Access-Control-Allow-Headers', "*")
    mylocs.headers.add('Access-Control-Allow-Methods', "*")
    return mylocs

@location.route('/delete', methods=['GET', 'POST', 'DELETE'])
def def_del_location():
    mylocations = mongo.db.locations
    delloc = mylocations.find_one({'_id': ObjectId(request.json['_id'])})
    if delloc is not None:
            mylocations.delete_one(delloc)
    return '200'
    
@location.route('/update', methods=['GET', 'POST', 'PUT'])
def def_put_location():
    mylocations = mongo.db.locations
    putloc = mylocations.find_one({'_id': ObjectId(request.json['_id'])})
    if putloc is not None:
        if request.json['name'] is not "":
            old_loc = {'name': putloc['name']}
            update_loc = {'$set': {'name': request.json['name']}}
            mylocations.update_one(old_loc, update_loc)
        if request.json['description'] is not "":
            old_des = {'description': putloc['description']}
            update_des = {'$set': {'description': request.json['description']}}
            mylocations.update_one(old_des, update_des)
        if request.json['collection'] is not "":
            old_col = {'collection': putloc['collection']}
            update_col = {'$set': {'collection': request.json['collection']}}
            mylocations.update_one(old_col, update_col)
    return '200'