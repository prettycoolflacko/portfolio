/* ═══════════════════════════════════════════════════════
   VistaIcon — authentic Windows 7 / Vista system icons
   Extracted from Win7 shell32.dll / imageres.dll via
   Visnalize/resources (github.com/Visnalize/resources).
   Files live in /public/icons/win7/<id>.png (transparent).
   Usage: <VistaIcon id="computer" size={34} />
═══════════════════════════════════════════════════════ */

const KNOWN = new Set([
  'computer', 'userfolder', 'folder', 'document', 'recycle', 'earth',
  'user', 'calendar', 'star', 'certificate', 'bolt', 'briefcase', 'book',
  'envelope', 'phone', 'web', 'code', 'blocks', 'tool', 'film', 'chart',
  'network', 'lock', 'search', 'info', 'warn', 'refresh', 'flag', 'wifi',
  'volume', 'download', 'lightbulb', 'paint', 'notepad', 'mailsend',
]);

export default function VistaIcon({ id, size = 24, title, className, style }) {
  const src = `/icons/win7/${(KNOWN.has(id) ? id : 'folder')}.png`;
  return (
    <img
      src={src}
      alt={title || ''}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={className}
      role={title ? 'img' : undefined}
      style={{
        display: 'inline-block',
        flexShrink: 0,
        verticalAlign: 'middle',
        filter: 'drop-shadow(0 1px 2px rgba(0,40,80,.35))',
        ...style,
      }}
    />
  );
}
