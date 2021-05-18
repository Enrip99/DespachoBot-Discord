module.exports = {
	name: '7f',
	description: 'Help command',
	execute(message, args, client) {
		if (!args.length) message.channel.send('**Lista de comandos**\n\n - **`alguien despacho?`** - Muestra una foto del despacho.\n - **`horario`** - Accede a información sobre cuándo habrá miembros en el despacho.\n - **`ping`** - Comprueba el tiempo de respuesta del bot.\n - **`shut off`** - Apaga el bot.\n - **`mistetas`** - Responde con *un* chiste.\n - **`nep`** - Muestra odio hacia el fandom otaku.\n - **`upclink`** - Información *(nada útil)* sobre la VPN de la universidad.\n\nEste bot ha sido desarrollado y mantenido por un gilipollas - https://github.com/Enrip99/despachobot-discord');
	},
};
