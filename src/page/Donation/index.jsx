import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';
import CardPresentation from '../../components/CardPresentation';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { sendDonation } from '../../services/donation';
import { LOBBY_ROUTE } from '../../components/Constans/Routes';
import './Donation.scss';

function Donation() {
  const [formDonation, setFormDonation] = useState({});
  const [docTypeSelected, setDocTypeSelected] = useState('select');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [donationState, setDonationState] = useState('400');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  const mesasgeValidation = (mess, visible) => {
    setMessage(mess);
    setIsVisible(visible);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDonation({ ...formDonation, [name]: value });
  };

  const handlerSubmitForm = async (event) => {
    event.preventDefault();
    const newFormDonation = { ...formDonation, docType: docTypeSelected };
    const donation = await sendDonation(newFormDonation);
    setIsLoading(true);
    mesasgeValidation(donation.message, true);
    setDonationState(donation.status);
    setIsLoading(false);
    if (donation.status === '201') {
      setTitle('Gracias');
    } else {
      setTitle('Lo sentimos, ocurrió un error');
    }
  };
  return (
    <div>
      {
        !isVisible ? (
          <CardPresentation
            logo="https://res.cloudinary.com/team5-top20/image/upload/v1650735946/donaciones-01_ujsfpp.png"
            title="Formulario de donación"
            handleSubmit={handlerSubmitForm}
          >
            <Link
              to={LOBBY_ROUTE}
              style={{
                position: 'absolute', top: '0', right: 0, padding: '10px 20px 10px 0', fontSize: '18px',
              }}
            >
              Volver al lobby
            </Link>
            <div>
              {
                !nextPage ? (
                  <div className="donationform">
                    <h2>Datos personales</h2>
                    <Input
                      type="text"
                      name="name"
                      value={formDonation.name}
                      placeholder="Nombres"
                      onChange={handleChange}
                    />
                    <Input
                      type="text"
                      name="lastName"
                      value={formDonation.lastName}
                      placeholder="Apellidos"
                      onChange={handleChange}
                    />
                    <select name="docType" onChange={(e) => { setDocTypeSelected(e.target.value); }} value={docTypeSelected}>
                      <option value="select" disabled>Seleccione un tipo de documento</option>
                      <option value="CC">Cedula Ciudadania</option>
                      <option value="CE">Cedula Extranjeria</option>
                    </select>
                    <Input
                      type="number"
                      name="docNumber"
                      value={formDonation.docNumber}
                      placeholder="Número de documento"
                      onChange={handleChange}
                    />
                    <Button type="button" onClick={() => { setNextPage(!nextPage); }} name="Siguiente" />
                  </div>
                ) : (
                  <div className="donationform">
                    <h2>Datos de tarjeta</h2>
                    <Input
                      type="number"
                      name="cardNumber"
                      value={formDonation.cardNumber}
                      placeholder="Número: xxxx xxxx xxxx xxxx"
                      onChange={handleChange}
                    />
                    <Input
                      type="number"
                      name="cardExpYear"
                      value={formDonation.cardExpYear}
                      placeholder="Año de vencimiento"
                      onChange={handleChange}
                    />
                    <Input
                      type="number"
                      name="cardExpMonth"
                      value={formDonation.cardExpMonth}
                      placeholder="Mes de vencimiento"
                      onChange={handleChange}
                    />
                    <Input
                      type="number"
                      name="cardCvc"
                      value={formDonation.cardCvc}
                      placeholder="CVC / CVV"
                      onChange={handleChange}
                    />
                    <Input
                      type="number"
                      name="amount"
                      value={formDonation.amount}
                      placeholder="Monto a donar"
                      onChange={handleChange}
                    />
                    <textarea name="message" id="" rows="2" onChange={handleChange} value={formDonation.message} placeholder="Escribe aquí tu mensaje" />
                    <Button type="button" onClick={() => { setNextPage(!nextPage); }} name="Anterior" />
                    <Button type="submit" name="DONAR" />
                  </div>
                )
              }
            </div>
          </CardPresentation>
        ) : (
          <div>
            {

            isLoading ? (
              <Grid color="#00BFFF" height={80} width={80} />
            ) : (
              <CardPresentation
                logo="https://res.cloudinary.com/team5-top20/image/upload/v1650735946/donaciones-01_ujsfpp.png"
                title={title}
                handleSubmit={handlerSubmitForm}
              >
                <p>{message}</p>
                {
              donationState === '201' ? (
                <Link to={LOBBY_ROUTE}>
                  Volver al lobby
                </Link>
              ) : (
                <button type="button" onClick={() => setIsVisible(false)}>
                  Volver al formulario
                </button>
              )
            }
              </CardPresentation>
            )
          }
          </div>
        )
      }
    </div>
  );
}

export default Donation;
