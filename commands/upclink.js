module.exports = {
	name: 'upclink',
	description: 'Recuerdos de la VPN',
	execute(message, args) {
		if (!args.length) {
			if (Math.random() < 0.1) message.channel.send({files: ["resources/klink.png"]})
			else message.channel.send('QUE TIENE UNA K QUE TIENE UNA K');

		}	},
};
