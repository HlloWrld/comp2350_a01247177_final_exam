const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || true;

//mysql://ba42c778fd0ab8:b9712c24@us-cdbr-east-03.cleardb.com/heroku_b2cffa48c771a53?reconnect=true

const dbConfigHeroku = {
	host: "us-cdbr-east-03.cleardb.com",
	user: "ba42c778fd0ab8",
	password: "b9712c24",
	database: "heroku_b2cffa48c771a53",
	multipleStatements: false,
	namedPlaceHolders: true
};

const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "Password",
	database: "final_lab",
	multipleStatements: false,
	namedPlaceholders: true
};

if (is_heroku) {
	var database = mysql.createPool(dbConfigHeroku);
}
else {
	var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
		