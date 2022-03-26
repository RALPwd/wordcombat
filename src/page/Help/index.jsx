import React from 'react';
import logo from '../../assets/img/logo word combat.png';
import ejemplo from '../../assets/img/ejemplo.png';
import './style.css';

function Help() {
  return (
    <div className="HelpContainer">
      <div className="divImg"><img src={logo} alt="" width="50%" /></div>
      <br />
      <p><h1>¿Qué es WordCombat?</h1></p>
      <br />
      <p>
        Es un juego apto para toda persona mayor de 7 años de edad, en el que se enfrenta a dos
        jugadores entre sí, o si lo prefiere, un jugador enfrenta una máquina con el objeto de
        adivinar una palabra dada por el sistema, escogida al azar.
        El retador es quien inicia el juego y se van turnando con el otro hasta agotar sus turnos.
      </p>
      <br />
      <p><h1>¿Cómo se juega?</h1></p>
      <br />
      <p>
        <h3>Primero</h3>
        una vez los jugadores están estén listo para iniciar el juego en la zona de
        juego de la app, se selecciona una palabra por el sistema.
        Esta no es visible para ninguno de los jugadores.
      </p>
      <br />
      <p>
        <h3>Segundo</h3>
        el jugador que inicia, escribe una palabra con el teclado virtual que aparece en
        pantalla.
      </p>
      <br />
      <p>
        <h3>Tercero</h3>
        Cada jugador tiene hasta 6 intentos para adivinar la palabra.
      </p>
      <br />
      <p>
        <h3>Cuarto</h3>
        Una vez escrita la palabra, el sistema verificará si coincide con la seleccionada
        por el juego. Y colocará las letras de color verde si las letras de ambas palabras están
        en el mismo lugar, de no ser así, coloca las letras de color amarillo si la letra de la
        palabra escrita hace parte de la palabra seleccionada pero que no está en la misma posición.
        Las letras que no coincidan de la palabra, las colorea de gris.
      </p>
      <br />
      <p>
        Ejemplo, palabra escrita por jugador.
      </p>
      <br />
      <div className="divImg"><img src={ejemplo} alt="" width="22%" height="55px" /></div>
      <br />
      <p>
        <h4>Letra con fondo amarillo está en la palabra, pero no es su posición.</h4>

        <h4>Letra C en color, significa que ambas palabras tienen esa letra en el mismo lugar.</h4>

        <h4>Letra gris, significa que no hacen parte de la palabra escogida por el juego</h4>
      </p>
      <br />
      <p>
        Tenga en cuenta que las letras pueden estar repetidas, por tanto, debe escribirlas
        individualmente, es decir, si la palabra tiene 3 letras iguales, usted debe escribirlas
        cada una en su sitio.
        <br />
        <br />
        Animo, invita a tus amigos y diviértete con ellos, ¡¡¡gana las partidas que más puedas!!!
      </p>
    </div>
  );
}

export default Help;
