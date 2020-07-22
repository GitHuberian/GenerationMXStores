import React, {Component} from 'react';
import Global from '../Globals/Global';
import FavoriteStore from '../Models/FavoriteStore';
//This is my main map component

export default class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            addressArr:[],
            userFavs:[]
        }
        this.initMap = this.initMap.bind(this);
        this.geocodeAddress = this.geocodeAddress.bind(this);
        this.getAddress = this.getAddress.bind(this);
    }

    initMap() {
        let geocoder = new window.google.maps.Geocoder();

        const map = new window.google.maps.Map(document.getElementById("map"), {
            center: {
                lat: 19.432608,
                lng: -99.133209
            },
            zoom: 11,
            styles: Global.MAP_STYLES
        });

        this.geocodeAddress(geocoder, map);
    }

    geocodeAddress(geocoder, map) {
        const Favs = new FavoriteStore();

        let portionStoresArr = this.state.addressArr.slice(0, 10);

        const addFav = (marker, name, address) =>{
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            window.setTimeout(function () {
                marker.setAnimation(null);
            }, 1000);
            if(!Favs.isStored(name)){
                this.props.storedLocation(Favs.addFavorite(name, address));
            }
        };

        portionStoresArr.map(current => {
            geocoder.geocode({
                'address': current.Address
            }, function (results, status) {
                if (status == 'OK') {
                    let marker = new window.google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        title:current.Name,
                        icon: Global.MARKER_IMG
                    });
                    marker.addListener("click", function () {
                        addFav(marker, current.Name, current.Address);
                    });
                } else if (status === 'OVER_QUERY_LIMIT') {
                    setTimeout(function () {
                        console.log('Over query limit')
                        this.geocodeAddress(geocoder, map);
                    }, 300);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        });

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