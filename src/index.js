import App from "./App";
import { render } from '@wordpress/element';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//render(<App />, document.getElementById('new-dashboard-widget'));

document.addEventListener( "DOMContentLoaded", function () {
	//console.log('working')
	var element = document.getElementById('new-dashboard-widget');
	if( typeof element !== "undefined" && element !== null ) {
		render(<App />, document.getElementById('new-dashboard-widget') );
	}

});

