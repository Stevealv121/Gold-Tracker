import http from "../http-common"

class CashFlowDataService {

    getCashflow(type, user) {
        return http.get("/cashflow/" + type + "/" + user)
    }

    postCashFlow(item) {
        return http.post("/cashflow", item)
    }

    editCashFlow(item) {
        return http.put("/cashflow", item)
    }

    deleteCashFlow(item_id) {
        return http.delete("/cashflow/" + item_id)
    }
}

export default new CashFlowDataService();