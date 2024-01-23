import React, { useState, useEffect } from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";

function Chartdata() {

	const [Apidata, setApiData] = useState();

  	const url = `${appLocalizer.apiUrl}/wprk/v2/settings`;

  	useEffect(() => {
	    axios.get(url).then((res) => {
	      	setApiData(res.data);
	    });
  	}, []);

  	const data = Apidata;

	return (
		<div>
			<h1 class="wp-heading-inline">Data Table</h1>
			<NavLink to={ '/add-new/' } className="btn btn-primary" >Add New</NavLink>
		    <hr class="wp-header-end" />
		    <br/>
		    <table class="wp-list-table widefat fixed striped" cellspacing="0">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
			      <th scope="col">Name</th>
			      <th scope="col">uv</th>
			      <th scope="col">pv</th>
			      <th scope="col">amt</th>
			      <th scope="col">Action</th>
			    </tr>
			  </thead>
			  <tbody>
		      { data && data.map((item, index) => (
		        <tr key={index}>
			      	<th>{ index +1 }</th>
			      	<td>{ item.name }</td>
			      	<td>{ item.uv }</td>
			      	<td>{ item.pv }</td>
			      	<td>{ item.amt }</td>
			      	<td>
                        <NavLink to={ '/form/'+ item.id }>Remove </NavLink>
                        <NavLink to={ '/form/'+ item.id }>Edit</NavLink>
		          	</td>
		        </tr>
		      ))}
		     </tbody>
			</table>
		</div>
	)
}

export default Chartdata