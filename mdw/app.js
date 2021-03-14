const express = require( "express" );
var fs = require('fs');
const app = express();
const port = 8081; // default port to listen
const json_transactions_file = 'mock/transactions.json';
const json_accounts_file = 'mock/accounts.json';


//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.static('dist/angular6-client'));

app.get( "/accounts", ( req, res ) => {
    let rawdata = fs.readFileSync(json_accounts_file);
    let accounts = JSON.parse(rawdata);
    res.send( accounts );
});

app.get( "/transactions", ( req, res ) => {
    let rawdata = fs.readFileSync(json_transactions_file);
    let transactions = JSON.parse(rawdata);
    res.send( transactions );
});

app.post( "/transactions", ( req, res ) => {
    let rawdata = fs.readFileSync(json_transactions_file);
    let transactions = JSON.parse(rawdata);
    let transaction = req.body;
    transactions.data.unshift(transaction);
    fs.writeFileSync(json_transactions_file, JSON.stringify(transactions));
    rawdata = fs.readFileSync(json_accounts_file);
    let accounts = JSON.parse(rawdata);
    let fromAccount = transaction.fromAccount;
    let account = accounts.data.filter(a => a.accountLastFour == fromAccount.accountLastFour 
        && a.accountType == fromAccount.accountType)[0];
    account.balanceAmount = parseFloat(account.balanceAmount - transaction.amount).toFixed(2);
    fs.writeFileSync(json_accounts_file, JSON.stringify(accounts));
    res.send({"status":"success"});
});

// define a route handler for the default home page
app.get('/*', function(req, res) {
    res.sendFile('dist/angular6-client/index.html', {root: __dirname })
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );