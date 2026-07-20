/* nicecode — turn source code into a good-looking image.
 *
 * The preview is itself an SVG, so "download SVG" is just a serialization of
 * what you see and "download PNG" is a rasterization of that same SVG. There
 * is no second rendering path to drift out of sync.
 */

/* ------------------------------------------------------------------ *
 * Themes.  Keys are highlight.js token classes (minus the `hljs-`
 * prefix); `sub` entries are matched on the leading dotted segment, so
 * `title.function_` falls back to `title` when unlisted.
 * ------------------------------------------------------------------ */

const THEMES = {
  'Midnight': {
    bg: '#1c1f2b', fg: '#d6deeb', gutter: '#4b5263',
    tok: {
      comment: '#637777', quote: '#637777',
      keyword: '#c792ea', 'meta-keyword': '#c792ea',
      built_in: '#82aaff', type: '#ffcb8b', literal: '#ff5874',
      number: '#f78c6c', string: '#ecc48d', regexp: '#5ca7e4',
      'char.escape': '#f78c6c', subst: '#d6deeb',
      symbol: '#82aaff', 'class': '#ffcb8b',
      function: '#82aaff', title: '#82aaff',
      params: '#d6deeb', variable: '#addb67', 'template-variable': '#addb67',
      attr: '#addb67', attribute: '#addb67', property: '#80cbc4',
      tag: '#7fdbca', name: '#7fdbca',
      'selector-tag': '#7fdbca', 'selector-id': '#ffcb8b',
      'selector-class': '#addb67', 'selector-attr': '#c792ea',
      'selector-pseudo': '#c792ea',
      meta: '#c792ea', doctag: '#7fdbca', section: '#82aaff',
      bullet: '#c792ea', operator: '#c792ea', punctuation: '#c3cee3',
      link: '#80cbc4', deletion: '#ff5874', addition: '#addb67',
    },
  },
  'Github Dark': {
    bg: '#0d1117', fg: '#e6edf3', gutter: '#4d5866',
    tok: {
      comment: '#8b949e', quote: '#8b949e',
      keyword: '#ff7b72', literal: '#79c0ff', number: '#79c0ff',
      string: '#a5d6ff', regexp: '#a5d6ff', 'char.escape': '#79c0ff',
      built_in: '#ffa657', type: '#ffa657', 'class': '#ffa657',
      function: '#d2a8ff', title: '#d2a8ff', section: '#d2a8ff',
      params: '#e6edf3', variable: '#ffa657', 'template-variable': '#ffa657',
      attr: '#79c0ff', attribute: '#79c0ff', property: '#79c0ff',
      tag: '#7ee787', name: '#7ee787',
      'selector-tag': '#7ee787', 'selector-class': '#7ee787',
      'selector-id': '#7ee787', 'selector-attr': '#79c0ff',
      'selector-pseudo': '#79c0ff',
      meta: '#79c0ff', doctag: '#ff7b72', bullet: '#f2cc60',
      operator: '#ff7b72', punctuation: '#e6edf3', symbol: '#79c0ff',
      link: '#a5d6ff', deletion: '#ffa198', addition: '#7ee787',
      subst: '#e6edf3',
    },
  },
  'Github Light': {
    bg: '#ffffff', fg: '#1f2328', gutter: '#a5adb8',
    tok: {
      comment: '#6e7781', quote: '#6e7781',
      keyword: '#cf222e', literal: '#0550ae', number: '#0550ae',
      string: '#0a3069', regexp: '#0a3069', 'char.escape': '#0550ae',
      built_in: '#953800', type: '#953800', 'class': '#953800',
      function: '#8250df', title: '#8250df', section: '#8250df',
      params: '#1f2328', variable: '#953800', 'template-variable': '#953800',
      attr: '#0550ae', attribute: '#0550ae', property: '#0550ae',
      tag: '#116329', name: '#116329',
      'selector-tag': '#116329', 'selector-class': '#116329',
      'selector-id': '#116329', 'selector-attr': '#0550ae',
      'selector-pseudo': '#0550ae',
      meta: '#0550ae', doctag: '#cf222e', bullet: '#953800',
      operator: '#cf222e', punctuation: '#1f2328', symbol: '#0550ae',
      link: '#0a3069', deletion: '#82071e', addition: '#116329',
      subst: '#1f2328',
    },
  },
  'Dracula': {
    bg: '#282a36', fg: '#f8f8f2', gutter: '#6272a4',
    tok: {
      comment: '#6272a4', quote: '#6272a4',
      keyword: '#ff79c6', literal: '#bd93f9', number: '#bd93f9',
      string: '#f1fa8c', regexp: '#f1fa8c', 'char.escape': '#bd93f9',
      built_in: '#8be9fd', type: '#8be9fd', 'class': '#8be9fd',
      function: '#50fa7b', title: '#50fa7b', section: '#50fa7b',
      params: '#ffb86c', variable: '#f8f8f2', 'template-variable': '#f8f8f2',
      attr: '#50fa7b', attribute: '#50fa7b', property: '#66d9ef',
      tag: '#ff79c6', name: '#ff79c6',
      'selector-tag': '#ff79c6', 'selector-class': '#50fa7b',
      'selector-id': '#50fa7b', 'selector-attr': '#50fa7b',
      'selector-pseudo': '#50fa7b',
      meta: '#ff79c6', doctag: '#ff79c6', bullet: '#ff79c6',
      operator: '#ff79c6', punctuation: '#f8f8f2', symbol: '#bd93f9',
      link: '#8be9fd', deletion: '#ff5555', addition: '#50fa7b',
      subst: '#f8f8f2',
    },
  },
  'Solarized Light': {
    bg: '#fdf6e3', fg: '#586e75', gutter: '#b5ac95',
    tok: {
      comment: '#93a1a1', quote: '#93a1a1',
      keyword: '#859900', literal: '#2aa198', number: '#2aa198',
      string: '#2aa198', regexp: '#2aa198', 'char.escape': '#2aa198',
      built_in: '#b58900', type: '#b58900', 'class': '#b58900',
      function: '#268bd2', title: '#268bd2', section: '#268bd2',
      params: '#586e75', variable: '#b58900', 'template-variable': '#b58900',
      attr: '#268bd2', attribute: '#268bd2', property: '#268bd2',
      tag: '#268bd2', name: '#268bd2',
      'selector-tag': '#268bd2', 'selector-class': '#268bd2',
      'selector-id': '#268bd2', 'selector-attr': '#268bd2',
      'selector-pseudo': '#268bd2',
      meta: '#cb4b16', doctag: '#cb4b16', bullet: '#cb4b16',
      operator: '#859900', punctuation: '#586e75', symbol: '#2aa198',
      link: '#2aa198', deletion: '#dc322f', addition: '#859900',
      subst: '#586e75',
    },
  },
  'Nord': {
    bg: '#2e3440', fg: '#d8dee9', gutter: '#4c566a',
    tok: {
      comment: '#616e88', quote: '#616e88',
      keyword: '#81a1c1', literal: '#81a1c1', number: '#b48ead',
      string: '#a3be8c', regexp: '#ebcb8b', 'char.escape': '#ebcb8b',
      built_in: '#8fbcbb', type: '#8fbcbb', 'class': '#8fbcbb',
      function: '#88c0d0', title: '#88c0d0', section: '#88c0d0',
      params: '#d8dee9', variable: '#d8dee9', 'template-variable': '#d8dee9',
      attr: '#8fbcbb', attribute: '#8fbcbb', property: '#8fbcbb',
      tag: '#81a1c1', name: '#81a1c1',
      'selector-tag': '#81a1c1', 'selector-class': '#8fbcbb',
      'selector-id': '#8fbcbb', 'selector-attr': '#8fbcbb',
      'selector-pseudo': '#8fbcbb',
      meta: '#5e81ac', doctag: '#5e81ac', bullet: '#81a1c1',
      operator: '#81a1c1', punctuation: '#eceff4', symbol: '#b48ead',
      link: '#88c0d0', deletion: '#bf616a', addition: '#a3be8c',
      subst: '#d8dee9',
    },
  },
};

/* Backgrounds. `stops` render as a diagonal linear gradient; `null` means a
 * fully transparent canvas (useful for pasting onto slides). */
const BACKGROUNDS = {
  'Sunset':      ['#ff9a9e', '#fecfef', '#fbc2eb'],
  'Ocean':       ['#2193b0', '#6dd5ed'],
  'Grape':       ['#654ea3', '#eaafc8'],
  'Mint':        ['#0ba360', '#3cba92'],
  'Ember':       ['#f83600', '#f9d423'],
  'Deep space':  ['#0f2027', '#203a43', '#2c5364'],
  'Candy':       ['#a18cd1', '#fbc2eb'],
  'Steel':       ['#bdc3c7', '#2c3e50'],
  'Slate (flat)':['#1e2430', '#1e2430'],
  'White (flat)':['#ffffff', '#ffffff'],
  'Transparent': null,
};

const FONTS = {
  'System mono': 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  'Menlo / DejaVu': 'Menlo, "DejaVu Sans Mono", Consolas, monospace',
  'Courier': '"Courier New", Courier, monospace',
  'Georgia-ish serif mono': '"Andale Mono", "Lucida Console", monospace',
};

const LANGUAGES = [
  'auto', 'java', 'javascript', 'typescript', 'python', 'c', 'cpp', 'csharp',
  'go', 'rust', 'ruby', 'php', 'swift', 'kotlin', 'scala', 'sql', 'bash',
  'json', 'yaml', 'xml', 'html', 'css', 'markdown', 'diff', 'r', 'matlab',
  'perl', 'lua', 'haskell', 'plaintext',
];

