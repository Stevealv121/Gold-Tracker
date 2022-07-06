import AccountsDAO from "../dao/accountsDAO.js"

export default class AccountsController {
    static async apiGetAccounts(req, res, next) {
        const accountsPerPage = req.query.accountsPerPage ? parseInt(req.accountsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}

        if (req.query.id) {
            filters.id = req.query.id
        }

        const { accountsList, totalNumaccounts } = await AccountsDAO.getAccounts({
            filters,
            page,
            accountsPerPage
        })

        let response = {
            accounts: accountsList,
            page: page,
            filters: filters,
            entries_per_page: accountsPerPage,
            total_results: totalNumaccounts,
        }
        res.json(response)
    }
}