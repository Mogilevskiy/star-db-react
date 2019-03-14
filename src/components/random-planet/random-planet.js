import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service';


import './random-planet.css';
import Spiner from '../spiner';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updatePlanet();
        setInterval(this.updatePlanet, 10000);
    }

    getRandom(a, b) {
        return a + Math.round(Math.random() * (b - a));
    }

    onPlanetLoaded = (planet) => {
        this.setState({ planet, loading: false} );
    };

    onError = (e) => {
        this.setState({error: true, loading: false});
    };

    updatePlanet = () => {
        const id = this.getRandom(4, 20);
        console.log(id);
        this.swapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render() {
        const { planet, loading, error } = this.state;
        const spiner = (loading && !error) ? <Spiner /> : null;
        const errorIndicator = (!loading && error) ? <ErrorIndicator /> : null;
        const content = (!loading && !error) ? <PlanetView planet={planet}/> : null;


        return (
            <section className={'random-planet'}>
                <div className="row">
                    {spiner}
                    {errorIndicator}
                    {content}
                </div>
            </section>
        )
    }
};

    const PlanetView = ({planet}) => {
        const { name, population, rotationPeriod, diameter, id} = planet;

        return (

            <React.Fragment>
                <div className="col-md-3">
                    <div className="random-planet-img">
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt=""/>
                    </div>
                </div>
                <div className="col-md-9">
                    <h3>{name}</h3>
                    <ul className={'random-planet-list list-group list-group-flush'}>
                        <li className={'list-group-item random-planet-list-item'}><span className={'term'}>Population: </span><span>{population}</span></li>
                        <li className={'list-group-item random-planet-list-item'}><span className={'term'}>Rotation Period: </span><span>{rotationPeriod}</span></li>
                        <li className={'list-group-item random-planet-list-item'}><span className={'term'}>Diameter: </span><span>{diameter}</span></li>
                        <li className={'list-group-item random-planet-list-item'}><span className={'term'}>ID: </span><span>{id}</span></li>
                    </ul>
                </div>
            </React.Fragment>
        )
};