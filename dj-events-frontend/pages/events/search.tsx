import qs from 'qs';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { Event } from '@/types/event';
import { API_URL } from '@/config/index';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface EventsProps {
  events: Event[];
}
export default function SearchPage({ events }: EventsProps) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <>
        <h1>Search Results for {router.query.term}</h1>
        {events.length === 0 && <h3>No events to show.</h3>}

        {events.map((evt:any) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
      </>
    </Layout>
  );
}

export async function getServerSideProps({
  query: { term },
}: {
  query: { term: string };
}) {
  const query = qs.stringify({
    filters: {
      $or: [
        {
          name: {
            $contains: term,
          },
        },
        {
          performers: {
            $contains: term,
          },
        },
        {
          description: {
            $contains: term,
          },
        },
        {
          venue: {
            $contains: term,
          },
        },
      ],
    },
  });

  const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
  const { data: events }: { data: Event[] } = await res.json();

  return {
    props: { events },
  };
}