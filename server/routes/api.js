const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Expense = require('../../models/expense')



const getExpenses = async function () {
    const result = await Expense.find({}).sort({ date: 1 })
    return result
}

const addExpense = async function (expense) {
    const newExpense = new Expense({
        name: expense.name,
        amount: expense.amount,
        group: expense.group,
        date: expense.date || Date.now()
    })
    console.log(newExpense);
    const savePromise = await newExpense.save()
    return savePromise
}



router.get('/expenses', function (req, res) {
    getExpenses().then(r => res.send(r))
})


router.post('/expense', function (req, res) {
const newExpense = req.body
addExpense(newExpense).then((err,result) => res.send({err,result}))
})


module.exports = router