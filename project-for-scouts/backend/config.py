def dev_config(flask_app):
    config = flask_app.config
    config [
        'SECRET_KEY'
    ] = '\xd4\x8c\xc6\xdf\x91^\xfd\x92>,\xb6wU\x06\x81\x05\xb6)cs\xbf\t\xe1J'
    config['DEBUG'] = True
    config[
        'MONGO_URI'
    ] = 'mongodb://127.0.0.1:27017/testdb2'
    return config