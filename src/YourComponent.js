import React, { Component } from 'react';
import Toolbar from './Toolbar/Toolbar';
import StoredLocations from './StoredLocations/StoredLocations';
import FavoriteStore from './Models/FavoriteStore';
import Global from './Globals/Global';
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
      stores:[],
      favObject:{},
      favorite:'',
    }
    this.openList = this.openList.bind(this);
  }

  openList = (active, favorite) =>{
    this.setState({
      activeList: active,
      favorite: favorite
    });
  }

  storedLocation = (favorites) =>{
    const { stores } = { ...this.state };
    const currentState = stores;
    currentState.push(favorites);

    this.setState({ 
      stores: currentState 
    });
  }

  componentWillMount(){
    const Favs = new FavoriteStore();
    Favs.readStorage();
    this.setState({
      favObject:Favs,
      stores: [...new Set(Favs.favorite)]
    });
  }

  render() {
    return (
      <div className='divStyle'>
		  <h1> Put your solution here!</h1>
      <p>Show me the map, please!</p>
      <div className='main'>
        <Toolbar openList={this.openList} active={this.state.activeList}></Toolbar>
        <Map storedLocation={this.storedLocation} Favs={this.state.favObject} openList={this.openList} ></Map>
        <StoredLocations activeList={this.state.activeList} newFavorite={this.state.stores} clicked={this.state.favorite} ></StoredLocations>
      </div>
      </div>
    );
  }
}

