import http from "../http-common"

class CardsDataService {

    getCards(user) {
        return http.get("/cards/" + user)
    }

    postCard(card) {
        return http.post("/cards/new", card)
    }

    deleteCard(card_id) {
        return http.delete("/cards/" + card_id)
    }
}

export default new CardsDataService();