# nicecode

Paste code, get a good-looking picture of it. Exports **PNG** and **SVG**.

Live: <https://lemire.github.io/nicecode/>

Everything runs in the browser — no server, no build step, no upload. Your code
never leaves the page.

## How it works

The preview *is* an SVG. "Download SVG" serializes exactly the element you are
looking at, and "Download PNG" rasterizes that same element onto a canvas. There
is no second rendering path, so the preview and the exports cannot drift apart.

Syntax highlighting comes from [highlight.js][hljs] (loaded from jsDelivr).
Rather than using its stylesheets, `app.js` maps highlight.js token classes onto
its own palettes — the same colour table drives the SVG, so themes stay
consistent between preview and export. If the CDN is unreachable, the page falls
back to unhighlighted text instead of breaking.

Text is laid out by column: every token is absolutely positioned at
`column × character-width`, measured at runtime with `canvas.measureText`. That
keeps indentation exact even when the SVG is opened on a machine whose monospace
font differs slightly from yours.

[hljs]: https://highlightjs.org/

## Options

Theme, background gradient, font, font size, padding, corner radius, PNG scale
(1×–4×), window title bar with traffic lights, line numbers, drop shadow, and an
80-column guide for style rules that enforce one. Settings persist in
`localStorage`; the code itself is never stored.

The `Transparent` background exports a PNG with a real alpha channel, which is
handy for dropping onto slides.

## Local development

No toolchain. Serve the directory with anything:

```sh
python3 -m http.server 8000
```

then open <http://localhost:8000>.

## Deployment

`.github/workflows/pages.yml` uploads the repository root as a Pages artifact
and deploys it on every push to `main`.

For that workflow to be the thing that actually publishes the site, the
repository's **Settings → Pages → Build and deployment → Source** must be set to
**GitHub Actions**. If it is left on "Deploy from a branch", GitHub serves the
branch contents directly and the workflow's deploy step has no effect.

`.nojekyll` is present so Pages does not run the files through Jekyll under
either mode.
