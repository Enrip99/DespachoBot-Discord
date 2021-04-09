const Discord = require('discord.js');
const client = new Discord.Client();
var NodeWebcam = require( "node-webcam" );
const fs = require('fs');
const config = require('./data/config.json');


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
  console.log('¡Listo!');
  client.user.setActivity('Type 7F for help', );
});


client.on('message', message => {
  var ms = message.content.toLowerCase();


  if (ms === 'alguien despacho' || ms === 'alguien despacho?'){
    if (message.guild === null || message.guild.id !== config.serverid){
      message.channel.send('No estás en el servidor correcto.')
    }
    else{
      Webcam.capture( "data/Foto", function( err, data ) {
        if (!err) console.log(data)
        else console.error(err);
      } );

      var current = new Date().getTime();
      var goal = current + parseInt(config.delay);
      while (current < goal) current = new Date().getTime();



      fs.stat('./data/Foto.png', (err, stats) => {

        var errMsg = '**Se ha producido un error al tomar la foto.**\nComprueba que la cámara funcione correctamente o que el delay establecido sea suficientemente grande.'

        if (err){
          message.channel.send(errMsg)
        }

        else{
          var picTstamp = stats.mtime.getTime();
          var timeNow = new Date().getTime();

          if (timeNow - picTstamp > parseInt(config.delay)*3){
            message.channel.send(errMsg)
          }
          else{
            const ToSend = new Discord.MessageEmbed()
            ToSend.attachFiles(['./data/Foto.png'])
            ToSend.setImage('attachment://Foto.png');
            message.channel.send(ToSend).catch(e => {console.error(e)});
          }
        }

      });
    }
  }


  else if (ms === 'shut off') {
    if (message.author.id === config.owner1 || message.author.id === config.owner2){
      console.log('Apagando...');
      process.exit();
    }
    else {
      message.channel.send('Solo puedo apagarme por orden de los propietarios del bot.')
    }
  }


  else if (ms === '7f'){
    var delay_s = parseInt((parseInt(config.delay)+500)/1000)
    var secText = "segundos"
    if (delay_s <= 1){
      delay_s = "un"
      secText = "segundo"
    }
    message.channel.send('** **- Para ver una foto del despacho, escribe `alguien despacho?` y espera ' + delay_s + ' ' + secText + '.\n - Para apagar el bot utiliza el comando `shut off`\n - Otros comandos graciosos son: `ping`, `mistetas`, `nep`, `upclink`.\n - Este bot ha sido desarrollado y mantenido por un gilipollas - https://github.com/Enrip99/DespachoBot-Discord');
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
  }

});

client.login(config.token);
