from flask import Flask, request
from sqlalchemy.sql.functions import user
from startApp import app
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restx import Resource, Api, fields
import uuid
from database.session import db
from metadata.User import User
import hashlib

CORS(app)

api = Api(app)

login_fields = api.model(
    "login", {"username": fields.String, "password": fields.String}
)


@api.route("/signin")
class Signup(Resource):
    @api.expect(login_fields)
    def post(self):
        json = request.get_json()

        username = json.get("username")
        password = json.get("password")
        object = hashlib.sha1(bytes(password, "utf-8"))
        hashedPassword = object.hexdigest()
        user_id = uuid.uuid4()

        newUser = User(username=username, password=hashedPassword, user_id=user_id)
        db.session.add(newUser)
        db.session.commit()
        return "Success"


if __name__ == "__main__":
    app.run(debug=True, threaded=True)
