var request = require('request');

function Bips(password, opts) {
    if(!password || (typeof password !== 'string')) throw new Error('Password required');

    opts = opts || {};

    opts.keys = opts.keys || {};

    this.password = password;

    opts.api_domain = opts.api_domain || 'bips.me';

    this.base_url = opts.base_url || 'https://'+opts.api_domain+'/api/v1/';

    this._keys = {};

    for(var key in opts.keys) {
        this['set'+key+'Key'](opts.keys[key]);
    }
};

Bips.prototype._createKey = function(type, key) {
    this._keys[type] = {
        'key': key,
        'auth': this._genAuth(key)
    };
};

Bips.prototype._getKey = function(type) {
    this._raiseErr(type);
    return this._keys[type].key;
};

Bips.prototype.setInvoiceKey = function(key) {
    this._createKey('Invoice', key);
};

Bips.prototype.setSendToKey = function(key) {
    this._createKey('SendTo', key);
};

Bips.prototype.setGetBalanceKey = function(key) {
    this._createKey('GetBalance', key);
};

Bips.prototype.getInvoiceKey = function() {
    return this._getKey('Invoice');
};

Bips.prototype.getSendToKey = function() {
    return this._getKey('SendTo');
};

Bips.prototype.getGetBalanceKey = function() {
    return this._getKey('GetBalance');
};

Bips.prototype._genAuth = function(key) {
    return "Basic " + new Buffer(key + ':' + this.password).toString('base64');
};

Bips.prototype._getAuth = function(key) {
    this._raiseErr(key);
    return this._keys[key].auth;
};

Bips.prototype._raiseErr = function(key) {
    if(!this._keys.hasOwnProperty(key)) throw new Error(key + ' key not set');
};

Bips.prototype._setupRequest = function(body, key, callback) {
    if(typeof callback !== 'function') callback = function() {};

    return request({
        'url': this.base_url+key.toLowerCase(),
        'method': 'POST',
        'body': body,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': this._getAuth(key)
        }
    }, function(err, res, body) {
        callback(err, body);
    });
};

Bips.prototype.getBalance = function(opt_currency, callback) {
    if(typeof opt_currency === 'function') {
        callback = opt_currency;
        opt_currency = 'USD';
    }

    return this._setupRequest('currency='+opt_currency, 'GetBalance', callback);
};

Bips.prototype.createInvoice = function(price, currency, opt_item, opt_custom, callback) {
    if(typeof price !== 'number') throw new Error('Price required.');
    if(typeof currency !== 'string') throw new Error('Currency required.');

    var body = 'price='+price+'&currency='+currency;
    if(typeof opt_item === 'function') {
        callback = opt_item;
        return this._setupRequest(body, 'Invoice', callback);
    }

    if(typeof opt_item === 'string' && typeof opt_custom === 'function') {
        callback = opt_custom;
        body += '&item='+opt_item;
        return this._setupRequest(body, 'Invoice', callback);
    }

    if(typeof opt_item === 'string' && typeof opt_custom === 'string') {
        body += '&item='+opt_item+'&custom='+opt_custom;
        return this._setupRequest(body, 'Invoice', callback);
    }

    return this._setupRequest(body, 'Invoice', callback);
};

Bips.prototype.sendTo = function(amount, to, opt_from, opt_notes, callback) {
    if(typeof amount !== 'number') throw new Error('Amount required.');
    if(typeof to !== 'string') throw new Error('Sender Address required.');

    var body = 'amount='+amount+'&to='+to;
    if(typeof opt_from === 'function') {
        callback = opt_from;
        return this._setupRequest(body, 'SendTo', callback);
    }

    if(typeof opt_from === 'string' && typeof opt_notes === 'function') {
        callback = opt_notes;
        body += '&from='+opt_from;
        return this._setupRequest(body, 'SendTo', callback);
    }

    if(typeof opt_from === 'string' && typeof opt_notes === 'string') {
        body += '&from='+opt_from+'&notes='+opt_notes;
        return this._setupRequest(body, 'SendTo', callback);
    }

    return this._setupRequest(body, 'SendTo', callback);
};

exports.Bips = function(password, opts) {
    return new Bips(password, opts);
};