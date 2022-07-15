import http from "../http-common"

class AccountsDataService {

    get(id) {
        return http.get(`/accounts?id=${id}`)
    }

    getAccount(data) {
        const json = { user: data }
        return http.post("/accounts/account", json);
    }

    updateBalance(data) {
        return http.put("/accounts/balance", data);
    }

}

export default new AccountsDataService();