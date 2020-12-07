import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Paginate from '../Components/Paginate'
// import { Link } from 'react-router-dom'
import Meta from '../Components/Meta'

const HomeScreen = ({ match }) => {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { products, error, loading, page, pages } = productList

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    useEffect(() => {
        //fetchProducts()
        dispatch(listProducts(keyword, pageNumber))
        //eslint-disable-next-line
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            {/* {!keyword ? <ProductCarousel /> :
                <Link to='/'><Button variant='outline-dark'>Go Back</Button></Link>
            } */}
            {loading ? <Loader /> :
                error ? <Message variant='danger'>{error}</Message> :
                    <div>
                        <h2>LATEST PRODUCTS</h2>
                        <Row>
                            {products.map((product, id) => (
                                <Col key={id} sm={12} md={3} lg={3} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                    </div>
            }
        </>
    )
}

export default HomeScreen
