/**
 * grunt-template-sripping
 * https://doomk.github.com/
 *
 * Copyright (c) 2014 "Cowboy" doomking, contributors
 * Licensed under the MIT license.
 *
 * this is tell you how to use  the template which create by this  grunt plugin .
 *
 */
;
(function(root) {
	var template = root.template = {};
	var templateList = root.templateList || (root.templateList = {});

	/** shot of getElementById
	 * @param {String} id 
	 */
	template.get = function(id) {
		return document.getElementById(id);
	}
	/**
	 * 获取页面的一个 html 模板
	 * @param {String} tmplId 模板的 dom id
	 */
	template.getTemplate = function(tmplId) {
		var tmpl = templateList[tmplId];
		if (!tmpl) {
			var tmplNode = this.get(tmplId);
			tmpl = tmplNode.innerHTML;
			tmplNode.parentNode.removeChild(tmplNode);
			templateList[tmplId] = tmpl; //缓存起来, 避免再次查找dom
		}
		if (!tmpl) {
			throw new Error('no such template. [id="' + tmplId + '"]');
		}
		return tmpl;
	}
})(window);

