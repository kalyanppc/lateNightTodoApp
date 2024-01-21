const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

mongoose.connect('mongodb+srv://kalyanppc:8m901HsB9dku8UVb@cluster0.4tv9pkp.mongodb.net/lateNightTodos');


const UserSchema = new mongoose.Schema({
      username: String,
      password: String
      // todoList: [mongoose.Types.ObjectId]
})
const TodoSchema = new mongoose.Schema({
      title: String,
      description: String,
      isAnswered: Boolean,
})

const Todo = mongoose.model('todos',TodoSchema);
const User = mongoose.model('todoUsers',UserSchema);

module.exports = {
      User,
      Todo
}