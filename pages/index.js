import Layout from '../components/Layout';
import { API_URL } from '@/config/index';

export default function HomePage({ events }) {
  console.log('events', events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  );
}

export async function getStaticProps() {
  console.log('running getStaticProps...');
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  console.log(events);

  return {
    props: { events },
    revalidate: 1,
  };
}
