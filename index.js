const Discord = require('discord.js');
const fs = require('fs');
const config = require('./data/config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

/*
var NodeWebcam = require( "node-webcam" );
var opts = {
  width: 640,
  height: 480,
  quality: 50,
  frames: 1,
  delay: 0,
  saveShots: true,
  output: "png",
  device: false,
  callbackReturn: "location",
  verbose: false
};
var Webcam = NodeWebcam.create( opts );
*/

client.once('ready', () => {
  console.log('¡Listo!');
  client.user.setActivity('Type 7F for help', );
});

client.on('message', message => {
  if (message.author.bot) return;

  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
  }

});

client.login(config.token);
