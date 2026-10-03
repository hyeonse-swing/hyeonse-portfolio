import type { EngineeringStory } from '../data/engineering';
import type { Locale } from '../lib/locale';
import styles from './TechnicalDetails.module.css';

export default function TechnicalDetails({ story, locale = 'ko' }: { story: EngineeringStory; locale?: Locale }) {
  return <div className={styles.root}>
    <p className={styles.lead}>{story.lead}</p>
    <ul className={`project-tags ${styles.stack}`} aria-label={locale === 'en' ? 'Technologies used' : '구현에 사용한 기술'}>{story.stack.map(item => <li key={item}>{item}</li>)}</ul>
    <figure className={styles.figure}>
      <ol className={styles.flow}>{story.flow.map((step, index) => <li key={step.title}><span className={styles.number}>0{index + 1}</span><strong>{step.title}</strong><p>{step.detail}</p></li>)}</ol>
      <figcaption>{story.flowCaption}</figcaption>
    </figure>
    <div className={styles.details}>{story.details.map(detail => <div key={detail.label}><span className="eyebrow">{detail.label}</span><h3>{detail.title}</h3><p>{detail.body}</p></div>)}</div>
  </div>;
}
