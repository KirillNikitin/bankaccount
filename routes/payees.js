const express = require('express');
const router = express.Router()
const Payee = require('../models/payee')

//All Payees Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const payees = await Payee.find(searchOptions)
        res.render('payees/index', { 
            payees: payees,
            searchOptions: req.query
        });
    } catch {
        res.redirect('/')
    }    
})

//New Payee Route
router.get('/new', (req, res) => {
    res.render('payees/new', { payee: new Payee() });
})

//Create Payee Route
router.post('/', async (req, res) => {
    const payee = new Payee({
        name: req.body.name
    })
    try {
        const newPayee = await payee.save()
        //res.redirect(`payees/${newPayee.id}`)
        res.redirect(`payees`)
    } catch {
        res.render('payees/new', {
            payee: payee,
            errorMessage: 'Error creating Payee'
        })
    }
    /*payee.save((err, newPayee) => {
        if(err) {
            res.render('payees/new', {
                payee: payee,
                errorMessage: 'Error creating Payee'
            })
            
        } else {
            //res.redirect(`payees/${newPayee.id}`)
            res.redirect(`payees`)
            
        }
    })*/
    //res.send(req.body.name)
})

module.exports = router