const { Client, GatewayIntentBits, Collection, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mysql = require('mysql');
const express = require('express')
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config.json');
const { channel } = require('node:diagnostics_channel');

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
	name: 'databaseCheck',
	databaseCheck: async function (msguserId) {
		return new Promise((resolve, reject) => {
			const sql = `SELECT * from users WHERE userid=${msguserId}`;
			db.query(sql, (err, result) => {
				if (err) reject(err);
				console.log(result);
				if (result[0] && result[0].userId == msguserId) {
					console.log(`databaseCheck results for ${msguserId} is true`);
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	},

	name: 'afk',
	addAfk: async function (userId, username, bool) {
		return new Promise((resolve, reject) => {
			const sql = `INSERT INTO users (userId, username, isafk) VALUES ('${userId}', '${username}', ${bool})`;
			db.query(sql, (err, result) => {
				if (err) reject(err);
				console.log(result);
				resolve(result);
			});
		});
	},

	name: 'isafk',
	isAfk: async function (userId) {
		return new Promise((resolve, reject) => {
			const sql = `SELECT isafk FROM users WHERE userId = ${userId}`;
			db.query(sql, (err, result) => {
				if (err) reject(err);
				//   console.log(result[0].isafk);
				if (result[0] && result[0].isafk != 1) {
					resolve(false);
				} else {
					resolve(true);
				}
			});
		});
	},

	isafkUsers: async function(){
		return new Promise((resolve, reject) =>{
			const sql = `SELECT userId FROM users WHERE isafk='1'`
			db.query(sql, (err, result) => {
				if (err) reject(err);
				resolve(result);
			});
		})
	},

	updateAfk: async function (userId, bool) {
		return new Promise((resolve, reject) => {
			const sql = `UPDATE users SET isafk = ${bool} WHERE userId=${userId}`;
			db.query(sql, (err, result) => {
				if (err) reject(err);
				console.log(result);
				resolve(result);
			});
		});
	},
};


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
app.listen(3010);



const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	],
});

// client.commands = new Collection();
// const foldersPath = path.join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
// 	const commandsPath = path.join(foldersPath, folder);
// 	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// 	for (const file of commandFiles) {
// 		const filePath = path.join(commandsPath, file);
// 		const command = require(filePath);
// 		if ('data' in command && 'execute' in command) {
// 			client.commands.set(command.data.name, command);
// 		} else {
// 			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 		}
// 	}
// }

// client.commands = new Collection();
// const foldersPath = path.join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(foldersPath);
// for (const folder of commandFolders) {
// 	const commandsPath = path.join(foldersPath, folder);
// 	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// 	for (const file of commandFiles) {
// 		const filePath = path.join(commandsPath, file);
// 		const command = require(filePath);
// 		if ('data' in command && 'execute' in command) {
// 			client.commands.set(command.data.name, command);
// 		} else {
// 			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 		}
// 	}
// }

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}




client.login(config.token);
