import http from "../http-common"

class AccountsDataService {

    get(id) {
        return http.get(`/accounts?id=${id}`)
    }

    getAccount(data) {
        console.log(data)
        const json = { user: data }
        return http.post("/accounts/account", json);
    }

    updateReview(data) {
        return http.put("/accounts/balance", data);
    }

}

export default new AccountsDataService();