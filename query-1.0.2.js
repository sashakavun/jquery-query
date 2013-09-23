/*global jQuery*/

/**
 * $.query v1.0.2
 *
 * Query string reader plugin for jQuery
 * http://github.com/keta/jQuery.query
 *
 * Copyright 2012-2013, Aleksandr "keta" Kavun
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 */
(function (window, jQuery) {
    "use strict";

    // Local variable to store parsed query string
    var query;

    /**
     * @param {string} [name] Param name
     * @returns {object|string|undefined} Whole query string as object or string value if name passed
     */
    jQuery.query = function (name) {
        if (!query) {
            query = {};
            var source = window.location.search.slice(1).replace(/\+/g, " ");
            // If query string is not empty, parse it
            if (source.length) {
                var decode = decodeURIComponent;
                var paramRx = /([^&=\[\]]+)(?:\[\])?=?([^&]*)/g;
                var match;
                var key;
                var value;

                // Process each key-value match
                while (match = paramRx.exec(source)) {
                    // Decode key and value
                    key = decode(match[1]);
                    value = decode(match[2]);

                    if (key in query) {
                        // Query already has this key, so it's multi-value key detected
                        if (typeof(query[key]) === "string") {
                            // Convert string value to array
                            query[key] = [
                                query[key]
                            ];
                        }
                        // Store new value
                        query[key].push(value);
                    } else {
                        // Store key-value pair
                        query[key] = value;
                    }
                }
            }
        }

        if (name) {
            // Query parameter requested
            if (query && (name in query)) {
                // Query is not empty and has value for given key
                return query[name];
            }
        }

        // Return whole query object (or undefined if query is empty);
        return query;
    };
})(window, jQuery);
