// Definir una variable en typescript
let texto:string = "Alex Francisco";
let numero:number = 12;
let verdadero:boolean = true;
let cualquier:any = "Puedo meter lo que sea";

// Constantes
const nombre:string = "Alex";
console.log(texto, numero, verdadero);

// Arrays
let personas:string[] = ["Alex", "Jannah", "Angelique", "Nicole"];

// Puede guardar un HTMLElement o null
let div_personas:HTMLElement | null = document.querySelector("#personas");

div_personas.innerHTML = "<ul>" +

personas.map((persona) => {
    return `<li>${persona}</li>`;
}).join("");

+ "</ul>";