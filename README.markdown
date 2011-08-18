# DocDown - What is it?

Currently I tend to write most documents using markdown and as of recently I was writing technical documentation all in markdown and needed a way to take the markdown and convert it to a self container HTML document that I would share with others.  I had looked on Github and found several blogging engines built around markdown files being converted to html and served via express.  That isn't what I needed.  So I wrote DocDown as a simple personal tool to help with my productivity.  Maybe it will help you as well.

# How to use it

Well you will need nodejs and npm, if you haven't used those yet go find a tutorial and get started :)

Once you have npm install the dependencies

Currently there is only one layout and all your markdown must go in the myMarkdownSource.  I was in a hurry building this so I haven't written the code to do command line options parsing.  Sorry had a deadline and just needed this to work :)

So in the pipe is the ability to pass file handlers into the app, and maybe a bash script to help harness the app or if I figure out how to package into npm I can make it entirely standalone.
