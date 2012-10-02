/*!
 * $.query v1.0.1
 * Query string reader plugin for jQuery
 * http://github.com/keta/jquery.query
 *
 * Copyright 2012, Aleksandr Kavun
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */
(function (window, jQuery) {
    "use strict";

    /**
     * @param [name] Param name
     *
     * @return {Object/String} Whole query string as object or string value if name passed
     */
    jQuery.query = function (name) {
        // Query string is not yet parsed?
        if (!window.Q) {
            // Prepare variables
            var Q = window.Q = {},
                query = window.location.search.substring(1), // query string without question char
                space = /\+/g, // plus signs should be decoded as space character
                param = /([^&=\[\]]+)(?:\[\])?=?([^&]*)/g, // query param regex
                decode = function (s) {
                    return window.decodeURIComponent(s.replace(space, ' '));
                },
                match,
                key,
                value;

            // Process each match
            while (match = param.exec(query)) {
                // Decode key name and its value
                key = decode(match[1]);
                value = decode(match[2]);

                // Check if key already has value in the query object
                if (Q.hasOwnProperty(key)) {
                    // If value isn't array, convert it to array
                    if (typeof Q[key] === 'string') {
                        Q[key] = [Q[key]];
                    }
                    // Push fresh value
                    Q[key].push(value);
                } else {
                    // Apply value
                    Q[key] = value;
                }
            }
        }

        // If param name passed, return its value, otherwise return whole query object
        return name ? ((window.Q && window.Q.hasOwnProperty(name)) ? window.Q[name] : '') : window.Q;
    }
})(window, jQuery);
