require('dotenv').config();
const express = require('express'),
    app = express(),
    path = require('path'),
    fs = require('fs'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    multer = require("multer"),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

const port = 9000;

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "final_src\\resources");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + "/final_src")));
app.use(express.static(__dirname));
app.use(multer({ storage: storageConfig }).single("avatar"));

// fs.exists(__dirname + "\\final_src\\resources", (exists) => {
//     if (!exists) {
//         console.log('Directiry' + __dirname + "\\final_src\\resources doesn't exsist");
//         fs.mkdirSync(__dirname + "\\final_src\\resources");
//         console.log("New directory created!");
//     }
// });

app.get('/', (req, res) => {
    res.sendFile('final_src/index.html', { root: __dirname });
})

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "kource_progect",
    password: "er54z4q9"
});

connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});



app.get('/checklist', (req, res) => {
    console.log("!");

    const rules = require('./rules.json');
    res.status(200).json(rules);
})

/*************************************************************/
/*************************Крестоносцы*************************/
/*************************************************************/
const GetCrusaders = "SELECT * FROM crusaders";
const UpdateCrusader = "UPDATE crusaders SET crusaders.orden = ?, crusaders._rank = ? WHERE crusaders.idcrus = ?";
const DeleteCrusader = "DELETE FROM crusaders WHERE idcrus = ?";
const InsertCrusader = "INSERT INTO crusaders(firstName, lastName, _rank, orden, avatar) VALUES(?, ?, ?, ?, ?)";
app.route('/crusaders/data')
    .get(authToken, (req, res) => {
        connection.query(GetCrusaders, (err, results) => {
            if (err) {
                console.log(err.message);
                return res.sendStatus(500);
            }
            res.status(200).json({ role: req.user.role, info: results });

        })
    })
    .put(authToken, (req, res) => {
        if (req.body) {
            connection.query(UpdateCrusader, [req.body.orden, req.body.rank, req.body.idcrus], (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: 'Произошла ошибка на сервере! Повторите запрос позже!' })
                }
                res.status(200).json({ message: 'Данные успешно обновлены!' })
            })
        }
        else
            res.status(400).json({ message: 'bad request' });
    })
    .post(authToken, (req, res) => {
        if (req.body) {
            let info = [req.body.firstName, req.body.lastName, req.body.rank, req.body.orden];
            let filedata;
            if (req.file) {
                filedata = req.file;
                info.push(filedata.originalname)
            }
            else
                info.push("ava.png")

            connection.query(GetCrusaders, (err, results) => {
                if (err) {
                    console.log(err.message);
                    return res.sendStatus(500);
                }
               for(let i=0; i<results.length; i++)
               {
                   if(results[i].firstName == req.body.firstName && results[i].lastName == req.body.lastName)
                   return res.status(400).json({ message: 'Такой крестоносец уже есть!' });
               }

            })
            connection.query(InsertCrusader, info, (err) => {
                if (err) {
                    console.error("Error(DB): ", err.message);
                    return res.json({ ok: 'err' });
                }
                console.log("Data added!");
                res.json({ ok: 'ok' });
            })
        }

    })
    .delete(authToken, (req, res) => {
        if (req.body) {
            connection.query(DeleteCrusader, req.body.idcrus, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: 'Произошла ошибка на сервере! Повторите запрос позже!' })
                }
                res.status(200).json({ message: 'Данные успешно удалены!' })
            })
        }
        else
            res.status(400).json({ message: 'bad request' });
    })

/*************************************************************/
/****************************Битвы****************************/
/*************************************************************/
app.route('/battles/info')
    .get(authToken, (req, res) => {

    })
    .post(authToken, (req, res) => {

    })

/*************************************************************/

/*************************************************************/
/************************Пользователи*************************/
/*************************************************************/
const insertNewUser = 'INSERT INTO users(login, password) VALUES(?, ?)';
const selectUser = "SELECT * FROM users WHERE login = ?";

app.post('/user/reg', (req, res) => {
    if (req.body.login) {
        connection.query(selectUser, req.body.login, (err, result) => {
            if (err) {
                console.log(err);
                return res.sratus(500).json({ message: "Произошла ошибка на сервере! Повторите запрос позже!" });
            }
            if (result.length !== 0) {
                console.log(result);
                return res.status(400).json({ message: 'Логин занят!' })
            }
            try {
                bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({ message: "Произошла ошибка на сервере! Повторите запрос позже!" })
                    }
                    else {
                        connection.query(insertNewUser, [req.body.login, hashedPassword], (err) => {
                            if (err) {
                                console.log("DBERR" + err);
                                return res.status(400).json({ message: "Произошла ошибка на сервере! Повторите запрос позже!" });
                            }
                            else {
                                res.status(201).json({ message: 'Вы зарегестрированы!' })
                            }
                        })
                    }
                })
            } catch{
                res.status(500).json({ message: 'Ошибка регистрации.' })
            }
        })

    }
});
app.post('/user/log', (req, res) => {
    if (req.body.login) {
        connection.query(selectUser, req.body.login, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Произошла ошибка на сервере! Повторите запрос позже!" });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Проверьте введенные данные!' });
            }

            bcrypt.compare(req.body.password, result[0].password, (err, equal) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ message: 'Произошла ошибка на сервере! Повторите запрос позже!' })
                }
                if (equal) {
                    const accessToken = jwt.sign(JSON.stringify(result[0]), process.env.TOKEN_KEY)
                    const cookieOptions = {
                        httpOnly: true,
                    }
                    res.status(200).cookie('accessToken', accessToken, cookieOptions).json({ message: 'Добро пожаловать, храбрый рыцарь!' })
                } else {
                    res.status(401).json({ message: 'Неверный пароль! Проверьте введенные данные!' })
                }
            })
        })
    }
});

/*************************************************************/
function authToken(req, res, next) {

    const token = req.cookies

    if (token == null) return res.status(400).json({ message: "Null token" })
    jwt.verify(token.accessToken, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
            console.log(err.message)
            return res.status(401).json({ message: "UNAUTHORISED USER" })
        }
        req.user = user;

        next()
    })
}
/*************************************************************/

app.listen(port, () => {
    console.log("Server started at port ", port);
});