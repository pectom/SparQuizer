import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ReactQueryDevtools} from 'react-query/devtools'
import {QueryClient, QueryClientProvider} from "react-query";
import {Provider} from "react-redux";
import {appStore} from "./state/AppStore";
import {ConfigContextProvider} from "./state/ConfigContext";

const queryClient = new QueryClient()

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={appStore}>
            <ConfigContextProvider>
                <BrowserRouter>
                    <React.StrictMode>
                        <App/>
                    </React.StrictMode>
                </BrowserRouter>
            </ConfigContextProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>,
    document.getElementById('root')
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
