import http from "../http-common"

class ExpensesDataService {

    getExpenses(card_id) {
        return http.get("/expenses/" + card_id)
    }

    postExpense(expense) {
        return http.post("/expenses", expense)
    }

    editExpense(expense) {
        return http.put("/expenses", expense)
    }

    deleteExpense(expense_id) {
        return http.delete("/expenses/" + expense_id)
    }
}

export default new ExpensesDataService();