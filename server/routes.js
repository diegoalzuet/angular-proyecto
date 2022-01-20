import { getTest } from "./controllers/test.controller.js"
import { addToCart, getCart, removeFromCart, deleteAll } from "./controllers/cart.controller.js";
import { validateCredentials,getAll } from "./controllers/login.controller.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./config/config.js";
import express from "express";

export const routes = (app) => {
    app.route('/api/test')
        .get(getTest),
    app.route('/api/cart',checkToken)
        .get(getCart)
        .post(addToCart)
        .delete(removeFromCart),
    app.route('/api/cart/deleteAll',checkToken)
        .delete(deleteAll),
    app.route('/api/login')
        .post(validateCredentials)
        .get(getAll)
}

const checkToken = express.Router();  
checkToken.use((req, res, next) => {   

    const token = req.headers.authorization.split(' ')[1];
    console.log(token);

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    status: 'NOT OK',
                    mensaje: 'Token inválido'
                });
            } else {               
                req.decoded = decoded;    
                next();
            }
        });
    } else {
        res.send({
            status: 'NOT OK',
            mensaje: 'Token no provisto'
        });
    }
});