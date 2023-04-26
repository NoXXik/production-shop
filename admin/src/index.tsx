import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createBrowserRouter,
    RouterProvider,
    redirect,
    BrowserRouter,
}
from
"react-router-dom";
import App from './App';
import CreateProduct from './pages/Product/AddProduct/CreateProduct';
import {} from 'redux'
import {Provider} from 'react-redux';
import {store} from './store';



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
                {/*<RouterProvider router={router}/>*/}
        </BrowserRouter>
    </Provider>
);
