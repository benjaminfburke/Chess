from flask import Flask, request, abort
from sqlalchemy.sql.functions import user
from startApp import app
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restx import Resource, Api, fields
import uuid
from database.session import db
from metadata.User import User, User_Profile, Pairing
import hashlib
import jwt

CORS(app)

api = Api(app)

login_fields = api.model(
    "login", {"username": fields.String, "password": fields.String}
)

register_fields = api.model(
    "register",
    {
        "username": fields.String,
        "name": fields.String,
        "user_id": fields.String,
        "email": fields.String,
    },
)

pairing_fields = api.model(
    "pairing", {"game_id": fields.String, "user1_id": fields.String, "user2_id": fields.String}
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
        return {"user_id": str(user_id)}

@api.route("/pairing")
class PairingGame(Resource):
    @api.expect(pairing_fields)
    def post(self):
        json = request.get_json()

        user1_id = json.get("user1_id")
        user2_id = json.get("user2_id")
        game_id = json.get("game_id")

        newPairing = Pairing(game_id=game_id, user1_id=user1_id, user2_id=user2_id)
        db.session.add(newPairing)
        db.session.commit()

        return {"game_id": str(game_id)}


    @api.doc(params={"user1_id": "user1_id"})
    def get(self):
        user1_id = request.args.get("user1_id")

        result = db.session.query(Pairing).filter(Pairing.user1_id == user1_id).all()
        pair = []
        for r in result:
            temp = {
                "game_id": r.game_id,
                "user1_id": r.user1_id,
                "user2_id": r.user2_id,
            }
            pair.append(temp)
        
        result2 = db.session.query(Pairing).filter(Pairing.user1_id == user1_id).all()
        for r in result2:
            temp = {
                "game_id": r.game_id,
                "user1_id": r.user1_id,
                "user2_id": r.user2_id,
            }
            pair.append(temp)
        return pair


@api.route("/login")
class Login(Resource):
    @api.expect(login_fields)
    def post(self):
        json = request.get_json()

        username = json.get("username")
        password = json.get("password")
        object = hashlib.sha1(bytes(password, "utf-8"))
        hashedPassword = object.hexdigest()
        result = db.session.query(User).filter(User.username == username).filter(User.password == hashedPassword).first()
        if result and result.user_id:
            return {"user_id": str(result.user_id)}
        else:
            return abort(422, "incorrect login")

@api.route("/profile")
class Register(Resource):
    @api.doc(params=({"user_id": "users_id"}))
    def get(self):
        user_id = request.args.get("user_id")

        result = db.session.query(User_Profile).filter(User_Profile.user_id == user_id).first()
        temp = {
            "username": result.username,
            "name": result.name,
            "user_id": result.user_id,
            "email": result.email,
            "wins": int(result.wins),
            "losses": int(result.losses),
            "score": int(result.score),
        }
        token = jwt.encode(payload=temp, key="123456")
        return {"token": token}

    @api.expect(register_fields)
    def post(self):
        json = request.get_json()

        username = json.get("username")
        name = json.get("name")
        user_id = json.get("user_id")
        email = json.get("email")
        wins = 0
        losses = 0
        score = 1200

        newProfile = User_Profile(
            username=username,
            name=name,
            user_id=user_id,
            email=email,
            wins=wins,
            losses=losses,
            score=score,
        )
        db.session.add(newProfile)
        db.session.commit()
        temp = {
            "username": username,
            "name": name,
            "user_id": user_id,
            "email": email,
            "wins": wins,
            "losses": losses,
            "score": score,
        }

        token = jwt.encode(payload=temp, key="123456")
        return {"token": token}


if __name__ == "__main__":
    app.run(debug=True, threaded=True)
