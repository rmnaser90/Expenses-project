const express = require('express')
const router = express.Router()
const moment = require('moment')
const mongoose = require('mongoose')
const { update } = require('../../models/expense')
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

const updateGroup = async function (group1, group2) {
    const result = Expense.findOneAndUpdate({ group: group1 }, { group: group2 })
    return result
}
const findGroup = async function (group, total) {

    if(total) {
        const result = await Expense.aggregate([
            {$match: {group}},
            {$group: 
                        { _id: null, 
                        totalExpenses: { $sum: "$amount" } }}
        ])
        return result
    }
    const result = await Expense.find({group})
    return result
}



router.get('/expenses', function (req, res) {
    getExpenses().then(r => res.send(r))
})


router.post('/expense', function (req, res) {
    const newExpense = req.body
    addExpense(newExpense).then((err, result) => res.send({ err, result }))
})


router.put('/update', function (req, res) {
    const group1 = req.body.group1
    const group2 = req.body.group2
    updateGroup(group1, group2).then(e => res.send(e.name))

})


router.get('/expenses/:group', function (req, res) {
const group = req.params.group
const total = req.query.total
console.log(total);
findGroup(group, total).then(g => res.send(g))
})



module.exports = router