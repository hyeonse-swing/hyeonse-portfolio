import type { Locale } from './locale';

export const badgeIdentity = {
  heading: 'PORTFOLIO / ENGINEERING', location: 'SEOUL · KR', initials: 'HS', index: '01 / 04',
  name: 'HYEONSE IM', koreanName: '임현세', role: 'FRONTEND ENGINEER', stack: 'React / TypeScript', period: '2022—NOW',
};
export const badgeNameLabel = (locale: Locale) => locale === 'ko' ? 'NAME / 이름' : 'NAME';

type BadgeRect = { kind: 'rect'; x: number; y: number; width: number; height: number; fill: string };
type BadgeText = { kind: 'text'; value: string; x: number; y: number; size: number; weight: number; fill: string; align?: 'right' };
export type BadgeDrawingCommand = BadgeRect | BadgeText;

export function getBadgeDrawing(locale: Locale, accent: string): BadgeDrawingCommand[] {
  const commands: BadgeDrawingCommand[] = [];
  const rect = (x: number, y: number, width: number, height: number, fill: string) => commands.push({ kind: 'rect', x, y, width, height, fill });
  const text = (value: string, x: number, y: number, size: number, weight: number, fill: string, align?: 'right') => commands.push({ kind: 'text', value, x, y, size, weight, fill, align });
  const rule = (y: number, fill: string, height = 2) => rect(80, y, 864, height, fill);
  const ink = '#10151d';
  const muted = '#657385';

  rect(0, 0, 1024, 1440, '#f9faf9');
  rect(0, 0, 14, 1440, accent);
  text(badgeIdentity.heading, 80, 190, 24, 750, ink);
  text(badgeIdentity.location, 944, 190, 24, 600, muted, 'right');
  rule(226, '#bfc9d3');
  rect(80, 282, 352, 352, accent);
  rect(255, 282, 2, 352, 'rgba(255,255,255,.16)');
  rect(80, 457, 352, 2, 'rgba(255,255,255,.16)');
  text('H', 125, 523, 183, 850, '#ffffff');
  text('S', 250, 523, 183, 850, 'rgba(255,255,255,.7)');
  text(badgeIdentity.initials, 944, 327, 42, 800, accent, 'right');
  text(badgeIdentity.index, 944, 589, 28, 750, accent, 'right');
  for (let x = 826; x < 944; x += 15) rect(x, 614, 6, 20, accent);
  text(badgeNameLabel(locale), 80, 810, 26, 650, muted);
  text(badgeIdentity.name, 76, 960, 124, 800, ink);
  text(badgeIdentity.koreanName, 80, 1033, 51, 650, '#27303c');
  rule(1110, ink, 5);
  rect(80, 1160, 23, 23, accent);
  text(badgeIdentity.role, 128, 1186, 35, 750, ink);
  rule(1250, '#cdd4db');
  text(badgeIdentity.stack, 80, 1317, 28, 600, muted);
  text(badgeIdentity.period, 944, 1317, 28, 600, muted, 'right');
  return commands;
}

// Print at texture resolution using the site's local fonts.
export async function createBadgeArtwork(locale: Locale, accent: string): Promise<string> {
  await Promise.all([document.fonts.load('800 120px "DM Sans"'), document.fonts.load('600 50px "Noto Sans KR"', '임현세 이름')]);
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = Math.round(1024 / .785);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Card artwork is unavailable');
  ctx.scale(1, canvas.height / 1440);
  for (const command of getBadgeDrawing(locale, accent)) {
    ctx.fillStyle = command.fill;
    if (command.kind === 'rect') {
      ctx.fillRect(command.x, command.y, command.width, command.height);
    } else {
      ctx.font = `${command.weight} ${command.size}px "DM Sans", "Noto Sans KR", sans-serif`;
      ctx.textAlign = command.align ?? 'left';
      ctx.fillText(command.value, command.x, command.y);
    }
  }
  return canvas.toDataURL('image/png');
}
