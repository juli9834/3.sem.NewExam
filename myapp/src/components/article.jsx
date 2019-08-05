import React from "react";

export default function Article(props) {
  return (
    <article className="personTemp">
      <header>
        <h1>
          {props.fornavn} {props.efternavn}
        </h1>

        <p>Email: {props.email}</p>
        <p>Telefon nummer: {props.tlfnummer}</p>
        <p>Password: {props.password}</p>
        <p>Cpr nummer: {props.cpr}</p>
        <p>Land: {props.land}</p>
        <p>Bynavn: {props.bynavn}</p>
        <p>Vejnavn: {props.vejnavn}</p>
        <p>Husnummer: {props.husnummer}</p>
        <p>Postnummer: {props.postnummer}</p>
      </header>
    </article>
  );
}
