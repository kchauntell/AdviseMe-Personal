const express = require('express');
const asyncHandler = require('express-async-handler');
const { Notebook, Note, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const notebooks = await Notebook.findAll({ include: [Note, User]});
  return res.json(notebooks);
}));




module.exports = router;
