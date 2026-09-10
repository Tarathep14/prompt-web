# Smart Green City Interactive Project Showcase

Updated existing HTML/CSS/JavaScript project. Retains the mobile menu and SVG exponential-decay calculation; no framework or 3D dependencies.

## Run

From this folder:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/. Use HTTP, not file://: slide metadata and the PDF module/worker require a server.

## Deploy

Upload this folder's contents to a static host. For GitHub Pages, commit them at the root of the publishing branch (or selected /docs folder), then select that branch/folder in Settings > Pages. No build command. Assets use relative URLs and support repository subpaths. Public deployment was not performed.

## Files changed and added

- `index.html`: Thai narrative, five topics, retained graph, Prompt Lab and presentation viewer.
- `style.css`: refined forest/sage design, responsive layouts, focus states and reduced-motion support.
- `script.js`: retained graph/menu logic, source-mapped topic states, keyboard controls and PDF.js.
- `assets/presentation.pdf`: byte-identical updated 33-page By claude finish.pdf document.
- `assets/slides/page-01.jpg` through `page-33.jpg`: real PDF page renders for Slide View and evidence.
- `assets/slides.json`: page manifest and extractable text generated from the source PDF.
- `assets/ai-0.png`, `ai-1.png`: comparison images extracted from page 5.
- `assets/leaf.svg`: original 2D identity icon.
- `assets/vendor/`: Mermaid 10.9.3 and PDF.js 4.10.38 with worker and licenses; no runtime CDN requests. PDF.js loads on demand.

Slide View displays actual page images. PDF View renders the selected page directly from the PDF using PDF.js and reads numPages. Both support page selection and previous/next controls. Open/download links point to the original PDF. The text disclosure contains extractable PDF text; screenshot text remains in the images.

## Source mapping

| Topic      | PDF pages |
| ---------- | --------- |
| AI Image   | 3–5       |
| Desmos     | 7–9       |
| Mermaid    | 11–15     |
| LaTeX      | 17–21     |
| NotebookLM | 23–27     |

Website summaries are paraphrases with visible page references. Original Zero-shot/Few-shot labels are preserved. Separate first-result pages remain separate stages where supplied.

The shopping workflow is removed from the environmental narrative. It remains in the unchanged PDF as an explicitly labeled Mermaid exercise. The site's rendered Mermaid summarizes the source lesson about grouping and visual organization, rather than inventing an operational city system.

The graph follows page 8: y=A*exp(-k*t), t_half=ln(2)/k. Initial A=100 and k=0.15 come from the source. Slider ranges and the 0–30-year window are website demonstration choices, not observations. Page 9 mentions a/b/c although page 8 uses A/k; this discrepancy is noted. The LaTeX reflection is qualified because page 17 already supplies some font/compiler guidance. Speaker Notes are reported by page 27, but their unseen contents are not fabricated.

## Verification

- All 33 slide images decoded and returned successfully over HTTP.
- Original and bundled PDF SHA-256 digests match.
- All 23 Prompt Lab stages tested; evidence zoom/close and viewer handoff tested.
- Graph maxima and reset tested: k=0.50 gives 1.4 years; changing A preserves half-life; reset gives 4.6 years.
- First/last page boundaries, next page and page selector tested.
- PDF.js and Mermaid visually rendered successfully.
- Mobile menu tested; 390px, 768px and 1440px layouts checked without document horizontal overflow.
- Browser console had no errors or warnings.

When replacing the source PDF, regenerate the slide images and manifest together, then review topic mappings. Do not replace only one representation.

## PDF update

The active presentation is now By claude finish.pdf (33 pages). Pages 1–27 are unchanged; pages 28–33 add the website-building exercise. The viewer provides a shortcut to that addition. The original five Prompt Lab topic mappings remain valid. PDF and manifest requests are versioned to avoid stale cache responses.

Website is the sixth Prompt Lab tab, mapping Zero-shot, Zero-shot result, Few-shot, Result and Reflection to pages 29–33 respectively.

## Reliable page navigation

The 33-page manifest is embedded in index.html, so navigation does not depend on fetching JSON. Slide View works when opening the extracted index.html locally as well as over HTTP. PDF View uses original page images under file://; over HTTP it renders the PDF with PDF.js.
