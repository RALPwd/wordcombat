import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOBBY_ROUTE } from '../../components/Constans/Routes';
import logo from '../../assets/img/logo word combat.png';
import WordCompleted from '../../components/GameComponent/WordCompleted';
import { HOME_ROUTE } from '../../components/Constans/Routes';
import './style.css';

function Help() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate(HOME_ROUTE);
    }
  }, []);

  return (
    <div className="HelpContainer">
      <div className="divImg"><img src={logo} alt="" width="50%" /></div>
      <br />
      <h1>¿Cómo jugar WordCombat?</h1>
      <br />
      <p>
        Adivina la palabra oculta en seis intentos.
      </p>
      <p>
        Cada intento debe ser una palabra válida de 5 letras.
      </p>
      <p>
        Después de cada intento el color de las letras cambia
        para mostrar qué tan cerca estás de acertar la palabra.
      </p>
      <br />
      <h2>Ejemplos:</h2>
      <br />
      <WordCompleted word="PERRO" solution="PINTA" />
      <p>La letra P está en la palabra y en la posición correcta</p>
      <br />
      <WordCompleted word="NACER" solution="AUTOS" />
      <p>La letra A está en la palabra pero en la posición incorrecta.</p>
      <br />
      <p>Las letras grises no hacen parte de la palabra.</p>
      <br />
      <p>
        Invita a tus amigos y diviértete con ellos, ¡gana las partidas que más puedas!
      </p>
      <br />
      <Link className="linkToLobby" to={LOBBY_ROUTE}>Volver al lobby</Link>
    </div>
  );
}

export default Help;
