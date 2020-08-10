const fs = require( "fs" )
const path = require( "path" )
const { basename } = require( "path" )
const fileDir = path.join( __dirname, "../fileConverter/files" )

// Get all files' names
const getAllFiles = function ( dirPath, arrayOfFiles = [] ) {
    files = fs.readdirSync( dirPath )
    arrayOfFiles = arrayOfFiles
    files.forEach( function ( file ) {
        const filePath = path.join( dirPath, file )

        if ( fs.statSync( filePath ).isDirectory() ) {
            fs.rmdir( filePath, function ( err ) {
                console.log( err );
            } );
            arrayOfFiles = getAllFiles( filePath, arrayOfFiles )
        } else {
            arrayOfFiles.push( filePath )
        }
    } )
    return arrayOfFiles
}

// create new destination / path for files
const createNewFilePath = fileName => {
    const dirName = path.dirname( path.dirname( fileName ) )
    let baseName = path.basename( fileName, path.extname( fileName ) )
    const pageNumber = baseName.slice( 0, 3 ).split( "" )[ 2 ]
    const extension = fileName.slice( -5 ).trim()

    baseName = baseName.substring( 3 )
    const newName = baseName + pageNumber + extension

    return path.join( dirName, newName )
}

let arrayOfFiles = getAllFiles( fileDir )

// rename files with new destination
const replaceFilePath = () => {
    arrayOfFiles.forEach( file => {
        fs.renameSync( file, createNewFilePath( file ) )
    } )
    console.log( arrayOfFiles );
}

// replaceFilePath()


// Find and replace in all file names
const findAndReplace = ( files, stringMatch, stringReplace ) => {
    files.filter( function ( file ) {
        return file.match( stringMatch )
    } ).forEach( function ( file ) {
        let filePath = file,
            newFilePath = file.replace( stringMatch, stringReplace )
        fs.renameSync( filePath, newFilePath )
    } )
    console.log( `Files have been renamed` );
}


findAndReplace( arrayOfFiles, " -.html", ".html" )

module.exports = {
    getAllFiles,
    createNewFilePath,
    replaceFilePath,
    findAndReplace
}