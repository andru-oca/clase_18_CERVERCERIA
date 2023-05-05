import { BeerRecomendado } from "./models/BeerRecomendado.js";
import URI from "./config/config.js";
import { parent } from "./config/config.js";

const transformToBeer = (datos) => {
    return datos.map(
        (dato) =>
            new BeerRecomendado(
                dato.name,
                dato.price,
                dato.url,
                dato.emailUser,
            ),
    );
};

const recibirDatos = () => {
    fetch(URI, {
        method: "GET",
    })
        .then((datos) => datos.json())
        .then((datos) =>
            transformToBeer(datos).forEach((dato) => dato.injectBeer(parent)),
        )
        .catch((e) => console.log(e));
};

window.onload = () => recibirDatos();
