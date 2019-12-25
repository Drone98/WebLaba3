import React from 'react'
import {connect} from 'react-redux';
import Loader from './loader';
import Error from "./error";
import City from "./city";

class SelectedCity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: true
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.props.axios.get("http://localhost:8080/weather", {
            params: {
                city: this.props.name,
            }
        })
            .then(response => {
                this.setState({
                    data: response.data,
                    loading: false,
                })
            })
            .catch(error => {
                let msg = "Проблемы с интернет соединением";
                if (error.response) {
                    if (error.response.status === 404) {
                        msg = "Город не найден";
                        setTimeout(() => this.props.delete(this.props.name), 5000);
                    } else {
                        msg = "Проблемы с сервером"
                    }
                }

                this.setState({
                    data: msg,
                    loading: false,
                    error: true
                })
            });
    }

    delete() {
        this.props.delete(this.props.name)
    }

    render() {
        if (this.state.loading) {
            return (
                <Loader/>
            )
        }
        else {
            if (this.state.error) {
                return (
                    <Error message={this.state.data} delete={this.delete.bind(this)} name={this.props.name}/>
                )
            }
            return(
                <div className="loader" >
                    <div className="header">
                        <b>{this.state.data.name}</b>
                        <span className="item-temp">{this.state.data.main.temp + " \u2103"}</span>
                        <img className="item-icon" src={'//openweathermap.org/img/wn/' + this.state.data.weather[0].icon + '@2x.png'}
                             alt="img"/>
                        <button className="itemsButton" id="delete" onClick={this.delete.bind(this)}>x</button>
                    </div>
                    <div className="item-entry">
                        <City data={this.state.data}/>
                    </div>
                </div>
            );
        }

    }
}

export default SelectedCity;