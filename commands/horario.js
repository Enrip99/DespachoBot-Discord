const config = require('../data/config.json');
var calendar = require('../data/calendar.json');
const fs = require('fs');

const semana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]

function help_message(message){
	message.channel.send("**Lista de comandos relativos al horario**\n\n - **`horario check [día]`** - Obtén información sobre a qué horas hay miembros en el despacho ese día. Ejemplo: *horario check lunes*\n - **`horario check [día] [hora]`** - Obtén un listado de las personas que habrá en el despacho ese día a esa hora. Ejemplo: *horario check miércoles 15*\n - **`horario check me`** - Obtén un todas las horas y días que hayas registrado en el bot.\n - **`horario add [día] [hora]`** - Añade una o varias horas en las que estarás en el despacho. Para añadir más de una entrada, escribe las parejas de día y hora una detrás de la otra. Ejemplo: *horario add lunes 9 l 10 viernes 18*\n - **`horario remove [día] [hora]`** - Elimina una o varias horas en las que ya no estarás por el despacho. Para eliminar más de una entrada, escribe las parejas de día y hora una detrás de la otra. Ejemplo: *horario remove miercoles 17 m 18 jueves 14*\n - **`horario wipe`** - Borra completamente la base de datos. Esta operación no puede ser deshecha.\n\nAcepto los días de la semana, con y sin tildes, y sus iniciales: **l**unes, **m**artes, (**x**)miércoles, **j**ueves, **v**iernes, **s**ábado y **d**omingo.\nAcepto horas enteras, de 8 a 21.")
}

function validate_day(day){
		switch(day) {
			case 'l':
				return 0
				break
			case 'lunes':
				return 0
				break

			case 'm':
				return 1
				break
			case 'martes':
				return 1
				break

			case 'x':
				return 2
				break
			case 'miercoles':
				return 2
				break
			case 'miércoles':
				return 2
				break

			case 'j':
				return 3
				break
			case 'jueves':
				return 3
				break

			case 'v':
				return 4
				break
			case 'viernes':
				return 4
				break

			case 's':
				return 5
				break
			case 'sabado':
				return 5
				break
			case 'sábado':
				return 5
				break

			case 'd':
				return 6
				break
			case 'domingo':
				return 6
				break

			default:
				return -1
				break
	}
	return -1
}

function validate_hour(hour){
	if (!isNaN(hour) && hour >= 8 && hour <= 21) return hour-8
	else return -1
}

function check_pairs_and_odd(args, message){
	if (args.length != 1 && args.length%2 == 1){
		return true
	}
	else{
		message.channel.send("Comando inválido - Recuerda enviar los días y horas a pares")
		return false
	}
}

function save_calendar(){
	fs.writeFile("./data/calendar.json", JSON.stringify(calendar), function(err) {
		if (err) console.log(err)
	})
}

function add_delete(args, message, addition){
	if (check_pairs_and_odd(args, message)){
		var msgToSend_fails = ""
		var msgToSend_exis = ""
		var msgToSend = ""
		for (var i = 1; i<args.length; i+=2){
			var dia = validate_day(args[i])
			var hora = validate_hour(args[i+1])
			if (hora >= 0 && dia >= 0){
				var found = false
				for (var j = 0; j < calendar.hor[dia][hora].length && !found; ++j){
					if (calendar.hor[dia][hora][j] == message.author.id){
						found = true
						if (!addition){
							calendar.hor[dia][hora].splice(j,1)
							if(!msgToSend.length) msgToSend = "Se han borrado del horario los siguientes días y horas:"
							msgToSend = msgToSend.concat("\n **-** ",semana[dia]," ",args[i+1])
						}
					}
				}
				if (addition){
					if (!found){
						calendar.hor[dia][hora].push(message.author.id)
						if(!msgToSend.length) msgToSend = "Se han añadido al horario los siguientes días y horas:"
						msgToSend = msgToSend.concat("\n **-** ",semana[dia]," ",args[i+1])
					}
					else{
						if (!msgToSend_exis.length) msgToSend_exis = "Ya tienes asignados los siguientes días y horas:"
						msgToSend_exis = msgToSend_exis.concat("\n **-** ",semana[dia]," ",args[i+1])
					}
				}
				if (!addition){
					if (!found){
						if (!msgToSend_exis.length) msgToSend_exis = "No tenías asignados los siguientes días y horas:"
						msgToSend_exis = msgToSend_exis.concat("\n **-** ",semana[dia]," ",args[i+1])
					}
				}
			}
			else {
				if (!msgToSend_fails.length) msgToSend_fails = "Los siguientes días y horas no son válidos:"
				msgToSend_fails = msgToSend_fails.concat("\n **-** ",args[i]," ",args[i+1])
			}
		}
		msgToSend = msgToSend.concat("\n\n",msgToSend_exis,"\n\n",msgToSend_fails)
		message.channel.send(msgToSend)
		save_calendar(calendar)
	}
}

