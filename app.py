# Shout out to Dom for a "Chocolate Cake Recipe"

# Import the functions we need from Flask
from flask import Flask
from flask import render_template 
from flask import jsonify

# Import the functions we need from SQL Alchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Import any remaining functions
import json

# Define the PostgreSQL connection parameters
username = 'postgres'  # Ideally this would come from config.py (or similar)
password = 'bootcamp'  # Ideally this would come from config.py (or similar)
database_name = 'AlcoholUnemployment_db'
port_number = '5433' # Check your own port number!
connection_string = f'postgresql://{username}:{password}@localhost:{port_number}/{database_name}'

# Connect to the SQL database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

table = base.classes.cleaned_combined_data

# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

# Index Route
@app.route("/")
def IndexRoute():

    webpage = render_template("index.html")
    return webpage

# DataSet Main Route
@app.route("/countries")
def CountriesRoute():

    session = Session(engine)
    results = session.query(
        table.country,
        table.beer_servings,
        table.spirit_servings,
        table.wine_servings,
        table.total_litres_of_pure_alcohol,
        table.unemployment_rate
    ).all()
    session.close()

    data = []
    for country,beer_servings,spirit_servings,wine_servings,total_litres_of_pure_alcohol,unemployment_rate in results:
        country_dict = {}
        country_dict["country"] = country
        country_dict["beer_servings"] = beer_servings
        country_dict["spirit_servings"] = spirit_servings
        country_dict["wine_servings"] = wine_servings
        country_dict["total_litres_of_pure_alcohol"] = total_litres_of_pure_alcohol
        country_dict["unemployment_rate"] = unemployment_rate
        # info["beer_servings"] = beer_servings
        # info["spirit_servings"] = spirit_servings
        # info["wine_servings"] = wine_servings
        # info["total_litres_of_pure_alcohol"] = total_litres_of_pure_alcohol
        # info["unemployment_rate"] = unemployment_rate
        # country_dict["info"].append(info)
        data.append(country_dict)
        

    return jsonify(data)

# DataSet Specific Route
@app.route("/countries/<filename>")
def CountrySpecificRoute(filename):

    session = Session(engine)
    results = session.query(
        table.country,
        table.beer_servings,
        table.spirit_servings,
        table.wine_servings,
        table.total_litres_of_pure_alcohol,
        table.unemployment_rate
    ).all()
    session.close()

    data = []
    for country,beer_servings,spirit_servings,wine_servings,total_litres_of_pure_alcohol,unemployment_rate in results:
        country_dict = {}
        country_dict["country"] = country
        country_dict["info"] = []
        info = {}
        info["beer_servings"] = beer_servings
        info["spirit_servings"] = spirit_servings
        info["wine_servings"] = wine_servings
        info["total_litres_of_pure_alcohol"] = total_litres_of_pure_alcohol
        info["unemployment_rate"] = unemployment_rate
        country_dict["info"].append(info)
        data.append(country_dict)

    search_term = filename.replace(" ", "").lower()
    for country in data:
        country_name = country["country"].replace(" ", "").lower()

        if search_term == country_name:
            return jsonify(country)

    return jsonify({"error": f"Data for : {search_term} not found."}), 404


# Map Route
@app.route("/map")
def MapRoute():

    webpage = render_template("map.html")
    return webpage

# Graph Route
@app.route("/graphs")
def GraphsRoute():

    webpage = render_template("graphs.html")
    return webpage

# Run app.py in debug
if __name__ == '__main__':
    app.run(debug=True)