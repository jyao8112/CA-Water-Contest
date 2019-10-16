import os

import pandas as pd
import numpy as np
import sqlite3
import pandas 
import json
import requests

from shapely.geometry import shape, Point

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, MetaData

from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import pandas as pd
import sqlalchemy

from sqlalchemy.orm import Session
from sqlalchemy import func


app = Flask(__name__)
engine = create_engine("sqlite:///db/final.sqlite", echo=False)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/final.sqlite"
db = SQLAlchemy(app)

with open('water_system_clean_2.json') as f:
    js = json.load(f)

metadata = MetaData()
metadata.reflect(db.engine, only=['iron_avg', 'sample_all'])

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# define new table and create
class UserInput(db.Model):
    __tablename__ = 'UserInput'

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String)
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)
    lead = db.Column(db.Float)
    iron = db.Column(db.Float)
    copper = db.Column(db.Float)
    waterTest = db.Column(db.Integer)

    def __repr__(self):
        return '<UseInput %r>' % (self.name)

if not db.engine.dialect.has_table(db.engine, 'UserInput'):
    db.create_all()

# print classes to verify tables
print(Base.classes.keys())

# Save references to each table
for mappedclass in Base.classes:
    print mappedclass
Final = Base.classes.final
Sample = Base.classes.sample_all
System = Base.classes.system_all
Score = Base.classes.score_final
Iron = Base.classes.iron_avg
Lead = Base.classes.lead_avg
Chromium = Base.classes.chromium_avg
Mercury = Base.classes.mercury_avg
Nitrate = Base.classes.nitrate_avg
Copper = Base.classes.copper_avg
userInput = Base.classes.UserInput

for key in Base.classes.keys():
    print "Key" + key

# Read data into df
stmt = db.session.query(Sample).statement
sample_df = pd.read_sql_query(stmt, db.session.bind)
stmt = db.session.query(Iron).statement
iron_df = pd.read_sql_query(stmt, db.session.bind)
stmt = db.session.query(Lead).statement
lead_df = pd.read_sql_query(stmt, db.session.bind)
stmt = db.session.query(Copper).statement
chromium_df = pd.read_sql_query(stmt, db.session.bind)
stmt = db.session.query(Chromium).statement
mercury_df = pd.read_sql_query(stmt, db.session.bind)
stmt = db.session.query(Mercury).statement
copper_df = pd.read_sql_query(stmt, db.session.bind)
stmt = db.session.query(Score).statement
score_df = pd.read_sql_query(stmt, db.session.bind)
stmt = db.session.query(Nitrate).statement
nitrate_df = pd.read_sql_query(stmt, db.session.bind)
stmt = db.session.query(userInput).statement
userInput_df = pd.read_sql_query(stmt, db.session.bind)



@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/watersystem")
def systems():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Sample).statement
    df = pd.read_sql_query(stmt, db.session.bind)


    # Return a list of the column names (sample names)
    return jsonify(list(df.columns[3:]))

@app.route("/bysystem/<Water_System_Number>")
def system_all(Water_System_Number):
    return jsonify(get_systems(Water_System_Number))

def get_systems(Water_System_Number):
    sel = [
        System.Water_System_Number,
        System.Water_System_Name,
        System.County,
        System.City,
        System.Zip]
        # System.Serverd_Populatiion,
        # System.Service_Connections,
        # System.Chemical_Detected_2013_2019,
        # System.Chemical_Detected_Above_MCL_2013_2019,
        # System.Lead_Sample_Count_2018,
        # System.Arsenic_Sample_Count_2018,
        # System.Iron_Sample_Count_2018]

    results_system = db.session.query(*sel).filter(System.Water_System_Number == Water_System_Number).all()
    system_all = {} 
    for result in results_system:
        system_all["water_system_number"] = result[0]
        system_all["water_system_name"] = result[1]
        system_all["county"] = result[2]
        system_all["city"] = result[3]
        system_all["zip_code"] = result[4]
        # system_all["Served_Population"] = result[5]
        # system_all["Service_Connection"] = result[6]
        # system_all["Total_Numeber_of_Chemical_Detected_1319)"] = result[7]
        # system_all["Total_Numeber_of_Chemical_Detected_above_MCL_1319"] = result[8]
        # system_all["Total_Number_of_Finding_of_Lead_above_MCL_1819"] = result[9]
        # system_all["Total_Number_of_Finding_of_Arsenic_above_MCL_1819"] = result[10]
        # system_all["Total_Number_of_Finding_of_Iron_above_MCL_1819"] = result[11]

    print "system_all: ", system_all
    return system_all    

@app.route("/displayscore/<Water_System_Number>")
def scores(Water_System_Number): 
    return jsonify(get_scores(Water_System_Number))

