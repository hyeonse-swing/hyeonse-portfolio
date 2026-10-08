import type { Locale } from '../lib/locale';
import { getBadgeDrawing } from '../lib/badge-artwork';

export default function BadgePrint({ locale = 'ko', className }: { locale?: Locale; className?: string }) {
  return <svg
    className={className}
    viewBox="0 0 1024 1440"
    preserveAspectRatio="none"
    style={{ letterSpacing: 'normal' }}
    width="100%"
    height="100%"
    role="presentation"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {getBadgeDrawing(locale, 'var(--accent-solid)').map((command, index) => command.kind === 'rect'
      ? <rect key={index} x={command.x} y={command.y} width={command.width} height={command.height} fill={command.fill} />
      : <text key={index} x={command.x} y={command.y} fill={command.fill} fontFamily='"DM Sans", "Noto Sans KR", sans-serif' fontSize={command.size} fontWeight={command.weight} textAnchor={command.align === 'right' ? 'end' : 'start'}>{command.value}</text>)}
  </svg>;
}
