module.exports = (client, message) => { // các tham số

    if (message.author.bot) return; // nếu chủ nhận của message là bot thì sẽ k nhận
    if (message.channel.type === 'dm') return; // nếu dạng kênh của tin nhắn là trong dms thì sẽ k nhận nốt
    const prefix = client.prefix; // lấy prefix từ index.js
    const args = message.content.slice(prefix.length).trim().split(/ +/g); // chia message.content ra, đầu tiên là tách prefix, sau đó chúng ta sẽ có một chuỗi k có prefix ở trong, split sẽ tách những cái này theo quy chuẩn là dấu cách, tức là mỗi dấu cách thì sẽ tách ra thành 1 phần tử trong array, array này đã loại đi tên command nhờ hàm trim
    const command = args.shift().toLowerCase(); // cái này dễ hiểu thôi, sau khi args được tách ra 1 array k có prefix thì để lấy tên command thì chúng ta sài shift() để lấy phần tử đầu tiên trong chuỗi | ví dụ: %cmd args1 args2 thì cmd sẽ là command, args1 và args2 sẽ được chua thành chuỗi
    if (!message.content.startsWith(prefix)) return; // xét message.content có bắt đầu bằng prefix k, nếu không thì sẽ bỏ
    const cmd = client.commands.get(command); // này là sẽ lấy trong collection ở index.js tìm collection bắt đầu bằng commnd
  console.log(cmd)
    if (!cmd) return; // nếu không có thì skip
    cmd.run(client, message, args); // run sẽ 1 hàm trong file commands sẽ chạy command đó này chắc hiểu sơ sơ thôi
};

// xong h đến command
