import { useId } from 'react';
import {
  FiCpu, FiGlobe, FiDatabase, FiCloud, FiWifi, FiFilm,
  FiMail, FiLinkedin, FiBriefcase, FiBookOpen,
  FiLayers, FiTool, FiSmartphone, FiServer, FiGithub,
  FiInstagram, FiAward, FiMapPin, FiUser, FiZap,
} from 'react-icons/fi';

/* ═══════════════════════════════════════════════════════
   FRUTIGER AERO SPRITE LIBRARY
   Glossy 2007-era desktop icons — water drops, fish,
   bubbles, aurora, chrome. Render with <AeroSprite id="drop" size={28} />
═══════════════════════════════════════════════════════ */

/* Line-icon tiles: react-icons glyph inside a glossy rounded tile */
const TILE_SPRITES = {
  mail:      { Glyph: FiMail,      tile: 'tileSilver',   color: '#1a4e70' },
  linkedin:  { Glyph: FiLinkedin,  tile: 'tileLinkedin', color: '#ffffff' },
  instagram: { Glyph: FiInstagram, tile: 'tileGold',     color: '#6b3f00' },
  github:    { Glyph: FiGithub,    tile: 'tileSilver',   color: '#2c3e50' },
  briefcase: { Glyph: FiBriefcase, tile: 'tileGold',     color: '#6b3f00' },
  book:      { Glyph: FiBookOpen,  tile: 'tileGreen',    color: '#1b4b1c' },
  code:      { Glyph: FiCpu,       tile: 'tileSky',      color: '#0b3863' },
  layers:    { Glyph: FiLayers,    tile: 'tileAqua',     color: '#004d55' },
  tool:      { Glyph: FiTool,      tile: 'tileGreen',    color: '#1b4b1c' },
  phone:     { Glyph: FiSmartphone,tile: 'tileSky',      color: '#0b3863' },
  web:       { Glyph: FiGlobe,     tile: 'tileAqua',     color: '#004d55' },
  data:      { Glyph: FiDatabase,  tile: 'tileSky',      color: '#0b3863' },
  server:    { Glyph: FiServer,    tile: 'tileSilver',   color: '#2c3e50' },
  cloud:     { Glyph: FiCloud,     tile: 'tileSilver',   color: '#2c3e50' },
  wifi:      { Glyph: FiWifi,      tile: 'tileAqua',     color: '#004d55' },
  film:      { Glyph: FiFilm,      tile: 'tileGreen',    color: '#1b4b1c' },
  award:     { Glyph: FiAward,     tile: 'tileGold',     color: '#6b3f00' },
  mappin:    { Glyph: FiMapPin,    tile: 'tileGreen',    color: '#1b4b1c' },
  user:      { Glyph: FiUser,      tile: 'tileSky',      color: '#0b3863' },
  zap:       { Glyph: FiZap,       tile: 'tileGold',     color: '#6b3f00' },
};

