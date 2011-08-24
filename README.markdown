# DocDown - What is it?

Currently I have been writing docs in markdown for easy viewing on github. Recently one said markdown file was going to be sent out to a 3rd party.  Knowing these 3rd party members wouldn't be viewing the documents in a markdown viewer I thought the best solution would be to convert the markdown into styled html.  I had looked on Github and found several blogging engines built around markdown files being converted to html and served via express.  That isn't what I needed.  So I wrote DocDown as a simple command-line tool to help with my productivity.  Maybe it will help you as well.

# How To Install DocDown

Well you will need nodejs and npm, if you haven't used those yet go find a tutorial and get started :)

Once you have npm installed do the following

    npm install -g docdown

The package includes a bin script that allows you to run docdown where ever on your systems.

# How To Use DocDown

A basic example is as follows, assuming you are in your folder with the markdown file called my_doc.markdown do the following

    docdown --markdown my_doc.markdown
    
which will generate a file called my_doc.html in the local folder

You can specify a output file name if you don't want it to inherit the original source's filename

    docdown --markdown my_doc.markdown --output super_doc.html
    
Will generate a file called super_doc.html in the local folder

# Todo

Eventually I'll add support for custom templates for the html, currently a really basic white template is used.  I have the hooks in place for the cmd-line arguments to almost work.

In addition, I'd also like to add support to do an entire directory of markdown and create a directory of .html output
