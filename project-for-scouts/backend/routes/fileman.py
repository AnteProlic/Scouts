from flask import Flask, Blueprint, request, session, jsonify, abort, send_file
from flask_cors import CORS, cross_origin
from ..db import mongo
from mimetypes import MimeTypes
from os import listdir, remove

fileman = Blueprint('/fileman', __name__, url_prefix='/fileman')
CORS(fileman, supports_credentials=True)


@fileman.route('/<filename>')
def get(filename):
    try:
        mtype = MimeTypes().guess_type(filename)[0]
        return send_file(f'./routes/static/{filename}', mimetype=mtype)
    except FileNotFoundError:
        return abort(400, 'Requested file does not exist.')


@fileman.route('/', methods=['POST'])
def post():
    try:
        file = request.files.get('legend_image')
    except KeyError:
        return abort(400, 'No file sent.')
    if file is None:
        return abort(400, 'The sent file is empty.')
    
    filename = file.filename

    if filename in listdir(f'./backend/routes/static'):
        return abort(400, 'File with given name already exists.')
    
    file.save(f'./backend/routes/static/{filename}')

    return '200'


@fileman.route('/<filename>', methods=['DELETE'])
def delete(filename):
    remove(f'./backend/routes/static/{filename}')
    return '200'

@fileman.route('/connect', methods=['POST'])
def connect():
    leg_imgs = mongo.db.images
    leg_imgs.insert_one({
        'img_name': request.json['img_name'],
        'leg_id': request.json['leg_id'],
        'img_url': request.json['img_url']
    })
    return '200'


@fileman.route('/connect', methods=['GET'])
def get_connect():
    leg_imgs = mongo.db.images
    myimg = []
    for imgs in leg_imgs.find({}):
        info = {
            'img_name': imgs['img_name'],
            'leg_id': imgs['leg_id'],
            'img_url': imgs['img_url']
        }
        myimg.append(info)
    myimg = jsonify(myimg)
    myimg.headers.add('Access-Control-Allow-Origin', "*")
    myimg.headers.add('Access-Control-Allow-Headers', "*")
    myimg.headers.add('Access-Control-Allow-Methods', "*")
    return myimg