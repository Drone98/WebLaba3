import React from 'react'
import SelectedCity from './selectedCity'

class SelectedCityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            items: []
        }
    }

    componentDidMount() {
        this.props.axios.get("http://localhost:8080/favourites")
            .then(response => {
                this.setState({
                    items: response.data
                });
            })
            .catch(error => {
                this.setState({
                    items: error.data
                });
            })
    }

    addItem(event) {
        let name = event.target['city'].value;
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        this.props.axios.post("http://localhost:8080/favourites", null, {
            params: {
                city: name,
            }
        })
            .then(response => {
                this.setState({
                    items: [
                        ...this.state.items,
                        {
                            name: name
                        }
                    ]
                });
            })
            .catch(error => {
                switch (error.response.status) {
                    case 500:
                        this.state.error(name, "Проблема с БД");
                        break;
                    case 400:
                        this.state.error(name, "Город " + name + " уже добавлен");
                        break;
                    default:
                        this.state.error(name, "Неизвестная ошибка");
                }

            });

        event.preventDefault();
    }
    getItems() {
        let items = [];
        this.state.items.forEach(item => {
            items.push(<SelectedCity axios={this.props.axios} key={item.name} name={item.name} delete={this.deleteItem.bind(this)}/>);
        });
        return items;
    }

    deleteItem(name) {
        this.props.axios.delete("http://localhost:8080/favourites", {
            params: {
                city: name,
            }
        });


        this.setState({
            items: this.state.items.filter(item => {
                return item.name !== name
            })
        })
    }


    render() {
        return (
            <div className="container">
                <div className="header">
                    <div className="part">Избранное</div>

                    <form onSubmit={this.addItem.bind(this)}>
                        <input name="city" type="text" placeholder="Введите название города..."/>
                        <button className="itemsButton" type="submit">+</button>
                    </form>
                </div>

                <div className="items">{this.getItems()}</div>
            </div>
        );
    }
}

export default SelectedCityList;