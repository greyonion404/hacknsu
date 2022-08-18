import React from 'react';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';


import { Text } from "../components/styled/Text";
import { addAuth0UserToDatabase, getUserWithAuth0ID } from '../Utils/database';

export default function Home({profile}) {
  return (
    <div>
      <Text>whoarewe</Text>
      <Link href="/api/auth/logout">logout</Link>
    </div>
  )
}



export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {

    const auth0User = getSession(req, res);
    // not authenticated by auth0
    if (!auth0User || !auth0User?.user) return { notFound: true };

    // authenticated by auth0
    let auth0ID = auth0User?.user?.sub;
    const { data: user , error: retrieveError } = await getUserWithAuth0ID(auth0ID);


    // error with supabase query
    if (retrieveError || !user) return { notFound: true };

    // found auth0 user in supabase users table
    if (user.length !== 0) return { props: { profile: user[0] } }

    // auth0 user is not in supabase users table (insert user)
    if (user.length === 0) {
      let { data: newUser, error: insertError } = await addAuth0UserToDatabase(auth0User.user);

      // error inserting user to supabase
      if (insertError)
        return { notFound: true };

      return { props: { profile: newUser } }
    }


    return { notFound: true };

  },
});