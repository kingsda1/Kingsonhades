const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "",
    AUTO_STATUS_SEEN: convertToBool(process.env.AUTO_STATUS_SEEN || "true"),
    AUTO_STATUS_REPLY: convertToBool(process.env.AUTO_STATUS_REPLY || "false"),
    AUTO_STATUS_REACT: convertToBool(process.env.AUTO_STATUS_REACT || "false"),
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS KINGSONHADES*",
    WELCOME: convertToBool(process.env.WELCOME || "false"),
    ADMIN_EVENTS: convertToBool(process.env.ADMIN_EVENTS || "true"),
    PREFIX: process.env.PREFIX || "!",
    MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://ik.imagekit.io/mrshaban/Picsart_25-02-01_22-47-44-239.jpg",
    BOT_NAME: process.env.BOT_NAME || "KINGSONHADES",
    STICKER_NAME: process.env.STICKER_NAME || "KINGSONHADES",
    CUSTOM_REACT: convertToBool(process.env.CUSTOM_REACT || "false"),
    CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
    DELETE_LINKS: convertToBool(process.env.DELETE_LINKS || "false"),
    OWNER_NUMBER: process.env.OWNER_NUMBER || "255622104298",
    OWNER_NAME: process.env.OWNER_NAME || "Lusingu",
    DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ KINGSONHADES*",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://ik.imagekit.io/mrshaban/Picsart_25-02-01_22-47-44-239.jpg",
    LIVE_MSG: process.env.LIVE_MSG || "> Zinda Hun Yar *KINGSONHADES*⚡",
    READ_MESSAGE: convertToBool(process.env.READ_MESSAGE || "false"),
    AUTO_REACT: convertToBool(process.env.AUTO_REACT || "false"),
    ANTI_BAD: convertToBool(process.env.ANTI_BAD || "false"),
    MODE: process.env.MODE || "public",
    ANTI_LINK: convertToBool(process.env.ANTI_LINK || "false"),
    AUTO_VOICE: convertToBool(process.env.AUTO_VOICE || "false"),
    AUTO_STICKER: convertToBool(process.env.AUTO_STICKER || "false"),
    AUTO_REPLY: convertToBool(process.env.AUTO_REPLY || "false"),
    ALWAYS_ONLINE: convertToBool(process.env.ALWAYS_ONLINE || "true"),
    PUBLIC_MODE: convertToBool(process.env.PUBLIC_MODE || "true"),
    AUTO_TYPING: convertToBool(process.env.AUTO_TYPING || "true"),
    READ_CMD: convertToBool(process.env.READ_CMD || "true"),
    DEV: process.env.DEV || "255622104298",
    ANTI_VV: convertToBool(process.env.ANTI_VV || "true"),
    ANTI_CALL: convertToBool(process.env.ANTI_CALL || "false"),
    REJECT_MSG: process.env.REJECT_MSG || "*SOORY MY BOSS IS BUSY PLEASE DONT CALL ME*",
    ANTI_DELETE: convertToBool(process.env.ANTI_DELETE || "true"),
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox",
    AUTO_RECORDING: convertToBool(process.env.AUTO_RECORDING || "true")
};
