const database = include('/databaseConnection');


function getAllRecipe(callback) {
	let sqlQuery = "SELECT recipe_id, name, description, cook_time FROM recipe";
	database.query(sqlQuery, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}		
	});
}

function addRecipe(postData, callback) {
	let sqladdRecipe = `INSERT INTO recipe (name, description, cook_time) VALUES (:name, :description, :cook_time, sha2(UUID(),512));`;
	let params = {    
		name: postData.name,
		description: postData.description,
		cook_time: postData.cook_time
	};
	console.log(sqladdRecipe);
	database.query(sqladdRecipe, params, (err, results, fields) => {
		if (err) {console.log(err);
			callback(err, null);
		}else {
			console.log(results);
			callback(null, results);
		}
	});
}

function deleteRecipe(userRecipeId, callback) {
	let sqlDeleteRecipe = "DELETE FROM recipe WHERE recipe_id = :recipeID";
	let params = {recipeID: userRecipeId};
	console.log(sqlDeleteRecipe);
	database.query(sqlDeleteRecipe, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}else {
			console.log(results);
			callback(null, results);
		}        
	});    
}

module.exports = {getAllRecipe, addRecipe, deleteRecipe}
