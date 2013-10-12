exports.createSchema = function(mongoose){
mongoose.connect("mongodb://localhost/dt");
//Documento Logo encargado del almacenamiento de los logos 	
var UsuarioSchema = new mongoose.Schema({
	nombre: String,
	cedula: String,
	telefono: String,
	correo: String,
	date: { type: Date, default: Date.now},
	estado: { type: String, default: "I"}, 
});
Usuario = mongoose.model("usuarios",UsuarioSchema);



}