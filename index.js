const express = require('express');
const app = express();
const Database = require('@replit/database');
const db = new Database();
let prefix = '%'
let currency = '<:Ecoin:987687487294038086>'

app.listen(3000, () => {
	console.log('Bot đang chạy!');
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
//PING COMMAND
client.on('message', async message => {
	if (message.content === `${prefix}ping`) {
		message.channel.send(`🏓 Pong!\nWs : \**${client.ws.ping}ms**`);
	}
	//BALANCE COMMAND
	if (
		message.content.toLowerCase().startsWith(`${prefix}bal`) ||
		message.content.toLowerCase().startsWith(`${prefix}balance`)
	) {
		let balance = await db.get(`wallet_${message.author.id}`);
		let bank = await db.get(`bank_${message.author.id}`);

		if (balance === null) balance = 0;
		if (bank === null) bank = 0;
		message.channel.send(`👝 Ví: **${balance}${currency}**\n 🏦 Ngân hàng: **${bank}${currency}**`);
	}
	//HELP COMMAND
	if (
		message.content.toLowerCase().startsWith(`${prefix}help`) ||
		message.content.toLowerCase().startsWith(`${prefix}h`)
  ) {
		let embed = new Discord.MessageEmbed()
			.setAuthor(`📬 ${message.author.username}`)
      .setTitle("Vô server để được hỗ trợ thêm!")
      .setURL("https://discord.gg/VWf66Spjpn")
			.setDescription(
				`**5 commands available**\n**🏦 Economy Commands**\n**%bal , %daily , %work , %beg , %weekly**\n**⚙️ Utility Commands**\n**%ping**`
			)
			.setFooter('Prefix: %')
			.setColor('YELLOW');
		message.channel.send({ embeds: [embed] });
    await message.channel.send("`UPDATE VERSION 1.0.5\n# WORK/BEG COMMANDS\n# ĐÃ SỬA LỖI TIMEOUT\n# ĐÃ SỬA HÌNH TIỀN TỆ!`")
	}
	//DAILY COMMAND
	if (message.content.toLowerCase().startsWith(`${prefix}daily`)) {
		const check = await db.get(`dailyCheck_${message.author.id}`);
		const timeout = 86400000;
		if (check !== null && timeout - (Date.now() - check) > 0) {
			const ms = require('parse-ms');
			const time = await ms(timeout - (Date.now() - check));

			message.channel.send(
				`Bạn đã nhận quà hàng ngày của bạn rồi! Quay lại sau **${time.hours}h ${time.minutes}p ${time.seconds}s** để nhận tiếp tham lam vcl!`
			);
		} else {
			let reward = (Math.floor(Math.random() * 2000) + 1) * 2;
			let currentBalance = await db.get(`wallet_${message.author.id}`);
			message.channel.send(`Bạn đã nhận ${reward.toLocaleString()}${currency} như quà hàng ngày của bạn!`);
			await db.set(`wallet_${message.author.id}`, currentBalance + reward);
			await db.set(`dailyCheck_${message.author.id}`, Date.now());
		}
	}
	//WORK COMMAND
	if (message.content.toLowerCase().startsWith(`${prefix}work`)) {
		const work = await db.get(`workCheck_${message.author.id}`);
		const timeout = 3600000;
		if (work !== null && timeout - (Date.now() - work) > 0) {
			const ms = require('parse-ms');
			const time = ms(timeout - (Date.now() - work));
			message.channel.send(
				`Bạn đã mệt sau khi làm việc rồi! Quay lại sau **${time.hours}h ${time.minutes}p ${time.seconds}s** để làm tiếp!`
			);
		} else {
			let reward = (Math.floor(Math.random() * 1000) + 1) * 2;
			let currentBalance = await db.get(`wallet_${message.author.id}`);
			message.channel.send(
				`Bạn đi làm việc và kiếm được ${reward.toLocaleString()}${currency}!`
			);
			await db.set(`wallet_${message.author.id}`, currentBalance + reward);
			await db.set(`workCheck_${message.author.id}`, Date.now());
		}
	}
//BEG COMMAND
	if (message.content.toLowerCase().startsWith(`${prefix}beg`)) {
		const beg = await db.get(`begCheck_${message.author.id}`);
		const timeout = 60000;
		if (beg !== null && timeout - (Date.now() - beg) > 0) {
			const ms = require('parse-ms');
			const time = ms(timeout - (Date.now() -beg));
			message.channel.send(
				`Ăn xin quài đợi **${time.hours}g:${time.minutes}p:${time.seconds}s** để ăn xin tiếp🐸`
			);
		} else {
			let reward = (Math.floor(Math.random() * 399) + 1) * 2;
			let currentBalance = await db.get(`wallet_${message.author.id}`);
			message.channel.send(
				`Bạn đi ăn xin và kiếm đc ${reward.toLocaleString()}${currency}!`
			);
			await db.set(`wallet_${message.author.id}`, currentBalance + reward);
			await db.set(`begCheck_${message.author.id}`, Date.now());
		}
	}
//WEEKLY COMMAND
  	if (message.content.toLowerCase().startsWith(`${prefix}weekly`)) {
		const weekly = await db.get(`weeklyCheck_${message.author.id}`);
		const timeout = 604800000;
		if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
			const ms = require('parse-ms');
			const time = await ms(timeout - (Date.now() - weekly));

			message.channel.send(
				`Bạn đã nhận quà hàng tuần của bạn rồi! Quay lại sau **${time.days}d ${time.hours}h ${time.minutes}p ${time.seconds}s** để nhận tiếp tham lam vcl!`
			);
		} else {
			let reward = (Math.floor(Math.random() * 5000) + 1) * 2;
			let currentBalance = await db.get(`wallet_${message.author.id}`);
			message.channel.send(
				`Bạn đã nhận ${reward.toLocaleString()}${currency} như quà hàng tuần của bạn!`
			);
			await db.set(`wallet_${message.author.id}`, currentBalance + reward);
			await db.set(`weeklyCheck_${message.author.id}`, Date.now());
		}
	}
})
client.login(process.env.token);
