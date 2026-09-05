# Data model

Conceptual product data, defined before any backend and independent of it.
No collections, tables or schemas here; those belong to `docs/<PROVIDER>.md`
once a backend is selected (`docs/BACKEND.md`). Domain types are implemented
in `src/features/<feature>/types.ts`, service contracts in
`src/services/contracts/`.

## Entities
_One block per meaningful entity. Skip trivia: a settings toggle is not an entity. Not yet defined._

### Entity name
- **Purpose:** why it exists in the product
- **Key fields:** the fields that drive UI or rules, not every column
- **Relationships:** how it links to other entities (one-to-many, belongs-to, many-to-many)
- **Ownership:** who creates it, who may change it
- **Permissions:** what each role may see or do; visibility rules

## Relationships overview
_Optional one-line map, for example `A 1—* B`, `B *—* C`. Not yet defined._

## Lifecycle and state
_Entities with meaningful status transitions (for example draft → active → archived). Not yet defined._

## Open questions
_Data behaviour still undecided: history, versioning, deletion, privacy. Not yet defined._
