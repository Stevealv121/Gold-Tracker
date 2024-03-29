import http from "../http-common"

class ExpensesDataService {

    getExpenses(card_id) {
        return http.get("/expenses/" + card_id)
    }

    getExpensesByMonth(card_id, since, to) {
        return http.get("/expenses/" + card_id + "/" + since + "/" + to)
    }

    getDebtByMonth(user, month) {
        return http.get("/expenses/" + user + "/" + month)
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