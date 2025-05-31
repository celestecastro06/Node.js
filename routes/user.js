const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/signin", async (req, res, next) => {
    const { user_name, user_mail, user_password } = req.body;
  
    if (user_name && user_mail && user_password) {
      try {
        const query = `INSERT INTO user (user_name, user_mail, user_password) VALUES ('${user_name}', '${user_mail}', '${user_password}')`;
        const result = await db.query(query);
  
        if (result.affectedRows === 1) {
          return res.status(201).json({ code: 201, message: "Usuario registrado correctamente" });
        } else {
          return res.status(500).json({ code: 500, message: "No se pudo insertar el usuario" });
        }
      } catch (err) {
        console.error("Error SQL:", err); // ← Aquí se mostrará el error real
        return res.status(500).json({ code: 500, message: "Error del servidor", error: err.message });
      }
    }
  
    return res.status(400).json({ code: 400, message: "Campos incompletos" });
  });
  

user.post("/login", async (req, res, next) => {
    const {user_mail, user_password} = req.body
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}'; `;
    const rows = await db.query(query);
   
    if(user_mail && user_password) {
        if(rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({code: 200, message: token });
        }
        else {
            return res.status(200).json({code: 401, message: "Usuario y/o consraseña incorrectos." });
        }
    }

    return res.status(500).json({code: 500, message: "Campos incompletos." });
});

user.get("/", async (req, res, next) => {
        const query = "SELECT * FROM user";
        const rows = await db.query(query);
       
        return res.status(200).json({code:200, message: rows});
});

module.exports = user;