import React, { useState, useEffect } from 'react'

import { NavLink } from "react-router-dom";

const initialList = [
  {
    id: 'a',
    firstname: 'Robin',
    lastname: 'Wieruch',
    year: 1988,
  },
  {
    id: 'b',
    firstname: 'Dave',
    lastname: 'Davidds',
    year: 1990,
  },
];

function Items() {

	const [ItemData, setItemData] = useState(initialList);

	// useEffect(() => {

	// 	setItemData(initialList);
  	// 	console.log( initialList )
	   
  	// }, []);

	function handleRemove(id) {
	// remove item
    	const newList = ItemData.filter((item, index) => index !== id);
    	setItemData(newList);
	}

	function handleAddItem() {

        let data = {
            id: (Math.random() * 1000).toFixed(0).toString(),
            firstname: "Koenigsegg - " + (Math.random() * 1000).toFixed(0),
            lastname: "delete-icon",
	    			year: 1990,
        };
        //const newList = ItemData;
        //newList.push(data)
       // setItemData([items]);
        setItemData(prevState => [...prevState, data ]);
    }

  	const datas = ItemData;


	return (
	
    	<> <h1 class="wp-heading-inline">Data Table</h1>
        	<button class="page-title-action" onClick={handleAddItem}> Add</button>

		    <hr class="wp-header-end" />
		    <br/>
		    <table class="wp-list-table widefat fixed striped" cellspacing="0">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
			      <th scope="col">First Name</th>
			      <th scope="col">Last Name</th>
			      <th scope="col">Year</th>
			      <th scope="col">Action</th>
			    </tr>
			  </thead>
			  <tbody>
		      {datas.map((item, index) => (
		        <tr key={index}>
			      	<th>{index +1 }</th>
			      	<td>{item.firstname}</td>
			      	<td>{item.lastname}</td>
			      	<td>{item.year}</td>
			      	<td>
			          <button type="button" onClick={() => handleRemove(index)}>
			            Remove
			          </button>
                        <NavLink to={ '/form/'+ index }>Items</NavLink>
		          	</td>
		        </tr>
		      ))}
		     </tbody>
			</table>
    	</>
	)
}

export default Items