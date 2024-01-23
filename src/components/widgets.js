import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Widgets() {

  	const [Apidata, setApiData] = useState();

  	const url = `${appLocalizer.apiUrl}/wprk/v2/settings`;

  	useEffect(() => {
	    axios.get(url).then((res) => {
	      	setApiData(res.data);
	      	//console.log(res.data);
	    });
  	}, []);

  	const changeFilter = (e) => {
	  	const urls = `${appLocalizer.apiUrl}/wprk/v2/last-n-days/${e.target.value}`;
	  	 	axios.get(urls).then((res) => {
	      	setApiData(res.data);
	      	//console.log(res.data);
	    });
  	};

  	const data = Apidata;

	return (
    <div>
      <h2 style={{ display: "inline" }}>Graph Widget</h2>
      <div style={{ float: "right" }}>
        <select onChange={changeFilter}>
          <option value="0">Select </option>
          <option value="7">Last 7 Days</option>
          <option value="15">Last 15 Days</option>
          <option value="30">Last 1 Month</option>
        </select>
      </div>

      <ResponsiveContainer width={"100%"} aspect={1}>
	      <LineChart
	        width={500}
	        height={300}
	        data={data}
	        margin={{
	          top: 30,
	          right: 30,
	          left: 20,
	          bottom: 5,
	        }}
	      >
	        <CartesianGrid strokeDasharray="3 3" />
	        <XAxis dataKey="name" />
	        <YAxis />
	        <Tooltip />
	        <Legend verticalAlign="top" height={36}/>
	        <Line type="monotone"
	          dataKey="pv"
	          stroke="#8884d8"
	          activeDot={{ r: 8 }}
	        />
	        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
	      </LineChart>
      </ResponsiveContainer>
    </div>
	)
}

export default Widgets