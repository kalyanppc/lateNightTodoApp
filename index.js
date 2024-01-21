const express = require('express');
const { User, Todo } = require('./db');
const { isAnyArrayBuffer } = require('util/types');
const app = express();

app.use(express.json()); // this is used to parse json data.

app.get('/',(req,res)=>{
      res.json({
            msg: "this is home page"
      })
})
app.post('/signup',async (req,res)=>{
      const {username,password} = req.body;
      const user = await User.findOne({  //null
            username,
            password
      })
      if(user){
            return res.status(500).json({
                  msg: "this user already exists"
            })
      }
      const newUser = await User.create({
            username,
            password
      })
      console.log(newUser);
      const userId = newUser._id;
      console.log(userId);
      res.json({
            msg: 'new user created',
            id: userId
      });
})
app.post('/signin', async (req,res)=>{
      const {username,password} = req.body;
      const user = await User.findOne({
            username,
            password
      })
      if(!user){
            return res.status(411).json({
                  msg: 'this user doesnot exist'
            })
      }
      res.json({
            msg: 'the sign in is completed'
      })
})
app.post('/addTodo',async (req,res)=>{
      const {todoTitle,todoDescription} = req.body;
      console.log(todoDescription);
      console.log(todoTitle);
      const newTodo = await Todo.create({
            title: todoTitle,
            description: todoDescription,
            isAnswered: false
      })
      console.log(newTodo);
      const TodoId = newTodo._id;
      res.json({
            msg: 'the new todo is added',
            _id: TodoId
      })
})
app.put('/setAsComplete', async (res,res)=>{
      const {_id} = req.body;
      const todo = await Todo.updateOne({
            _id
      },{
            isAnswered: false ? isAnswered : true
      });
      res.json({
            msg: "the todo has been set to answered",
            todo
      })
})
app.get('/answeredTodos', async (req,res)=>{
      const todos = await Todo.find({});
      console.log(todos);
      const answeredTodos = todos.filter(function(todo){
            if(todo.isAnswered){
                  return true
            }else{
                  return false
            }}
      )
      res.json({answeredTodos})
})

app.get('/displayAllTodos',async (req,res)=>{
      const todos = await Todo.find({});
      res.json({
            todos
      })
})
app.put('/updateTodo', async (req,res)=>{
      const {TodoId,newTitle,newDescription} = req.body;
      const updateTodo = await Todo.updateOne({
            _id: TodoId
      },{
            title: newTitle,
            description: newDescription
      })
      res.json({
            msg: 'the todo has been updated to below',
            updateTodo
      })
})
app.delete('/deleteTodo', async (req,res)=>{
      const {_id} = req.body;
      const deletedTodo = await Todo.deleteOne({
            _id
      })
      req.json({
            msg: "the todo was deleted",
            deletedTodo
      })
})
app.get('/incompletedTodos', async (req,res)=>{
      const todos = await Todo.find({});
      console.log(todos);
      const answeredTodos = todos.filter((todo)=>{return !todo.isAnswered})
      res.json({answeredTodos}) 
})
app.listen(3000,()=>{
      console.log('This code is working');
})



