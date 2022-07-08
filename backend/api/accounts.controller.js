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

    static async apiUpdateAccount(req, res, next) {
        try {
            const accountId = req.body.account_id
            const balance = req.body.balance
            //const date = new Date()

            const accountResponse = await AccountsDAO.updateAccount(
                accountId,
                req.body.user,
                balance,
                //date,
            )

            var { error } = accountResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (accountResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update account - user may not be the creator",
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}