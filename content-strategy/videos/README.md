# Closer TikTok Content Pipeline

Automated content generation for Closer's TikTok marketing. Generates branded slideshow videos ready to upload.

## What It Does

1. **Scrapes** trending TikTok content in couples/intimacy/wellness niches
2. **Generates** slideshow scripts using AI (Anthropic API) or curated templates
3. **Renders** 1080x1920 MP4 videos with Closer branding, ready to post

## Quick Start

```bash
# Install dependencies
pip install pillow beautifulsoup4 requests

# Make sure ffmpeg is installed
brew install ffmpeg  # macOS
# sudo apt install ffmpeg  # Linux

# Run with seed data (no scraping, no API key needed)
python3 pipeline.py --skip-scrape --num 5

# Run with live scraping
python3 pipeline.py --num 5

# Run with AI-generated scripts (needs API key)
export ANTHROPIC_API_KEY=sk-ant-...
python3 pipeline.py --skip-scrape --num 5

# Scripts only (no video rendering)
python3 pipeline.py --skip-scrape --scripts-only --num 10
```

## Output

Each run produces in the `output/` directory:
- `.mp4` videos (1080x1920, TikTok-ready)
- `.json` metadata files with captions, hashtags, and CTAs

## File Structure

```
src/
├── pipeline.py           # Main orchestrator
├── tiktok_scraper.py     # TikTok trend scraping + seed data
├── content_generator.py  # AI/template content generation
└── video_renderer.py     # Slide rendering + video assembly
```

## Customization

### Brand Colors
Edit `COLORS` dict in `video_renderer.py` to match your brand.

### Fonts
Drop `.ttf` font files in a `fonts/` directory. The renderer falls back to system fonts.

### Content Templates
Edit `generate_from_templates()` in `content_generator.py` to add/modify slideshow templates.

### Scraping Targets
Edit `NICHE_HASHTAGS` and `SEARCH_QUERIES` in `tiktok_scraper.py`.

## Posting Workflow

Videos are generated without audio. For TikTok:
1. Upload the MP4 to TikTok
2. Add a trending sound from TikTok's library
3. Paste the caption from the `.json` metadata file
4. Add hashtags from the metadata
5. Schedule or post

For scheduling, use Later.com, Loomly, or TikTok's built-in scheduler.

## Notes

- The scraper respects rate limits with random delays between requests
- TikTok's page structure changes frequently — the scraper has multiple fallback strategies
- When scraping fails, seed data provides reliable content generation
- All content follows Closer's brand guidelines: playful, flirty, sex-positive, never clinical
