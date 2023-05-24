import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'

const Header = () => {
	return (
		<>
			{['md'].map((expand) => (
				<Container fluid>
					<Navbar key={expand} bg="light" expand={expand} className="mb-3">
						<Container>
							<Navbar.Brand href="#" className="display-3 fw-bold">
								ToDo App
							</Navbar.Brand>
							<Navbar.Toggle
								aria-controls={`offcanvasNavbar-expand-${expand}`}
							/>
							<Navbar.Offcanvas
								id={`offcanvasNavbar-expand-${expand}`}
								aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
								placement="end"
							>
								<Offcanvas.Header closeButton>
									<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
										Offcanvas
									</Offcanvas.Title>
								</Offcanvas.Header>
								<Offcanvas.Body>
									<Nav className="justify-content-end flex-grow-1 pe-3"></Nav>
									<Form className="d-flex">
										<Form.Control
											type="search"
											placeholder="Search"
											className="me-2"
											aria-label="Search"
										/>
										<Button variant="outline-success">Search</Button>
									</Form>
								</Offcanvas.Body>
							</Navbar.Offcanvas>
						</Container>
					</Navbar>
				</Container>
			))}
		</>
	)
}

export default Header
