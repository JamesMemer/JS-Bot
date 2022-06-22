const express = require('express');
const app = express();
const Database = require('@replit/database');
const path = require("path")
const fs = require("fs")
const db = new Database();
let prefix = '%';
let currency = '<:Ecoin:987687487294038086>';
let diamond = '💎'

app.listen(3000, () => {
	console.log('🔘 Đang chuẩn bị...');
});
app.get('/', (req, res) => {
	res.send('HELLO WORLD!');
});

const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
client.commands = new Discord.Collection()
client.prefix = prefix 
client.diamond = diamond
client.currency = currency
const eventFiles = fs
    .readdirSync(path.join(__dirname, '/events')) // này sẽ tìm folder event trong workspace
    .filter((file) => file.endsWith('.js')); // từ folder đó tìm file kết thúc bằng .js
for (const file of eventFiles) { // chạy từng file 1
    const event = require(`./events/${file}`); // này là lấy toàn bộ thứ đã được đưa ra trong file
    const eventName = file.split('.')[0]; // split để tách 1 string từ 1 kí tự, output sẽ là dạng array
    client.on(eventName, event.bind(null, client)); // này là chạy event thôi
}
const commandFiles = fs
    .readdirSync(path.join(__dirname, 'commands'))
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command); // tựa tựa trên
}


client.login(process.env.token)
