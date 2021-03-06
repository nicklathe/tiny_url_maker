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
		// if(err) {
		// 	// console.log(err);
		// 	var errMsg = {msg: err.errors[0].message};
		// 	res.render("create", {errMsg: errMsg});
		// };
		var idNum = newURL.id;
		var shortURL = hashids.encode(idNum);
		newURL.hash = shortURL;
		newURL.save().done(function(err, updateURL){

			var myHost = req.headers.host;
			var urlsObj = {
				'updateURL':updateURL,
				'myHost':myHost
			};
		res.render("create", urlsObj);
		});
	});
});

app.get("/:tinyurl", function(req, res){
	db.URL.find({where: {hash: req.params.tinyurl}}).done(function(err, data){
		res.redirect(data.url);
	});
})



app.listen(process.env.PORT || 3000);

