import http from "../http-common"

class AccountsDataService {

    get(id) {
        return http.get(`/accounts?id=${id}`)
    }

    updateReview(data) {
        return http.put("/accounts/balance", data);
    }

}

export default new AccountsDataService();