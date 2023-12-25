const config = require('./config.json');
const mysql = require('mysql');
const express = require('express');


const db = mysql.createConnection({
	host: config.host,
	user: config.user,
	database: config.database
})

db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("My SQL DataBase Has Been connected sucessfully")
})
module.exports = {
	name: 'afk',
	async addAfk(userId, username, bool) {
		sql = `INSERT INTO users (userId, username, isafk) VALUES ('${userId}', '${username}', ${bool})`
		db.query(sql, (err, result) =>{
			if(err)throw err;
			console.log(result);
		})
	},
	name: 'isafk',
	async isAfk(userId){
		sql = `SELECT isafk FROM 'users' WHERE userId =${userId};`
		db.query(sql, (err, result) =>{
			if(err)throw err;
			if(result[0].isafk != 1) return false;
			return true;
		})
	},

	async updateAfk(bool){
		sql = `UPDATE users SET isafk = ${bool} WHERE userId=${userId}`
		db.query(sql, (err, result) =>{
			if(err) throw err;
			console.log(result);
		})
	}
}

function createDb(name) {
	sql = `CREATE DATABASE ${name}`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result)
	})
}

function createUsersTable() {
	sql = `CREATE TABLE users(id int AUTO_INCREMENT, userId VARCHAR(255) NOT NULL, username VARCHAR(255), isafk BOOLEAN, PRIMARY KEY(id))`
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result)
	})
}

const app = express();
app.get("/", (req, res) => {
	res.status(200).send({
		success: "true"
	});
});
app.listen(3333);