import URI from "./config/config.js";
import { valid, invalid } from "./config/config.js";
import { BeerRecomendado } from "./models/BeerRecomendado.js";

/*
    ATENCION!!! 
        LEER DE ABAJO HACIA ARRIBA!!!
*/

const enviarDatos = (datos) => {
    fetch(URI, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: datos.asJSON(),
    })
        .then(() => alert("Gracias por tu sugerencia"))
        .catch((e) => console.log(e));
};

/*validador de datos en js*/

// forma numero 1

//DTO => Data Transfer Object ==> recomendacion investigar

const datosInternos = () => {
    let inputsNodeList = document.querySelectorAll("form > input");
    let dataValidador = {};
    inputsNodeList.forEach((dato) => {
        dataValidador[dato.name] = dato.value;
    });

    /*que me va a devolver*/
    // console.log(dataValidador);
    return dataValidador;
};

const datosFormData = (idForm) => {
    let formulario = document.getElementById(idForm);
    return new FormData(formulario);
};

/*obtener datos desde el btn*/
const BTN = (event) => {
    event.preventDefault();

    /*obtener datos desde formulario*/
    let datos = datosInternos();

    datosFormData("formData"); //forma moderna

    // crear objeto
    const { name, price, url, emailUser } = datos;
    let beerDTO = new BeerRecomendado(name, price, url, emailUser);

    /*validar que los datos sean validos*/
    let validadores = beerDTO.valido();

    console.log(validadores);

    /*colocar una animacion por cada uno de los items que no cumplen con esa condicion valido o falso*/

    for (const [key, value] of Object.entries(beerDTO)) {
        let input = document.querySelector(`input[name=${key}]`);

        input.className = "";

        if (value) {
            input.classList.add(valid);
        } else {
            input.classList.add(invalid);
        }
    }

    /*si cumple todo OK puede hacer un POST con fetch*/

    let inputValues = Object.values(beerDTO);

    let submit = !inputValues.some((value) => value == false);

    if (!submit) {
        return;
    }

    /*enviar a la base de datos*/
    enviarDatos(beerDTO);
};

let btn = document.querySelector("button[type='submit']");
btn.addEventListener("click", BTN);
