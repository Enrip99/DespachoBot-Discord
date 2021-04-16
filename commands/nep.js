module.exports = {
	name: 'nep',
	description: 'No weebs allowed',
	execute(message, args) {
		if (!args.length) message.channel.send('Vete a la puta mierda otaco asqueroso, dúchate');
	},
};
