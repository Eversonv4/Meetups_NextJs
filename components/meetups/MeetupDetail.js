import React, { Fragment, useState, useEffect } from "react";
import classes from "./MeetupDetail.module.css";
import { useRouter } from "next/router";
import LoadAnimation from "../ui/loading-animation";
import { LoadMeetups } from "../helpers/loadMeetups";

export default function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}
