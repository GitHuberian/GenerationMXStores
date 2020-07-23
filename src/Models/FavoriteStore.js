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

    isStored(name) {
        return this.favorite.findIndex(el => el.name === name) !== -1;
    }

    persistData() {
        localStorage.setItem('favorite', JSON.stringify(this.favorite));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('favorite'));
        
        // Restoring favorite from the localStorage
        if (storage) this.favorite = [...new Set(storage)];
    }
}
