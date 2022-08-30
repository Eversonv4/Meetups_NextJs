import React, { useEffect, useState, Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import LoadAnimation from "../components/ui/loading-animation";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  const meetups = props.meetups;

  if (!meetups) {
    return <LoadAnimation />;
  }

  return (
    <Fragment>
      <Head>
        <title>Next Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from a API
  // const meetups = await LoadMeetups();
  // return {
  //   props: {
  //     meetups: meetups,
  //   },
  //   revalidate: 60,
  // };

  /* * Codigo acima é suficiente para fazer a requisição, mas será feita com o firebase * */

  const client = await MongoClient.connect(
    "mongodb+srv://Eversonvsn:Eversonv18@cluster0.ga901cb.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // Tudo isso por conta do id que vem num formatinho diferente, senão não seria necessário mapear o array.

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context) {
//   // fetch data from a API
//   const meetups = await LoadMeetups();

//   return {
//     props: {
//       meetups: meetups,
//     },
//   };
// }

export default HomePage;
