# Dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
import numpy as np
import datetime as dt

# Database set-up
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

Base = automap_base()
Base.prepare(engine, reflect=True)

Measurement = Base.classes.measurement
Station = Base.classes.station

# Bind
session = Session(bind=engine)

# Flask setup
app = Flask(__name__)

# Flask Routes

# Home page route displays available routes
@app.route("/")
def home():
    return (
        f"Welcome!<br/><br/>Available routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/start/<start><br/>"
        f"/api/v1.0/start_end/<start>/<end><br/>"
    )

# Precipitation route returns jsonified prcp data for last year in database
# and returns json w the date as the key and the value as the prcp
@app.route("/api/v1.0/precipitation")
def precipitation():
    # Create session to the hawaii.sqlite database
    session = Session(engine)
    # Declare query variables
    query_date = dt.date(2017, 8, 23) - dt.timedelta(days=365)
    sel = [Measurement.date, Measurement.prcp]
    # Query precipitation data
    prcp_qry = session.query(*sel).filter(Measurement.station == Station.station).filter(Measurement.date > query_date).all()
    # Close session
    session.close()
    
    # Convert queried data to list of dictionaries
    prcp_return = []
    
    for date, prcp in prcp_qry:
        prcp_dict = {}
        prcp_dict["date"] = date
        prcp_dict["prcp"] = prcp
        prcp_return.append(prcp_dict)

    return jsonify(prcp_return)


# Stations route returns jsonified data of all of the stations in the db
@app.route("/api/v1.0/stations")
def stations():
    # Create session to the hawaii.sqlite database
    session = Session(engine)
    # Query unique stations
    station_list = session.query(Measurement.station).filter(Measurement.station == Station.station).group_by(Measurement.station).all()
    # Close session
    session.close()
    
    # Convert queried data to list
    station_return = list(np.ravel(station_list))
    
    return jsonify(station_return)


# Tobs route returns jsonified data for the most active station for the last year of data
@app.route("/api/v1.0/tobs")
def tobs():
    # Create session to the hawaii.sqlite database
    session = Session(engine)
    # Declare query variables
    query_date = dt.date(2017, 8, 23) - dt.timedelta(days=365)

    sel = [Measurement.prcp, 
       Measurement.station, 
       Measurement.tobs, 
       Measurement.date, 
       Measurement.id, 
       Station.elevation, 
       Station.longitude, 
       Station.name, 
       Station.latitude]
    # Query data for the most active station in the last year of data
    active_data_qry = session.query(*sel).filter(Measurement.station == Station.station).filter(Measurement.station == 'USC00519281').filter(Measurement.date > query_date).all()
    # Close session
    session.close()
    # Format query data as list of dictionaries
    act_return = []
    for prcp, station, tobs, date, id, elevation, longitude, name, latitude in active_data_qry:
        act_dict = {}
        act_dict["prcp"] = prcp
        act_dict["station"] = station
        act_dict["tobs"] = tobs
        act_dict["date"] = date
        act_dict["id"] = id
        act_dict["elevation"] = elevation
        act_dict["longitude"] = longitude
        act_dict["name"] = name
        act_dict["latitude"] = latitude
        act_return.append(act_dict)

    return jsonify(act_return)

# Start route 
"""Return a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range.
When given the start only, calculate TMIN, TAVG, and TMAX for all dates greater than and equal to the start date.
When given the start and the end date, calculate the TMIN, TAVG, and TMAX for dates between the start and end date inclusive."""

@app.route("/api/v1.0/start/<start>")
def user_date(start):
    # Create session to the hawaii.sqlite database
    session = Session(engine)
    # Query items
    sel = [Measurement.date,
       func.min(Measurement.tobs),
       func.max(Measurement.tobs),
       func.avg(Measurement.tobs)]

    # Query for min, max, and average info
    avg_info = session.query(*sel).filter(Measurement.station == Station.station).filter(Measurement.station == 'USC00519281').all()
    
    # Close session
    session.close()

    """Fetch the information whose date matches
       the path variable supplied by the user, or a 404 if not."""

    # Eliminate spaces from user input
    canonicalized = start.replace(" ", "")
    
    # Iterate through avg_info's rows to return dates matching and greater than user's input
    for row in avg_info:
    
        # Map variable to avg_info's date column (index 0)
        query_date = row[0].replace("'", "").replace(" ", "")
    
        # If the db date is the same or greater than the user input date, return row
        if query_date >= canonicalized:
            return jsonify(row)
    
    # Return error message if date not found
    return jsonify({"error": f"Date {start} not found."}), 404


# Start/end route
@app.route("/api/v1.0/start_end/<start>/<end>")
def user_date(start_end):
    # Create session to the hawaii.sqlite database
    session = Session(engine)
    # Query items
    sel = [Measurement.date,
       func.min(Measurement.tobs),
       func.max(Measurement.tobs),
       func.avg(Measurement.tobs)]

    # Query for min, max, and average info
    avg_info = session.query(*sel).filter(Measurement.station == Station.station).filter(Measurement.station == 'USC00519281').all()
    
    # Close session
    session.close()

    """Fetch the information whose date matches
       the path variable supplied by the user, or a 404 if not."""

    # Eliminate spaces from user input
    canonicalized = start_end.replace(" ", "")
    
    # Iterate through avg_info's rows to return dates matching and greater than user's input
    for row in avg_info:
    
        # Map variable to avg_info's date column (index 0)
        query_date = row[0].replace("'", "").replace(" ", "")
    
        # If the db date is the same or greater than the user input date, return row
        if query_date >= canonicalized:
            return jsonify(row)
    
    # Return error message if date not found
    return jsonify({"error": f"Dates {start_end} not found."}), 404

# Close out code
if __name__ == "__main__":
    app.run(debug=True)