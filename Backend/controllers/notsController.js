
const Note = require('../models/note');


// Sabhi Notes nikalne ke liye (kisi bhi category ke ho, sirf apne User ke)
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user_id: req.user._id });   // Sirf apne, sab categories

    return res.status(200).json({
      success: true,
      message: 'All notes fetched successfully',
       user: req.user,
       data: notes,
    });
  } catch (error) {
    console.error('Get All Notes Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};


const getNotesByCategory = async (req, res) => {
  try {
    const notes = await Note.find({ 
      category_id: req.params.categoryId,
      user_id: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: 'Notes fetched successfully',
      data: notes,
    });
  } catch (error) {
    console.error('Get Notes By Category Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Something went wrong. Please try again later.' 
    });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, description, todos, category_id,user_id } = req.body;
    const newNote = new Note({
      title,
      description,
      todos: todos || [], // Array of [{ task_text, is_completed }]
      category_id,
      user_id
    });
    await newNote.save();
    return res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: newNote,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: updatedNote,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {getAllNotes, getNotesByCategory, createNote, updateNote, deleteNote };