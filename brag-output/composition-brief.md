# Hyperframes Composition Brief: Giorgi Lortkipanidze — Designer & Developer

## Objective
Create a short launch-style brag video for Giorgi's portfolio site, played as a fake 2016 Series A announcement.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 23s

## Source Material
- Project root: `giorgi website/` (Vite + React)
- Primary files read: index.html, src/styles/theme.css, src/styles/fonts.css, src/app/components/{HeroSection,WhySection,AboutSection,PricingSection,TestimonialsSection}.tsx, src/lib/portfolio-data.ts
- Product name: Giorgi Lortkipanidze — Designer & Developer
- Tagline / strongest claim: "I design and build production-ready SaaS interfaces — no handoff, no delays."
- Key UI moment to recreate: the hero (mesh-gradient backdrop, glassy "Available for freelance work" pill with pulsing blue dot, Syne 800 name, white→blue gradient "Designer & Developer")
- Copy that must appear verbatim:
  - Available for freelance work
  - Giorgi Lortkipanidze / Designer & Developer
  - I design and build production-ready SaaS interfaces — no handoff, no delays.
  - No Handoff Delays / Async-First Communication / Production-Ready Code
  - 6+ Years of experience / 50+ Products shipped / 100% Remote-native
  - "Giorgi delivered our entire design system in three weeks" — CTO, RedFlag.ai
  - Full MVP $15–30k
  - giorgilortkipanidze.online

## Creative Direction
- Tone preset: yc-parody
- Creative direction: fake Series A launch from 2016
- Interpretation: one claim per scene, delivered dead straight; 2016 launch tropes (press-release dateline, pitch-deck slide numbers, "Uber for X", Traction slide, "Now raising") frame the real site copy. Hard cuts, sparse sound.
- Angle: announce a one-person designer-developer like a unicorn — the round is a client project and the headcount is 1.
- Hook: "Today, we're thrilled to announce our Series A." typed out under "FOR IMMEDIATE RELEASE — 2016", then a stamp "Team size: 1".
- Outro / punchline: "Now raising: one Full MVP. $15–30k." → name lockup + URL, footer "Headcount: 1 · Handoffs: 0".
- Avoid: generic SaaS language, abstract filler, redesigning the brand.

## Visual Identity
- Background: #0A0E1A (cards #0C1220 / #141828, border rgba(255,255,255,0.08))
- Text: #F5F7FA, muted #8A93A6
- Accent: #0080FF
- Display font: Syne 800/700 (local woff2)
- Body font: DM Sans 400/500 (local woff2)
- Parody layer: JetBrains Mono 500 for datelines, slide numbers, stamps
- Visual references: hero mesh gradient + glass pill; Why cards; About stats; testimonial card

## Storyboard
Creative contract: `brag-output/brag-plan.md`.
1. Press release — 3.6s — typed hook + "Team size: 1" stamp
2. The founder — 3.4s — hero rebuild, name slam
3. The pitch — 5.4s — "We're the Uber for design handoff." strike "handoff", 3 Why cards
4. Traction — 3.4s — hockey stick + 3 stat count-ups
5. Press quote — 3.2s — RedFlag.ai CTO quote
6. Now raising / lockup — 4.0s

## Audio
- Audio role: warm bed, sparse dry accents
- Audio arc: bed from 0 → accents on stamp, name, strike, cards, Traction, stats → bell on lockup → fade out
- Music: happy-beats-business-moves-vol-11-by-ende-dot-app.mp3 at ~0.32, fade to 0 over the last ~1.8s
- Music cue guidance: preset `.agents/skills/brag/assets/music/cues/happy-beats-business-moves-vol-11-by-ende-dot-app.music-cues.json` (114.8 BPM). Locks: 3.70 name slam, 12.65 Traction. Grid: cards 8.96/9.50/10.01, stats 13.18/13.70/14.22 (then hold).
- Audio-reactive treatment: subtle — music RMS drives the background mesh-glow opacity/scale and the badge dot glow. No visualizer graphics.
- Audio-coupled moments: typed hook (keypress ticks), stamp (soft thud), name slam (soft reveal hit), strike (switch), cards (card-slide first/last), stats (chip-lay), lockup (bell)
- SFX analysis guidance: `.agents/skills/brag/assets/sfx/sfx-analysis.md` — low/medium HF-risk picks
- Audio files copied to `brag-output/composition/assets/`
