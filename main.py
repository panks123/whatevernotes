from flask import Flask,render_template,redirect

app=Flask(__name__)

@app.route('/',methods=["POST","GET"])
def hello():
    return render_template('index.html')


@app.route('/pankaj_github')
def pankaj_github():
    # This will redirect to Pankaj's github page
    return redirect("https://github.com/panks123", code=302)

@app.route('/pankaj_linkedin')
def pankaj_linkedin():
    # This will redirect to Pankaj's LinkedIn page
    return redirect("https://www.linkedin.com/in/pankaj-kumar-353358120/", code=301)

if __name__=='__main__':
    app.run(debug=True)