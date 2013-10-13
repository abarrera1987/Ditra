exports.createSchema = function(mongoose){
mongoose.connect("mongodb://localhost/dt");
//Documento Logo encargado del almacenamiento de los logos 	
var UsuarioSchema = new mongoose.Schema({
	nombre: String,
	apellido: String,
	dia: Number,
	mes: Number,
	anio: Number,
	sexo: String, 
	cedula: String,
	telefono: String,
	correo: String,
	date: { type: Date, default: Date.now},
	cuenta: { type: Number, default: "100000"}, 
});
Usuario = mongoose.model("usuarios",UsuarioSchema);

var NicknameSchema = new mongoose.Schema({
	nick: String,
	contraseña: String,
	estado: { type: String, default: "I"}, 
});
Nickname = mongoose.model("nickname",NicknameSchema);


}