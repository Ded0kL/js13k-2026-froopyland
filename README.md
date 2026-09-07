# 🦄 js13kGames 2026 — Froopyland (Rick & Morty)

An entry for the [js13kGames 2026](https://js13kgames.com/2026/) competition.

- **Theme:** Unicorns and Rainbows
- **Deadline:** September 13, 2026, 13:00 CEST
- **Limit:** the whole game in a single zip up to **13 KB** (13,312 bytes)
- **Concept:** based on the Rick and Morty episode S3E9 *"The ABC's of Beth"* — Beth and Rick return to Froopyland to save Tommy's dad from execution
- **Tech:** one HTML file + one JS file, fully procedural graphics (canvas), WebAudio synthesized sound, no external assets, mouse/touch only
- **Play:** https://ded0kl.github.io/js13k-2026-froopyland/

## The game — seven trials, one per rainbow color

1. **🔴 GAR — Quantum projector.** Dark screen, four pipes of cable segments. Tapping a segment rotates it *and its right neighbour* (plus/plus). Zero all four pipes to open the chalk door. Guaranteed solvable (scrambled from the solved state).
2. **🟠 NEST — The nest.** A giant winged pony kidnaps Rick to its nest. Beth mans the nest: tap to fire at incoming hatchling-unicorns. **One bite = full restart** of the wave. 10 zaps → round two (faster), 20 zaps → victory.
3. **🟡 GATE — Memory gate.** Tommy warded the path: copy **five** three-lamp sequences in a row. One mistake and **all five rounds reset**. 1-second pause between rounds.
4. **🟢 CELLS — Memory cells.** A meadow across five floors with rainbow ladders. Collect **five memory cells and bring them to Rick one at a time** (no auto-walk — you walk, ladders included). Touch a froupie while carrying → level restarts.
5. **🔵 TRACE — Chalk lock.** Fullscreen light board: hold and drag through the zigzag of dots to draw the counter-door. Lifting the line / missing resets the trace.
6. **🟣 TOMMY — Knife duel.** Grab the pink arrow (top-left), tap Beth to aim, tap Tommy to fire. The arrow respawns at its pedestal. **Three hits** — Tommy gives up; walk up and finish it.
7. **🌈 DNA — Clone sequencer.** A 6×12 grid of cable tiles (straight / corner / tee). Tap rotates a tile 90°. Connect **IN (top-left) to OUT (bottom-right)** and Rick clones Tommy just in time.

Ending: *"Wubba lubba dub dub! …we are amoral geniuses."* 🍺

## Controls

**Mouse / touch only** — keyboard input was removed entirely (mobile-first).

| Input | Action |
|---|---|
| Tap | puzzles (rotate / shoot / lamp); dialogs: tap the panel to advance |
| Tap a spot | Beth walks there (routes through rainbow ladders) |
| Hold & drag | virtual joystick (movement phases); TRACE dot tracing |

## Dialogs

Bottom panel with the speaker's portrait (mouth animates for whoever talks) and a queue of lines per phase. Long lines shrink the font to fit on phones. All dialog text is built from **shared phrase variables** (e.g. `*burp* `, `Wubba lubba dub dub!`, `flip it AND its neighbour`, `chalk door`) — see [Size reduction](#size-reduction-how-we-fit-into-13-kb).

## Build & size reduction

Everything about how the game was squeezed into 13 KB — tools, flags, and numbers — is documented in [DESIGN.md → Size reduction](DESIGN.md#size-reduction-how-we-fit-into-13-kb).

TL;DR: strip debug buttons → `terser -c passes=4,unsafe,toplevel -m toplevel` → `zip -9 -X`. Final package: **13,277 / 13,312 bytes**.

## Dev log

Step-by-step development history lives in [LOG.md](LOG.md). Design details per phase — in [DESIGN.md](DESIGN.md).

## Links

- Competition rules: https://js13kgames.com/2026/rules
- Play: https://ded0kl.github.io/js13k-2026-froopyland/
- js13kGames requires a **readable, unmangled source repo** — this repository is it; the minified `game.js` is generated only for the submission zip.
