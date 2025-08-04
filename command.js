var commands = [];

function cmd(info, func) {
    var data = info;
    data.function = func;
    if (!data.dontAddCommandList) data.dontAddCommandList = false;
    if (!info.desc) info.desc = '';
    if (!data.fromMe) data.fromMe = false;
    if (!info.category) data.category = 'misc';
    if(!info.filename) data.filename = "Not Provided";
    commands.push(data);
    return data;
}

// Mfano wa commands

cmd({
    name: 'ping',
    desc: 'Jaribu bot',
    category: 'utility',
    fromMe: false
}, async (message, args, client, config) => {
    await message.reply('Pong! 🏓');
});

cmd({
    name: 'say',
    desc: 'Nitume ujumbe uliyoandika',
    category: 'fun',
    fromMe: false
}, async (message, args, client, config) => {
    const text = args.join(' ');
    if (!text) return await message.reply('Tafadhali andika ujumbe wa kutuma.');
    await message.reply(text);
});

cmd({
    name: 'help',
    desc: 'Orodha ya commands',
    category: 'utility',
    fromMe: false
}, async (message, args, client, config) => {
    let helpMsg = 'Commands zangu ni:\n\n';
    for (const cmd of commands) {
        if (!cmd.dontAddCommandList) {
            helpMsg += `${config.PREFIX}${cmd.name} - ${cmd.desc}\n`;
        }
    }
    await message.reply(helpMsg);
});

module.exports = {
    cmd,
    AddCommand: cmd,
    Function: cmd,
    Module: cmd,
    commands,
};
