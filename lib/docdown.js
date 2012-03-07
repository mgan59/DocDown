(function() {
  /*
  DocDown
  A command-line utility to convert markdown files to HTML
  */
  var argv, fs, markdownParser, path;
  fs = require('fs');
  path = require('path');
  markdownParser = require('../node_modules/markdown-js/lib/markdown').markdown;
  argv = require('../node_modules/optimist').argv;
  exports.run = function() {
    var file_name_parts, htmlReplacement, layoutFile, layout_dir, layout_template, markdownInput, outputPath, sourceMarkdownFile;
    markdownInput = '';
    if (argv.markdown) {
      markdownInput = argv.markdown;
    } else {
      throw new Error('Failed to specify a markdown source');
    }
    layout_template = '';
    if (argv.template) {
      throw new Error('Failed to identify a layout source... However, at this moment we have no customized layouts');
    } else {
      layout_template = '../layouts/standard.html';
    }
    outputPath = '';
    if (argv.output) {
      outputPath = argv.output;
    } else {
      file_name_parts = markdownInput.split('.');
      outputPath = "" + file_name_parts[0] + ".html";
    }
    htmlReplacement = {};
    htmlReplacement['__title__'] = '';
    if (argv.title) {
      htmlReplacement['__title__'] = argv.title;
    } else {
      htmlReplacement['__title__'] = 'DocDown Generated File';
    }
    htmlReplacement['__author__'] = '';
    if (argv.author) {
      htmlReplacement['__author__'] = argv.author;
    } else {
      htmlReplacement['__author__'] = '';
    }
    sourceMarkdownFile = fs.readFileSync(markdownInput, 'utf-8');
    layout_dir = path.dirname(fs.realpathSync(__filename));
    layout_template = layout_dir + '/' + layout_template;
    return layoutFile = fs.readFile(layout_template, 'utf-8', function(err, buff) {
      var key, newDoc, value;
      if (err) {
        throw err;
      }
      htmlReplacement['__markdown__'] = markdownParser(sourceMarkdownFile);
      newDoc = buff;
      for (key in htmlReplacement) {
        value = htmlReplacement[key];
        newDoc = newDoc.replace(key, value);
      }
      fs.writeFile(outputPath, newDoc, function(err) {
        if (err) {
          throw err;
        }
        console.log("Document Generated -> " + outputPath);
      });
    });
  };
}).call(this);
