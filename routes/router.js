const router = require('express').Router();
const {addUser} = require('../databaseAccessLayer');
const {deleteRecipe} = require('../databaseAccessLayer');
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');
//const dbModel = include('staticData');

router.get('/', (req, res) => {
	console.log("page hit");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			
			dbModel.getAllRecipes((err, result) => {
				if (err) {
					res.render('error', {message: 'Error reading from MySQL'});
					console.log("Error reading from mysql");
					console.log(err);
				}
				else { //successful
					res.render('index', {allRecipes: result});

					//show in heroku log
					console.log(result);
				}
			});
			dbConnection.release();
		}
	});

});


router.get('/showIngredients', (req, res) => {
	console.log("page hit");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			
			dbModel.getAllIngredient((err, result) => {
				if (err) {
					res.render('error', {message: 'Error reading from MySQL'});
					console.log("Error reading from mysql");
					console.log(err);
				}
				else { //successful
					res.render('index', {allIngredient: result});

					//show in heroku log
					console.log(result);
				}
			});
			dbConnection.release();
		}
	});

});

router.post('/addRecipe', (req, res) => {
	console.log("form submit");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {
				message: 'Error connecting to MySQL'
			});
			console.log("Error connecting to mysql");
			console.log(err);
		}else {
			console.log(req.body);
			addUser(req.body, (err, result) => {
				if (err) {
					res.render('error', {
						message: 'Error writing to MySQL'
					});
					console.log("Error writing to mysql");
					console.log(err);
				}else { 
					//successful
					res.redirect("/");
					//show in heroku log
					console.log(result);
				}
			});
			dbConnection.release(); 
		}
	});
});

router.get('/deleteRecipe', (req, res) => {
	console.log("delete Recipe");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {
				message: 'Error connecting to MySQL'});
				console.log("Error connecting to mysql");
				console.log(err);
			}else {
				console.log(req.query);
				let recipeId = req.query.id;
				if (recipeId) {
					deleteRecipe(recipeId, (err, result) => {
						if (err) {res.render('error', {message: 'Error writing to MySQL'
						});
						console.log("Error writing to mysql");
						console.log(err);}
						else { 
							//successful 
							res.redirect("/");
							//show in heroku log
							console.log(result);
						}
					});
				}else {
					res.render('error', {message: 'Error on Delete'});
				}
				dbConnection.release();
		}
	});
});

router.get('/deleteIngredient', (req, res) => {
	console.log("delete Ingredient");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {
				message: 'Error connecting to MySQL'});
				console.log("Error connecting to mysql");
				console.log(err);
			}else {
				console.log(req.query);
				let ingredientId = req.query.id;
				if (ingredientId) {
					deleteIngredient(ingredientId, (err, result) => {
						if (err) {res.render('error', {message: 'Error writing to MySQL'
						});
						console.log("Error writing to mysql");
						console.log(err);}
						else { 
							//successful
							res.redirect("/");
							// show in heroku log
							console.log(result);
						}
					});
				}else {
					res.render('error', {message: 'Error on Delete'});
				}
				dbConnection.release();
		}
	});
});


module.exports = router;
