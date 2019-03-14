import React, {Component} from 'react';

import './app.css';
import Header from '../header';
import  RandomPlanet from '../random-planet'
import ItemList from "../item-list";
import ItemDetails, { Record } from "../item-details/item-details";
import SwapiService from "../../services/swapi-service";
import ErrorBoundary from "../error-boundary";


export default class App extends Component{

    swapiService = new SwapiService();

    state = {
        personId: 1,
    };

    selectedPeople = (id) => {
        this.setState({ personId: id})
    };

    render() {
        const { getStarshipImage, getPerson, getPersonImage, getStarship, getAllPeople } = this.swapiService;
        return (

            <ErrorBoundary>
                <div className={'container'}>

                    <Header />

                    <RandomPlanet />
                    <div className="row">
                        <div className="col-md-6">
                            <ItemList getData = { getAllPeople }
                                      onSelectedItem = { this.selectedPeople }/>
                        </div>
                        <div className="col-md-6">
                            <ItemDetails itemId={ this.state.personId }
                                         getData = { getPerson }
                                         getImageUrl = { getPersonImage } >
                                <Record field = 'gender' label = 'Gender:'/>
                                <Record field = 'eyeColor' label = 'Eye Color:'/>
                                <Record field = 'birthYear' label = 'Birth Year:'/>
                                <Record field = 'height' label = 'Height:'/>
                            </ItemDetails>
                        </div>
                    </div>

                    {/*<ItemList getData = { getAllPeople }*/}
                              {/*onSelectedItem = { this.selectedPeople }/>*/}
                    {/*<ItemDetails itemId={ this.state.personId }*/}
                                 {/*getData = { getPerson }*/}
                                 {/*getImageUrl = { getPersonImage } >*/}
                        {/*<Record field = 'gender' label = 'Gender:'/>*/}
                        {/*<Record field = 'eyeColor' label = 'Eye Color:'/>*/}
                    {/*</ItemDetails>*/}
                    {/*<ItemDetails itemId={ 11 }*/}
                                 {/*getData = { getStarship }*/}
                                 {/*getImageUrl = { getStarshipImage } >*/}
                        {/*<Record field = 'name' label = 'Name:'/>*/}
                        {/*<Record field = 'starship_class' label = 'Starship class:'/>*/}
                        {/*<Record field = 'cost_in_credits' label = 'Cost:'/>*/}
                        {/*<Record field = 'length' label = 'Length:'/>*/}
                    {/*</ItemDetails>*/}

                </div>
            </ErrorBoundary>
        )
    }
}
