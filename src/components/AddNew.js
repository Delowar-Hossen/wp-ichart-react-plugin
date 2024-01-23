import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

function AddNew() {

	const [dataval, setDataVal] = useState({
		name: '',
		uv: '',
		pv: '',
		amt: '',
	})

	const handleInput = ( e ) => {
		e.persist();
		setDataVal({...dataval, [e.target.name]:e.target.value });
	}

	const savePostData = ( e ) => {
		e.preventDefault();

		const data = {
				name: dataval.name,
				uv: dataval.uv,
				pv: dataval.pv,
				amt: dataval.amt
		}

		const urls = `${appLocalizer.apiUrl}/wprk/v2/insertdata`;
		axios.post(urls, data).then( res => {
			//console.log( res )
			alert( res.data.message );
		}).catch( function ( error ){
			if(error.response){
				if(error.response.status == 403){
					setInputErrorList(error.response.data.errors)
				}
			}
		})

	}


	return (
		<div>
			
	     	<form onSubmit={savePostData}>
	     		<div className="mb-3">
	     			<label>Name</label>
	     			<input type="text" name="name" className="form-control" onChange={handleInput} value={dataval.name} />
	     		</div>
	     		<div className="mb-3">
	     			<label>UV</label>
	     			<input type="number" name="uv" className="form-control" onChange={handleInput} value={dataval.uv} />
	     		</div>
	     		<div className="mb-3">
	     			<label>PV</label>
	     			<input type="number" name="pv" className="form-control" onChange={handleInput} value={dataval.pv} />
	     		</div>
	     		<div className="mb-3">
	     			<label>AMT</label>
	     			<input type="number" name="amt" className="form-control" onChange={handleInput} value={dataval.amt} />
	     		</div>
	     		<div className="mb-3">
	     			<button type="submit" className="btn btn-primary">Save </button>
	     		</div>

	     	</form>
		</div>
	)
}

export default AddNew