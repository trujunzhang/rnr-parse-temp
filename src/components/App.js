import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';

const {loadShippingTasks,clientRequestAShipment} = require('../actions');


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"wanghao",
            shippingTasks: props.shippingTasks
        }
    }

    componentWillReceiveProps(nextProps) {
        debugger
        this.setState({
            shippingTasks: nextProps.shippingTasks
        })
    }

    componentDidMount() {
        this.props.dispatch(loadShippingTasks());
    }

    render() {
        const {shippingTasks}= this.state;
        if(shippingTasks){
debugger
        }

    return (
      <div className="App">
        <header>
          <h1><code>Create React App Parse Redux App</code></h1>
          <p>A somewhat hefty boiler plate using create-react-app with a Parse backend</p>
        </header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </nav>
        {this.props.children}
        <footer>
            <p><a href="https://github.com/zebapy/create-react-app-parse-redux">View on GitHub</a></p>
            <h1>{this.state.name}</h1>
            <div>
                <button
                    onClick={this.onSaveGameHandler.bind(this)}
                >save game</button>
            </div>
        </footer>
      </div>
    );
  }

    onSaveGameHandler(){
        this.setState({name:"game"});

        const {dispatch} = this.props;
        try {
            dispatch(clientRequestAShipment());
        } catch (e) {
            const message = e.message || e;
            if (message !== 'Timed out' && message !== 'Canceled by user') {
                console.warn(e);
            }
        } finally {
        }
    }
}

/**
 * ## Imports
 *
 * Redux
 */
import {connect} from 'react-redux'

function select(store) {
    return {
        shippingTasks: store.shippingTasks
    };
}


/**
 * Connect the properties
 */
module.exports = connect(select)(App);
export default connect(select)(App);
