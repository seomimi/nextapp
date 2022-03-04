import React, { Dispatch, SetStateAction, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';

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
    setUserId: Dispatch<SetStateAction<string | null>>;
};

export default function LoginForm({ goSignup, setUserId }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            Auth.signIn(email, password)
                .then((response) => {
                    setUserId(response.attributes.email);
                })
                .catch((error) => {
                    if (error.message == 'User is not confirmed.') {
                        alert('가입한 이메일을 인증해주세요.');
                    } else if (error.message == 'Incorrect username or password.') {
                        alert('이메일 또는 비밀번호가 틀렸습니다.');
                    }
                });
        },
        [email, password]
    );

    return (
        <LoginFormContainer>
            <h1>LOGIN</h1>
            <form className="loginFormBox" onSubmit={onSubmit}>
                <div className="inputContainer">
                    <input onChange={onChangeEmail} placeholder="이메일" type="email" required />
                </div>
                <div className="inputContainer">
                    <input onChange={onChangePassword} placeholder="비밀번호" type="password" required />
                </div>
                <button>로그인</button>
                <button onClick={goSignup}>회원가입</button>
            </form>
        </LoginFormContainer>
    );
}
