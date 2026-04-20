const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ag08112025", // coloque sua senha se tiver
    database: "agiliza"
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar:", err);
        return;
    }
    console.log("MySQL conectado com sucesso!");
});

app.get("/", (req, res) => {
    res.send("Servidor funcionando 🚀");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

app.get("/produtos",(req,res)=>{
    db.query("SELECT * FROM produtos",(err,result)=>{
        res.json(result);
    });
});


app.post("/produtos",(req,res)=>{
    const {nome, quantidade, minimo} = req.body;

    db.query(
        "INSERT INTO produtos(nome,quantidade,minimo) VALUES (?,?,?)",
        [nome,quantidade,minimo],
        (err,result)=>{
            res.json({msg:"Produto cadastrado"});
        }
    );
});

app.get("/produtos", (req, res) => {
    db.query("SELECT * FROM produtos", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro ao buscar produtos" });
        }
        res.json(result);
    });
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});
