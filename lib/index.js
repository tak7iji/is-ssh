// Dependencies
const protocols = require("protocols");

/**
 * isSsh
 * Checks if an input value is a ssh url or not.
 *
 * @name isSsh
 * @function
 * @param {String|Array} input The input url or an array of protocols.
 * @return {Boolean} `true` if the input is a ssh url, `false` otherwise.
 */
function isSsh(input) {

    if (Array.isArray(input)) {
        return input.indexOf("ssh") !== -1 || input.indexOf("rsync") !== -1;
    }

    if (typeof input !== "string") {
        return false;
    }

    var prots = protocols(input);
    if (isSsh(prots)) {
        return true;
    } else if (prots.length > 0) {
        return false;
    }

    // TODO This probably could be improved :)
    input = input.substring(input.indexOf("://") + 3);
    return input.indexOf("@") < input.indexOf(":");
}

module.exports = isSsh;
