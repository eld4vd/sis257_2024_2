"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poo_1 = require("./poo");
//tsc --watch sirve para que se compile automaticamente cada vez que se guarda el archivo
console.log("hola mundo...");
console.log("---------------------------------------------------------------------------------------------");
//tipos de datos
//Boolean
console.log("booleanos");
let esActivo = true; //el ambito de la variable es local, funciona dentro del scope(funcion, ciclo,if,{})
var esActivo2 = false; //el ambito de la variable es global, funciona en cualquier parte del codigo
const esActivo3 = false; //el ambito de la variable es global, funciona en cualquier parte del codigo(es tipado)
console.log(esActivo, esActivo2, esActivo3);
//number
console.log("numeros");
let entero = 10;
let real = 10.5;
let binario = 0b101; //binario es 5         // tabla binaria es 2^0=1, 2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^5=32, 2^6=64, 2^7=128, 2^8=256, 2^9=512, 2^10=1024
let octal = 0o13; //octal es 11             // tabla octal es 8^0=1, 8^1=8, 8^2=64, 8^3=512, 8^4=4096
let hexadecimal = 0xA; //hexadecimal es 10  // tabla hexadecimal es 16^0=1, 16^1=16, 16^2=256, 16^3=4096, 16^4=65536
console.log("entero: " + entero + " real: " + real + "binario: " + binario + " octal: " + octal + " hexadecimal: " + hexadecimal);
console.log("---------------------------------------------------------------------------------------------");
//string
console.log("strings");
let sigla = "SIS257";
let materia = "Desarrollo de Aplicacion Int/InternetII";
let concatenado = sigla + " - " + materia;
let concatenado2 = `${sigla} - ${materia}`; //esto es una interpolacion de cadenas ALT+96 es el acento grave
let separar = materia.split(" "); //separar la cadena por el guion
let mayusculas = materia.toUpperCase(); //convertir a mayusculas
let minusculas = materia.toLowerCase(); //convertir a minusculas
let reemplazo = materia.replace(/ /g, "*"); //reemplazar los espacios por asteriscos todas las coincidencias
let subcadena = materia.substring(0, 5); //obtener una subcadena de la cadena original desde la posicion 0 hasta la 5
let repetir = sigla.repeat(3); //repetir la cadena 3 veces
let sinEspaciosExtremos = " HOla Mundo  ".trim(); //quitar los espacios en blanco al inicio y al final de la cadena
let longitudCadena = materia.length; //obtener la longitud de la cadena
console.log("La sigla es: " + sigla + " y la materia es: " + materia);
console.log(concatenado);
console.log(concatenado2);
console.log(separar[2]);
console.log(mayusculas, minusculas);
console.log(reemplazo);
console.log(subcadena);
console.log(repetir);
console.log(sinEspaciosExtremos);
console.log(longitudCadena);
console.log("---------------------------------------------------------------------------------------------");
//ARRAYS
console.log("arrays");
let array = [1, 2, 3, 4, 5];
let arrayCadena = ["hola", "mundo"];
let longitudArray = array.length; //obtener la longitud del array
let doble = array.map(n => n * 2); //multiplicar por 2 cada elemento del array (nmap funciona asi n es el elemento del array y n*2 es la operacion que se va a realizar)
let factorial = array.reduce((a, b) => a * b); //multiplicar todos los elementos del array (reduce funciona asi a es el acumulador y b es el elemento del array)
let impares = array.filter(n => n % 2 != 0); //filtrar los elementos impares del array (filter funciona asi n es el elemento del array y n%2 != 0 es la condicion que se va a evaluar)
console.log(array);
console.log(arrayCadena);
console.log(longitudArray);
console.log(doble);
console.log(factorial);
console.log(impares);
;
array.push(6); //agregar un elemento al final del array
console.log(array);
//array.pop(); //eliminar el ultimo elemento del array
//array.shift(); //eliminar el primer elemento del array
console.log("---------------------------------------------------------------------------------------------");
//tubple
console.log("TUPLES");
let tuple = [1, "hola", true]; //un tuple es un array que tiene un tipo de dato especifico en cada posicion
console.log(tuple);
console.log("---------------------------------------------------------------------------------------------");
//enum
console.log("enums");
var Color;
(function (Color) {
    Color["red"] = "rojo";
    Color["green"] = "verde";
    Color["blue"] = "azul";
})(Color || (Color = {}));
; //enum con valores personalizados
var sexo;
(function (sexo) {
    sexo["Masculino"] = "M";
    sexo["Femenino"] = "F";
})(sexo || (sexo = {}));
; //enum con valores personalizados
console.log(Color.blue);
console.log("objecto sexo: " + sexo);
console.log("---------------------------------------------------------------------------------------------");
//any
console.log("any");
let cualquiera = 10; //any es un tipo de dato que puede ser cualquier cosa
cualquiera = "hola";
console.log(cualquiera);
console.log("-----------------------------------------------------------------------------------------------");
//object
console.log("objetos");
let objeto = { nombre: "Pepe", apellido: "Perez" }; //un objeto es un conjunto de propiedades que tienen un nombre y un valor
console.log(objeto);
console.log("-----------------------------------------------------------------------------");
//estructuras de controles
console.log("estructuras de control");
let contiene;
if (materia.includes("Desarrollo")) {
    contiene = true;
}
else
    contiene = false;
for (let i in arrayCadena) { //for in recorre los indices del array donde i es el indice del array y arrayCadena es el array, imprime todos los elementos del array
    console.log("for in: " + i); // obtiene posiciones
}
for (let i of arrayCadena) { //for of recorre los elementos del array donde i es el elemento del array y arrayCadena es el array, imprime todos los elementos del array
    console.log("for of: " + i); // obtiene valores
}
arrayCadena.forEach(i => console.log("forEach: " + i)); //forEach recorre los elementos del array donde i es el elemento del array y arrayCadena es el array, imprime todos los elementos del array
console.log(contiene);
console.log("-----------------------------------------------------------");
//INTERFACES
console.log("interfaces");
let persona123 = { nombre: "David", materia: "SIS257" }; //una interfaz es un tipo de dato que define la estructura de un objeto(es como instanciar una clase con el tipo de dato)
console.log(persona123);
console.log("-----------------------------------------------------------");
//FUNCIONES
console.log("funciones");
function saludar() {
    console.log(`hola que tal`);
}
function saludar2(nombre) {
    console.log(`hola que tal ${nombre}`);
}
saludar();
saludar2("David");
console.log("-----------------------------------------------------------");
//POO
console.log("POO");
let persona = new poo_1.Persona("123456", "juan", "Perez", "Gonzales", new Date("2010-10-10")); //instanciar un objeto de la clase Persona
persona.saludar(); //llamar al metodo saludar de la clase Persona
let estudiante = new poo_1.Estudiante("123456", "juanito", "Perez", "Gonzales", new Date("2010-10-10"), "123456"); //instanciar un objeto de la clase Estudiante   
estudiante.saludar(); //llamar al metodo saludar de la clase Estudiante
console.log(persona);
console.log(estudiante);
