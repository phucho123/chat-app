import { Avatar, Typography,Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { auth } from '../../firebase/config'
import { AuthContext } from '../../Context/AuthProvider'

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 83);

`
const UserInfo = () => {
  const {
    user: {displayName,photoURL}
  } = React.useContext(AuthContext)
  return (
    <WrapperStyled>
        <div>
            <Avatar src={photoURL}>{photoURL? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
            <Typography.Text style={{marginLeft: '5px',color:"white"}} className="username">{displayName}</Typography.Text>
        </div>
        <Button ghost onClick={() => auth.signOut()}>
            Sign Out
        </Button>
    </WrapperStyled>
  )
}

export default UserInfo