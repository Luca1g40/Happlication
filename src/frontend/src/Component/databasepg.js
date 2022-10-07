const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "halloo",
    database: "tuts"
})

client.connect();
client.query(`Select * from drinken`, (err, res) => {
    if (!err) {
        console.log(res.rows);
    }
    else {
        console.log(err.message);
    }
    // eslint-disable-next-line no-unused-expressions
    client.end;
})