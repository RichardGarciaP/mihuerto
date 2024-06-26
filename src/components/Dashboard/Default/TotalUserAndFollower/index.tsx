import React from 'react'
import { Col, Row } from 'reactstrap'
import TotalUser from './TotalUser'
import FollowerGrowth from './FollowerGrowth'

const TotalUserAndFollower = () => {
    return (
        <Col xxl={4} md={6} className='box-col-6 col-ed-6'>
            <Row>
                <Col xl={12}>
                    <TotalUser />
                </Col>
                <Col xl={12}>
                    <FollowerGrowth />
                </Col>
            </Row>
        </Col>
    )
}

export default TotalUserAndFollower