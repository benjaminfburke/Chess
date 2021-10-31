from sqlalchemy import MetaData, Column, Text
from database.session import db


class User(db.Model):
    __tablename__ = "login"
    __table_args__ = {"schema": "auth"}

    username = Column(Text, nullable=False)
    password = Column(Text, nullable=False)
    user_id = Column(Text, nullable=False, primary_key=True)
