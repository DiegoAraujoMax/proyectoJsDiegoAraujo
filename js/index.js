
const realizarPreguntas = () => {
    let preguntaNombre = prompt("Por favor, ¿podría decirnos su nombre y apellido?").toLowerCase();
    alert("Hola " + preguntaNombre + ", encantados de tenerte aquí");

    let edadValida = false;

    do {
        let preguntaEdad = parseInt(prompt("Cuentanos, ¿qué edad tienes?"));

        if (isNaN(preguntaEdad) || preguntaEdad < 0) {
            alert("Por favor, ingrese una edad válida.");
        } else {
            edadValida = true;

            if (preguntaEdad < 18) {
                alert("Usted es menor de edad y no puede ingresar al sitio.");
                return; // Sale de la función si es menor de 18
            } else {
                alert("Usted es mayor de edad y puede seguir.");
            }
        }
    } while (!edadValida);

    let tipoBebida = prompt("¿Qué tipo de bebida desea?");
    alert("Gracias por su elección. Disfrute de su catálogo de " + tipoBebida + ".");
};

alert("Bienvenido a nuestra bodega online. Le realizaremos unas breves preguntas a continuación...");
realizarPreguntas();