/* Hand-drawn nature + chrome sprites (gradient ids prefixed per instance) */
const PATH_SPRITES = {
  drop: p => `<g>
    <path d="M24 5.5c-9.5 11.5-16 18.6-16 27A16 16 0 0 0 40 32.5c0-8.4-6.5-15.5-16-27Z"
          fill="url(#${p}-dropG)" stroke="#055f74" stroke-width="1.5"/>
    <ellipse cx="17.5" cy="32" rx="5.5" ry="7.5" fill="rgba(255,255,255,.55)" transform="rotate(18 17.5 32)"/>
    <circle cx="31" cy="36.5" r="2.4" fill="rgba(255,255,255,.85)"/>
    <circle cx="34.5" cy="27" r="1.4" fill="rgba(255,255,255,.7)"/>
  </g>`,

  fish: p => `<g>
    <path d="M42 24c0-6.6-7.4-12-15.5-12S11 17.4 11 24s7.4 12 15.5 12S42 30.6 42 24Z"
          fill="url(#${p}-fishG)" stroke="#15607a" stroke-width="1.2"/>
    <path d="M14 24 4.5 15C6.3 20.6 6.3 27.4 4.5 33Z"
          fill="url(#${p}-fishG)" stroke="#15607a" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M22 12.5c1.5-3 4.5-4.5 4.5-4.5s2.5 3 1.5 5.5" fill="none" stroke="#15607a" stroke-width="1.2"/>
    <ellipse cx="17" cy="19.5" rx="5.5" ry="7" fill="rgba(255,255,255,.35)" transform="rotate(14 17 19.5)"/>
    <circle cx="37.5" cy="21.5" r="2.4" fill="#fff"/>
    <circle cx="38.4" cy="21.5" r="1.2" fill="#062c3e"/>
    <path d="M30 29.5c2 1.5 5 1.5 7 0" stroke="#0e5a75" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  </g>`,

  bubbles: p => `<g>
    <circle cx="19" cy="31" r="11" fill="url(#${p}-bubG)" stroke="rgba(255,255,255,.9)" stroke-width="1.4"/>
    <ellipse cx="15" cy="26.5" rx="3.2" ry="4.4" fill="rgba(255,255,255,.75)" transform="rotate(-22 15 26.5)"/>
    <circle cx="34" cy="16.5" r="6.5" fill="url(#${p}-bubG)" stroke="rgba(255,255,255,.85)" stroke-width="1.2"/>
    <ellipse cx="31.8" cy="14.3" rx="1.8" ry="2.4" fill="rgba(255,255,255,.8)" transform="rotate(-22 31.8 14.3)"/>
    <circle cx="38" cy="33" r="3.4" fill="url(#${p}-bubG)" stroke="rgba(255,255,255,.85)" stroke-width="1"/>
    <circle cx="29" cy="40.5" r="2" fill="url(#${p}-bubG)"/>
  </g>`,

  leaf: p => `<g>
    <path d="M11 39C11.5 22 24 9.5 44 10.5 43.5 27 31.5 40 11 39Z"
          fill="url(#${p}-leafG)" stroke="#1e6b2c" stroke-width="1.3"/>
    <path d="M14 37C21 28 30 19.5 39 13.5" stroke="rgba(255,255,255,.7)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M21 28.5c-2.5-.8-5.5-.6-8 .8M27.5 22.5c-2.4-.9-5.3-.8-7.6.6M34 16.5c-2.2-1-4.8-1-6.9.3"
          stroke="rgba(255,255,255,.55)" stroke-width="1.1" fill="none" stroke-linecap="round"/>
  </g>`,

  butterfly: p => `<g>
    <path d="M22.5 23C19 16.5 11.5 13.5 6 16c-3.6 1.7-1.6 8.7 3.9 11.7 3 1.7 8.6.8 10.6-2.5.4-.6.6-1.3 2-3.2Z"
          fill="url(#${p}-bwG)" stroke="#1278a0" stroke-width="1.1"/>
    <path d="M25.5 23c3.5-6.5 11-9.5 16.5-7 3.6 1.7 1.6 8.7-3.9 11.7-3 1.7-8.6.8-10.6-2.5-.4-.6-.6-1.3-2-3.2Z"
          fill="url(#${p}-bwG)" stroke="#1278a0" stroke-width="1.1"/>
    <path d="M22.5 24.5c-2.7 3.4-2.5 8.5.4 11.5.8.9 1.6 1.4 1.9 1.8.3-.4 1.1-.9 1.9-1.8 2.9-3 3.1-8.1.4-11.5-.9-.9-2.3-1.6-5.6-1.6Z"
          fill="url(#${p}-bwG2)" stroke="#1278a0" stroke-width="1"/>
    <ellipse cx="24" cy="21.5" rx="1.8" ry="4.5" fill="#0d4a68"/>
    <path d="M22.8 14.5C23.4 12.5 24.8 10.5 26.8 9M25.2 14.5c-.6-2-2-4-4-5.5"
          stroke="#0d5a7a" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <circle cx="11" cy="21" r="2.2" fill="rgba(255,255,255,.6)"/>
    <circle cx="37" cy="21" r="2.2" fill="rgba(255,255,255,.6)"/>
  </g>`,

  shell: p => `<g>
    <path d="M24 41c-9 0-15.5-5.5-17-13.5l3.5 3 2.5-3.5 3 2.5 3-3.5 5 3 5-3 3 3.5 3-2.5 3.5 3C39.5 35.5 33 41 24 41Z"
          fill="url(#${p}-shelG)" stroke="#9c6a30" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M24 39V15M17.5 38.5 21 16M30.5 38.5 27 16M12.5 33 19.5 17M35.5 33 28.5 17"
          stroke="rgba(255,255,255,.55)" stroke-width="1.2" fill="none"/>
    <ellipse cx="17" cy="33" rx="4" ry="5.5" fill="rgba(255,255,255,.35)"/>
  </g>`,

  aurora: p => `<g>
    <path d="M5 41C7.5 22 16 9 37.5 7.5 37.5 7.5 30.5 36.5 14.5 41Z"
          fill="url(#${p}-auroG)" stroke="rgba(255,255,255,.5)" stroke-width="1"/>
    <path d="M9.5 40C11.5 26 18.5 15 31.5 11.5" stroke="rgba(255,255,255,.75)" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <circle cx="24" cy="24" r="2.2" fill="rgba(255,255,255,.9)"/>
  </g>`,

  globe: p => `<g>
    <circle cx="24" cy="24" r="17" fill="url(#${p}-globG)" stroke="rgba(255,255,255,.85)" stroke-width="1.4"/>
    <ellipse cx="24" cy="24" rx="8" ry="17" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1"/>
    <path d="M7.5 24h33M10 16.5c5.5 3.5 14 3.5 21 0M10 31.5c5.5-3.5 14-3.5 21 0"
          stroke="rgba(255,255,255,.5)" stroke-width="1" fill="none"/>
    <path d="M18 21c2.5 1.5 5.5 1 8.5 0M14 27c4 2.5 10 3 15 .5"
          stroke="rgba(46,125,50,.55)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="17" cy="14" rx="6" ry="4" fill="rgba(255,255,255,.55)" transform="rotate(-18 17 14)"/>
  </g>`,

  rocket: p => `<g>
    <path d="M18 31l-5 8.5 6.5-2.5 2 3.5h5l2-3.5L35 39.5 30 31Z" fill="url(#${p}-caseG)" stroke="#5b8db8" stroke-width="1.1"/>
    <path d="M24 5c5 4.5 8 10 8 16.5L29 31H19l-3-9.5C16 15 19 9.5 24 5Z"
          fill="url(#${p}-rocketG)" stroke="#46688c" stroke-width="1.3"/>
    <circle cx="24" cy="17.5" r="3.4" fill="url(#${p}-bubG)" stroke="#3f74a8" stroke-width="1"/>
    <path d="M21 37.5c.4 2.6 1.3 4.3 3 6 1.7-1.7 2.6-3.4 3-6-1.6-1.2-4.4-1.2-6 0Z"
          fill="url(#${p}-flameG)" stroke="#e65100" stroke-width=".8"/>
    <ellipse cx="21" cy="11" rx="2.6" ry="3.6" fill="rgba(255,255,255,.55)"/>
  </g>`,

  bolt: p => `<g>
    <path d="M27 4 12 27h8l-4 17 15-24h-8l4-16Z"
          fill="url(#${p}-boltG)" stroke="#b8860b" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M25.5 9.5 17 22h4.5" stroke="rgba(255,255,255,.75)" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  </g>`,

  medal: p => `<g>
    <rect x="13" y="5" width="8" height="16" rx="1.5" fill="url(#${p}-medalRibG)" transform="rotate(26 17 13)"/>
    <rect x="27" y="5" width="8" height="16" rx="1.5" fill="url(#${p}-medalRibG)" transform="rotate(-26 31 13)"/>
    <circle cx="24" cy="29.5" r="12" fill="url(#${p}-medalG)" stroke="#8d6e08" stroke-width="1.3"/>
    <circle cx="24" cy="29.5" r="8.5" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="1"/>
    <path d="m24 25 1.7 3.5 3.8.55-2.75 2.7.65 3.8L24 33.9l-3.4 1.65.65-3.8-2.75-2.7 3.8-.55Z" fill="#fff"/>
  </g>`,

  computer: p => `<g>
    <rect x="13" y="4" width="22" height="24" rx="2" fill="url(#${p}-caseG)" stroke="#6a8bb0" stroke-width="1.2"/>
    <rect x="17" y="8" width="14" height="4" rx="1" fill="#eef5fb" stroke="#9db6cc" stroke-width=".8"/>
    <circle cx="20" cy="16.5" r="1.5" fill="#66bb6a" stroke="#2e7d32" stroke-width=".6"/>
    <circle cx="26" cy="16.5" r="1.5" fill="#4fc3f7" stroke="#0277bd" stroke-width=".6"/>
    <path d="M17 21h14M17 25h14" stroke="#b9cfdf" stroke-width="1.2"/>
    <rect x="12" y="29" width="24" height="3.4" rx="1" fill="#cfd8dc" stroke="#8fa5b8" stroke-width=".8"/>
    <rect x="19" y="32.4" width="10" height="4.6" fill="#9fb2c4"/>
    <rect x="8" y="37" width="32" height="4.5" rx="1.4" fill="url(#${p}-caseG)" stroke="#7c95ab" stroke-width="1"/>
  </g>`,

  monitor: p => `<g>
    <rect x="6" y="7" width="36" height="26" rx="3.2" fill="url(#${p}-frameG)" stroke="#46688c" stroke-width="1.4"/>
    <rect x="9.5" y="10.5" width="29" height="19" rx="1.2" fill="url(#${p}-screenG)" stroke="#155e88" stroke-width=".8"/>
    <path d="M11 27.5c5-5 9-8.5 14.5-8.5S34 22 39 20" stroke="rgba(255,255,255,.85)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <circle cx="37" cy="14.5" r="1.6" fill="rgba(255,255,255,.9)"/>
    <rect x="19" y="33" width="10" height="3.4" fill="#8fa5b8"/>
    <rect x="13" y="36.4" width="22" height="3.8" rx="1.2" fill="url(#${p}-frameG)" stroke="#46688c" stroke-width="1"/>
  </g>`,

  folder: p => `<g>
    <path d="M5 12.5c0-1.4 1.1-2.5 2.5-2.5h9.5c.7 0 1.3.3 1.8.9l2.2 2.8h11c1.4 0 2.5 1.1 2.5 2.5V36c0 1.9-1.6 3.5-3.5 3.5H8.5C6.6 39.5 5 37.9 5 36V12.5Z"
          fill="url(#${p}-foldG)" stroke="#3f74a8" stroke-width="1.2"/>
    <path d="M5 18.5h34V36c0 1.9-1.6 3.5-3.5 3.5H8.5C6.6 39.5 5 37.9 5 36V18.5Z"
          fill="url(#${p}-foldFrontG)" stroke="rgba(255,255,255,.6)" stroke-width=".8"/>
    <ellipse cx="13" cy="13.5" rx="3" ry="2" fill="rgba(255,255,255,.55)"/>
    <circle cx="33.5" cy="26" r="5.5" fill="url(#${p}-bubG)" stroke="rgba(255,255,255,.9)" stroke-width="1"/>
    <ellipse cx="31.5" cy="23.8" rx="1.6" ry="2" fill="rgba(255,255,255,.85)"/>
  </g>`,

  document: p => `<g>
    <path d="M11 4.5h16.5L38 15v24c0 1.4-1.1 2.5-2.5 2.5h-22c-1.4 0-2.5-1.1-2.5-2.5V7c0-1.4 1.1-2.5 2.5-2.5Z"
          fill="#fff" stroke="#7c99be" stroke-width="1.3"/>
    <path d="M27.5 4.5V15H38" fill="url(#${p}-foldFrontG)" stroke="#7c99be" stroke-width="1"/>
    <path d="M15 21h13M15 26h17M15 31h17M15 36h11" stroke="#5ba8e0" stroke-width="2" stroke-linecap="round"/>
    <circle cx="32.5" cy="34.5" r="4.2" fill="url(#${p}-redG)" stroke="#a31505" stroke-width=".9"/>
    <path d="m30.5 34.5 1.5 1.5 2.8-3" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  </g>`,

  recycle: p => `<g>
    <path d="M10.5 12.5h27l-3.2 22.2c-.3 1.6-1.7 2.8-3.3 2.8H17c-1.6 0-3-1.2-3.3-2.8L10.5 12.5Z"
          fill="url(#${p}-binG)" stroke="#5c7688" stroke-width="1.3"/>
    <rect x="7.5" y="8.5" width="33" height="5.2" rx="2.6" fill="url(#${p}-frameG)" stroke="#5c7688" stroke-width="1.1"/>
    <path d="M18.5 18.5v14M24 18.5v14M29.5 18.5v14" stroke="rgba(255,255,255,.75)" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M24 16.5c-3.5 0-5.5 2.2-4.4 5.4l1.5 4.6h5.8l1.5-4.6c1.1-3.2-.9-5.4-4.4-5.4Z"
          fill="#66bb6a" stroke="#2e7d32" stroke-width="1"/>
  </g>`,

  warn: p => `<g>
    <path d="M24 5.5 43 37.5c.8 1.4 0 3.2-1.8 3.2H12.8C11 40.7 10.2 38.9 11 37.5L24 5.5Z"
          fill="url(#${p}-warnG)" stroke="#8a5a00" stroke-width="1.4"/>
    <rect x="22.2" y="17" width="3.6" height="12" rx="1.8" fill="#fff"/>
    <circle cx="24" cy="34.5" r="2.2" fill="#fff"/>
  </g>`,
};

