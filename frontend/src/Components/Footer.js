import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-1'>
                        <h4>Copyright &copy; Let's Learn</h4>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
