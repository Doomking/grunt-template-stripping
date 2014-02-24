/*
 * grunt-template-stripping
 * https://github.com/doomking/grunt/grunt-template-stripping
 *
 * Copyright (c) 2014 doomking
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs'),
	path=require('path');
module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks
	grunt.registerMultiTask('template_stripping', 'stripping the template like <script id="xxx" tepe="text/plain">...</script> from the html file to js file', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			punctuation: '.',
			separator: ', ',
			type: 'text/plain',
			replace: '{%HtmlTemplates%}',
			flag:''
		}),
		files = this.files,
		len=files.length,
		i=0,
		fileOption={},
		type = options.type.replace('/','\\/'),
		replace = options.replace,
		flag=options.flag,
		srcHtml,
		destHtml, 
		srcJs,
		destJs,
		content,
		regex,
		result,
		templateStr,
		item,
		orig,
		key,
		value;
		for(i=0;i<len;i++){
			item=files[i];
			orig=item.orig;
			key=orig.dest;
			value=orig.src[0];
			fileOption[key]=value;
		}
		srcHtml = fileOption.srcHtml;
		destHtml = fileOption.destHtml;
		srcJs = fileOption.srcJs;
		destJs = fileOption.destJs;

		// Iterate over all specified file groups.
		//this.files.forEach(function(f) {
		//	// Concat specified files.
		//	var src = f.src.filter(function(filepath) {
		//		// Warn on and remove invalid source files (if nonull was set).
		//		if (!grunt.file.exists(filepath)) {
		//			grunt.log.warn('Source file "' + filepath + '" not found.');
		//			return false;
		//		} else {
		//			return true;
		//		}
		//	}).map(function(filepath) {
		//		// Read file source.
		//		return grunt.file.read(filepath);
		//	}).join(grunt.util.normalizelf(options.separator));

		//	// Handle options.
		//	src += options.punctuation;

		//	// Write the destination file.
		//	grunt.file.write(f.dest, src);

		//	// Print a success message.
		//	grunt.log.writeln('File "' + f.dest + '" created.');
		//});

		//my code
		grunt.log.writeln('start tasks...');
		function strip() {
			var destDir;
			if (!grunt.file.exists(srcHtml)) {
				grunt.log.writeln('input html is not found...');
				return;
			}
			if (!grunt.file.exists(srcJs)) {
				grunt.log.writeln('input js is not found...');
				return;
			}

			destDir=path.dirname(destHtml);
			if(!fs.existsSync(destDir)){
				fs.mkdirSync(destDir,'0755');
			}

			destDir=path.dirname(destJs);
			if(!fs.existsSync(destDir)){
				fs.mkdirSync(destDir,'0755');
			}
			if (grunt.file.exists(destHtml)) {
				fs.unlinkSync(destHtml);
			}
			if (grunt.file.exists(destJs)) {
				fs.unlinkSync(destJs);
			}
			content = fs.readFileSync(srcHtml).toString();
			//can not match id like xxx-xxx
			//regex =new RegExp('<script\\s*id="(\w+)"\\s*type="'+type+'"\\s*>([\s\S]*?)<\/script>','gi');
			regex =new RegExp('<script\\s*id="(.+)"\\s*type="'+type+'"\\s*'+flag+'\\s*>([\\s\\S]*?)<\/script>','gi');

			result = {};
			content = content.replace(regex, function(m, $1, $2) {
				result[$1] = $2.replace(/\n|\r|\t/g, '');
				return '';
			});
			fs.writeFileSync(destHtml, content);

			content = fs.readFileSync(srcJs).toString();
			templateStr = JSON.stringify(result);
			content = content.replace(replace,templateStr);
			fs.writeFileSync(destJs, content);

		}
		strip();
		grunt.log.writeln('tasks exec over...');
	});

};

