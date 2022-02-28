import type { NextPage } from 'next';
import { useCallback, useState } from 'react';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';
import SignupForm from '../components/SignupForm';

const Container = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    width: 360px;
    height: 432px;
    background-color: #fff;
    border-radius: 6px;
`;

const Index: NextPage = () => {
    const [signupCheck, setSignupCheck] = useState(true);
    const turnOver = useCallback(() => {
        setSignupCheck((prev) => !prev);
    }, []);
    return <Container>{signupCheck ? <LoginForm goSignup={turnOver} /> : <SignupForm goLogin={turnOver} />}</Container>;
};

export default Index;
