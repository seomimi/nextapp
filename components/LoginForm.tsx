import React from 'react';
import styled from 'styled-components';

const LoginFormContainer = styled.div`
    h1 {
        text-align: center;
    }
    .loginFormBox {
        padding: 24px;
        position: absolute;
        width: 100%;
        height: 100%;

        .inputContainer {
            margin-bottom: 12px;
            input {
                padding: 13px 12px;
                width: 100%;
                height: 48px;
                line-height: 1.47;
                font-size: 15px;
                border: 1px solid #dee2e6;
                letter-spacing: -0.3px;
                border-radius: 4px;
                background-color: #fff;
            }
        }

        button {
            width: 100%;
            height: 48px;
            border: 1px solid;
            border-color: #3b613b;
            border-radius: 4px;
            font-weight: 600;
            background-color: #3b613b;
            cursor: pointer;
            color: #fff;
            margin-top: 12px;
        }
    }
`;

type Props = {
    goSignup: () => void;
};

export default function LoginForm({ goSignup }: Props) {
    return (
        <LoginFormContainer>
            <h1>LOGIN</h1>
            <div className="loginFormBox">
                <div className="inputContainer">
                    <input placeholder="이메일" type="email" required />
                </div>
                <div className="inputContainer">
                    <input placeholder="비밀번호" type="password" required />
                </div>
                <button>로그인</button>
                <button onClick={goSignup}>회원가입</button>
            </div>
        </LoginFormContainer>
    );
}
