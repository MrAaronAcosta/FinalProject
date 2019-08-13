from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from numpy import genfromtxt
from time import time
from datetime import datetime
from sqlalchemy import Column, Integer, Float, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pandas as pd
import json

app= Flask(__name__)


Base = declarative_base()
db1= pd.read_csv("Libro1.csv")
@app.route('/')
def home(): 
    return render_template ('index.html')


if __name__ == '__main__':
   app.run(debug=True)
