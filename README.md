# CS348-Chess
Host
ec2-54-145-110-118.compute-1.amazonaws.com
Database
d4cebf8as9l62i
User
piubkieyrzeyhk
Port
5432
Password
cf2867a274c0a495783c75c1c430885420d1df9d99655f7a8d5e15474bda8241
URI
postgres://piubkieyrzeyhk:cf2867a274c0a495783c75c1c430885420d1df9d99655f7a8d5e15474bda8241@ec2-54-145-110-118.compute-1.amazonaws.com:5432/d4cebf8as9l62i
Heroku CLI
heroku pg:psql postgresql-clean-60909 --app cs348-chess-app

# Backend setup
1. Create Virtual Environment https://docs.python.org/3/tutorial/venv.html

2. Run virtual environment - this is where you will install all your libraries
3. Navigate to backend folder
4. Run `pip install -r requirements.txt`
5. Run app.py `python3.9 app.py`
  - Make sure you have python 3.9 installed
6. You can see all endpoints by going to 127.0.0.1:5000 in your browser
