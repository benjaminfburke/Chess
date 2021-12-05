from sqlalchemy import MetaData, Column, Text
from sqlalchemy.sql.sqltypes import Numeric
from database.session import db


class User(db.Model):
    __tablename__ = "login"
    __table_args__ = {"schema": "auth"}

    username = Column(Text, nullable=False)
    password = Column(Text, nullable=False)
    user_id = Column(Text, nullable=False, primary_key=True)


class User_Profile(db.Model):
    __tablename__ = "user_profile"
    __table_args__ = {"schema": "auth"}

    username = Column(Text, nullable=False)
    name = Column(Text, nullable=False)
    user_id = Column(Text, nullable=False, primary_key=True)
    email = Column(Text, nullable=False)
    wins = Column(Numeric, default=0)
    losses = Column(Numeric, default=0)
    score = Column(Numeric, default=1200)


class History(db.Model):
    __tablename__ = "history"
    __table_args__ = {"schema": "auth"}

    user_id = Column(Text, nullable=False)
    opponent = Column(Text, nullable=False)
    game_id = Column(Text, nullable=False, primary_key=True)

    outcome= Column(Text, nullable=False)
    number_of_moves = Column(Numeric, nullable=False)
    
