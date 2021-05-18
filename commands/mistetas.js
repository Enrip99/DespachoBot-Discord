module.exports = {
	name: 'mistetas',
	description: 'Pinácuolo de la comedia',
	execute(message, args, client) {
		if (!args.length) message.channel.send('No, pero me gustaría verlas!');
	},
};
