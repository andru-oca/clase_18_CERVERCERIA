export class BeerRecomendado {
    constructor(name, price, url, emailUser) {
        (this.name = name),
            (this.price = price),
            (this.url = url),
            (this.emailUser = emailUser);
    }

    valido() {
        let data = {};
        /*verifico si alguno de los elementos es cierto o falso*/
        /*PUEDO GENERAR LOS VALIDADORES QUE SE ME OCURRAN*/
        for (const [key, value] of Object.entries(this)) {
            data[key] = value ? true : false;
        }
        return data;
    }

    asJSON() {
        return JSON.stringify({
            data: [
                {
                    name: this.name,
                    price: this.price,
                    url: this.url,
                    emailUser: this.emailUser,
                },
            ],
        });
    }

    injectBeer(idToInsert) {
        /*selecciona el elementro padre*/
        let parent = document.getElementById(idToInsert);
        /*crea un elemento a indexar o inyectar*/
        let div = document.createElement("div");
        /*le agreo lo que inyecto*/
        div.innerHTML = `
        <h4>${this.name}</h4>
        <div>
            <label> ${this.emailUser} sugirio esta cerveza! </label>
            <img src="${this.url}" alt="${this.name}" />
        </div>
        `;
        /* agrego elemento hijo  al padre*/
        parent.appendChild(div);
    }
}
