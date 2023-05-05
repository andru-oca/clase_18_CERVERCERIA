import { Beer } from "./models/Beer.js";
import beers from "../../db/beers.json" assert { type: "json" };

import { idBtn, idValueInput, parent } from "./config/config.js";

/*
    ATENCION!!! 
        LEER DE ABAJO HACIA ARRIBA!!!
*/

/*funcionalidad de impresion en html*/
const printData = (data, parent) => {
    data.forEach((beer) => beer.getDivCardBeer(parent));
};

const getFilterData = (value) => {
    /*agrego objetos desde una api*/
    let beersObjeto = beers.map(
        (beer) => new Beer(beer.name, beer.price, beer.image),
    );
    return beersObjeto
        .filter((beer) => beer.getValueInFloat() < value)
        .sort((a, b) => b.getValueInFloat() - a.getValueInFloat());
};

const getDataValidate = (idValueInput) => {
    const getValueRange = document.getElementById(idValueInput);
    let queryData = parseFloat(getValueRange.value);
    getValueRange.value = "";

    if (queryData > 2000) {
        alert("No hay cerveza tan cara!");
        return 0;
    }

    return queryData;
};

const cleaner = (parent) => {
    let children = document.querySelectorAll(`#${parent} > *`);
    children.forEach((child) => child.remove());
};

const mainBtn = (idValueInput, parent) => {
    /*crear funcion de limpieza*/
    cleaner(parent);

    /*seleccionar el valor del input*/
    let value = getDataValidate(idValueInput);

    /*filtrado dato*/
    let data = getFilterData(value);

    /* e inyeccion de cervezas en el html*/
    printData(data, parent);
};

/*SELECCINAR ELEMENTOS*/

let buttonBusqueda = document.getElementById(idBtn);
let inputBusqueda = document.getElementById(idValueInput);

const cbInyecionClick = () => mainBtn(idValueInput, parent);

/*AGREGADO DE EVENTO ESCUCHA*/
buttonBusqueda.addEventListener("click", cbInyecionClick);
inputBusqueda.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        buttonBusqueda.click();
    }
});
