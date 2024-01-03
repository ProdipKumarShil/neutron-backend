const express = require('express');
const router = express.Router()
const Contact = require('../models/contact.model')

router.use(express.json());

// get all the contacts
router.get('/allContacts', async(req, res) => {
  try {
    const allContacts = await Contact.find();
    res.send({contact: allContacts})
  } catch (e) {
    res.status(500).send({
      status: false,
      message: 'Failed to fetch contacts',
      error: e.message,
    });
  }
})
// create contact
router.post('/postContact', async(req, res) => {
  try {
    const newContact = new Contact(req.body)
    const result = await newContact.save();
    res.send({
      status: true,
      message: "Data Inserted Successful"
    })
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Data Inserted Fail"
    });
  }
})
// delete contact
router.delete('/deleteContact/:id', async(req, res) => {
  try{
    const id = req.params.id;
    const deleteContact = await Contact.findByIdAndDelete(id)
    if(deleteContact) {
      res.send({
        status: true,
        message: "Contact Deleted Successfully",
      })
    } else {
      res.status(404).send({
        status: false,
        message: "Contact not found"
      });
    }
  } catch(e) {
    res.status(500).send({
      status: false,
      message: "Error deleting contact",
      error: e.message
    });
  }
})
// update contact
router.put('/updateContact/:id', async(req, res) => {
  const id = req.params.id
  const newContact = req.body
  try{
    const updateData = await Contact.findByIdAndUpdate(id, newContact, {new: true})
    if(!updateData){
      return res.status(404).json({
        status: false,
        message: "Contact not found",
      })
    }
    res.json({
      status: true,
      message: "Contact Updated Successfully",
    })
  } catch(e){
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    })
  }
})

module.exports = router
