export default class FavoriteStore {
    constructor() {
        this.favorite = [];
    }

    addFavorite(name, address) {
        const favorite = { name, address};
        this.favorite.push(favorite);

        // Perist data in localStorage
        this.persistData();
        return favorite;
    }

    deleteFavorite(name) {
        const index = this.favorite.findIndex(el => el.name === name);
        this.favorite.splice(index, 1);

        // Perist data in localStorage
        this.persistData();
    }

    isStored(name) {
        return this.favorite.findIndex(el => el.name === name) !== -1;
    }

    getNumfavorite() {
        return this.favorite.length;
    }

    persistData() {
        localStorage.setItem('favorite', JSON.stringify(this.favorite));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('favorite'));
        
        // Restoring favorite from the localStorage
        if (storage) this.favorite = storage;
    }
}
