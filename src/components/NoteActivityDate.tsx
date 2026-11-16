import type { Locale } from '../lib/locale';
import { formatActivityDate, type NoteActivity } from '../lib/note-dates';
import styles from './Notes.module.css';

function DateValue({ value }: { value: string }) {
  // A year alone is not an HTML <time> date value.
  return value.length === 4 ? <span>{value}</span> : <time dateTime={value}>{formatActivityDate(value)}</time>;
}

export default function NoteActivityDate({ activity, locale }: { activity: NoteActivity; locale: Locale }) {
  return <span className={styles.activityDate}>
    <span className={styles.activityLabel}>{activity.label}</span>
    <span>{'text' in activity ? activity.text : <>
      <DateValue value={activity.start} />
      {activity.end && activity.end !== activity.start && <>–<DateValue value={activity.end} /></>}
      {activity.ongoing && <>–{locale === 'ko' ? '게시 당시 진행 중' : 'ongoing at publication'}</>}
    </>}</span>
  </span>;
}
