import React, {Component} from 'react';
import Global from '../Globals/Global';
//This is my main map component

export default class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            addressArr:[],
            userFavs:[],
            set:0
        }
        this.initMap = this.initMap.bind(this);
        this.geocodeAddress = this.geocodeAddress.bind(this);
        this.getAddress = this.getAddress.bind(this);
    }

    initMap() {
        let geocoder = new google.maps.Geocoder();
        let storesLenght = Math.floor(this.state.addressArr.length / 10);
        const map = new google.maps.Map(document.getElementById("map"), {
            center: {
                lat: 19.432608,
                lng: -99.133209
            },
            zoom: 11,
            styles: Global.MAP_STYLES
        });
        this.geocodeAddress(geocoder, map, storesLenght);
    }
 
    geocodeAddress(geocoder, map, storesLenght){

       const addFav = (marker, name, address) => {
           this.props.openList(true, name);
           marker.setIcon(Global.MARKER_IMG);
           marker.setAnimation(google.maps.Animation.BOUNCE);
           setTimeout(function () {
               marker.setAnimation(null);
           }, 1000);
           if (!this.props.Favs.isStored(name)) {
               this.props.storedLocation(this.props.Favs.addFavorite(name, address));
           }
       };

       const addMarker = (set) =>{
            let portionStoresArr = this.state.addressArr.slice(set-10, set);
            portionStoresArr.map(current => {
                geocoder.geocode({
                    'address': current.Address
                }, function (results, status) {
                    if (status == 'OK') {
                        let marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            title: current.Name,
                            icon: Global.MARKER_IMG_LIGHT
                        });
                        marker.addListener("click", function () {
                            addFav(marker, current.Name, current.Address);
                        });
                    } else if (status === 'OVER_QUERY_LIMIT') {
                        setTimeout(function () {
                            geocodeAddress(geocoder, map, set);
                        }, 2000);
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });
       }

       (function delayingInsert(i) {
           setTimeout(function () {
               addMarker(i*10);
               if (--i) delayingInsert(i);
           }, 3000)
       })(storesLenght);

    }

    getAddress(){
        let addressArr = [];

        fetch(Global.JSON_FILE)
        .then(results => results.json())
        .then(stores => stores.map(current =>
            addressArr.push(current)));
        
        this.setState({
            addressArr:addressArr
        })
    }

    componentDidMount() {
        if (!window.google) {
            //creating a script tag element to add to the html document
            let scriptTag = document.createElement('script');
            //properties
            scriptTag.type = 'text/javascript';
            //source of the google maps url
            scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key='+Global.GOOGLE_API_KEY;
            let node = document.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(scriptTag, node);
            // listener for load
            scriptTag.addEventListener('load', e => {
                this.initMap()
            })
        } else {
            this.initMap()
        }
        this.getAddress();
    }

    render() {
        return (
        <div style={{ width: 'auto', height: 800 }} id="map" />
        );
    }
}