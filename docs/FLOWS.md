# Flows

Journeys, screen map and navigation for this product. Filled during discovery
(`docs/KICKOFF.md` §4). The screen map must exist before implementation starts.
Use arrows for sequences (`Screen → Screen`); mark overlays `[modal]` / `[sheet]`.

## Primary journey
_The one end-to-end experience the product lives on. Not yet defined._

First launch → entry → first meaningful action → recurring action → completion → return state

## Role-based journeys
_One per role, only if the product has more than one role. Not yet defined._

## Onboarding and auth
_Only if relevant: what must happen before the first meaningful action, and what is deferred until later. Not yet defined._

## Secondary flows
_Important but not primary: editing, settings, sharing, recovery, errors that need their own flow. Not yet defined._

## Screen map

| Screen | Type | Purpose | Route |
| --- | --- | --- | --- |

_Type: tab root · detail · form · full-screen flow · modal · sheet. Routes follow `app/` conventions: tab roots in `app/(tabs)/`, everything that hides the tab bar on the root stack._

## Navigation architecture
_Tabs · stack-only · tabs with nested stacks · role-specific shells. Say why. At most four tabs. Not yet defined._

## Modal and sheet flows
_Confirmations use `Modal`. Forms, pickers and option lists use `BottomSheet`. Native pickers and share sheets run after the sheet closes (`useSheetAction`). Not yet defined._

## Development-only screens
_The Gallery (and the Settings demo rows) are starter references and must not be part of production navigation. Note here how they are kept out once the real shell exists._
