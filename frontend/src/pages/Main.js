import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

// dentro de match, fica todos os parametros q foram passados para essa rota
export default function Main({ match }) {
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    // Chamda à api
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            });
            console.log(response.data);
            setUsers(response.data)
        }

        loadUsers();
    }, [match.params.id]);

    // Conectar backend atraves do socket
    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        });

        socket.on('match', dev => {
           setMatchDev(dev);
        });
    }, [match.params.id]);

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        });

        setUsers(users.filter(user => user._id !== id));
    }
    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        });

        setUsers(users.filter(user => user._id !== id));
    }

    return (
        <div className="main-container">
            <Link to="/"> {/** voltando pra tela inicial */}
                <img src={logo} alt="Tindev" />
            </Link>

            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button type="button" onClick={() => handleLike(user._id)} >
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

            ) : (
                    <div className="empty">Acabou :(</div>
                )}

            {matchDev && (
                <div className='match-container'>
                    <img src={itsamatch} alt="It's a match" />
                    <img className='avatar' src={matchDev.avatar} alt="user" />
                    <strong>{matchDev.name}</strong>
                    <bio> {matchDev.bio}</bio>
                    <button type="button" onClick={() => {setMatchDev(null)  }} >FECHAR</button>
                </div>
            )}

        </div>
    );
}