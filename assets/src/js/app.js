require( '../../src/js/jquery.smoothScroll.js' );

jQuery( function( $ ) {
	
	/**
	 * pagetop
	 */
	( function() {
		var pagetop = $( '.pagetop' );
		var default_top = parseInt( pagetop.css( 'top' ) ) * -1;
		var slowly = 3;
		var bottom = 10;
		update();
		
		$( window ).scroll( function() {
			update();
		} );
		
		$( window ).resize( function() {
			update();
		} );
		
		function update() {
			if ( pagetop.css( 'display' ) == 'none' ) {
				return;
			}
			
			var scroll      = $( window ).scrollTop();
			var pagetop_top = scroll / slowly - default_top;
			
			// pagetop がブラウザ底より上の間 top を更新
			var window_height  = $( window ).height();
			var pagetop_height = pagetop.height();
			
			if ( pagetop_top + pagetop_height <= window_height - bottom ) {
				pagetop.css( 'top', pagetop_top );
			} else {
				pagetop.css( 'top', window_height - pagetop_height - bottom );
			}
		}
	} )();
	
	/**
	 * スマホフッター余白
	 */
	( function() {
		set_sp_footer_margin();
		
		$( window ).resize( function() {
			set_sp_footer_margin();
		} );
		
		function set_sp_footer_margin() {
			var gnav = $( '.global-nav' );
			
			if ( gnav.css( 'position' ) == 'fixed' ) {
				var margin = gnav.height()
			} else {
				var margin = 0;
			}
			$( 'body' ).css( 'padding-bottom', margin );
		}
	} )();
} );
