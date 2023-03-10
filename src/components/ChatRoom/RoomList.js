import { Button, Collapse, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components';

import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';

const {Panel} = Collapse;


const PanelStyled = styled(Panel)`
&&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`
const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;
const RoomList = () => {
  const { rooms,setIsAddRoomVisible,setSelectedRoomId } = React.useContext(AppContext);
  // console.log(rooms);
  return (
    <Collapse ghost defaultActiveKey={['1']}>
        <PanelStyled header="Room List" key="1">
            {rooms.map(room => (
              <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>{room.name}</LinkStyled>
            ))}
            <Button type="text" onClick={() => {setIsAddRoomVisible(true)}} icon={<PlusSquareOutlined />} className="add-room">
                Add Room
            </Button>
        </PanelStyled>
    </Collapse>
  )
}

export default RoomList