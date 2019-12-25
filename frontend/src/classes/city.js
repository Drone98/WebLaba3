import React from "react";

class City extends React.Component{
    render() {
        return (
            <ul>
                <li><span>Ветер</span> <em>{this.props.data.wind.speed} м/c</em></li>
                <li><span>Облачность</span> <em>{this.props.data.weather[0].description}</em></li>
                <li><span>Давление</span> <em>{this.props.data.main.pressure * 0.75} мм рт. ст.</em></li>
                <li><span>Влажность</span> <em>{this.props.data.main.humidity} %</em></li>
                <li><span>Координаты</span> <em>[{this.props.data.coord.lon}, {this.props.data.coord.lat}]</em></li>
            </ul>
        );
    }
}

export default City;