const DEFAULT_CODE = `public class Main {
    public static void main(String[] args) {
        // Un exemple tout simple.
        for (int i = 1; i <= 5; i++) {
            System.out.println("Bonjour " + i);
        }
    }
}`;

/* ------------------------------------------------------------------ *
 * State
 * ------------------------------------------------------------------ */

const state = {
  code: DEFAULT_CODE,
  lang: 'java',
  theme: 'Midnight',
  bg: 'Deep space',
  font: 'System mono',
  fontSize: 16,
  padding: 48,
  radius: 14,
  scale: 2,
  title: 'Main.java',
  dots: true,
  titlebar: true,
  nums: false,
  shadow: true,
  guide: false,
};

const TAB_WIDTH = 4;
const SVG_NS = 'http://www.w3.org/2000/svg';

const $ = (id) => document.getElementById(id);

/* ------------------------------------------------------------------ *
 * Tokenizing: highlight.js HTML -> [[{text, cls}, ...], ...] by line
 * ------------------------------------------------------------------ */

/** Map an hljs class list to a theme colour, honouring dotted fallbacks. */
function colorFor(theme, classes) {
  for (let i = classes.length - 1; i >= 0; i--) {
    const raw = classes[i].replace(/^hljs-/, '').replace(/_+$/, '');
    if (theme.tok[raw]) return theme.tok[raw];
    const head = raw.split('.')[0];
    if (theme.tok[head]) return theme.tok[head];
  }
  return null;
}

/** Expand tabs to the next multiple of TAB_WIDTH, tracking the running column. */
function expandTabs(text, startCol) {
  if (!text.includes('\t')) return text;
  let out = '';
  let col = startCol;
  for (const ch of text) {
    if (ch === '\t') {
      const n = TAB_WIDTH - (col % TAB_WIDTH);
      out += ' '.repeat(n);
      col += n;
    } else {
      out += ch;
      col++;
    }
  }
  return out;
}

/**
 * Produce an array of lines; each line is an array of {text, color, col}
 * segments. Colors are already resolved against the active theme.
 */
