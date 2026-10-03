import type { Locale } from '../lib/locale';
import { localizedPath } from '../lib/locale';
import { PreferencesPanel } from './SitePreferences';
import styles from './StudioPage.module.css';

export default function StudioPage({ locale }: { locale: Locale }) {
  const en = locale === 'en';
  return <div className={styles.page} id="top">
    <header className={styles.intro}>
      <div><span className="eyebrow">OPEN STUDIO / {en ? 'ABOUT THIS SITE' : '이 사이트의 작업실'}</span><h1>Make it<br /><em>yours.</em></h1></div>
      <div className={styles.introCopy}><span className={styles.smallMark} aria-hidden="true">im.</span><p>{en ? 'This is a space to explore the display.' : '여기는 화면을 만져보는 곳입니다.'}<br />{en ? 'Choose colors and spacing you like.' : '마음에 드는 색과 간격을 골라 보세요.'}<br />{en ? 'Your choices also apply to the home and project pages.' : '홈과 프로젝트 페이지에도 그대로 적용됩니다.'}</p><a className="text-link" href={localizedPath(locale, '/')}>{en ? 'Back to portfolio ↗' : '포트폴리오로 돌아가기 ↗'}</a></div>
    </header>

    <div className={styles.playground}>
      <PreferencesPanel locale={locale} />
      <aside className={styles.preview} aria-labelledby="preview-title">
        <div className={styles.previewHeading}><span className="eyebrow">LIVE PREVIEW</span><span className={styles.liveDot}>{en ? 'Updates instantly' : '바로 반영됩니다'}</span></div>
        <div className={styles.sampleCard}>
          <div className={styles.sampleArt} aria-hidden="true"><span>H</span><span>M</span><i /></div>
          <div className={styles.sampleBody}><span className="eyebrow">01 / A SMALL SAMPLE</span><h2 id="preview-title">{en ? 'Same content,' : '같은 내용,'}<br />{en ? 'different feel.' : '다른 분위기.'}</h2><p>{en ? 'Colors change the accents, spacing changes the density. Try changing the corners, too.' : '색을 바꾸면 강조가, 간격을 바꾸면 밀도가 달라집니다. 모서리도 바꿔 보세요.'}</p><a href={localizedPath(locale, '/#work')}>{en ? 'View work with these settings' : '이 설정으로 작업 보기'} <span aria-hidden="true">↗</span></a></div>
        </div>
        <p className={styles.note}>{en ? 'Settings are saved in this browser. If your device requests reduced motion, that preference takes priority.' : '설정은 이 브라우저에 저장됩니다. 기기의 움직임 감소 설정이 켜져 있으면 그 설정을 따릅니다.'}</p>
      </aside>
    </div>

    <section className={styles.system} aria-labelledby="system-title">
      <div className={styles.sectionTitle}><span className="eyebrow">01 / DESIGN SYSTEM</span><h2 id="system-title">{en ? 'The parts of this display' : '화면을 이루는 것들'}</h2><p>{en ? 'Background, text, and accent colors each have a defined role.' : '배경, 글자, 강조색을 역할별로 정해 두었습니다.'}<br />{en ? 'Change a setting above to see these samples update.' : '위에서 설정을 바꾸면 아래 견본도 함께 바뀝니다.'}</p></div>
      <div className={styles.palette}>
        {(en ? [['paper', 'Paper', 'Base page background'], ['surface', 'Surface', 'Areas that group content'], ['ink', 'Ink', 'Headings and body text'], ['accent', 'Accent', 'Links and selected states'], ['line', 'Line', 'Dividers and borders']] : [['paper', '바탕', '페이지의 기본 배경'], ['surface', '면', '내용을 묶는 영역'], ['ink', '글자', '제목과 본문'], ['accent', '강조', '링크와 선택 상태'], ['line', '구분', '선과 경계']]).map(([token, name, use]) => <div className={styles.colorToken} key={token}><div className={`${styles.colorChip} ${styles[token!]}`} /><h3>{name}</h3><p>{use}</p></div>)}
      </div>
      <div className={styles.specimens}>
        <article><span className="eyebrow">TYPE / DM SANS + NOTO SANS KR</span><p className={styles.typeEnglish}>Aa, Bb.<span>{en ? 'Type sample.' : '가나다.'}</span></p><p>{en ? 'Large English headings pair with generously spaced Korean body text. Long project descriptions use limited line lengths for easier reading.' : '영문 제목은 크게, 한국어 본문은 여유 있게 배치했습니다. 긴 작업 설명은 줄 길이를 제한해 읽기 편하게 했습니다.'}</p></article>
        <article><span className="eyebrow">SPACE & SHAPE / RHYTHM</span><div className={styles.spaceDemo} aria-hidden="true"><i /><i /><i /></div><h3>{en ? 'Spacing and corners' : '간격과 모서리'}</h3><p>{en ? 'Spacing changes the gaps between sections and cards. Corner settings apply to cards and buttons.' : '간격 설정은 섹션과 카드 사이의 여백에, 모서리 설정은 카드와 버튼에 적용됩니다.'}</p></article>
      </div>
    </section>

    <section className={styles.making} aria-labelledby="making-title">
      <div className={styles.sectionTitle}><span className="eyebrow">02 / ABOUT THIS SITE</span><h2 id="making-title">{en ? 'How this site was built' : '이 사이트는 이렇게 만들었습니다'}</h2></div>
      <div className={styles.makingRows}>
        <article><span>01</span><h3>{en ? 'A place to explore the work' : '작업을 읽는 공간'}</h3><p>{en ? 'The home page features four projects. Each detail page explains my role, decisions, and validation. Diagrams are reconstructed for explanation, and figures include their measurement conditions.' : '홈에는 대표 작업 네 개를, 각 상세 페이지에는 맡은 역할과 선택, 검증 결과를 담았습니다. 도식은 설명용으로 재구성했고, 수치는 측정 조건과 함께 적었습니다.'}</p></article>
        <article><span>02</span><h3>{en ? 'A badge you can drag' : '당겨볼 수 있는 배지'}</h3><p>{en ? 'Drag the hanging badge and let it swing. The lanyard bends as you move it, and the motion gradually settles when you let go. The arrow keys move it, and Home resets it. Touch works across the whole badge.' : '끈에 매달린 배지를 잡아 흔들어 보세요. 손을 따라 기울고 출렁이다가 놓으면 천천히 멈춥니다. 방향키로 움직이고 Home 키로 제자리에 둘 수도 있습니다. 모바일에서도 배지 전체를 잡아 움직일 수 있습니다.'}</p></article>
        <article><span>03</span><h3>{en ? 'Motion where it helps' : '필요한 곳에만 움직임'}</h3><p>{en ? 'Built with Next.js, React, and TypeScript. The main content is exported as static pages, while the badge and display controls run in the browser. The theme is applied before the page paints.' : 'Next.js와 React, TypeScript로 만들었습니다. 본문은 정적 페이지로 내보내고, 배지와 화면 설정에 브라우저에서 동작하는 코드를 사용합니다. 테마는 화면이 그려지기 전에 적용합니다.'}</p></article>
      </div>
      <a href={localizedPath(locale, '/')} className={styles.backHome}>{en ? 'See the updated display' : '바뀐 화면 보러 가기'} <span aria-hidden="true">↗</span></a>
    </section>
  </div>;
}
