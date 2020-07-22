import React, { Component } from 'react';
import Toolbar from './Toolbar/Toolbar';
import StoredLocations from './StoredLocations/StoredLocations';
import FavoriteStore from './Models/FavoriteStore';
import Map from './Map/Map';
/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class YourComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
      activeList: false,
      store:[],
      favObject:{}
    }
    this.openList = this.openList.bind(this);
  }

  openList = (active) =>{
    this.setState({
      activeList: active
    })
  }

  storedLocation = (favorites) =>{
    const { store } = { ...this.state };
    const currentState = store;
    currentState.push(favorites);

    this.setState({ 
      store: currentState 
    });
    
  }

  componentWillMount(){
    const Favs = new FavoriteStore();
    Favs.readStorage();
    this.setState({
      favObject:Favs,
      store: Favs.favorite
    });
  }

  render() {
    return (
      <div className='divStyle'>
		  <h1> Put your solution here!</h1>
      <p>Show me the map, please!</p>
      <div className='main'>
        <Toolbar openList={this.openList} active={this.state.activeList}></Toolbar>
        <Map storedLocation={this.storedLocation} Favs={this.state.favObject}></Map>
        <StoredLocations activeList={this.state.activeList} newFavorite={[...new Set(this.state.store)]}></StoredLocations>
      </div>
      </div>
    );
  }
}

