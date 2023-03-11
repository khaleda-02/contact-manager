const { Router } = require('express');
const router = Router();
const validateToken = require('../middleware/tokenValidation');
const { getAll, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController');

router.use(validateToken);

router
    .get('/', getAll)
    .post('/', createContact)
    .get('/:id', getContact)
    .put('/:id', updateContact)
    .delete('/:id', deleteContact)

module.exports = router; 