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

    editCard(card_edited) {
        return http.put("/cards/edit", card_edited)
    }
}

export default new CardsDataService();