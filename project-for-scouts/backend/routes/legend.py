from flask import Flask, Blueprint, request, session, jsonify
from flask_cors import CORS, cross_origin
from ..db import mongo
from bson.objectid import ObjectId

legend = Blueprint('legend', __name__, url_prefix='/legend')
CORS(legend, supports_credentials=True)

@legend.route('/add', methods=['POST'])
def def_legend():
    legends = mongo.db.legends
    legends.insert_one({
        'name': request.json['name'],
        'num': request.json['num']
    })
    return '200'
    
@legend.route('/', methods=['GET'])
def def_get_legend():
    mylegends = mongo.db.legends
    myleg = []
    for legs in mylegends.find({}):
        info = {
            '_id': str(legs['_id']),
            'name': legs['name'],
            'num': legs['num']
        }
        myleg.append(info)
    myleg = jsonify(myleg)
    myleg.headers.add('Access-Control-Allow-Origin', "*")
    myleg.headers.add('Access-Control-Allow-Headers', "*")
    myleg.headers.add('Access-Control-Allow-Methods', "*")

    return myleg

@legend.route('/delete', methods=['POST', 'DELETE'])
def def_delete_legend():
    mylegends = mongo.db.legends
    delleg = mylegends.find_one({'_id': ObjectId(request.json['_id'])})
    if delleg is not None:
        mylegends.delete_one(delleg)
    return '200'

@legend.route('/', methods=['PUT'])
def def_put_legend():
    mylegends = mongo.db.legends
    putleg = mylegends.find_one({'_id': ObjectId(request.json['_id'])})
    if putleg is not None:
        if request.json['name'] is not '':
            old_leg = {'name': putleg['name']}
            update_leg = {'$set': {'name': request.json['name']}}
            mylegends.update_one(old_leg, update_leg)
    return '200'