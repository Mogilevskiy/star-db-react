export default class SwapiService {

    _imageBase = `https://starwars-visualguide.com/assets/img`;
    _apiBase = 'https://swapi.co/api';

    getResource = async (url) => {
        console.log('start');
        const response = await fetch(`${this._apiBase}${url}`);
        console.log('end');
        if (!response.ok) {
            throw new Error(`Could not fetch ${this._apiBase}${url} , status==> ${response.status}`)
        }

        const body = await response.json();
        return body
    };

    getAllPeople = async () => {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson)
    };

    getPerson = async (id) => {
        return this.getResource(`/people/${id}`)
            .then(this._transformPerson)
    };

    getAllPlanets = async () => {
        const res = await this.getResource(`/planets/`);
        return res.results.map(this._transformPlanet)
    };

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}`);
        return this._transformPlanet(planet)
    };

    getAllStarships = async () => {
        const res = await this.getResource(`/starships/`);
        return res.results
    };

    getStarship = async (id) => {
        return this.getResource(`/starships/${id}`)
    };

    getId = (planet) => {
        const regExp = /\/([0-9]*)\/$/;
        const id = planet.url.match(regExp)[1];
        return id
    };

    _transformPlanet = (planet) => {
        return {
            id: this.getId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    };

    _transformPerson = (person) => {
        return {
            id: this.getId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            height: person.height,
            mass: person.mass,
            eyeColor: person.eye_color
        }
    };

    getPersonImage = (id) => {
        return `${this._imageBase}/characters/${id}.jpg`
    };

    getStarshipImage = (id) => {
        return `${this._imageBase}/starships/${id}.jpg`
    };

    getPlanetImage = (id) => {
        return `${this._imageBase}/planets/${id}.jpg`
    };

}