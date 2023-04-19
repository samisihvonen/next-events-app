import Link from 'next/link';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import { Event, Props, ResponseData } from "@/types/event";
import Layout from '@/components/Layout';



export default function HomePage({ events }: any) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.data.length === 0 && <h3>No events to show</h3>}

      {events.data.map((evt: Event) => (
        <EventItem key={evt.id + ""} evt={evt} />
      ))}

      {events.data.length > 0 && <Link href="/events">View All Events</Link>}
    </Layout>
  );
}


export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC&_limit=3`);
  const events: ResponseData = await res.json();

  return {
    props: { events }
  };
}