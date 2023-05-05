export class Beer {
    constructor(name, price, image) {
        (this.name = name), (this.price = price), (this.image = image);
    }

    /*metodos*/
    getValueInFloat() {
        let price = this.price.slice(1);

        return parseFloat(price);
    }
    /**
     * Este método permite inyectarse directamente en el data
     */

    getDivCardBeer(idToInsert) {
        /*selecciona el elementro padre*/
        let parent = document.getElementById(idToInsert);
        /*crea un elemento a indexar o inyectar*/
        let div = document.createElement("div");
        /*le agreo lo que inyecto*/
        div.innerHTML = `
        <h4>${this.name}</h4>
        <div>
            <label> ${this.price} </label>
            <img src="${this.image}" alt="${this.name}" />
        </div>
        `;
        /* agrego elemento hijo  al padre*/
        parent.appendChild(div);
    }
}
