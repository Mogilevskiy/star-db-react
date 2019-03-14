import React, { Component } from 'react';

import './people-page.css';

import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import ErrorIndicator from "../error-indicator";
import Row from "../row";
import ErrorBoundary from "../error-boundary";


export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        itemId: 3,
        hasError: false
    };

    selectedPeople = (id) => {
        this.setState({ itemId: id })
    };

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true})
    }

    render() {
        const itemDetails = (
            <ItemDetails itemId={ this.state.itemId }
                         getData = {this.swapiService.getPerson}/>
            )
        ;

        const itemList = (
            <ItemList onSelectedItem = { this.selectedPeople }
                      getData = {this.swapiService.getAllPeople} >

                {(i) => (`${i.name} ${i.birthYear}`)}

            </ItemList>
            )
        ;

        if(this.state.hasError) {
            return <ErrorIndicator />
        }

        return (
            <ErrorBoundary>
                <Row left={ itemList } right={ itemDetails} />
            </ErrorBoundary>

        )
    }
}
