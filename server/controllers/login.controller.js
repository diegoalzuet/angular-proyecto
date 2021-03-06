import jwt from "jsonwebtoken";
import { SECRET_KEY, REGISTERED_USERS } from "../config/config.js";

export const getAll = (req, res) => {

    res.send(REGISTERED_USERS);

}

//Valida credenciales, genera el token y lo devuelve en un json
export const validateCredentials = (req, res) => {
    const credentials = req.body;

    const user = REGISTERED_USERS.find(user => user.email === credentials.user && user.password === credentials.password);

    console.log(user);
    // if(credentials.user === 'test@gmail.com' && credentials.password==='test'){
    if (user) {
        const payload = {
            id: user.id,
            user: user.name + ' ' + user.lastName,
            username: user.userName,
            mail: user.email,
            gender: 'male',
            role: user.role
        }

        const token = jwt.sign(payload, SECRET_KEY);
        res.json({
            status: 'OK',
            token: token
        })
    } else {
        res.json({
            status: 'NOT OK',
            message: 'Invalid credentials'
        })
    }
}