function tokenize(code, langName, theme) {
  let html;
  const haveHljs = typeof window.hljs !== 'undefined';

  if (haveHljs) {
    try {
      if (langName === 'auto') {
        html = hljs.highlightAuto(code).value;
      } else if (hljs.getLanguage(langName)) {
        html = hljs.highlight(code, { language: langName, ignoreIllegals: true }).value;
      }
    } catch (e) {
      html = undefined; // fall through to plain text
    }
  }

  if (html === undefined) {
    // No highlighter (offline / unknown language): render as plain text.
    return code.split('\n').map((line) => {
      const text = expandTabs(line, 0);
      return text.length ? [{ text, color: theme.fg, col: 0 }] : [];
    });
  }

  const root = document.createElement('div');
  root.innerHTML = html;

  const lines = [[]];
  let col = 0;

  const push = (text, color) => {
    const parts = text.split('\n');
    parts.forEach((part, i) => {
      if (i > 0) {
        lines.push([]);
        col = 0;
      }
      if (!part) return;
      const expanded = expandTabs(part, col);
      lines[lines.length - 1].push({ text: expanded, color, col });
      col += expanded.length;
    });
  };

  const walk = (node, classes) => {
    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        push(child.nodeValue, colorFor(theme, classes) || theme.fg);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child, classes.concat(Array.from(child.classList)));
      }
    }
  };

  walk(root, []);
  return lines;
}

/* ------------------------------------------------------------------ *
 * Metrics
 * ------------------------------------------------------------------ */

const metricsCanvas = document.createElement('canvas');
const metricsCtx = metricsCanvas.getContext('2d');

/** Advance width of one character in the chosen monospace font. */
function charWidth(fontStack, fontSize) {
  metricsCtx.font = `${fontSize}px ${fontStack}`;
  // Average over a run so sub-pixel rounding in measureText doesn't accumulate.
  return metricsCtx.measureText('M'.repeat(100)).width / 100;
}

/* ------------------------------------------------------------------ *
 * SVG construction
 * ------------------------------------------------------------------ */

function el(name, attrs = {}, text) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) {
    if (v !== null && v !== undefined) node.setAttribute(k, String(v));
  }
  if (text !== undefined) node.textContent = text;
  return node;
}

