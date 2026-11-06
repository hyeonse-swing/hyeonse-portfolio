import type { EngineeringStory } from '../data/engineering';
import type { Locale } from '../lib/locale';
import EngineeringFlow from './EngineeringFlow';
import styles from './TechnicalDetails.module.css';

export default function TechnicalDetails({ story, locale = 'ko' }: { story: EngineeringStory; locale?: Locale }) {
  return <div className={styles.root}>
    <p className={styles.lead}>{story.lead}</p>
    <ul className={`project-tags ${styles.stack}`} aria-label={locale === 'en' ? 'Technologies used' : '구현에 사용한 기술'}>{story.stack.map(item => <li key={item}>{item}</li>)}</ul>
    <EngineeringFlow steps={story.flow} caption={story.flowCaption} locale={locale} />
    <div className={styles.details}>{story.details.map(detail => <div key={detail.label}><span className="eyebrow">{detail.label}</span><h3>{detail.title}</h3><p>{detail.body}</p></div>)}</div>
  </div>;
}
