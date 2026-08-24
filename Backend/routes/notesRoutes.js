const express = require('express');
const router = express.Router();
const {
  getAllNotes,
  getNotesByCategory,
  createNote,
  updateNote,
  deleteNote,
  
} = require('../controllers/notsController');
// notsRoutes.js
const { protect } = require('../middlewares/authMiddleware');

router.get('/all', protect, getAllNotes);   // 👈 "protect" beech me daala  
router.get('/:categoryId', getNotesByCategory);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;