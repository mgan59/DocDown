fs = require 'fs'
path = require 'path';
markdownParser = require( '../node_modules/markdown-js/lib/markdown').markdown;
argv = require('../node_modules/optimist').argv;

exports.run = () ->
    #Handle Markdown source determinizim
    markdownInput = ''
    if argv.markdown
      #need to parse the file-name 
      # see if it has a .markdown extension
      # then create the base-file-name [test.markdown -> test.html]
      markdownInput = argv.markdown
    else
      # pretty much error out without a markdown source
      throw new Error 'Failed to specify a markdown source'


    #Handle layout specification
    layout_template = ''
    if argv.template
      #in here support a file toss
      #or template name...
      #maybe do a template name, to prevent user/client error
      throw new Error('Failed to identify a layout source... However, at this moment we have no customized layouts');
    else
      layout_template = '../layouts/standard.html'

    #Handle output path
    outputPath = ''
    if argv.output
      #if output param specified use it as filename output
      # should do a check and make sure it is a valid syntaxfiletype
      outputPath = argv.output;
    else
      #if no output specified use the markdown.source filename but tear off the .markdown
      # and replace with html
      file_name_parts = markdownInput.split '.'
      outputPath = "#{file_name_parts[0]}.html"    

    htmlTitle = '';

    #Handle title used in the html template
    if argv.title 
        htmlTitle = argv.title
    else
      #If no title param specified, use the default one
      htmlTitle = 'DocDown Generated File';

    #sync call to markdown file
    sourceMarkdownFile = fs.readFileSync markdownInput, 'utf-8'

    #get layout template
    layout_dir = path.dirname fs.realpathSync __filename ;
    layout_template = layout_dir+'/'+layout_template;

    # Read in a layout file, only one for now
    layoutFile = fs.readFile layout_template, 'utf-8', (err, buff) ->
        if err
          throw err

        replaceText = markdownParser sourceMarkdownFile
        #replace text
        newDoc = buff.replace '__markdown__', replaceText
        newDoc = newDoc.replace '__title__', htmlTitle

        fs.writeFile outputPath, newDoc, (err) ->
            if err
              throw err
            console.log "Document Generated -> #{outputPath}"
            return
        return


