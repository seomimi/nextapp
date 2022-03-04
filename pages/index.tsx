import type { NextPage, GetServerSideProps } from 'next';
import { useCallback, useState } from 'react';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';
import SignupForm from '../components/SignupForm';
import { Auth, withSSRContext } from 'aws-amplify';

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
    .context {
        padding: 24px;
        position: absolute;
        top: 25%;
        width: 100%;
        height: 50%;
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
    user: string;
};

const Index: NextPage<Props> = ({ user }) => {
    const [signupCheck, setSignupCheck] = useState(true);
    const [userId, setUserId] = useState<string | null>(user);
    const turnOver = useCallback(() => {
        setSignupCheck((prev) => !prev);
    }, []);

    const logOut = useCallback(() => {
        Auth.signOut()
            .then(() => setUserId(null))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Container>
            {userId ? (
                <div className="context">
                    <h3>
                        {userId},<br />
                        로그인 완료
                    </h3>
                    <button onClick={logOut}>로그아웃</button>
                </div>
            ) : (
                <>{signupCheck ? <LoginForm goSignup={turnOver} setUserId={setUserId} /> : <SignupForm goLogin={turnOver} />}</>
            )}
        </Container>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { Auth } = withSSRContext(context);
    const user = await Auth.currentUserInfo()
        .then((res: any) => {
            return res?.attributes.email || null;
        })
        .catch((error: Error) => {
            console.log(error);
            return null;
        });
    return { props: { user } };
};
