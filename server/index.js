import express from 'express'
import cors from 'cors'
import mysql from 'mysql'


const app = express()
app.use(express.json())
app.use(cors())


const db = mysql.createConnection({
    host : "localhost",
    user:"root",
    password: "",
    database:"crud",
    dateStrings: "date"

})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/',(req , res)=>{
    const sql = "SELECT * FROM book";
    db.query(sql,(err, data)=>{
        if(err){
            return  res.json({Error: "Error"})
        }
        return res.json(data)
    })
})

app.post('/create',(req , res)=>{
    const sql = "INSERT INTO book (publisher, name, date) VALUES(?)";
    const values = [
        req.body.publisher,
        req.body.name,
        req.body.date 
    ]
    db.query(sql,[values],(err, data)=>{
        if(err){
            return  res.json({Error: "Error"})
        }
        return res.json(data)
    })
})

app.put('/update/:id',(req , res)=>{
    const sql = "UPDATE book set publisher = ?, name = ?, date = ? where id =?";

    const values = [ 
        req.body.publisher,
        req.body.name,
        req.body.date 
    ]
    const id = req.params.id;
    db.query(sql,[...values,id],(err, data)=>{
        if(err){
            return  res.json({Error: "Error"})
        }
        return res.json(data)
    })
})

app.delete('/delete/:id',(req , res)=>{
    const sql = "delete from book where id=?";
    const id = req.params.id;
    db.query(sql,[id],(err, data)=>{
        if(err){
            return  res.json({Error: "Error"})
        }
        return res.json(data)
    })
})

app.get('/', (req, res) => {
    const sql = "SELECT id, publisher, name, DATE_FORMAT(date, '%Y-%m-%d') as date FROM book";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({Error: "Error"})
        }
        return res.json(data)
    })
})

app.listen(5000, ()=>{
    console.log("Running")
})