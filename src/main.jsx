import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { ApolloLink, concat } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import './index.css'

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = "PUT THE BEARER HERE!"

    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        },
    });
    return forward(operation);
});
const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
);

// import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
// import { ApolloLink, concat } from 'apollo-link';
// import React from 'react';

// const httpLink = new HttpLink({
//     uri: 'http://localhost:3000/graphql',
//     credentials: 'include'  // Asegúrate de incluir las credenciales
// });

// const authMiddleware = new ApolloLink((operation, forward) => {
//     // Obtener el token CSRF de Rails
//     const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
//     const token = "eyJhbGciOiJFUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ2YWxpZF9mb3IiOiJhdXRoZW50aWNhdGlvbiIsImV4cCI6MTcxNjA1MTIzNn0.bYC2vpzG_dnovNDuDsZCwC3bCoPxwMRLOh2byAmzGEJHoF0WSiSQVnHoeTiRJLXKRgNsrrTUvYi73LXoXmGt1g"

//     operation.setContext({
//         headers: {
//             'X-CSRF-Token': csrfToken,  // Enviar el token CSRF con cada solicitud
//             authorization: `Bearer ${token}`,  // Asegúrate de usar el token correcto
//         },
//     });
//     return forward(operation);
// });

// const client = new ApolloClient({
//     link: concat(authMiddleware, httpLink),
//     cache: new InMemoryCache(),
// });

// export const ApolloWrapper = ({ children }) => (
//     <ApolloProvider client={client}>
//         {children}
//     </ApolloProvider>
// );
