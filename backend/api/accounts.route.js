import express from "express"
import AccountsCtrl from "./accounts.controller.js"

const router = express.Router()
router.route("/")
    .get(AccountsCtrl.apiGetAccounts)

router
    .route("/balance")
    .get()
    .put(AccountsCtrl.apiUpdateAccount)
export default router