import React from "react";

class Loader extends React.Component {
    render() {
        return (
            <div className='loader'>
                <b>Загрузка</b>
                <img className='loading-icon' src={require('../resources/loading.gif')} alt=""/>
            </div>
        );
    }
}

export default Loader;