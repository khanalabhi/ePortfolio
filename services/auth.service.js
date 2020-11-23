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
    bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
            callback(err, null);
        } else {
            if (users[username] && users[username][hash] == hash) {
                callback(null, users[username]);
            } else {
                callback({ message: "invalid username or password" }, null);
            }
        }
    });
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

module.exports = {
    authenticated: authenticated,
    authorized: authorized,
}