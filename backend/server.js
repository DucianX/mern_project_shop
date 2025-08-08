import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send('Server is ready or');
})

app.listen(5000, () => {
    console.log("Server started at void");
});