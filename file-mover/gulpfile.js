// includes
var gulp = require('gulp');
const fs = require('fs')

/**
 * HOW TO USE:
 * Supply 3 command line argument
 * - gulp --sourceFile flip.md --destinationFile '/c/Users/jason' --watchPattern './*.*'
 */

// Tutorial taken from https://www.sitepoint.com/pass-parameters-gulp-tasks/
// fetch command line arguments
const arg = (argList => {

  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {

    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {

      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;

    }
    else {

      // argument name
      curOpt = opt;
      arg[curOpt] = true;

    }

  }

  // return arg;

  gulp.task('default', [], function() {
    console.log("Moving project resources to ...");
    
    let sourceFile;
    let destinationFile;

    if (fs.existsSync(arg.sourceFile)) {
      sourceFile = arg.sourceFile;
    } else {
      console.log('file dont exist :(')
      console.log('the source file must exist, please check it does then run again.')
      process.exit()
    }    
  
    if(arg.destinationFile) {
      destinationFile = arg.destinationFile;
    } else {
      console.log('no destination file added :(')
      console.log('ensure a valid destination path has been added, then run again.')
      process.exit()
    }
    
    // refactor to arg.sourceFile
    gulp.src(sourceFile)
        // refactor to arg.destinationFile
        .pipe(gulp.dest(destinationFile));
  });

  let watchPattern = arg.watchPattern || './*.*'
  // refactor to arg.watchPattern
  gulp.watch( watchPattern, ['default' ] );


})(process.argv);

// console.log('gulp var: ');
// console.log(process.argv)
