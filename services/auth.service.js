const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();

/**
 * Hard coded users, should be added to and retrieved from the db
 */
const users = {
    regular: { username: 'regular', hash: bcrypt.hashSync('regularpassword', salt), admin: false },
    admin: { username: 'admin', hash: bcrypt.hashSync('adminpassword', salt), admin: true },
}

/**
 * Log in a user with the given username and password
 * @param {*} username for the user
 * @param {*} password for the user
 * @param {*} callback to receive error or user object
 */
const logIn = function (username, password, callback) {
    let same = false;
    if (users[username]) {
        same = bcrypt.compareSync(password, users[username].hash);
    }
    if (same) {
        callback(null, users[username]);
    } else {
        callback({ message: 'invalid username or password' });
    }
}

/**
 * See if a user can be authenticated with the username and password
 * @param {*} username for the user
 * @param {*} password for the user
 * @param {*} callback to receive a user if authenticated and a false
 * otherwise
 */
const authenticated = function (username, password, callback) {
    logIn(username, password, function (err, user) {
        if (err) {
            callback(false);
        } else {
            callback(user);
        }
    });
}

/**
 * See if a user can be authorized to perform admin task
 * @param {*} username for the user
 * @param {*} password for the user
 * @param {*} callback to receive a boolean indicating authorization
 * for admin task
 */
const authorized = function (username, password, callback) {
    logIn(username, password, function (err, user) {
        if (err) {
            callback(false);
        } else {
            callback(user.admin);
        }
    });
}

/**
 * Extract the username and password from the request
 * @param {*} request from the client
 */
const extractInfo = function (request) {
    return {
        username: request.body.username,
        password: request.body.password,
    }
}

/**
 * Render unauthorized template
 * @param {*} res 
 */
const renderUnauthorized = function (res) {
    res.status(401);
    res.render('error', { message: 'Unauthorized', 'error': { status: 401 } });
}

/**
 * Render forbidden template
 * @param {*} res 
 */
const renderForbidden = function (res) {
    res.status(403);
    res.render('error', { message: 'Forbidden', 'error': { status: 403 } });
}

/**
 * Prevents aunauthorized acces handing error views
 * @param {*} request 
 * @param {*} response 
 * @param {*} callback 
 */
const preventUnauthorized = function (request, response, callback) {
    const credentials = extractInfo(request);
    authenticated(credentials.username, credentials.password, function (user) {
        if (!user) {
            renderUnauthorized(response);
        } else {
            callback(user);
        }
    });
}

/**
 * Prevents aunauthorized acces handing error views
 * @param {*} request 
 * @param {*} response 
 * @param {*} callback 
 */
const preventForbidden = function (request, response, callback) {
    preventUnauthorized(request, response, function (user) {
        if (!user.admin) {
            renderForbidden(response);
        } else {
            callback(user);
        }
    });
}

module.exports = {
    authenticated: authenticated,
    authorized: authorized,
    extractInfo: extractInfo,
    renderUnauthorized: renderUnauthorized,
    renderForbidden: renderForbidden,
    preventUnauthorized: preventUnauthorized,
    preventForbidden: preventForbidden,
}