# Ando

A static [Vite](https://vitejs.dev/) site that grows a house in the manner of Tadao Ando: board-formed concrete, a court cut from a pure volume, a wall that holds the light, still water, and a single procession from the ground to the next level.

Light is the subject. A directional sun casts soft shadows through a cruciform opening and through slits. The principal basin reflects the scene. Drag to orbit.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Open a specific house with `?seed=chapel&scale=1&volumes=3&water=2&sun=9.5`. The seed field, **Regenerate**, and the scale, volumes, and water sliders all write that query. Generation itself never calls `Math.random`. Regenerate only draws a new seed string; the house for that seed is fixed.

| Control | Effect |
| --- | --- |
| Seed | Replays one house. Press Enter to apply. |
| Regenerate | Chooses a new seed (`R` does the same when the field is not focused). |
| Scale | Multiplies the 0.15 m module. `1` is a 1.8 × 0.9 m form panel. Topology stays put. |
| Volumes | Maximum compositional volumes: the primary house, then a west wing, a north wing, and a court pavilion. |
| Water | Maximum basins: court, approach, then a side channel. `0` is a dry court. |
| Sun | Time of day, 6:00–18:00. Moves the light only. Openings stay designed for south. |

## Grammar

The plan is rolled once from the seed, in a fixed order. Sliders then keep or drop pieces. They do not reshuffle the stream.

Coordinates: **+X east, +Y up, +Z south**. The design sun is exactly +Z. The entry court is mirrored on some seeds, so the procession sits on the east or the west.

The module is `0.15 m × scale`. Twelve modules make a 1.8 m panel; six make the 0.9 m panel height. Walls are three modules thick (0.45 m at scale 1) so every edge lands on the formwork grid. The concrete shader repeats one panel in world space: a seam, a faint board grain, and **six tie cones** (two columns, three rows), with a matching normal map.

1. **Site.** A panel-aligned plot, about 38–49 m on a side at scale 1, centered on the origin. Margins are reserved before anything is placed: west keep, north keep, a south forecourt, and an entry yard.
2. **Primary volume.** One two-story box, 7.2 m tall. A view slot splits it into two pure blocks. A thin south facade carries a full-height glass slot aligned with that void, so the axis runs through the house.
3. **Void.** A courtyard is subtracted between the facade and a south sun wall. The court is enclosed, or open toward the entry, by side walls of the same thickness. The sun wall is often taller than the roof, a plane that outlasts the volume.
4. **Screens.** A freestanding wall stands in the west margin and another in the east yard. They do not sit in front of the cross, so the south light still reaches it. A short return sometimes completes an L at the corner of the approach.
5. **Water.** Basins stay on axis and out of the solids. The first is the court basin, south of any pavilion. The second is the approach pool in the forecourt, rectangular or a circle inscribed in that rectangle. The third is a narrow channel beside the approach. The largest basin is a still reflector; the others are dark and glossy.
6. **Light.** On the south face of the sun wall, one cruciform: a vertical arm and a horizontal arm, inset by one panel, the Church of the Light cut. The facade takes the glass slot. A west wing, when it exists, takes a regular run of vertical slits on its south face. Screen walls take one procession slit at eye height. The entry door is a glass slot at the landing, on the side face, not on the altar wall.
7. **Procession.** A landing projects from the entry side at one story (3.6 m). A straight run meets that landing. When the seed asks for a ramp and the yard is at least four times the rise long, the slope is between 1:4 and 1:6. Otherwise it is a stair at 1:2. The reserved volume of the run does not enter a solid.
8. **Ground.** Gravel, with a moss patch in the north corner when it fits. No planting on the court.

Through-openings are boolean-cut only in planar walls (one module thick), so the shadow map actually sees the cross and the slits. Openings in deep volumes are glazed on the face instead of bored through the mass. Glass does not cast shadows; the concrete does. Faint additive shafts follow the cross and the slits when the sun is in the south.

A cylinder appears only as a pavilion in the court, or as a circular basin. Both sit inside the box the grammar tested.

## Invariants

`npm test` runs Vitest against the grammar, not the GPU.

- The same seed and sliders rebuild the same house.
- Scale changes meters, not the unit plan. Water does not move solids. Raising the volume count only adds pieces.
- Solid interiors do not overlap. Faces may touch.
- The court stays in the site. A pavilion, if any, sits inside the court. Nothing else occupies it.
- Every opening lies inside its host face. Slits and glass slots keep a concrete margin. The cruciform is the one sun opening on +Z, and its arms fit the rectangle.
- The single ramp or stair runs from ground to the story landing, at the slope above, and its bounds stay in the site and out of the solids.
- Water stays in the site, out of the solids, and within the slider. A dry slider produces none.

The generator throws if a house fails these checks.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest |
| `npm run build` | Typecheck, build, and publish `index.html` plus `assets/` |
| `npm run preview` | Serve the production bundle |
| `npm run check:bundle` | Fail if the committed Pages bundle does not match the build |

`npm run dev` serves `index.dev.html`, the TypeScript entry. GitHub Pages deploys the `main` branch root, so the committed `index.html` points at the built bundle with relative `./assets/` URLs. Actions runs typecheck, tests, and the build, then fails if that bundle was not committed. A `.nojekyll` file keeps Pages from filtering those assets.

## Limitations

- One compositional type: a south-facing court house. It is not a survey of Ando's plans.
- Rooms are solid masses. You do not walk inside them. Deep-wall openings are surface glass, not tunnels.
- Tie holes live in the diffuse and normal maps, not as instanced cones.
- One reflector, on the largest basin. Extra basins are glossy and use the environment map.
- Shafts are additive cards. The cross of light on the court is the shadow map.
- Circulation is one straight flight. There is no switchback and no ramp longer than 1:6.
- The sun slider does not redesign openings. They are cut for south light; morning and evening rake across them.
- The time of day is a single azimuth and elevation. There is no geographic location.
