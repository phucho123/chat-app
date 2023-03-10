import { Modal,Form,Input } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import React from 'react';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';

const AddRoomModal = () => {
    const { isAddRoomVisible, setIsAddRoomVisible } = React.useContext(AppContext);
    const {user: {uid}} = React.useContext(AuthContext);
    // console.log(`${isAddRoomVisible} in addroom modal`);
    const [form] = Form.useForm();
    const handleOK = () => {
        addDocument('rooms',{...form.getFieldsValue(),members:[uid]});

        form.resetFields();
        setIsAddRoomVisible(false);
    }
    const handleCancel = () => {
        setIsAddRoomVisible(false);
    }
    return (
        <div>
            <Modal
                title="Add Room"
                open={isAddRoomVisible}
                onOk={handleOK}
                onCancel={handleCancel}
            >
                <Form layout='vertical' form={form}>
                    <Form.Item label="Room's name" name="name">
                        <Input placeholder="Enter Room's name"/>
                    </Form.Item>
                    <Form.Item label="Room's description" name="description">
                        <Input.TextArea placeholder="Enter Room's description"/>
                    </Form.Item>
                </Form>
            </Modal>  
        </div>  
    )
}

export default AddRoomModal