import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { Amplify } from 'aws-amplify';
import awsmobile from '../src/aws-exports';

Amplify.configure({ ...awsmobile, ssr: true });

const GlobalStyle = createGlobalStyle`
    ${normalize}
    * {
        box-sizing:border-box;
    }
    body { background:#eee; }
`;

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <GlobalStyle />
        </>
    );
}

export default MyApp;
