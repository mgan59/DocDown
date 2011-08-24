(function(){

    var fs = require('fs');
    var path = require('path');
    var markdownParser = require('../node_modules/markdown-js/lib/markdown').markdown;
    var argv = require('../node_modules/optimist').argv;



//Handle Markdown source determinizim
var markdownInput = '';
if (argv.markdown){
    //need to parse the file-name 
    // see if it has a .markdown extension
    // then create the base-file-name [test.markdown -> test.html]
    markdownInput = argv.markdown;
} else {
    // pretty much error out without a markdown source
    markdownInput = 'myMarkdownSource.markdown';
}

//Handle layout specification
var layout_template = '';
if(argv.template){
    //in here support a file toss
    //or template name...
    //maybe do a template name, to prevent user/client error
} else {
    layout_template = '../layouts/standard.html';
}

//Handle output path
var outputPath = '';
if(argv.output){
    // if set check if output path is just a directory
    // or if a file name was included
} else {
    //dump to local directory using markdown source name
    var file_name_parts = markdownInput.split('.');
    outputPath = file_name_parts[0]+'.html';
}

var input = '# Header';
//console.log(input);



var sourceMarkdownFile = fs.readFileSync(markdownInput, 'utf-8');

// Read in a layout file, only one for now
var layoutFile = fs.readFile(layout_template, 'utf-8', function(err, buff){
    var replaceText = markdownParser(sourceMarkdownFile);
    //replace text
    var newDoc = buff.replace('__markdown__', replaceText);
    
    fs.writeFile(outputPath, newDoc, function(err){
        if(err) throw err;
        console.log('Document Generated -> '+outputPath);
    });
    
});

}).call(this);
