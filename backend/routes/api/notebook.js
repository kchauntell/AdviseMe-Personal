const express = require('express');
const asyncHandler = require('express-async-handler');
const { Notebook, Note, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const notebooks = await Notebook.findAll({ include: [Note, User]});

  return res.json(notebooks);
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const notebook = await Notebook.findByPk(req.params.id, { include: [Note, User] });
  return res.json(notebook)
}));

//Create Notebook
router.post('/', requireAuth, asyncHandler(async(req, res) => {
  const {
    title,
    genre,
    hidden,
    userId,
  } = req.body

  const newNotebook = await Notebook.create({
    title,
    genre,
    hidden,
    userId
  })
  console.log(newNotebook);
  res.json(newNotebook)
}))

//Edit Notebook
router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
  const id = await Notebook.update(req.body);
  const notebook = await Notebook.one(id);
  return res.json(notebook);
}));


//delete Notebook
router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const notebookId = req.params.id;

  const notebook = await Notebook.findByPk(notebookId);

  if (notebook && notebook.userId === userId) {
    await notebook.destroy();
    res.json('success');
  } else {
    next(error)
  }
}))


module.exports = router;