def get_scores(Water_System_Number):

    stmt = db.session.query(Score).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    sel = [
        Score.Water_System_Number,
        Score.Score,
        Score.Improve_over_6_years,
        Score.Years_In_Services,
        Score.Serverd_Populatiion]
    
    results_scores = db.session.query(*sel).filter(Score.Water_System_Number == Water_System_Number).all()
    
    scores = {}

    for result in results_scores:
        scores["water_system_number"] = result[0]
        scores["water_quality_score"] = result[1]
        scores["improve_rate"] = str(result[2])+"%"
        scores["years_in_service"] = result[3]
        scores["served_population"] = result[4]

    print "scores: ", scores
    return scores

@app.route("/samples/<Water_System_Number>")
def samples(Water_System_Number, user_lat, user_lon):
    """Return `index`, `analyte`,and `finding count`."""
    #TODO: handle pwsid doesn't exist in table.
    iron_data = iron_df.loc[:, ['year', Water_System_Number]]
    lead_data = lead_df.loc[:, ['year', Water_System_Number]]
    copper_data = copper_df.loc[:, ['year', Water_System_Number]]
    chromium_data = chromium_df.loc[:, ['year', Water_System_Number]]
    mercury_data = mercury_df.loc[:, ['year', Water_System_Number]]
    nitrate_data = nitrate_df.loc[:, ['year', Water_System_Number]]

    data = {
        "year": iron_data.year.values.tolist(),
        "iron_avg": iron_data[Water_System_Number].values.tolist(),
        "lead_avg": lead_data[Water_System_Number].values.tolist(),
        "copper_avg": copper_data[Water_System_Number].values.tolist(),
        "chromium_avg": chromium_data[Water_System_Number].values.tolist(),
        "mercury_avg": mercury_data[Water_System_Number].values.tolist(),
        "nitrate_avg": nitrate_data[Water_System_Number].values.tolist(),
        "user_lat": user_lat,
        "user_lon": user_lon
    }
    print "samples data: ", data

    scores_data = get_scores(Water_System_Number)
    data.update(scores_data)
    print "samples and scores data: ", data

    system_data = get_systems(Water_System_Number)
    data.update(system_data)
    print "samples, scores, and systems data: ", data

    return jsonify(data)

@app.route("/sendAddress", methods=["GET", "POST"])
def senduserlatlon():
    if request.method == "POST":
       data = request.get_json()
    #data={"address":"4516 Macbeth Ave,Fremont, CA 94555"}
    # find lon and lat from address, find water system id from user input
    address = data["address"]
    print "Input address:", str(address)
    user_lon, user_lat = get_lat_lon_from_address(address)
    userloc = {"lat":user_lat,"lon":user_lon}
    print "Lat: ", user_lat, " Lon: ", user_lon
    pwsid = find_water_system(user_lon, user_lat)
    print "pwsid: ", pwsid
    # we remove the leading zeros in the pwsid since our db does that.
    pwsid = pwsid.lstrip("0")
    print "pwsid after removing leading zeros: ", pwsid
    return samples(pwsid,user_lat, user_lon)

def get_lat_lon_from_address(address):
    api_key = "AIzaSyDKfjuAziA90Ehb0byOqduT2Wf-bLdpoeY"
    api_response = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address={0}&key={1}'.format(address, api_key))
    api_response_dict = api_response.json()
    latitude = api_response_dict['results'][0]['geometry']['location']['lat']
    longitude = api_response_dict['results'][0]['geometry']['location']['lng']
    return longitude, latitude


def get_date(dt):
    month = datetime.strptime(dt,'%m/%d/%Y').month
    year = datetime.strptime(dt,'%m/%d/%Y').year
    day = datetime.strptime(dt,'%m/%d/%Y').day
    weekday = datetime.strptime(dt,'%m/%d/%Y').weekday()
    return (year, month, day, weekday)


def find_water_system(lon, lat):
    point = Point(lon, lat)
    num_poly = 0
    for poly in js['polygons']:
        polygon = shape(poly['latlng'])
        num_poly += 1
        if polygon.contains(point):
            print "Num of polys checked: " + str(num_poly)
            print poly['pwsid']
            return poly['pwsid']
    print "Num of polys checked: " + str(num_poly)
    print "Not found"
    return

@app.route("/testInput",methods=["GET", "POST"])
def WaterTestInput():
    if request.method == "POST":
        data = request.get_json()
    #data={'address':"4516 Macbeth ave,Fremont", 'waterTest':0,'lead':0,'iron':0,'copper':0,}
    #commit frontend data to new table
    address = data["address"]
    user_lon, user_lat = get_lat_lon_from_address(address)
    user_test = UserInput(address = address,waterTest = data['waterTest'],
             lead = data['lead'],iron = data['iron'],copper = data['copper'],lat=user_lat,lon=user_lon)
    db.session.add(user_test)
    db.session.commit()
    sel = [userInput.waterTest,userInput.lat,userInput.lon]
    results_map = db.session.query(*sel).all()
    map_all = {} 
    print ('**********result map', results_map)
    finalData = list(set(results_map))
    
    for result in finalData:
        if result[0] == 'bad':
            finalData.remove(result)
    print("*********++++++++map result: ", finalData)
    return jsonify(finalData,user_lat, user_lon)


if __name__ == "__main__":
    app.run(port=8300)