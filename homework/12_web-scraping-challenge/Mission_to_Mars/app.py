from flask import Flask, render_template
import pymongo

# create instance of Flask app
app = Flask(__name__)

# Create connection variable
conn = "mongodb://localhost:27017"

# Pass connection to the pymongo instance
client = pymongo.MongoClient(conn)

# Connect to a database
db = client.mars_db

# Drops collection if available to remove duplicates
db.news.drop()

# Creates a collection in the database and inserts two documents
db.news.insert_many (
    [
        {
            'player': 'Jessica',
            'position': 'Point Guard'
        },
        {
            'player': 'John',
            'position': 'Center'
        }
    ]
)

# create route that renders index.html template
@app.route("/")
def echo():
    # Store the entire news collection in a list
    news = list(db.news.find())
    #text = "whatup"

    # Return the template with the news list passed in
    return render_template("index.html", news=news)

# create route that renders index.html template
@app.route("/scrape")
def scrape():
    return render_template("scrape.html", text="Scraped Data")

if __name__ == "__main__":
    app.run(debug=True)