function buildSVG() {
  const theme = THEMES[state.theme];
  const fontStack = FONTS[state.font];
  const fs = state.fontSize;
  const cw = charWidth(fontStack, fs);
  const lh = Math.round(fs * 1.55);

  const lines = tokenize(state.code, state.lang, theme);
  // A trailing newline in the textarea shouldn't add a blank row.
  while (lines.length > 1 && lines[lines.length - 1].length === 0) lines.pop();

  const codeInset = Math.round(fs * 1.3);          // padding inside the window
  const barHeight = state.titlebar ? Math.round(fs * 2.4) : 0;

  const maxCols = lines.reduce((m, segs) => {
    const last = segs[segs.length - 1];
    return Math.max(m, last ? last.col + last.text.length : 0);
  }, 0);

  const digits = String(lines.length).length;
  const gutterW = state.nums ? Math.ceil((digits + 2) * cw) : 0;

  // The window is at least wide enough for the 80-col guide when it's shown.
  const contentCols = Math.max(maxCols, state.guide ? 80 : 0);
  const winW = Math.ceil(codeInset * 2 + gutterW + contentCols * cw);
  const winH = barHeight + codeInset * 2 + lines.length * lh;

  const pad = state.padding;
  const W = winW + pad * 2;
  const H = winH + pad * 2;

  const svg = el('svg', {
    xmlns: SVG_NS,
    width: W,
    height: H,
    viewBox: `0 0 ${W} ${H}`,
  });

  const defs = el('defs');
  svg.appendChild(defs);

  /* --- background --- */
  const stops = BACKGROUNDS[state.bg];
  if (stops) {
    const grad = el('linearGradient', {
      id: 'bg', x1: '0', y1: '0', x2: '1', y2: '1',
    });
    stops.forEach((c, i) => {
      grad.appendChild(el('stop', {
        offset: `${(i / Math.max(1, stops.length - 1)) * 100}%`,
        'stop-color': c,
      }));
    });
    defs.appendChild(grad);
    svg.appendChild(el('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#bg)' }));
  }

  /* --- drop shadow --- */
  if (state.shadow) {
    const filter = el('filter', {
      id: 'shadow', x: '-30%', y: '-30%', width: '160%', height: '160%',
      'color-interpolation-filters': 'sRGB',
    });
    filter.appendChild(el('feDropShadow', {
      dx: 0, dy: Math.round(fs * 0.9),
      stdDeviation: Math.round(fs * 1.1),
      'flood-color': '#000', 'flood-opacity': 0.38,
    }));
    defs.appendChild(filter);
  }

  /* --- window --- */
  const win = el('g', { filter: state.shadow ? 'url(#shadow)' : null });
  win.appendChild(el('rect', {
    x: pad, y: pad, width: winW, height: winH,
    rx: state.radius, ry: state.radius, fill: theme.bg,
  }));
  svg.appendChild(win);

  if (state.titlebar) {
    // Hairline under the title bar, clipped to the window's rounded corners.
    const clipId = 'winclip';
    const clip = el('clipPath', { id: clipId });
    clip.appendChild(el('rect', {
      x: pad, y: pad, width: winW, height: winH,
      rx: state.radius, ry: state.radius,
    }));
    defs.appendChild(clip);

    const barGroup = el('g', { 'clip-path': `url(#${clipId})` });
    barGroup.appendChild(el('rect', {
      x: pad, y: pad + barHeight - 1, width: winW, height: 1,
      fill: '#ffffff', opacity: 0.07,
    }));
    svg.appendChild(barGroup);

    if (state.dots) {
      const r = Math.max(4, Math.round(fs * 0.35));
      const cy = pad + barHeight / 2;
      ['#ff5f57', '#febc2e', '#28c840'].forEach((color, i) => {
        barGroup.appendChild(el('circle', {
          cx: pad + codeInset + r + i * (r * 3.2), cy, r, fill: color,
        }));
      });
    }

    if (state.title.trim()) {
      barGroup.appendChild(el('text', {
        x: pad + winW / 2,
        y: pad + barHeight / 2,
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        'font-family': fontStack,
        'font-size': Math.round(fs * 0.82),
        fill: theme.gutter,
      }, state.title));
    }
  }

  /* --- 80-column guide --- */
  const codeX = pad + codeInset + gutterW;
  const codeTop = pad + barHeight + codeInset;

  if (state.guide) {
    svg.appendChild(el('line', {
      x1: codeX + 80 * cw, y1: codeTop,
      x2: codeX + 80 * cw, y2: codeTop + lines.length * lh,
      stroke: theme.gutter, 'stroke-width': 1, opacity: 0.4,
      'stroke-dasharray': '4 4',
    }));
  }

  /* --- code --- */
  const textGroup = el('g', {
    'font-family': fontStack,
    'font-size': fs,
    'xml:space': 'preserve',
  });

  lines.forEach((segs, i) => {
    // Baseline sits a bit below the line box top; 0.76 reads well across fonts.
    const y = codeTop + i * lh + Math.round(lh * 0.76);

    if (state.nums) {
      textGroup.appendChild(el('text', {
        x: pad + codeInset + gutterW - cw * 1.5,
        y, 'text-anchor': 'end', fill: theme.gutter,
      }, String(i + 1)));
    }

    if (!segs.length) return;

    const line = el('text', { y, fill: theme.fg });
    for (const seg of segs) {
      // Each segment is absolutely positioned by column, so small differences
      // in font metrics can never shift the rest of the line.
      line.appendChild(el('tspan', {
        x: codeX + seg.col * cw,
        fill: seg.color,
        'xml:space': 'preserve',
      }, seg.text));
    }
    textGroup.appendChild(line);
  });

  svg.appendChild(textGroup);

  return { svg, width: W, height: H, lines };
}

