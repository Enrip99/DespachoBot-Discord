const Discord = require('discord.js');
const client = new Discord.Client();
var NodeWebcam = require( "node-webcam" );
const fs = require('fs');
const token = require('./data/token.json');
const delay = ms => new Promise(res => setTimeout(res, ms));


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


client.once('ready', () => {
	console.log('Ready!');
  client.user.setActivity('type 7F for help', );
});


client.on('message', message => {

	var ms = message.content.toLowerCase();


	if (ms === 'alguien despacho' || ms === 'alguien despacho?'){
		Webcam.capture( "data/Foto", function( err, data ) {} );
		var start = new Date().getTime();
		var end = start;
		while(end < start + 1000) {
			end = new Date().getTime();
		}
        try {
            const ToSend = new Discord.MessageEmbed()
            .attachFiles(['./data/Foto.png'])
            .setImage('attachment://Foto.png');
            message.channel.send(ToSend).then().catch(e => {console.error(e)});
        } catch (error) {
            console.error(error)
        }
	}


  else if (ms === '7f'){
    message.channel.send('** **- Para ver una foto del despacho, escribe `alguien despacho?` y espera un segundo.\n - Otros comandos graciosos son: `ping`, `mistetas`, `nep`, `upclink`.\n - Este bot ha sido desarrollado y mantenido por un gilipollas - https://github.com/Enrip99/DespachoBot-Discord');
  }


  else if (ms === 'mistetas'){
    message.channel.send('No, pero me gustaría verlas!');
  }


  else if (ms === 'nep'){
    message.channel.send('Vete a la puta mierda otaco asqueroso, dúchate');
  }


	else if (ms === 'upclink'){
		if (Math.random() < 0.1){
			const ToSend = new Discord.MessageEmbed()
			.attachFiles(['./resources/klink.png'])
			.setImage('attachment://klink.png');
			message.channel.send(ToSend);
		}
	  else message.channel.send('QUE TIENE UNA K QUE TIENE UNA K');
	}

  else if (ms === 'ping'){
    message.channel.send(Date.now() - message.createdTimestamp + ' milisegundos'); //miliseconds
    //console.log(message.createdTimestamp);
    //console.log(Date.now());
  }

});

client.login(token.token);
