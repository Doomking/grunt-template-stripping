/*
 * grunt-template-sripping
 * https://doomk.github.com/
 *
 * Copyright (c) 2014 "Cowboy" doomking, contributors
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'),
    esprima = require('esprima');
 
function convert(literal) {
    var result = literal.substring(1, literal.length - 1);
    result = result.replace(/'/g, '\'');
    return '\'' + result + '\'';
}
 

function singleQuote(content){
	if(!content) return '';
	var tokens = esprima.parse(content, { tokens: true, range: true }).tokens,
		offset = 0;
		 tokens.forEach(function (token) {
			var str;
			if (token.type === 'String' && token.value[0] !== '\'') {
				str = convert(token.value);
				content = content.substring(0, offset + token.range[0]) + str +
					content.substring(offset + token.range[1] + 1, content.length);
				offset += (str.length - token.value.length);
			}
		});
		return content;
};

module.exports=singleQuote;
