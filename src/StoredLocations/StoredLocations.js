import React, { Component } from 'react';
//Toolbar component
export default class StoredLocations extends Component {

  constructor(props){
      super(props);
  }

  render() {
    return (
      <div className={this.props.activeList ? 'active_list stored_locations_list' : 'stored_locations_list'}>
        <ul>
            {
                this.props.newFavorite.map((current, index) =>
                    <li key={index} className={this.props.clicked === current.name ? 'set_highlight':''}>
                        <h3>{current.name}</h3>
                        <p>{current.address}</p>
                    </li>)
            }
        </ul>
    </div>
    );
  }
}