const GRADIENTS = [
  { id: 'dropG', tag: 'linearGradient', attrs: { x1: '12', y1: '8', x2: '34', y2: '44', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#e0fbff'], ['.45', '#4dd0e1'], ['1', '#00838f']] },
  { id: 'fishG', tag: 'linearGradient', attrs: { x1: '6', y1: '14', x2: '30', y2: '38', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#9beaf4'], ['1', '#1e88e5']] },
  { id: 'bubG', tag: 'radialGradient', attrs: { cx: '.35', cy: '.3', r: '.85' },
    stops: [[0, '#ffffff'], ['.45', '#aee9f7'], ['1', '#4f8fd8']] },
  { id: 'leafG', tag: 'linearGradient', attrs: { x1: '12', y1: '10', x2: '40', y2: '38', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#b9f6ca'], ['1', '#2e7d32']] },
  { id: 'bwG', tag: 'linearGradient', attrs: { x1: '4', y1: '10', x2: '26', y2: '40', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#b3e5fc'], ['1', '#1e88e5']] },
  { id: 'bwG2', tag: 'linearGradient', attrs: { x1: '18', y1: '24', x2: '30', y2: '42', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#e3f7ff'], ['1', '#4fc3f7']] },
  { id: 'shelG', tag: 'linearGradient', attrs: { x1: '8', y1: '12', x2: '40', y2: '40', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#fff0d4'], ['1', '#e89a3c']] },
  { id: 'auroG', tag: 'linearGradient', attrs: { x1: '6', y1: '41', x2: '34', y2: '8', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, 'rgba(2,119,189,0)'], ['.5', 'rgba(128,222,234,.55)'], ['1', 'rgba(255,255,255,.9)']] },
  { id: 'globG', tag: 'radialGradient', attrs: { cx: '.32', cy: '.28', r: '.9' },
    stops: [[0, '#b2ebf2'], ['.5', '#26c6da'], ['1', '#006064']] },
  { id: 'rocketG', tag: 'linearGradient', attrs: { x1: '16', y1: '6', x2: '32', y2: '31', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#ffffff'], ['.5', '#cfe6f7'], ['1', '#8fb8d8']] },
  { id: 'flameG', tag: 'linearGradient', attrs: { x1: '21', y1: '37', x2: '27', y2: '44', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#fff176'], ['1', '#f57c00']] },
  { id: 'boltG', tag: 'linearGradient', attrs: { x1: '12', y1: '4', x2: '32', y2: '44', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#fff9c4'], ['1', '#ffb300']] },
  { id: 'medalG', tag: 'radialGradient', attrs: { cx: '.35', cy: '.3' },
    stops: [[0, '#fff2b0'], ['.55', '#f5a623'], ['1', '#b8860b']] },
  { id: 'medalRibG', tag: 'linearGradient', attrs: { x1: '0', y1: '0', x2: '0', y2: '1' },
    stops: [[0, '#b39ddb'], ['1', '#4527a0']] },
  { id: 'caseG', tag: 'linearGradient', attrs: { x1: '10', y1: '4', x2: '36', y2: '42', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#fbfdff'], ['.5', '#d9e4ee'], ['1', '#a9b8c6']] },
  { id: 'frameG', tag: 'linearGradient', attrs: { x1: '6', y1: '6', x2: '30', y2: '40', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#f4f8fb'], ['.5', '#c3d3e0'], ['1', '#8fa3b5']] },
  { id: 'screenG', tag: 'linearGradient', attrs: { x1: '9', y1: '10', x2: '38', y2: '30', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#e0f7ff'], ['.5', '#4fc3f7'], ['1', '#0277bd']] },
  { id: 'foldG', tag: 'linearGradient', attrs: { x1: '5', y1: '10', x2: '30', y2: '40', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#fff2c8'], ['1', '#f5a623']] },
  { id: 'foldFrontG', tag: 'linearGradient', attrs: { x1: '5', y1: '18', x2: '25', y2: '39', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#ffe9a8'], ['.5', '#ffd54f'], ['1', '#f9a825']] },
  { id: 'binG', tag: 'linearGradient', attrs: { x1: '10', y1: '12', x2: '36', y2: '38', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#e9eef2'], ['.5', '#c2cdd6'], ['1', '#93a5b3']] },
  { id: 'warnG', tag: 'linearGradient', attrs: { x1: '12', y1: '6', x2: '36', y2: '40', gradientUnits: 'userSpaceOnUse' },
    stops: [[0, '#fff3b0'], ['.5', '#ffd54f'], ['1', '#f57f17']] },
  { id: 'redG', tag: 'radialGradient', attrs: { cx: '.35', cy: '.3', r: '.85' },
    stops: [[0, '#ff8a80'], ['1', '#c62828']] },
  { id: 'tileSky', tag: 'linearGradient', attrs: { x1: '0', y1: '0', x2: '0', y2: '1' },
    stops: [[0, '#ebf7ff'], ['.55', '#85c8f7'], ['1', '#42a5f5']] },
  { id: 'tileAqua', tag: 'linearGradient', attrs: { x1: '0', y1: '0', x2: '0', y2: '1' },
    stops: [[0, '#e0f7fa'], ['.55', '#7fe0ea'], ['1', '#26c6da']] },
  { id: 'tileGreen', tag: 'linearGradient', attrs: { x1: '0', y1: '0', x2: '0', y2: '1' },
    stops: [[0, '#e8f5e9'], ['.55', '#a5d6a7'], ['1', '#66bb6a']] },
  { id: 'tileSilver', tag: 'linearGradient', attrs: { x1: '0', y1: '0', x2: '0', y2: '1' },
    stops: [[0, '#ffffff'], ['.55', '#dfe7ee'], ['1', '#aebfcd']] },
  { id: 'tileGold', tag: 'linearGradient', attrs: { x1: '0', y1: '0', x2: '0', y2: '1' },
    stops: [[0, '#fff2c8'], ['.55', '#ffd54f'], ['1', '#f9a825']] },
  { id: 'tileLinkedin', tag: 'linearGradient', attrs: { x1: '0', y1: '0', x2: '0', y2: '1' },
    stops: [[0, '#9fd5f7'], ['.55', '#4ba9e1'], ['1', '#0a66c2']] },
];

function SpriteDefs({ p }) {
  return (
    <defs>
      {GRADIENTS.map(g => {
        const Tag = g.tag === 'radialGradient' ? 'radialGradient' : 'linearGradient';
        return (
          <Tag key={g.id} {...g.attrs} id={`${p}-${g.id}`}>
            {g.stops.map(([o, c]) => (
              // eslint-disable-next-line react/no-array-index-key
              <stop key={`${o}-${c}`} offset={o} stopColor={c} />
            ))}
          </Tag>
        );
      })}
    </defs>
  );
}

export default function AeroSprite({ id, size = 28, title, className, style }) {
  const p = `aero${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const tile = TILE_SPRITES[id];
  const pathFn = PATH_SPRITES[id] ?? PATH_SPRITES.bubbles;
  const Glyph = tile?.Glyph;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      style={{ display: 'inline-block', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(0,40,80,.3))', verticalAlign: 'middle', ...style }}
    >
      {title && <title>{title}</title>}
      <SpriteDefs p={p} />
      {tile ? (
        <g>
          <rect x="5" y="5" width="38" height="38" rx="6" fill={`url(#${p}-${tile.tile})`} stroke="#5b8db8" strokeWidth="1.2" />
          <rect x="6.5" y="6.5" width="35" height="17" rx="5" fill="rgba(255,255,255,.45)" />
          <g transform="translate(13 13)">
            <Glyph size={22} color={tile.color} />
          </g>
        </g>
      ) : (
        <g dangerouslySetInnerHTML={{ __html: pathFn(p) }} />
      )}
    </svg>
  );
}
