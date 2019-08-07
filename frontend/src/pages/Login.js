import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './Login.css'
import api from '../services/api';

export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(event) {
        event.preventDefault(); //o submit por padrao joga pra putra pagina, entao isso bloqueia esse redirecionamento
        
        // busca os dados do usario utilizando a nossa Api
        const response = await api.post('/devs',{
            username
        })

        const {_id} = response.data;

        history.push(`/dev/${_id}`)
    }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>

        </div>

    );

};