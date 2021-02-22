from flask import Flask, Blueprint, request, session, jsonify
from flask_cors import CORS, cross_origin
from ..db import mongo

fileman = Blueprint('fileman', __name__, url_prefix='/fileman')
CORS(fileman, supports_credentials=True)

@fileman.route('/add', methods=['POST'])
def def_add_fileman():
    if 'profile_img' in request.files:
        images = mongo.db.images
        images.insert_one(request.files['img'])
    return '200'