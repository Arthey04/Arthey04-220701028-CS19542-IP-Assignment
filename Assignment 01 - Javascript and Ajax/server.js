const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const cors = require("cors");
const PORT = process.env.PORT || 3500;
app.use(express.json());
app.use(cors());
const filePath = path.join(__dirname, "data.json");
app.get("/allDocuments", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading a file", err);
      res.status(500).send("Error reading JSON file");
      return;
    }
    const jsonData = data ? JSON.parse(data) : [];
    res.json(jsonData);
  });
});

app.delete("/task/:key", (req, res) => {
  const key = req.params.key;
  console.log(key);

  // Read the JSON data from the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file");
    }

    let jsonData;
    try {
      jsonData = data ? JSON.parse(data) : [];
    } catch (parseErr) {
      console.error(parseErr);
      return res.status(500).send("Error parsing JSON");
    }
    // Filter out the item with the matching key
    const filteredTask = jsonData.filter((task, ind) => {
      console.log(key, ind, ind != key);
      return ind != key;
    });

    // Write the updated JSON data back to the file
    fs.writeFile(filePath, JSON.stringify(filteredTask, null, 2), (writeErr) => {
      console.log(writeErr);
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).send("Error writing file");
      }
      console.log("File successfully updated");
      res.send("Task deleted successfully");
    });
    // fs.close(filePath, (err) => {
    //   if (err) throw err;
    //   console.log("File descriptor closed");
    // });
  });
});


app.patch('/task/:key',(req,res)=>{
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading a file", err);
      res.status(500).send("Error reading JSON file");
      return;
    }
    const jsonData = JSON.parse(data) ?? [];
    const key = req.params.key;
    // console.log(req.body.title)
    if (req.body.title)
        jsonData[key].title=req.body.title
    else
         jsonData[key].completed=req.body.completed
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
      console.log(writeErr);
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).send("Error writing file");
      }
    });
});
res.send("Task updated successfully");
});

app.post('/task',(req,res)=>{
  console.log('kkkkkk')
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading a file", err);
      res.status(500).send("Error reading JSON file");
      return;
    }
    const jsonData =data ? JSON.parse(data) : [];
    const newTask={
      ...req.body,
      completed:false
    }
    jsonData.push(newTask);
    console.log(jsonData);
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
      console.log(writeErr);
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).send("Error writing file");
      }
    });
  });
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
