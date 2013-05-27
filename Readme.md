# BIPS (Bitcoin Internet Payment System) REST API

BIPS makes it easy to get started accepting or sending Bitcoins today.

## How to Install

    sudo npm install bips

## How to use

```js
var bips = require('bips').Bips('<your-password-here>', {
  api_domain: 'bips.me', // Optional. You can use domain closest to your location when performing API requests (https://bips.me/docs/api/locations).
  keys: {
    'Invoice'   : '<your-invoice-key-here>',
    'SendTo'    : '<your-sendto-key-here>',
    'GetBalance': '<your-getbalance-key-here>'
  }
});

bips.getBalance(function(err, res) {
  /**
    Example response
    {
      "btc":
      {
        "amount":"0.00000000",
        "rate":"120.88048"
      },
      "fiat":
      {
        "amount":"0.0000",
        "currency":"USD"
      }
    }
   */  
});

bips.createInvoice(999, 'USD', 'Macbook Air', JSON.stringify({email: 'me@example.com'}), function(err, res) {
  /**
    Example response (URL to the invoice): https://bips.me/invoice/6Jb/r0
   */
});

bips.sendTo(0.0000001, '1PGXTsbbrnXBnTgEdssRCH8Ukc57DvapcP', function(err, res) {
  /**
    Example response: Min amount, 0.00001
   */
});

```
API
---

### Create Invoice ###
```js
// Create an invoice
// opt_item and opt_custom are optional POST fields
bips.createInvoice(price, currency, opt_item, opt_custom, function(err, res) { ... });
```

### Send To ###
```js
// Send bitcoins to an address (bitcoin address/email/mobile)
// opt_from and opt_notes are optional POST fields
bips.sendTo(price, currency, opt_from, opt_notes, function(err, res) { ... });
```

### Get Balance ###
```js
// Retrieve your current account balance
bips.getBalance(function(err, res) { ... });
```

### Set Invoice Key ###
```js
// Change your Invoice key
bips.setInvoiceKey(key);
```

### Set SendTo Key ###
```js
// Change your SendTo key
bips.setSendToKey(key);
```

### Set GetBalance Key ###
```js
// Change your GetBalance key
bips.setGetBalanceKey(key);
```

### Get Invoice Key ###
```js
// Retrieve your Invoice key
bips.getInvoiceKey();
```

### Get SendTo Key ###
```js
// Retrieve your SendTo key
bips.getSendToKey();
```

### Get GetBalance Key ###
```js
// Retrieve your GetBalance key
bips.getGetBalanceKey();
```

## License 

(The MIT License)

Copyright (c) 2013 Shripad K &lt;assortmentofsorts@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.