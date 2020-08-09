
const fs = require( "fs" )
const path = require( "path" )
const { basename } = require( "path" )
const fileDir = path.join( __dirname, "../fileConverter/files" )

// Get all files' names
const getAllFiles = function ( dirPath, arrayOfFiles ) {
    files = fs.readdirSync( dirPath )
    arrayOfFiles = arrayOfFiles || []
    files.forEach( function ( file ) {
        const filePath = path.join( dirPath, file )

        if ( fs.statSync( filePath ).isDirectory() ) {
            // fs.rmdir( filePath, function ( err ) {
            //     // console.log( err );
            // } );
            arrayOfFiles = getAllFiles( filePath, arrayOfFiles )
        } else {
            arrayOfFiles.push( filePath )
        }
    } )
    return arrayOfFiles
}

// create new destination / path for files
const makeNewPath = fileName => {
    const dirName = path.dirname( path.dirname( fileName ) )
    let baseName = path.basename( fileName, path.extname( fileName ) )
    const pageNumber = baseName.slice( 0, 3 ).split( "" )[ 2 ]
    const extension = fileName.slice( -5 ).trim()

    baseName = baseName.substring( 3 )
    const newName = baseName + pageNumber + extension

    return path.join( dirName, newName )
}

const parts = makeNewPath( "/Users/ljc/Development/code/fileConverter/files/Educative.io - Grokking the Coding Interview - Patterns for Coding Questions/12. Pattern Modified Binary Search/7. Minimum Difference Element (medium)/1.1Minimum Difference Element (medium).html" )
// console.log( parts );

let arrayOfFiles = getAllFiles( fileDir )

// rename files with new destination
// arrayOfFiles.forEach( file => {
//     fs.renameSync( file, makeNewPath( file ) )
// } )
// console.log( arrayOfFiles );

