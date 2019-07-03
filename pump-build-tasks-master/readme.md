# Summary
This gulp task is designed to move files from location to another when a file is saved.

## How to use
- Clone the repository

- cd into the repository

- The gulpfile.js will need the 'project name' replacing the desired name (refer to the "HOW TO USE" in gulpfile.js)

- Run `npm install gulp` from the command line

- Finally, run `gulp` (this runs the default task which moves the folder contents and watches for further changes)

* NOTE: You may need to install gulp globally for the project to run.

## Compare files with Diffchecker CLI
- To check the file has moved over to the deploy folder as intended you can use the Diffchecker CLI to compare the files

- To do this carry out the following

- Get the file location of the current file your editing

- Then get the file location of the file piped to the deploy folder

- Then run the diffchecker command with both paths

  - Path 1: The current file youre editing

  - Path 2: The file piped to the deploy folder

``` sh
diffchecker /Users/jasoncarney/repository/iotaa/resources/iotaa/site.css /Users/jasoncarney/repository/PumpFaceSystem/deploy/pfs/resources/iotaa/site.css
```
