# grunt-template-stripping

> stripping the template like <script id="xxx" tepe="text/plain">...</script> from the html file to js file

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-template-stripping --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-template-stripping');
```

## The "template_stripping" task

### Overview
In your project's Gruntfile, add a section named `template_stripping` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  template_stripping: {
    options: {
      // Task-specific options go here.
		type:'text/html',
		replace:'{%HtmlTemplates%}'
    },
    your_target: {
      // Target-specific file lists and/or options go here.
		files:{
				srcHtml:'./index.htm',
				srcJs:'./ky.template.js',
				destHtml:'./dist/index.htm',
				destJs:'./dist/ky.template.js'
			}
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.
#### options.type
Type: `String`
Default value: `'text/html'`

A string value that is used to judge the template script type.
#### options.replace
Type: `String`
Default value: `'{%HtmlTemplates%}'`

A string value that is used to replaced by the template json string which is in the input js file .
#### options.flag
Type: `String`
Default value: `''`

A string value that is used to flag some attribute for the template script .




### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  template_stripping: {
    	options:{
				type:'text/html',
				replace:'{%HtmlTemplates%}'
			},
			test:{
				files:{
					srcHtml:'./index.htm',
					srcJs:'./ky.template.js',
					destHtml:'./dist/index.htm',
					destJs:'./dist/ky.template.js'
				}
			}
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  template_stripping: {
    options: {
     type:'text/html',
	 replace:'{%HtmlTemplates%}',
	 flag:'controller-x'//for x controller
    },
    files: {
		srcHtml:'./index.htm',
		srcJs:'./ky.template.js',
		destHtml:'./dist/index.htm',
		destJs:'./dist/ky.template.js'
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

##Thanks
this idea and code is from http://www.alloyteam.com/2012/05/pick-up-templates-speed-up/,i just wrapper it to the grunt plugin,so thanks the author.