function check_day(dia, message){
	var msgToSend = ""
	for (var i = 0; i < calendar.hor[dia].length; ++i){
		if (calendar.hor[dia][i].length == 1){
			msgToSend = msgToSend.concat("A las ",i+8,": ", calendar.hor[dia][i].length, " persona\n")
		}
		else if (calendar.hor[dia][i].length > 1){
			msgToSend = msgToSend.concat("A las ",i+8,": ", calendar.hor[dia][i].length, " personas\n")
		}
	}
	if (!msgToSend.length) message.channel.send("Este día no hay nadie")
	else message.channel.send(msgToSend)
}

function check_dia_hora(dia, hora, message, client){
	var count = 0
	var i = 0
	var msgToSend = ""
	for (i = 0; i < calendar.hor[dia][hora].length; ++i){
		client.users.fetch(String(calendar.hor[dia][hora][i])).then(usr =>{
			if (msgToSend == "") msgToSend = "A esa hora estarán presentes:"
			msgToSend = msgToSend.concat("\n",usr.username)
			++count
			if (count == calendar.hor[dia][hora].length) message.channel.send(msgToSend)
		})
	}
	if (i == 0) message.channel.send("Ese día a esa hora no hay nadie")
}

function check_me(message){
	msgToSend = ""
	for (var i = 0; i < calendar.hor.length; ++i){
		for (var j = 0; j < calendar.hor[i].length; ++j){
			for (var k = 0; k < calendar.hor[i][j].length; ++k){
				if (calendar.hor[i][j][k] == message.author.id){
					if (!msgToSend.length) msgToSend = "Tengo registrado que vienes los siguientes días y horas:"
					msgToSend = msgToSend.concat("\n **-** ", semana[i], " a las ", j+8)
				}
			}
		}
	}
	if (!msgToSend) msgToSend = "No tengo registrado ninguna aparición tuya"
	message.channel.send(msgToSend)
}

function check(args, message, client){
	switch(args.length){
		case 2:
			if (args[1] == "me") check_me(message)
			else{
				var dia = validate_day(args[1])
				if (dia >= 0) check_day(dia, message)
				else message.channel.send(args[1] + " no es un día válido.")
			}
			break
		case 3:
			var dia = validate_day(args[1])
			var hora = validate_hour(args[2])
			if (dia >= 0 && hora >= 0) check_dia_hora(dia, hora, message, client)
			else message.channel.send(args[1] + " " + args[2] + " no son un día y hora válidos")
			break
		default:
			message.channel.send("Por favor, envía un único día, y opcionalmente una hora; o `me`")
			break
	}
}

module.exports = {
	name: 'horario',
	description: 'guarda y genera el horario de diversos usuarios',
	execute(message, args, client) {
		if (!args.length){
			help_message(message)
		}
		else{
			switch (args[0]){
				case "add":
					add_delete(args, message, true)
					break

				case "remove":
					add_delete(args, message, false)
					break

				case "check":
					check(args, message, client)
					break

				case "wipe":
					if (args.length == 2 && args[1] == "--confirm"){
						if (message.author.id == config.owner1 || message.author.id == config.owner2){
							for (var i = 0; i < calendar.hor.length; ++i){
								for (var j = 0; j < calendar.hor[i].length; ++j){
									calendar.hor[i][j].splice(0,calendar.hor[i][j].length)
								}
							}
							save_calendar()
							message.channel.send("Base de datos borrada con éxito")
						}
						else message.channel.send("Esta acción solo la pueden hacer los propietarios del bot")
					}
					else{
						message.channel.send("Borra toda la base de datos. Usa `horario wipe --confirm`. **Esta acción no se puede deshacer**")
					}
					break

				default:
					help_message(message)
					break
			}
		}
	}
}
