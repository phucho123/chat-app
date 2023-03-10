import { Avatar, Button, Form, Input } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { UserAddOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import Message from './Message'
import { AuthContext } from '../../Context/AuthProvider'
import { AppContext } from '../../Context/AppProvider'
import { addDocument } from '../../firebase/services'
import useFirestore from '../../hooks/useFirestore'

const HeaderStyled = styled.div`
  height: 56px;
  display:flex;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid rgba(82,38,83,0.2);
  .header{
    &__info{
      display:flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title{
      margin: 0;
      font-weight: bold;
      font-size: 18px;
    }

    &__description{
      font-size: 12px;
    }
  }
`
const ButtonGroupStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ContentStyled = styled.div`
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const WrapperStyled = styled.div`
  height: 100vh;
`

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  margin: 5px 5px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`
const MessageList = styled.div`
 max-height: 100%;
 overflow-y: auto;
`
const ChatWindow = () => {
  const {
    user: {displayName,photoURL, uid }
  } = React.useContext(AuthContext)
  const { selectedRoom,members,setIsInviteMemberVisible } = React.useContext(AppContext);
  const [inputValue, setInputValue] = React.useState('');
  const [form] = Form.useForm();
  
  const condition = React.useMemo(() => ({
    fieldName: "roomId",
    operator: "==",
    compareValue: selectedRoom.id
  }),[selectedRoom.id])
  const messages = useFirestore('messages',condition)
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }
  const handleOnSubmit = () => {
    addDocument('messages',{
      text: inputValue,
      uid,
      photoURL,
      displayName,
      roomId: selectedRoom.id
    })
    form.resetFields(['message']);
  }
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className='header__info'>
          <p className="header__title">{selectedRoom?.name}</p>
          <p className="header__description">{selectedRoom?.description}</p>
        </div>
        <ButtonGroupStyled>
          <Button icon={<UserAddOutlined />} type="text" onClick={() => setIsInviteMemberVisible(true)}>Invite</Button>
          <Avatar.Group maxCount={2}>
            {members.map(member => (
              <Tooltip title={member.displayName} key={member.id}>
                <Avatar src={member.photoURL}>
                  {member.photoURL ? '':member.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>
      
      <ContentStyled>
      <MessageList>
        {messages.map(message => (
          <Message
            key={message.id}
            text={message.text}
            displayName={message.displayName}
            photoURL={message.photoURL}
            createAt={message.createAt}
          />
        ))}
      </MessageList>
        <FormStyled form={form}>
          <Form.Item name='message'>
            <Input
              onChange={handleInputChange}
              onPressEnter={handleOnSubmit}
              placeholder='Enter Messages...'
              bordered={false}
              autoComplete='off'
            />
          </Form.Item>
          <Button type='primary' onClick={handleOnSubmit}>
            Send
          </Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  )
}

export default ChatWindow