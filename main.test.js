const { assert } = require( 'chai' )
const {
  getAllFiles,
  createNewFilePath,
  replaceFilePath,
  findAndReplace
} = require( './main.js' );

// Tests

// Expecting array to be returned
// array should contain names of files
describe( 'Gets list of nested file names', () => {
  const directoryPath = "../fileConverter/files"
  const arrayOfFiles = getAllFiles( directoryPath )

  describe( 'accepts a directory path', () => {
    it( 'accepts a string', () => {
      assert.isString( directoryPath, 'directory must be a string type' )
    } )
  } );
  it( 'accepts an arrayOfFiles array', () => {
    assert.isArray( arrayOfFiles, 'function does not accept an array' )
  } );
  describe( 'It returns an array of file names', () => {
    it( 'returns an array', () => {
      assert.isArray( arrayOfFiles, 'function does not return an array' )
    } );
  } )

} )

describe( ' Creates a new file path', () => {
  const fileName = "fileName"
  const newFilePath = createNewFilePath( fileName )
  it( 'accepts a file name', () => {
    it( 'accepts an argument,', () => {
      assert.isNotEmpty( '', "should pass an argument" )
    } )
    it( 'accepts a string', () => {
      assert.isString( fileName, "the file name should be a string" )
    } )
  } )
  it( 'returns a string', () => {
    assert.isString( newFilePath, "newFilePath should be a string" )
  } )

} )
