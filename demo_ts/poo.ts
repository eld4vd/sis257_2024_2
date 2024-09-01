export class Persona {
    constructor(public cedulaIndentidad: string,public nombre: string,public primerApellido: string,public segundoApellido: string,public fechaNacimiento: Date,) 
    {
        //este campo vacio es para inicializar los campos de la clase (sirve para setear los valores)
    }

    saludar():void{
        console.log(`Soy ${this.nombre} y mi cedula de identidad es ${this.cedulaIndentidad}`);
    }
}

export class Estudiante extends Persona{
    public carnetUniversitario: string;
    constructor(cedulaIndentidad: string,nombre: string,primerApellido: string,segundoApellido: string,fechaNacimiento: Date,carnetUniversitario: string){
        super(cedulaIndentidad,nombre,primerApellido,segundoApellido,fechaNacimiento);
        this.carnetUniversitario = carnetUniversitario;
    }
    saludar(): void {
        console.log(`Soy ${this.nombre} y mi carnet universitario es ${this.carnetUniversitario}`);
    }
}