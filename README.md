Generation Take-Home Coding Challenge
=================================
This is the repository for the take-home coding challenge.

### App Capture

![APP capture](https://github.com/GitHuberian/GenerationMXStores/blob/master/genmxss1.JPG)

### Running App

Clone the repo

Run
```
npm install
npm start
open http://localhost:3000
```

### How GenerationMXStores App:octocat: works

* The application displays a map zoomed on Mexico City, which is the city where the stores are located.

* The pin/marker of each store will appear with a delay because the google maps API does not allow a repeated query in a short time, therefore, they are added with a delay of 3 seconds each set of stores (10 stores per set).

* When you click on a pin/marker, the name and address of the store are added to the 'Favorites' list component and highlighted with a blue color.

* The app allows local storing. When you reload the page you will be able to see the list of stores added to the 'Favorites' list before the reload.

* If you click again on the store pin/marker and it has already been added, it will be highlighted with a blue color in the 'Favorites' list component.

### User Stories solved in this project

* GenerationMXStores App:octocat: is the result after reading intro and next steps on localhost:3000 on the first run of the boilerplate provided by Generation
* GenerationMXStores App:octocat: was embeded in `src/YourComponent.js` 

**User Stories**:
- [x]  As a student, I want to see a map of Mexico City
- [x]  As a student, I want to see a map that has all the stores represented as markers/pins on the map
- [x]  As a student, I want to be able to click on a store and add it to a list of 'My Favorite Stores'

### Boilerplate source

Generation boilerplate (https://github.com/digital-generation/generation-take-home). This boilerplate project is a mirror plus a few additions from gaearon's react boilerplate (https://github.com/gaearon/react-hot-boilerplate)