/* ------------------------------------------------------------------ *
 * Export
 * ------------------------------------------------------------------ */

function serializeSVG(svg) {
  const clone = svg.cloneNode(true);
  clone.setAttribute('xmlns', SVG_NS);
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    new XMLSerializer().serializeToString(clone);
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke on the next tick so Safari has time to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function baseFilename() {
  const t = state.title.trim().replace(/\.[^.]+$/, '').replace(/[^\w.-]+/g, '-');
  return t || 'nicecode';
}

/** Rasterize the current SVG to a PNG blob at `state.scale`. */
function renderPNG() {
  const { svg, width, height } = buildSVG();
  const source = serializeSVG(svg);
  // encodeURIComponent avoids btoa's unicode limitation for non-ASCII source.
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(width * state.scale);
      canvas.height = Math.round(height * state.scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        blob ? resolve(blob) : reject(new Error('canvas.toBlob returned null'));
      }, 'image/png');
    };
    img.onerror = () => reject(new Error('could not rasterize the SVG'));
    img.src = url;
  });
}

/* ------------------------------------------------------------------ *
 * UI wiring
 * ------------------------------------------------------------------ */

function fillSelect(id, keys, selected) {
  const sel = $(id);
  sel.innerHTML = '';
  for (const key of keys) {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = key;
    if (key === selected) opt.selected = true;
    sel.appendChild(opt);
  }
}

function render() {
  const { svg, width, height } = buildSVG();
  const stage = $('stage');
  stage.innerHTML = '';
  stage.appendChild(svg);

  $('dims').textContent =
    `${width}×${height} · PNG ${Math.round(width * state.scale)}×${Math.round(height * state.scale)}`;

  const long = state.code.split('\n').filter((l) => l.length > 80).length;
  const warn = $('linewarn');
  warn.hidden = long === 0;
  warn.textContent = long === 1
    ? '1 line exceeds 80 characters'
    : `${long} lines exceed 80 characters`;

  saveState();
}

/* Persist settings (not the code) so reloads keep your look. */
function saveState() {
  try {
    const { code, ...rest } = state;
    localStorage.setItem('nicecode.settings', JSON.stringify(rest));
  } catch (e) { /* private browsing: no persistence, no problem */ }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('nicecode.settings') || '{}');
    for (const key of Object.keys(saved)) {
      if (key in state && key !== 'code') state[key] = saved[key];
    }
  } catch (e) { /* ignore malformed storage */ }

  // Guard against options removed since the settings were written.
  if (!THEMES[state.theme]) state.theme = 'Midnight';
  if (!(state.bg in BACKGROUNDS)) state.bg = 'Deep space';
  if (!FONTS[state.font]) state.font = 'System mono';
}

function bindRange(id, key) {
  const input = $(id);
  const out = $(`${id}-out`);
  input.value = state[key];
  out.textContent = state[key];
  input.addEventListener('input', () => {
    state[key] = Number(input.value);
    out.textContent = input.value;
    render();
  });
}

function bindCheck(id, key) {
  const input = $(id);
  input.checked = state[key];
  input.addEventListener('change', () => {
    state[key] = input.checked;
    render();
  });
}

function bindSelect(id, key) {
  const input = $(id);
  input.addEventListener('change', () => {
    state[key] = input.value;
    render();
  });
}

/* ---------------------------- present mode ---------------------------- *
 *
 * The visible effect comes from `body.presenting` (pure CSS, always works).
 * Native fullscreen is requested on top of that purely to hide the browser
 * chrome; if it is unavailable or refused, presenting still fills the window.
 */

function fullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null;
}

function isPresenting() {
  return document.body.classList.contains('presenting');
}

