const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const { commands } = require("./command"); // hakikisha command.js iko sawa
const config = require("./config");

console.log("🤖 KingsonHades WhatsApp Bot by Lusingu is starting...");

async function startBot() {
  try {
    // Inazipata data za uthibitisho (auth)
    const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

    // Tengeneza socket ya WhatsApp
    const sock = makeWASocket({
      logger: pino({ level: "silent" }), // We can change to "debug" for troubleshooting
      printQRInTerminal: true,           // Inaonyesha QR terminal kwa login mpya
      auth: state,
      browser: ["KingsonHades", "Safari", "3.0"],
    });

    // Handle updates za connection (kuunganisha, kupoteza connection, logout)
    sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === "close") {
        const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
        if (statusCode === DisconnectReason.loggedOut) {
          console.log("❌ Bot imetoka (logged out). Tafadhali re-scan QR code.");
          // Hii ni kwa sababu logout, basi husubiri user kufanya login upya
          process.exit(0); // Exit app ili mtu aendeshe tena
        } else {
          console.log(`❗ Connection closed, status code: ${statusCode}. Jaribu ku-reconnect...`);
          // Jaribu ku-restart bot baada ya sekunde 5 (kuepuka loop haraka sana)
          setTimeout(startBot, 5000);
        }
      } else if (connection === "open") {
        console.log("✅ Bot iko mtandaoni na imeunganishwa!");
      }
    });

    // Kusikia meseji mpya na kuzi-process
    sock.ev.on("messages.upsert", async (m) => {
      const msg = m.messages[0];
      if (!msg.message || (msg.key && msg.key.remoteJid === "status@broadcast")) return;

      try {
        const from = msg.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const messageType = Object.keys(msg.message)[0];
        const body = msg.message[messageType]?.text || msg.message[messageType]?.caption || "";
        const sender = msg.key.participant || msg.key.remoteJid;

        // Je ni owner?
        const isOwner = config.owner.some(ownerNum => sender.includes(ownerNum));

        // Je ni command?
        if (!body.startsWith(config.prefix)) return;

        const command = body.slice(config.prefix.length).trim().split(/\s+/)[0].toLowerCase();
        const args = body.trim().split(/\s+/).slice(1);
        const cmdObj = commands.find(c => c.pattern === command);

        if (!cmdObj) {
          // Optional: reply to unknown command
          await sock.sendMessage(from, { text: `❌ Command *${command}* haijapatikana.` }, { quoted: msg });
          return;
        }

        // Run command function
        await cmdObj.function({
          sock,
          msg,
          args,
          from,
          sender,
          isGroup,
          isOwner,
        });
      } catch (error) {
        console.error("❌ Error processing message:", error);
        try {
          await sock.sendMessage(msg.key.remoteJid, { text: "⚠️ Tatizo limetokea kwenye command hii." }, { quoted: msg });
        } catch (_) {}
      }
    });

    // Hifadhi credentials wakati zinapobadilika
    sock.ev.on("creds.update", saveCreds);

  } catch (err) {
    console.error("❌ Bot startup error:", err);
    // Jaribu ku-start tena baada ya sekunde 5
    setTimeout(startBot, 5000);
  }
}

startBot();
