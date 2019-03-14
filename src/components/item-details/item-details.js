import React, {Component} from 'react';

import './item-details.css';

import Spiner from "../spiner";

const Record = ({field, label, item}) => {
    console.log(item)
    return(
        <li className={'list-group-item item-details-list-item'}><span>{label}</span><span>{item[field]}</span></li>
    )
};

export {
    Record
}

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
        imageUrl: null
    };

    componentDidMount() {
        this.updateItem(this.props.itemId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId === prevProps.itemId) {
            return
        }
        this.updateItem(this.props.itemId)
    }

    updateItem() {
        const { getData, itemId, getImageUrl } = this.props;
        this.setState({loading: true});
        getData(itemId)
            .then((item) => {
                this.setState({item, imageUrl: getImageUrl(itemId) ,loading: false})
            });
    }

    render() {
        const { item, loading, imageUrl } = this.state;

        if (loading) {
            return(
                <Spiner />
            )
        }

        return (
            <section className={'item-details'}>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="item-details-img">
                            <img src={ imageUrl } alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <h3>{item.name}</h3>
                        <ul className={'list-group list-group-flush item-details-list'}>
                            {
                                React.Children.map(this.props.children, (child) => {
                                    console.log(this.props);
                                    return React.cloneElement(child, { item })
                                })
                            }

                            {/*<li className={'list-group-item item-details-list-item'}><span>Gender:</span><span>{item.gender}</span></li>*/}
                            {/*<li className={'list-group-item item-details-list-item'}><span>Birth Year:</span><span>{item.birthYear}</span></li>*/}
                            {/*<li className={'list-group-item item-details-list-item'}><span>Height:</span><span>{item.height}</span></li>*/}
                            {/*<li className={'list-group-item item-details-list-item'}><span>Mass:</span><span>{item.mass}</span></li>*/}
                            {/*<li className={'list-group-item item-details-list-item'}><span>Eye color:</span><span>{item.eyeColor}</span></li>*/}
                        </ul>
                    </div>
                </div>
            </section>
        )
    }

}

