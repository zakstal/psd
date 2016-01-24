var glob = require('glob');
var path = require('path');

glob.sync( './components/**/*.js' ).forEach( function( file ) {
    console.log('file path', file);
    require( path.resolve( file ) );
});

module.exports = {};