import React, { Component } from 'react';
//Toolbar component
export default class Toolbar extends Component {
    constructor(props){
        super(props);
        this.activeList = this.activeList.bind(this);
    }

  activeList(){
      this.props.openList(!this.props.active);
  }

  render() {
    return (
      <div className='toolbar'>
          <div>
              <h1>Generation MX Stores</h1>
          </div>
          <button className='my_locations' onClick={this.activeList}>
              <span>My favorite stores</span>
              <div className='star'> </div>
          </button> 
      </div>
    );
  }
}


