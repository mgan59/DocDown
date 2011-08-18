var markdownParser = require('./node_modules/markdown-js/lib/markdown').markdown;
var argv = require('./node_modules/optimist').argv;
var fs = require('fs');

var markdownInput = 'myMarkdownSource.markdown';
var outputPath = './output/test.html';
var input = '# Header';
//console.log(input);


var sourceMarkdownFile = fs.readFileSync(markdownInput, 'utf-8');

// Read in a layout file, only one for now
var layoutFile = fs.readFile('./layouts/standard.html', 'utf-8', function(err, buff){
    var replaceText = markdownParser(sourceMarkdownFile);
    //replace text
    var newDoc = buff.replace('__markdown__', replaceText);
    
    fs.writeFile(outputPath, newDoc, function(err){
        if(err) throw err;
        console.log('Document Generated... You Win!');
    });
    
});

