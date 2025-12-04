# DataMaps - Interactive Data Visualizations

## Context

Created for **Vegas Conference (December 2025)** - Connie presentation demo.

These are self-contained HTML files with embedded data, designed for iframe embedding into presentations.

## Files

| File | Description | Production URL |
|------|-------------|----------------|
| `senior-population-growth.html` | v1 - Mapbox-based US map showing 65+ population growth by state | [demo.html](https://www.databooth.net/datamaps/demo.html) |
| `connie-beta-sites.html` | v2 - Leaflet-based map with CIS infrastructure sites (pink), migration, organic growth | [demo-v2.html](https://www.databooth.net/datamaps/demo-v2.html) |
| `connie-beta-sites-logos.html` | v3 - Final version with logos | [demo-v3.html](https://www.databooth.net/datamaps/demo-v3.html) |

## Tech Stack

- **v1:** Mapbox GL JS (requires API token embedded in file)
- **v2/v3:** Leaflet + CartoDB tiles (no API key required)
- All data is embedded inline (no external dependencies except CDN libs)

## Iframe Embedding

```html
<iframe
  src="https://www.databooth.net/datamaps/demo-v3.html"
  width="100%"
  height="600"
  frameborder="0"
  style="border: none;">
</iframe>
```

## Future: DataMaps as Product

Post-Vegas, DataMaps could become a DataBooth feature:
- Upload CSV with location data
- AI suggests visualization type
- Generate embeddable map
- Export/share options

See `/docs/ideas.md` for feature backlog.

---

*Created: 2025-12-03*
*Session: SPOK + CEO*
