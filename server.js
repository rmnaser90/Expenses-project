const express = require('express')
const app = express()
const path = require('path')
const api = require('./server/routes/api')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expenses', { useNewUrlParser: true, useFindAndModify: true })
const Expense = require('./models/expense')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)












// data uploaded db
// const expenses = require('./expenses.json')
// expenses.forEach(e => {
//     const expense = new Expense({
//         name: e.item,
//         amount: e.amount,
//         date: e.date,
//         group: e.group
//     })
//     console.log(expense);
//     expense.save()
// })
const port = 3000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})