import http from "../http-common"

class CardsDataService {

    getCards(user) {
        return http.get("/cards/" + user)
    }
}

export default new CardsDataService();