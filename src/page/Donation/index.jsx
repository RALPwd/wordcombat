import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import CardPresentation from '../../components/CardPresentation';
import Input from '../../components/Input';
import Button from '../../components/Button';
import sendDonation from '../../services/donation';
// import { LOBBY_ROUTE } from '../../components/Constans/Routes';

function Donation() {
  const [formDonation, setFormDonation] = useState({});
  const [docTypeSelected, setDocTypeSelected] = useState('CC');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  // const navigate = useNavigate();

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
    console.log(donation);
    mesasgeValidation(donation.message, true);
  };
  return (
    <CardPresentation
      logo="https://res.cloudinary.com/team5-top20/image/upload/v1650735946/donaciones-01_ujsfpp.png"
      title="GRACIAS!"
      handleSubmit={handlerSubmitForm}
      message={message}
      isVisible={isVisible}
    >
      {isVisible ? (
        <div />
      ) : (
        <div>
          <div>
            <section>
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
                placeholder="apellidos"
                onChange={handleChange}
              />
            </section>
            <section>
              <select name="docType" onChange={(e) => { setDocTypeSelected(e.target.value); }} value={docTypeSelected}>
                <option value="CC" selected>Cedula Ciudadania</option>
                <option value="CE">Cedula Extranjeria</option>
              </select>
              <Input
                type="number"
                name="docNumber"
                value={formDonation.docNumber}
                placeholder="numero de cedula"
                onChange={handleChange}
              />
            </section>

          </div>
          <div>
            <h2>card info</h2>
            <Input
              type="number"
              name="cardNumber"
              value={formDonation.cardNumber}
              placeholder="xxxx xxxx xxxx xxxx"
              onChange={handleChange}
            />
            <Input
              type="number"
              name="cardExpYear"
              value={formDonation.cardExpYear}
              placeholder="ano de vencimiento"
              onChange={handleChange}
            />
            <Input
              type="number"
              name="cardExpMonth"
              value={formDonation.cardExpMonth}
              placeholder="mes de vencimiento"
              onChange={handleChange}
            />
            <Input
              type="number"
              name="cardCvc"
              value={formDonation.cardCvc}
              placeholder="cvc"
              onChange={handleChange}
            />
            <Input
              type="number"
              name="amount"
              value={formDonation.amount}
              placeholder="cantidad"
              onChange={handleChange}
            />
            <textarea name="message" id="" cols="30" rows="10" onChange={handleChange} value={formDonation.message} />
          </div>

          <Button type="submit" name="DONAR" />
        </div>
      )}

    </CardPresentation>
  );
}

export default Donation;
