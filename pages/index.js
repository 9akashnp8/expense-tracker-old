// MUI
import Button from '@mui/material/Button';

// 3rd party
import Head from 'next/head';

// Internal tools/lib
import { supabase } from './../lib/supabaseClient';

function Page({ accounts }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Expense Tracker</title>
      </Head>
      <div>
        <Button variant="contained">Hello World</Button>
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>{account.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from('account').select()

  return {
    props: {
      accounts: data
    },
  }
}

export default Page;