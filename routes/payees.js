const express = require('express');
const router = express.Router()
const Payee = require('../models/payee')

//All Payees Route
router.get('/', (req, res) => {
    res.render('payees/index');
})

//New Payee Route
router.get('/new', (req, res) => {
    res.render('payees/new', { payee: new Payee() });
})

//Create Payee Route
router.post('/', (req, res) => {
    const payee = new Payee({
        name: req.body.name
    })
    payee.save((err, newPayee) => {
        if(err) {
            console.log('1')
            res.render('payees/new', {
                payee: payee,
                errorMessage: 'Error creating Payee'
            })
            
        } else {
            console.log('0')
            //res.redirect(`payees/${newPayee.id}`)
            res.redirect(`payees`)
            
        }
    })
    //res.send(req.body.name)
})

module.exports = router