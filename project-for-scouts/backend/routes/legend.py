from flask import Flask, Blueprint, request, session, jsonify
from flask_cors import CORS, cross_origin
from ..db import mongo

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
    
@legend.route('/get', methods=['POST'])
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