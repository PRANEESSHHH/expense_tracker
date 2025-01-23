// const http = require('http');

// const port = 8000;

// http.createServer((req, res) => {
//     res.end('Vanakam Nanba');
// }).listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// const express = require('express');
// const app = express();
// app.get('/', (req, res) => {
//     const { id } = req.query;

//     if (id) {
//         res.json(`Hello World ${id}`);
//     }
//     res.json('Hellooooo World');
// });

// const port = 8001; 
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// app.get('/:id/:name/:age', (req, res) => {
//     const { id,name,age } = req.params;

//     if (id) {
//         res.json(`Hello World ${id} and ${name} age is ${age}`);
//     }

//     res.json('Hellooooo World');
// });






// app.listen(PORT, () => {
//      console.log(`Server is running on port ${PORT}`);
//  });

// const mongourl = "mongodb://localhost:27017/practice";
// mongoose
// .connect(mongourl)
// .then(() => {
//     console.log("MongoDB connected");
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
// })

const express = require('express');
const app = express();
const { mongoose } = require('mongoose');
const PORT = 1204;
app.use(express.json());
const { v4 : uuidv4 } = require('uuid');
const mongourl = "mongodb+srv://praneshkumarn2023it:Pranesh26112005@cluster0.alkpr.mongodb.net/practice";

mongoose.connect(mongourl)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        })
    })
 const expenseSchema = new mongoose.Schema({
    id: { type: String, required: true,unique:true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
 });
 const expenseModel = mongoose.model('expense-tracker', expenseSchema);//collection name, schema name
app.post("/api/expense", async (req, res) => {
    const { title, amount } = req.body;
    const newExpense = new expenseModel({
        id: uuidv4(),
        title: title,
       amount: amount,
    });
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
});

app.get("/api/expense", async (req, res) => {
    try {
        const expenses = await expenseModel.find({});
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch expenses", details: err });
    }
});

app.get("/api/expense/:id", async (req, res) => {
    try {
        const { id }=req.params;
        const expenses = await expenseModel.findOne({id});
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch expenses", details: err });
    }
});
app.put("/api/expense/:id", async (req, res) => {
    const { id } = req.params;
    const { title, amount } = req.body;
    const updatedExpense = await expenseModel.findOneAndUpdate(
      {
        id: id,
      },
      {
        title: title,
        amount: amount,
      }
    );
  
    res.status(200).json(updatedExpense);
  });
  app.delete("/api/expense/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const expenses = await expenseModel.deleteOne({id});
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch expenses", details: err });
    }
  });
