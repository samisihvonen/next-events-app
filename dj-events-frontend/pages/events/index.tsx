import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL, PER_PAGE } from "@/config/index";
import { Event } from "@/types/event";
import { GetServerSideProps } from "next";
import Pagination from "@/components/Pagination";
import Link from "next/link";

interface EventsPageProps {
  events: Event[];
  page: number;
  total: number;
}
export default function EventsPage({ events, page, total }: EventsPageProps) {

  const lastPage = Math.ceil(total/PER_PAGE)

  return (
    <Layout>
      <>
        <h1>Events</h1>
        {events.length === 0 && <h3>No events to show.</h3>}

        {events.map((evt:any) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
        <Pagination page={page} total={total} />
      </>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { page = 1 },
}) => {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch events from the server
  const totalRes = await fetch(`${API_URL}/api/events/count`);
  const total = await totalRes.json();

  // Fetch events from the server
  const eventRes = await fetch(
    `${API_URL}/api/events?sort[0]=date:asc&pagination[start]=${start}&pagination[limit]=${PER_PAGE}&populate=*`
  );
  const { data: events }: { data:Event[] } = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
};