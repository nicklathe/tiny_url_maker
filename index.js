var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models/index.js");
var Hashids = require("hashids"),
	hashids = new Hashids ("salty salty sailor");

var app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", function(req, res){
	res.render("index");
});

app.post("/create", function(req, res){
	db.URL.create(req.body).done(function(err, newURL){
	 	// res.send(newURL);
		var idNum = newURL.id;
		var shortURL = hashids.encode(idNum);
		newURL.hash = shortURL;
		newURL.save().done(function(err, updateURL){
		// res.send(updateURL);
		res.render("create", {updateURL:updateURL});
		});
	});
});

app.get("/:tinyurl", function(req, res){
	db.URL.find({where: {hash: req.params.tinyurl}}).done(function(err, data){
			res.redirect("http://" + data.url);
			// res.send("Hey")
	});
})


app.listen(3000, function(){
	console.log("Ready to go on 3000");
});