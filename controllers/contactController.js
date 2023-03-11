const Contact = require('../models/contactModel');
const asyncHandler = require('express-async-handler');


//@desc get all contacts according to the user id
//@route Get api/contacts/
//@access private 
const getAll = async (req, res) => {
    const contacts = await Contact.find()
    if (!contacts) {
        res.status(404).send('err');
    }
    res.status(200).json(contacts);
}


//@desc create a new contacts 
//@route Post api/contacts/
//@access private 
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    const contact = await Contact.create({ name, email, phone });
    res.status(200).json(contact)
})

//@desc get a specific contact 
//@route Get api/contacts/:id
//@access private 
const getContact = async (req, res) => {
    if (req.params.id.length != 24) {
        res.status(404).send("contact not founded");
        return;
    }
    const user = await Contact.findById(req.params.id);
    if (!user) {
        res.status(404).send("contact not founded");
        return;
    } else {
        res.status(201).json(user);
    }
}


//@desc update a existing contacts 
//@route Put api/contacts/:id
//@access private 
const updateContact = async (req, res) => {
    const user = await Contact.findById(req.params.id);
    if (!user) {
        res.status(404).send('not found');
    }
    const userUpdated = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(201).json(userUpdated);
}

//@desc delete a existing contacts 
//@route Delelte api/contacts/:id
//@access private 
const deleteContact = (req, res) => { res.status(201).send('deleting a user '); }

module.exports = { getAll, createContact, getContact, updateContact, deleteContact }