// include gulp
var gulp = require('gulp');

/**
 * HOW TO USE:

 * Replace the word iotaa with the project name in the following:
  - /Users/jasoncarney/repository/iotaa
  - /Users/jasoncarney/repository/iotaa/resources/iotaa
  - /Users/jasoncarney/repository/PumpFaceSystem/deploy/pfs/resources/iotaa
  - /Users/jasoncarney/repository/iotaa/resources/iotaa/
  - ['iotaa-resources' ]
 */

/**
 * IOTAA specific build tasks:
 * The default task whhich runs with `gulp`
 */
//
gulp.task('default', [], function() {
  console.log("Moving project resources to ...PumpFaceSystem/deploy/pfs/resources/projectname");
  gulp.src("/Users/jasoncarney/repository/iotaa/resources/iotaa/**/**")
      .pipe(gulp.dest('/Users/jasoncarney/repository/PumpFaceSystem/deploy/pfs/resources/iotaa'));
});
gulp.watch( '/Users/jasoncarney/repository/iotaa/resources/iotaa/**/**', ['default' ] );
