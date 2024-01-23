import React, { useEffect, useState } from 'react'
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';


function Formdata() {

	const { id } = useParams();
	const [post, setPost] = useState('');

	const [data, setData] = useState({
		uv: '',
		pv: '',
		amt: '',
	})

	// const handleInput = ( e ) => {
	// 	e.persist();
	// 	setData({...data, []:e.target.value });
	// }


	useEffect( () => {
		const urls = `${appLocalizer.apiUrl}/wprk/v2/edit/${id}`;
		axios.get(urls).then( res => {
			setPost(res.data);
		}).catch(err => {
			console.log('error:', err.message );
		});
	});

	return (
		<div>
			<h1 class="wp-heading-inline">Form Data Table</h1>

		    <hr class="wp-header-end" />
		    <br/>
			
			{ Object.keys(post).length ? (
				<div className="p-5">
		     	<form>
		     		<div className="mb-3">
		     			<label>UV</label>
		     			<input type="text" name="uv"  className="form-control" value={post.uv} />
		     		</div>
		     		<div className="mb-3">
		     			<label>PV</label>
		     			<input type="text" name="pv" className="form-control" value={post.pv} />
		     		</div>
		     		<div className="mb-3">
		     			<label>AMT</label>
		     			<input type="text" name="amt" className="form-control" value={post.amt} />
		     		</div>
		     		<div className="mb-3">
		     			<button type="submit" className="btn btn-primary">Save </button>
		     		</div>

		     	</form>
		     	</div>
			) : 'loading...' }

		     

		</div>
	)
}

export default Formdata