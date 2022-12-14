import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { Amplify } from 'aws-amplify';
import awsmobile from '../src/aws-exports';
import wrapper from '../store';
import { Provider } from 'react-redux';

Amplify.configure({ ...awsmobile, ssr: true });

const GlobalStyle = createGlobalStyle`
    ${normalize}
    * {
        box-sizing:border-box;
    }
    body { background:#eee; }
`;

function MyApp({ Component, pageProps }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(pageProps);
    return (
        <Provider store={store}>
            <Component {...props} />
            <GlobalStyle />
        </Provider>
    );
}

export default MyApp;
