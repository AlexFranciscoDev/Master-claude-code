"use strict";
// Definir una variable en typescript
let texto = "Alex Francisco";
let numero = 12;
let verdadero = true;
let cualquier = "Puedo meter lo que sea";
// Constantes
const nombre = "Alex";
console.log(texto, numero, verdadero);
// Arrays
let personas = ["Alex", "Jannah", "Angelique", "Nicole"];
// Puede guardar un HTMLElement o null
let div_personas = document.querySelector("#personas");
div_personas.innerHTML = "<ul>" +
    personas.map((persona) => {
        return `<li>${persona}</li>`;
    }).join("");
+"</ul>";
