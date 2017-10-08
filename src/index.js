import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

var Uber = require('node-uber');

var uber = new Uber({
  client_id: 'lhh72GBiHa1ypc5tvyGvxidID9PaftIW',
  client_secret: 'O71eoYW6_CxST2zGuvETbGH8M6WiumvuCDG4PGQG',
  server_token: '_b0ciUJbouRiBSzKek2hILWJmNaBWFLySiYgnNPW',
  redirect_uri: 'locahost:3000/Callback',
  name: 'ReactStudy',
  language: 'pt_BR', // optional, defaults to en_US
});


var authURL = uber.getAuthorizeUrl(['history', 'profile', 'request', 'places']);

uber.authorization({
    authorization_code: authURL
}, function(err, res) {
    if (err) {
        console.error(err);
    } else {
        // store the user id and associated properties:
        // access_token = res[0], refresh_token = res[1], scopes = res[2]),and token expiration date = res[3]
        console.log('New access_token retrieved: ' + res[0]);
        console.log('... token allows access to scopes: ' + res[2]);
        console.log('... token is valid until: ' + res[3]);
        console.log('... after token expiration, re-authorize using refresh_token: ' + res[1]);

        uber.products.getAllForLocation(3.1357169, 101.6881501, function(err, res) {
            if (err) console.error(err);
            else console.log(res);
        });
    }
});
