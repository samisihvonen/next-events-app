import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Image from 'next/image';
import {FaPencilAlt,FaTimes} from 'react-icons/fa'
import {API_URL} from '@/config/index'
import Layout from '@/components/Layout'
import styles from '@/styles/Event.module.css'
import { Event, ParamsType } from '../../types/event';
import {useRouter} from 'next/router'


interface Props {
  evt: Event
}

export default function EventPage({ evt }: Props) {
const router = useRouter()
  const deleteEvent = async (e: any) => {
    if(confirm("Are you sure?")){
      const res = await fetch(`${API_URL}/api/events/${evt.id}`,{
        method: 'DELETE'
      })

      const data  = await res.json()

      if(!res.ok){
        toast.error(data.message)
      }else{
        router.push('/events')
      }
    }
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <Link href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </Link>
        </div>

        <span>
          {new Date(evt.attributes.date as string).toLocaleDateString('fi-FI')} at {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        <ToastContainer/>
        {evt.attributes.image && (
          <div className={styles.image}>
            <Image src={evt.attributes.image ? evt.attributes.image.data.attributes.formats.medium.url : ("/images/event-default.png" as any)}
              width={960} height={600} alt={evt.attributes.name as string} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        <Link href='/events' className={styles.back}>
          {'<'} Go Back
        </Link>
      </div>
    </Layout>
  );
}


export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()


  const paths = events.data.map((evt: Event) => ({
    params: { slug: evt.attributes.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}


export async function getStaticProps({ params: { slug } }: ParamsType) {
  const res = await fetch(`${API_URL}/api/events/?populate=*&slug=${slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events.data[0],
    },
    revalidate: 1,
  }
}

//Server side approach
// export async function getServerSideProps({ query: { slug } }: QueryType) {
//   const res = await fetch(`${API_URL}/api/events/?populate=*&slug=${slug}`)

//   const events = await res.json();

//   return {
//     props: {
//        evt: events.data[0]
//     }
//   }
// }