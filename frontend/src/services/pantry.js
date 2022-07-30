import http from "../http-common"

class PantryDataService {

    route;

    constructor() {
        this.route = "/pantry/";
    }

    getByPlace(place) {
        return http.get(this.route + place)
    }

    addObject(object) {
        return http.post(this.route, object)
    }

    deleteObject(object_id) {
        return http.delete(this.route + "delete/" + object_id)
    }

    itemsBought() {
        return http.delete(this.route + "bought")
    }

    editObject(object_edited) {
        return http.put(this.route, object_edited)
    }
}

export default new PantryDataService();