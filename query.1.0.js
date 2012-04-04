/*!
 * $.query v1.0
 * Query string reader plugin for jQuery
 * http://github.com/keta/jquery.query
 *
 * Copyright 2012, Aleksandr "keta" Kavun
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */
;"use strict";

(function(window, jQuery){
	/**
	 * @param [name] Param name
	 *
	 * @return {Object/String} Whole query string as object or string value if name passed
	 */
	jQuery.query = function (name)
	{
		// Query string is not yet parsed?
		if (!window.Q)
		{
			// Create empty query object
			window.Q = {};

			// Prepare variables
			var query = window.location.search.substring(1), // query string without question char
				space = /\+/g, // plus signs should be decoded as space character
				param = /([^&=\[\]]+)(?:\[\])?=?([^&]*)/g, // query param regex
				decode = function(s) { return window.decodeURIComponent(s.replace(space, ' ')); },
				match, key, value;

			// Process each match
			while (match = param.exec(query))
			{
				// Decode key name and its value
				key = decode(match[1]);
				value = decode(match[2]);

				// Check if key already has value in the query object
				if (window.Q.hasOwnProperty(key))
				{
					// If value isn't array, convert it to array
					if (typeof(window.Q[key]) == 'string')
					{
						window.Q[key] = [ window.Q[key] ];
					}

					// Push fresh value
					window.Q[key].push(value);
				}
				else
				{
					// Apply value
					window.Q[key] = value;
				}
			}
		}

		// If param name passed, return its value, otherwise return whole query object
		return name ? (window.Q.hasOwnProperty(name) ? window.Q[name] : '') : window.Q;
	}
})(window, jQuery);
