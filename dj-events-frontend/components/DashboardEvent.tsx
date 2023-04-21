import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import styles from '@/styles/DashboardEvent.module.css';
import { Event, DashboardHandleDelete } from '@/types/event';

interface DashboardEventProps {
  evt: Event;
  handleDelete: DashboardHandleDelete;
}

export default function DashboardEvent({
  evt,
  handleDelete,
}: DashboardEventProps) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.attributes.slug}`}>
          {evt.attributes.name}
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`} className={styles.edit}>
          <FaPencilAlt /> <span>Edit Event</span>
      </Link>
      <a
        href="#"
        className={styles.delete}
        onClick={() => handleDelete}
      >
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
}