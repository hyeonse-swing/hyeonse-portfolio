import type { Locale } from '../lib/locale';
import { localizedPath } from '../lib/locale';
import { PreferencesPanel } from './SitePreferences';
import FrontendLab from './FrontendLab';
import styles from './StudioPage.module.css';

export default function StudioPage({ locale }: { locale: Locale }) {
  const en = locale === 'en';
  return <div className={styles.page} id="top">
    <header className={styles.intro}>
      <div><span className="eyebrow">OPEN STUDIO / {en ? 'ABOUT THIS SITE' : '이 사이트의 작업실'}</span><h1>Your<br /><em>display.</em></h1></div>
      <div className={styles.introCopy}><span className={styles.smallMark} aria-hidden="true">im.</span><p>{en ? 'You can adjust how this site looks.' : '이곳에서 화면을 취향에 맞게 바꿀 수 있어요.'}<br />{en ? 'Choose colors and spacing you like.' : '마음에 드는 색과 간격을 골라 보세요.'}<br />{en ? 'Your choices also apply to the home and project pages.' : '고른 설정은 홈과 프로젝트 페이지에도 적용돼요.'}</p><a className="text-link" href="#responsive-lab">{en ? 'Responsive layout lab ↓' : '반응형 배치 실험 ↓'}</a><br /><a className="text-link" href="#async-lab">{en ? 'Async request lab ↓' : '비동기 요청 실험 ↓'}</a><br /><a className="text-link" href={localizedPath(locale, '/')}>{en ? 'Back to portfolio ↗' : '포트폴리오로 돌아가기 ↗'}</a></div>
    </header>

    <div className={styles.playground}>
      <PreferencesPanel locale={locale} />
      <aside className={styles.preview} aria-labelledby="preview-title">
        <div className={styles.previewHeading}><span className="eyebrow">LIVE PREVIEW</span><span className={styles.liveDot}>{en ? 'Updates instantly' : '바로 반영돼요'}</span></div>
        <div className={styles.sampleCard}>
          <div className={styles.sampleArt} aria-hidden="true"><span>H</span><span>S</span><i /></div>
          <div className={styles.sampleBody}><span className="eyebrow">01 / A SMALL SAMPLE</span><h2 id="preview-title">{en ? 'Same content,' : '같은 내용,'}<br />{en ? 'different feel.' : '다른 분위기.'}</h2><p>{en ? 'Try a different accent color or change the spacing between cards. You can choose a corner style, too.' : '강조색과 카드 사이 간격을 바꿔 보세요. 모서리 모양도 고를 수 있어요.'}</p><a href={localizedPath(locale, '/#work')}>{en ? 'View work with these settings' : '이 설정으로 작업 보기'} <span aria-hidden="true">↗</span></a></div>
        </div>
        <p className={styles.note}>{en ? 'Settings are saved in this browser. If your device requests reduced motion, that preference takes priority.' : '설정은 이 브라우저에 저장돼요. 기기에서 움직임 감소를 켜두었다면 그 설정이 우선해요.'}</p>
      </aside>
    </div>

    <FrontendLab locale={locale} />

    <section className={styles.system} aria-labelledby="system-title">
      <div className={styles.sectionTitle}><span className="eyebrow">01 / DESIGN SYSTEM</span><h2 id="system-title">{en ? 'The parts of this display' : '화면을 이루는 것들'}</h2><p>{en ? 'Background, text, and accent colors each have a defined role.' : '배경, 글자, 강조색은 각각 역할이 있어요.'}<br />{en ? 'Change a setting above to see these samples update.' : '위에서 설정을 바꾸면 아래 견본도 함께 바뀌어요.'}</p></div>
      <div className={styles.palette}>
        {(en ? [['paper', 'Paper', 'Base page background'], ['surface', 'Surface', 'Areas that group content'], ['ink', 'Ink', 'Headings and body text'], ['accent', 'Accent', 'Links and selected states'], ['line', 'Line', 'Dividers and borders']] : [['paper', '바탕', '페이지의 기본 배경'], ['surface', '면', '내용을 묶는 영역'], ['ink', '글자', '제목과 본문'], ['accent', '강조', '링크와 선택 상태'], ['line', '구분', '선과 경계']]).map(([token, name, use]) => <div className={styles.colorToken} key={token}><div className={`${styles.colorChip} ${styles[token!]}`} /><h3>{name}</h3><p>{use}</p></div>)}
      </div>
      <div className={styles.specimens}>
        <article><span className="eyebrow">TYPE / DM SANS + NOTO SANS KR</span><p className={styles.typeEnglish}>Aa, Bb.<span>{en ? 'Type sample.' : '가나다.'}</span></p><p>{en ? 'Large English headings pair with generously spaced Korean body text. Long project descriptions use limited line lengths for easier reading.' : '영문 제목은 크게, 한국어 본문은 여유 있게 배치했어요. 긴 작업 설명은 읽기 편하도록 한 줄의 길이를 제한했어요.'}</p></article>
        <article><span className="eyebrow">SPACE & SHAPE / RHYTHM</span><div className={styles.spaceDemo} aria-hidden="true"><i /><i /><i /></div><h3>{en ? 'Spacing and corners' : '간격과 모서리'}</h3><p>{en ? 'Spacing changes the gaps between sections and cards. Corner settings apply to cards and buttons.' : '간격 설정은 섹션과 카드 사이의 여백에 적용돼요. 모서리 설정은 카드와 버튼에 적용돼요.'}</p></article>
      </div>
    </section>

    <section className={styles.making} aria-labelledby="making-title">
      <div className={styles.sectionTitle}><span className="eyebrow">02 / ABOUT THIS SITE</span><h2 id="making-title">{en ? 'About this site' : '이 사이트의 구성'}</h2></div>
      <div className={styles.makingRows}>
        <article><span>01</span><h3>{en ? 'Projects and case studies' : '프로젝트와 사례'}</h3><p>{en ? 'The home page features four projects. Each detail page explains my role, decisions, and validation. Diagrams are reconstructed for explanation, and figures include their measurement conditions.' : '홈에는 대표 작업 네 개를 모았어요. 각 상세 페이지에서는 맡은 역할, 구현 과정에서 내린 결정과 검증 결과를 설명해요. 도식은 설명용으로 재구성했고, 수치는 측정 조건과 함께 적었어요.'}</p></article>
        <article><span>02</span><h3>{en ? 'Interactive badge' : '움직이는 배지'}</h3><p>{en ? 'On desktop and mobile, drag or tap the hanging badge to move and flip it. The lanyard follows the card, then settles when you let go. Arrow keys move it, Enter flips it and Home resets it. Reduced motion, disabled JavaScript or WebGL errors show the static badge.' : '데스크톱과 모바일에서 끈에 매달린 배지를 드래그하거나 탭해 움직이고 뒤집을 수 있어요. 놓으면 끈과 카드가 천천히 멈춰요. 방향키로 움직이고 Enter로 뒤집으며 Home으로 제자리에 놓아요. 움직임 감소 설정·JavaScript 비활성화·WebGL 오류에서는 정적 배지가 보여요.'}</p></article>
        <article><span>03</span><h3>{en ? 'Static pages and display controls' : '정적 페이지와 화면 설정'}</h3><p>{en ? 'The site uses Next.js, React and TypeScript. Its main content is exported as static pages, while the badge, display controls and interaction labs run in the browser. The saved theme is applied before the page is drawn.' : 'Next.js와 React, TypeScript로 만들었어요. 본문은 정적 페이지로 제공하고, 배지·화면 설정·프론트엔드 실험은 브라우저에서 동작해요. 저장된 테마는 화면이 그려지기 전에 적용해요.'}</p></article>
      </div>
      <a href={localizedPath(locale, '/')} className={styles.backHome}>{en ? 'See the updated display' : '바뀐 화면 보러 가기'} <span aria-hidden="true">↗</span></a>
    </section>
  </div>;
}
