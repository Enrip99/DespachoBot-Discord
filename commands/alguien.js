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
const config = require('../data/config.json');

module.exports = {
	name: 'alguien',
	description: 'Main feature of the bot. Takes a picture through webcam and sends it',
	execute(message, args) {
		if (args.length == 1) {
			var desp = args[0].toLowerCase();
			if (desp === 'despacho' || desp === 'despacho?') {
				if (message.guild === null || message.guild.id !== config.serverid){
					message.channel.send('No estás en el servidor correcto.')
				}
				else{
					Webcam.capture( "data/Foto", function( err, data ) {
						if (err){
							message.channel.send('**Se ha producido un error al tomar la foto.**\nComprueba que la cámara funcione correctamente.')
						}
						else {
							message.channel.send({files: ["data/Foto.png"]}).catch(e => {console.error(e)});
						}
					} );
				}
			}
		}
	},
};
