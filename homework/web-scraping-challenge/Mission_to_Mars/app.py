from Flask import flask, render_template

# create instance of Flask app
app = Flask(__name__)

# create route that renders index.html template
@app.route("/")
def echo():
    return render_template("index.html", #)

if __name__ == "__main__":
    app.run(debug=True)