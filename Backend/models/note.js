
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  
  // 🟢 Checklist Tasks का Array
  todos: [
    {
      task_text: { type: String, required: true }, // जैसे: "Doodh lana hai"
      is_completed: { type: Boolean, default: false } // Check/Uncheck का स्टेटस
    }
  ],

  // Connected Category ID
  category_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
    required: true 
  },
  // user id
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
});
module.exports = mongoose.model('nots', noteSchema); 