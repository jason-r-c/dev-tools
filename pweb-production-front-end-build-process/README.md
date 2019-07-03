# gulp-js

## About
This repository is aimed at getting front end developers setup with using Gulp. The main task this Gulpfile is ideal for, is automated compilation of LESS files. The LESS Hint task is useful for organising and striving for clean, readable LESS files.

The Autoprefixer plugin adds web browser specific prefixes for the last 3 versions of each major browser (eg, Edge, IE 11, IE 10).

Errors are logged but Gulp continues to run.

## Installation 
This guide should help you get up and running with Gulp on your local machine

You need to:
- Install Node.js: There are plenty of articles on the web, but this [article](https://howtonode.org/how-to-install-nodejs) provides a guide for installing on all operating systems
- Install Gulp.js: Again plenty available online but here is an [article](https://www.sitepoint.com/introduction-gulp-js/) that may be useful
- Navigate to the directory where you want Gulp installed (this should be the root of your theme folder). This should be in the directory where both gulpfile.js and package.json reside.
- Run the following command from the command line

```
npm install
```

This downloads all necessary modules required for the tasks to run 

## Usage
The gulpfile.js expects a folder named 'less' with all less files residing within. Create a folder called 'less' in the root of your project:

```
gulp-js/
|-- less
|	|-- myfile.less
```

Ofcourse the path structure can be modified to suit different circumstances.

Finally, run the following command to start up Gulp:

```
gulp
```
