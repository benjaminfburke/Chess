from flask import Flask, request, abort
from sqlalchemy.sql.functions import user
from startApp import app
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restx import Resource, Api, fields
import uuid
from database.session import db
from metadata.User import User, User_Profile,History, Pairing, Game
import hashlib
import jwt

CORS(app)

api = Api(app)

login_fields = api.model(
    "login", {"username": fields.String, "password": fields.String}
)

history_fields = api.model(
    "history", {"game_id":fields.String,"user_id": fields.String, "opponent": fields.String,"outcome":fields.String,"number_of_moves":fields.Integer}
)
game_fields = api.model(
    "game", {"gameboard": fields.String, "point_value": fields.Integer, "white": fields.String, "black": fields.String}
)

update_game = api.model(
    "game", {"game_id": fields.String, "gameboard": fields.String, "point_value": fields.Integer, "white": fields.String, "black": fields.String}
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
@api.route("/history")
class history(Resource):
    @api.expect(history_fields)
    def post(self):
        json = request.get_json()
        game_id =json.get("game_id")
        user_id =json.get("user_id")
        outcome =json.get("outcome")
        opponent=json.get("opponent")

        number_of_moves=json.get("number_of_moves")
        
        newHistory = History(game_id =game_id, user_id =user_id, opponent =opponent,outcome =outcome, number_of_moves=number_of_moves)
        db.session.add(newHistory)
        db.session.commit()
        return{"game_id":str(game_id)}
    @api.doc(params=({"game_id": "game_id"}))
    def get(self):
        user_id = request.args.get("game_id")

        result = db.session.query(History).filter(History.user_id == user_id).first()
        temp = {
            "game_id": result.game_id,
            "user_id": result.user_id,
            "opponent": result.opponent,
            "outcome":result.outcome,
            "number_of_moves": int(result.number_of_moves),
            
        }
        return temp

pairing_fields = api.model(
    "pairing", {"game_id": fields.String, "user1_id": fields.String, "user2_id": fields.String}
)
@api.route("/game")
class Gameboard(Resource):
    @api.expect(game_fields)
    def post(self):
        json = request.get_json()

        gameboard = json.get("gameboard")
        point_value = json.get("point_value")
        white = json.get("white")
        black = json.get("black")

        game_id = uuid.uuid4()
        
        newGame = Game(game_id=game_id, gameboard=gameboard, point_value=point_value, white=white, black=black)
        db.session.add(newGame)
        db.session.commit()
        return {"game_id": str(game_id)}
    @api.doc(params=({"game_id": "game_id"}))
    def get(self):
        game_id = request.args.get("game_id")

        result = db.session.query(Game).filter(Game.game_id == game_id).first()
        temp = {
            "gameboard": result.gameboard,
            "point_value": int(result.point_value),
            "white": result.white,
            "black": result.black
        }
        return temp
    @api.expect(update_game)
    def put(self):
        json = request.get_json()

        gameboard = json.get("gameboard")
        point_value = json.get("point_value")
        white = json.get("white")
        black = json.get("black")
        game_id = json.get("game_id")
        
        db.session.query(Game).filter(Game.game_id == game_id).update(
            game_id=game_id, gameboard=gameboard, point_value=point_value, white=white, black=black
        )
        db.session.commit()
        
        return {"game_id": str(game_id)}
        


@api.route("/signin")
class Signup(Resource):
    @api.expect(login_fields)
    def post(self):
        json = request.get_json()

        username = json.get("username")
        user = db.session.query(User).filter(User.username == username).count()
        if (user):
            return abort(403, "Username exists")
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
    
@api.route("/user_id")
class GetUserID(Resource):
    @api.doc(params={'username':"username"})
    def get(self):
        username = request.args.get("username")
        user_id = db.session.query(User_Profile).filter(User_Profile.username == username).first()
        if user_id is None:
            return abort(403, "User doesn't exist")
        return {"opponent_id": str(user_id.user_id)}


if __name__ == "__main__":
    app.run(debug=True, threaded=True)
