import React from "react";
import firebase, { auth } from "../../firebase/config";
import { Button,Row,Col,Typography } from "antd";
import { addDocument, generateKeywords } from "../../firebase/services";

const { Title } = Typography;
const googleProvider = new firebase.auth.GoogleAuthProvider();

const Login = () => {
    const handleGoogleLogin = async() =>{
        const {additionalUserInfo,user} = await auth.signInWithPopup(googleProvider);
        if(additionalUserInfo?.isNewUser){
            addDocument('users',{
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName?.toLowerCase())
            })
        }
    }
    return (
        <Row justify={'center'}>
            <Col>
                <Title level={3} style={{textAlign:'center'}}>Chat App</Title>
                <Button onClick={handleGoogleLogin}>Dang nhap voi Google</Button>
            </Col>
            
        </Row>
    );
}

export default Login;