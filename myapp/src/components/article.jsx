import React from "react";

export default function Article(props) {
  return (
    <article className="personTemp">
      <header>
        <h1>
          {props.fornavn} {props.efternavn}
        </h1>
        <p>{props.email}</p>
        <p>{props.tlfnummer}</p>
        <p>{props.password}</p>
        <p>{props.cpr}</p>
        <p>{props.land}</p>
        <p>{props.bynavn}</p>
        <p>{props.vejnavn}</p>
        <p>{props.husnummer}</p>
        <p>{props.postnummer}</p>
      </header>
    </article>
  );
}
