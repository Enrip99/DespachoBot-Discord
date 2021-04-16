module.exports = {
	name: '7f',
	description: 'Help command',
	execute(message, args) {
		if (!args.length) message.channel.send('** **- Para ver una foto del despacho, escribe `alguien despacho?` y espera un segundo.\n - Para apagar el bot utiliza el comando `shut off`\n - Otros comandos graciosos son: `ping`, `mistetas`, `nep`, `upclink`.\n - Este bot ha sido desarrollado y mantenido por un gilipollas - https://github.com/Enrip99/DespachoBot-Discord');
	},
};
