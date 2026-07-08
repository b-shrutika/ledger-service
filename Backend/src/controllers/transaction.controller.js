const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");
const emailService = require("../services/email.service");
const accountModel = require("../models/account.model");
const mongoose = require("mongoose")


async function createTransaction(req, res) {
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "FromAccount, toAccount, amount and idempotencyKey are required"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount,
    })
    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    })

    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "Invalid fromAccount or toAccount"
        })
    }

    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })

    if (isTransactionAlreadyExists) {
        if (isTransactionAlreadyExists.status = "COMPLETED") {
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: isTransactionAlreadyExists
            })
        }
        if (isTransactionAlreadyExists.status = "PENDING") {
            return res.status(200).json({
                message: "Transaction is still being processed"
            })
        }
        if (isTransactionAlreadyExists.status = "FAILED") {
            return res.status(500).json({
                message: "Transaction processing failed"
            })
        }
        if (isTransactionAlreadyExists.status = "REVERSED") {
            return res.status(500).json({
                message: "Transaction was reversed, please retry"
            })
        }
    }

    if (fromUserAccount.status !== 'ACTIVE' || toUserAccount.status !== 'ACTIVE') {
        return res.status(500).json({
            message: "Both fromAccount and toAccount must be ACTIVE to process transaction"
        })
    }

    // DERIVE SENDER BALANCE FROM LEDGER
    const balance = await fromUserAccount.getBalance()

    if (balance < amount) {
        return res.status(400).json({
            message: `Insufficient balance. Current balance is ${balance}. Requested amount is ${amount}`
        })
    }
    try {

        const session = await mongoose.startSession()
        session.startTransaction()

        const transaction = (await transactionModel.create({
            fromAccount,
            toAccount,
            amount,
            idempotencyKey,
            status: "PENDING"
        }, { session }))[0]

        const debitLedgerEntry = await ledgerModel.create([{
            account: fromAccount,
            amount: amount,
            transaction: transaction._id,
            type: "DEBIT"
        }], { session })

        await (() => {
            return new Promise((resolve) => setTimeout(resolve, 15 * 1000))
        })

        const creditLedgerEntry = await ledgerModel.create([{
            account: toAccount,
            amount: amount,
            transaction: transaction._id,
            type: "CREDIT"
        }], { session })

        transaction.status = "COMPLETED";
        await transaction.save({ session })
    } catch (error) {
        return res.status(400).json({
            message: "Transaction is Pending due to some issue please retry after some time."
        })
    }
    await session.commitTransaction()
    session.endSession()

    await emailService.sendTransactionEmail(req.user.email, req.user.name, amount, toUserAccount);
    return res.status(201).json({
        message: "Transaction completed successfully",
        transaction: transaction
    })
}


async function createInitialFundsTransaction(req, res) {
    const { toAccount, amount, idempotencyKey } = req.body;

    if (!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "toAcount, amount and idempotencyKey are required"
        })
    }

    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    })

    if (!toUserAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        user: req.user._id
    })

    if (!fromUserAccount) {
        return res.status(400).json({
            message: "System user account not found"
        })
    }

    const session = await mongoose.startSession()

    session.startTransaction()

    const transaction = (await transactionModel.create({
        fromAccount: fromUserAccount._id,
        toAccount: toUserAccount._id,
        amount,
        idempotencyKey,
        status: "PENDING"

    }, { session }))[0]

    const debitLedgerEntry = await ledgerModel.create([{
        account: fromUserAccount._id,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT"
    }], { session })
    const creditLedgerEntry = await ledgerModel.create([{
        account: toUserAccount._id,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT"
    }], { session })

    await transactionModel.findOneAndUpdate({
        _id: transaction._id
    },
        { status: "COMPLETED" },
        { session }
    )

    await session.commitTransaction()
    session.endSession()

}

module.exports = {
    createTransaction, createInitialFundsTransaction
}