import React from "react";
import Widgets from "./components/widgets.js";
import Items from "./components/items.js";
import Formdata from "./components/Formdata.js";
import Chartdata from "./components/Chartdata.js";
import AddNew from "./components/AddNew.js";

import './style/style.css';



import { HashRouter, Routes, Route, NavLink } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const App = () => {
	return (
		<>
			<HashRouter basename="/">
				<div className="navmenubar">
                    
			      <Navbar bg="primary" data-bs-theme="dark">
			        <Container>
			          <Navbar.Brand href="#">Navbar</Navbar.Brand>
			          <Nav className="me-auto">

                        <NavLink className="nav-link"
                            to="/"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "#000"
                                    : "#fff",
                            })}
                        >
                            Items
                        </NavLink>
                        <NavLink className="nav-link"
                            to="/chartdata"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "#000"
                                    : "#fff",
                            })}
                        >
                            Chart Data  
                        </NavLink>
                        <NavLink className="nav-link"
                            to="/widgets"
                            style={({ isActive }) => ({
                                color: isActive
                                    ? "#000"
                                    : "#fff",
                            })}
                        >
                            Widgets
                        </NavLink>
			          </Nav>
			        </Container>
			      </Navbar>
               
                </div>
 				<Routes>
                    <Route exact path="/" element={<Items />} />
                    <Route exact path="/widgets" element={<Widgets />} />
                    <Route exact path="/chartdata" element={<Chartdata />} />
                    <Route exact path="/form/:id" element={<Formdata />} />
                    <Route exact path="/add-new" element={<AddNew />} />
         
                </Routes>
			</HashRouter>
		</>

	);
};
export default App