import { parseCookies } from 'helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, FormEvent, ChangeEvent } from 'react';
import type { NextApiRequest, NextPage } from 'next';
import { useRouter, NextRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import { AddEventForm } from '@/types/event';
import { Http2ServerRequest } from 'http2';

interface AddEventPageProps {
  token: string;
}

const AddEventPage: NextPage<AddEventPageProps> = ({token}:AddEventPageProps) => {
  // const token = "8547bfaa366e12a1982d936b6f7c677f7b1b87400e58d8c12e823733092edf550c8831b64cf044016f19e3357dcde6ccb98f96f96e0784c0d79da4909669360fd08e35a9509280685a6f8140c3ce6c2e7e2a1679242a93366f0f6bd13bfe8d55c0a8605fad9389564497ccd9212803d643154591518358b8e0e295d4a996b75d";
  const [values, setValues] = useState<AddEventForm>({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });

  const router: NextRouter = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element: string) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill all fields');
      return;
    }

    const res = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: values }),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included');
        return;
      }
      toast.error('Something Went Wrong');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Layout title='Add New Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Add Event' className='btn' />
      </form>
    </Layout>
  );
};

export default AddEventPage;

interface ServerSidePropsTypes {
  req: Http2ServerRequest;
}

export const getServerSideProps = async ({ req }: ServerSidePropsTypes) => {
  const { token } = parseCookies(req);
  return {
    props: {
      token,
    },
  };
};