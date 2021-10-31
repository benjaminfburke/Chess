from flask_sqlalchemy import SQLAlchemy
from startApp import app

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://piubkieyrzeyhk:cf2867a274c0a495783c75c1c430885420d1df9d99655f7a8d5e15474bda8241@ec2-54-145-110-118.compute-1.amazonaws.com:5432/d4cebf8as9l62i"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
