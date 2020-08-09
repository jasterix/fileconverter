
const fs = require( "fs" )
const path = require( "path" )
const fileDir = path.join( __dirname, "../pullfiles/files" )


const getAllFiles = function ( dirPath, arrayOfFiles ) {
    files = fs.readdirSync( dirPath )

    arrayOfFiles = arrayOfFiles || []

    files.forEach( function ( file ) {
        const filePath = path.join( dirPath, file )

        if ( fs.statSync( filePath ).isDirectory() ) {
            arrayOfFiles = getAllFiles( filePath, arrayOfFiles )
        } else {
            arrayOfFiles.push( filePath )
        }
    } )
    return arrayOfFiles
}

const getDestination = fileName => {
    const dirName = path.dirname( path.dirname( fileName ) )
    const baseName = path.basename( fileName )

    return path.join( dirName, baseName )
}

// console.log( getDestination( '/Users/ljc/Development/code/pullfiles/files/02. Pattern Sliding Window/1. Introduction/1.1 Introduction.html' ) )


let arrayOfFiles = getAllFiles( fileDir )

// rename files
arrayOfFiles.forEach( file => {
    fs.renameSync( file, getDestination( file ) )
} )

