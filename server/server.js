const fs = require('fs')
const express = require('express');
const fileUpload = require('express-fileupload');
const { v4 } = require('uuid')
const cors = require('cors');

const app = express();

app.use(fileUpload())
app.use(cors())
app.use('/assets', express.static('./dist/assets'))

app.get('/api/vacancies', (req, res) => {

    console.log(req.query)

    const Vacancies = JSON.parse(fs.readFileSync('./json_data/vacancies.json', 'utf-8'))

    const results = Vacancies.filter(vacancy => vacancy.toLowerCase().includes(req.query.search.toLowerCase()))

    res.json(results)
})


app.post('/api/resumes', (req, res) => {

    console.log(req.body)   
    console.log(req.files)   

    res.json({ status: 'ok' })
})

app.post('/api/login', (req, res) => {

    console.log(req.body)

    const Users = JSON.parse(fs.readFileSync('./json_data/users.json', 'utf-8'))

    const existUser = Users.find(user => user.email === req.body.email && user.password === req.body.password)

    if (existUser) {
        const token_login = v4()

        existUser.token_login = token_login

        fs.writeFileSync('./json_data/users.json', JSON.stringify(Users))

        res.json({ status: 'ok', token_login })
    } else {
        res.json({ status: 'error' })
    }

})

app.get('/api/check_login', (req, res) => {

    const Users = JSON.parse(fs.readFileSync('./json_data/users.json', 'utf-8'))

    const existUser = Users.find(user => user.token_login === req.query.token_login)

    if (existUser) {
        res.json({ status: 'ok', user: existUser })
    } else {
        res.json({ status: 'error' })
    }
})

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000....')
})
