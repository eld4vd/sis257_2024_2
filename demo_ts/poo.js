"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estudiante = exports.Persona = void 0;
class Persona {
    constructor(cedulaIndentidad, nombre, primerApellido, segundoApellido, fechaNacimiento) {
        this.cedulaIndentidad = cedulaIndentidad;
        this.nombre = nombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.fechaNacimiento = fechaNacimiento;
        //este campo vacio es para inicializar los campos de la clase (sirve para setear los valores)
    }
    saludar() {
        console.log(`Soy ${this.nombre} y mi cedula de identidad es ${this.cedulaIndentidad}`);
    }
}
exports.Persona = Persona;
class Estudiante extends Persona {
    constructor(cedulaIndentidad, nombre, primerApellido, segundoApellido, fechaNacimiento, carnetUniversitario) {
        super(cedulaIndentidad, nombre, primerApellido, segundoApellido, fechaNacimiento);
        this.carnetUniversitario = carnetUniversitario;
    }
    saludar() {
        console.log(`Soy ${this.nombre} y mi carnet universitario es ${this.carnetUniversitario}`);
    }
}
exports.Estudiante = Estudiante;
