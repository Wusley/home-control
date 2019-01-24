/*
 * GET home page.
 */
exports.index = function( req, res ) {

	res.header( "Cache-Control", "no-cache, no-store, must-revalidate" );
    res.header( "Pragma", "no-cache" );
    res.header( "Expires", 0 );
	res.render( 'index', { title: 'Home Automation' } );

};