# Design direction

Visual identity for this product. The starter's design system
(`docs/DESIGN_SYSTEM.md`) is the default foundation; each product may develop
its own identity on top of it. Record what stays **inherited** and what is
**customized**, with the reason. Evolve semantic tokens in `src/theme/*`; do
not rebuild components.

## Product personality
_Three to five words, then one sentence. Not yet defined._

## Selected direction
_Name and one paragraph for the chosen direction, plus the alternatives considered and why they lost. Not yet defined._

## Inherited vs customized

| Area | Inherited from Can-Mobile-Starter | Customized for this product |
| --- | --- | --- |
| Palette / accent | Cool neutrals; one accent reserved for "now" (live, new, selected) | — |
| Light / dark | Follows the system; dark is lifted, not inverted | — |
| Typography | Archivo display (≥ 22pt) · Inter UI · JetBrains Mono numerals | — |
| Density / whitespace | 20pt screen edge, 32pt between sections, 4pt scale | — |
| Surfaces / cards | Outlined cards with a hairline, no shadow; `float` only for hovering elements | — |
| Radius | sm 10 · md 14 · lg 20 · xl 28 · pill | — |
| Navigation treatment | Custom headers, opaque tab bar with hairline, ≤ 4 tabs | — |
| Iconography | Lucide; 24pt in tabs, 18–20pt inline; stroke 1.75–2.25 | — |
| Imagery | Content carries the color; media bleeds to the card edge | — |
| Motion | Short, spring-based, reduced-motion aware | — |
| Interaction feel | Scale 0.97 on press, haptics on meaningful actions only | — |
| Primary buttons | Ink-colored (`primaryFollowsAccent = false`) | — |

_"—" means inherited unchanged. A customized cell names the change, the reason, and where it lives (`brand.ts`, `typography.ts` + `fonts.ts`, or a new token with a comment)._

## Home / primary screen hierarchy
_What the user must see or do first after entering the main experience, then the order of everything else: primary action → immediate context → progress or state → upcoming → secondary. Not yet defined._

## UX principles
_Three to six product-specific principles that settle ambiguous cases. Not yet defined._