function enterPresent() {
  document.body.classList.add('presenting');
  syncPresentButton();

  const stage = $('stage');
  const request = stage.requestFullscreen || stage.webkitRequestFullscreen;
  if (!request) return; // no API (iPhone): the CSS overlay is the whole show
  try {
    // Safari's prefixed version returns undefined rather than a promise, and
    // throws synchronously when it objects — hence both guards.
    const result = request.call(stage);
    if (result && typeof result.catch === 'function') result.catch(() => {});
  } catch (e) { /* overlay already covers the window */ }
}

function exitPresent() {
  document.body.classList.remove('presenting');
  syncPresentButton();

  if (fullscreenElement()) {
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    try {
      const result = exit.call(document);
      if (result && typeof result.catch === 'function') result.catch(() => {});
    } catch (e) { /* nothing else to do */ }
  }
}

function togglePresent() {
  isPresenting() ? exitPresent() : enterPresent();
}

function syncPresentButton() {
  $('btn-full').textContent = isPresenting() ? 'Exit full screen' : 'Full screen';
}

/* Leaving native fullscreen (Esc, or the green button on macOS) should drop
 * presenting too, so the two never disagree. */
function onFullscreenChange() {
  if (!fullscreenElement() && isPresenting()) exitPresent();
}

function flash(button, message) {
  const original = button.textContent;
  button.textContent = message;
  button.disabled = true;
  setTimeout(() => {
    button.textContent = original;
    button.disabled = false;
  }, 1400);
}

function init() {
  loadState();

  fillSelect('lang', LANGUAGES, state.lang);
  fillSelect('theme', Object.keys(THEMES), state.theme);
  fillSelect('bg', Object.keys(BACKGROUNDS), state.bg);
  fillSelect('font', Object.keys(FONTS), state.font);

  ['lang', 'theme', 'bg', 'font'].forEach((k) => bindSelect(k, k));

  bindRange('fontsize', 'fontSize');
  bindRange('padding', 'padding');
  bindRange('radius', 'radius');
  bindRange('scale', 'scale');

  bindCheck('opt-dots', 'dots');
  bindCheck('opt-titlebar', 'titlebar');
  bindCheck('opt-nums', 'nums');
  bindCheck('opt-shadow', 'shadow');
  bindCheck('opt-guide', 'guide');

  const title = $('title');
  title.value = state.title;
  title.addEventListener('input', () => { state.title = title.value; render(); });

  const code = $('code');
  code.value = state.code;
  code.addEventListener('input', () => { state.code = code.value; render(); });

  // Keep tab from escaping the textarea — people paste indented code here.
  code.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || e.shiftKey) return;
    e.preventDefault();
    const { selectionStart: s, selectionEnd: t } = code;
    code.value = code.value.slice(0, s) + '\t' + code.value.slice(t);
    code.selectionStart = code.selectionEnd = s + 1;
    state.code = code.value;
    render();
  });

  $('btn-svg').addEventListener('click', () => {
    const { svg } = buildSVG();
    download(
      new Blob([serializeSVG(svg)], { type: 'image/svg+xml;charset=utf-8' }),
      `${baseFilename()}.svg`
    );
  });

  $('btn-png').addEventListener('click', async (e) => {
    try {
      download(await renderPNG(), `${baseFilename()}.png`);
    } catch (err) {
      flash(e.currentTarget, 'PNG failed');
      console.error(err);
    }
  });

  $('btn-full').addEventListener('click', togglePresent);
  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);

  document.addEventListener('keydown', (e) => {
    // Esc leaves present mode. Native fullscreen swallows this event and
    // fires fullscreenchange instead, so this covers the overlay-only case.
    if (e.key === 'Escape' && isPresenting()) {
      e.preventDefault();
      exitPresent();
      return;
    }

    // `F` presents, but not while someone is typing code into a field.
    if (e.key !== 'f' && e.key !== 'F') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = document.activeElement?.tagName;
    if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT') return;
    e.preventDefault();
    togglePresent();
  });

  render();
}

// highlight.js is loaded from a CDN; render once it lands, but don't block on
// it — the plain-text path in tokenize() keeps the app usable offline.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
window.addEventListener('load', render);
