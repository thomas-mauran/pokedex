import { Pokedex } from "pokeapi-js-wrapper";

const options = {
    cache: true,
    cacheImages: true
}

const P = new Pokedex(options)

export default P