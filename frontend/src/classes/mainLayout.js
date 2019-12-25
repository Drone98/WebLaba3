import React from 'react'
import '../styles/style.css'
import LocalWeather from "./localWeather";
import SelectedCityList from "./selectedCityList";

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div  id="main_layout">
                <LocalWeather axios={this.props.axios} />
                <SelectedCityList axios={this.props.axios}  />
            </div>
        );
    }
}

export default MainLayout;

