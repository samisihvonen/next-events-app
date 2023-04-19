import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Search.module.css';

export default function Search() {
  const [term, setTerm] = useState<string>('');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
   setTerm(event.target.value)
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
}