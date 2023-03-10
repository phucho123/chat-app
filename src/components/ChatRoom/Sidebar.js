import React from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import UserInfo from './UserInfo';
import RoomList from './RoomList';

const StyledSidebar = styled.div`
    background: #3f0e40;
    color: white;
    height: 100vh;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
        <Row>
            <Col span={24}>
                <UserInfo />
            </Col>
            <Col span={24}>
                <RoomList />
            </Col>
        </Row>
    </StyledSidebar>
  )
}

export default Sidebar