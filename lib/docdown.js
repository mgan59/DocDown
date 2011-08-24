(function(){

    var fs = require('fs');
    var path = require('path');
    var markdownParser = require('../node_modules/markdown-js/lib/markdown').markdown;
    var argv = require('../node_modules/optimist').argv;
    
    exports.run = function(){
        //Handle Markdown source determinizim
        var markdownInput = '';
        if (argv.markdown){
            //need to parse the file-name 
            // see if it has a .markdown extension
            // then create the base-file-name [test.markdown -> test.html]
            markdownInput = argv.markdown;
        } else {
            // pretty much error out without a markdown source
            throw new Error('Failed to specify a markdown source');
        }

        //Handle layout specification
        var layout_template = '';
        if(argv.template){
            //in here support a file toss
            //or template name...
            //maybe do a template name, to prevent user/client error
            throw new Error('Failed to identify a layout source... However, at this moment we have no customized layouts');
        } else {
            layout_template = '../layouts/standard.html';
        }

        //Handle output path
        var outputPath = '';
        if(argv.output){
            //if output param specified use it as filename output
            // should do a check and make sure it is a valid syntaxfiletype
            outputPath = argv.output;
        } else {
            //if no output specified use the markdown.source filename but tear off the .markdown
            // and replace with html
            var file_name_parts = markdownInput.split('.');
            outputPath = file_name_parts[0]+'.html';
        }
        
        //sync call to markdown file
        var sourceMarkdownFile = fs.readFileSync(markdownInput, 'utf-8');
        
        //get layout template
        var layout_dir = path.dirname(fs.realpathSync(__filename));
        layout_template = layout_dir+'/'+layout_template;
        
        // Read in a layout file, only one for now
        var layoutFile = fs.readFile(layout_template, 'utf-8', function(err, buff){
            if(err) throw err;
            
            var replaceText = markdownParser(sourceMarkdownFile);
            //replace text
            var newDoc = buff.replace('__markdown__', replaceText);
    
            fs.writeFile(outputPath, newDoc, function(err){
                if(err) throw err;
                console.log('Document Generated -> '+outputPath);
            });
    
        });
    };
}).call(this);
