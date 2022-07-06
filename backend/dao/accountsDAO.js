let accounts
export default class RestaurantsDAO {
    static async injectDB(conn) {
        if (accounts) {
            return
        }
        try {
            accounts = await conn.db(process.env.GOLDTRACKER_NS).collection("accounts")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in accountsDAO: ${e}`)
        }
    }

    static async getAccounts({
        filters = null,
        page = 0,
        accountsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("id" in filters) {
                query = { $text: { $search: filters["id"] } }
            }
        }

        let cursor

        try {
            cursor = await accounts
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { accounts: [], totalNumAccounts: 0 }
        }

        const displayCursor = cursor.limit(accountsPerPage).skip(accountsPerPage * page)

        try {
            const accountsList = await displayCursor.toArray()
            const totalNumAccounts = await accounts.countDocuments(query)

            return { accountsList, totalNumAccounts }
        } catch (e) {
            console.error(
                `Unable to convert curosr to array or problem counting documents, ${e}`
            )
            return { accountsList: [], totalNumAccounts: 0 }
        }
    }
}