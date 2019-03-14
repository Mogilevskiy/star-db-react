import React, { Component }from 'react';

import './item-list.css'
import Spiner from "../spiner";


export default class ItemList extends Component {

    state = {
        itemList: null
    };

    componentDidMount() {
        const {getData} = this.props;
        getData()
            .then((itemList) => {
            this.setState({ itemList });
        });
    }

    renderItems(arr){
            return arr.map((item) => {
                const { id } = item;
                console.log(this.props)
                const label = item.name;
                return(
                    <li className={'list-group-item item-list-item'}
                        onClick={() => this.props.onSelectedItem(id)}
                        key={id}>
                        { label }
                    </li>
                )
            })
    };

    render() {
        const { itemList } = this.state;
        const content = (itemList) ? this.renderItems(itemList) : null;
        const spiner = (!itemList) ? <Spiner /> : null;

        return(
            <section className={'item-list'}>
                        {spiner}
                        <ListDetailsView content={content}/>

            </section>
        )
    }
};


const ListDetailsView = ({content}) => {
    return(
        <ul className={'list-group item-list'}>
            {content}
        </ul>
    )
};
