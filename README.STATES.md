# Input Method State Diagram

This document reflects the current state model in `src/input_method/InputState.ts`.

The input method currently uses four concrete states:

- `EmptyState`: no active composition.
- `WylieInputtingState`: ASCII Wylie is being edited and previewed as Tibetan text.
- `StackingState`: a stacking layout is building a Tibetan syllable before commit.
- `CommittingState`: a transient state that carries text to the host application.

```mermaid
stateDiagram-v2
    [*] --> EmptyState

    EmptyState: No active composition
    WylieInputtingState: Editing Wylie letters\nTooltip shows converted Tibetan preview
    StackingState: Building a stacked Tibetan syllable
    CommittingState: Transitional commit-to-host state

    EmptyState --> WylieInputtingState: Wylie layout receives printable ASCII
    WylieInputtingState --> WylieInputtingState: Insert/delete text or move cursor
    WylieInputtingState --> CommittingState: Space commits Tibetan + tsheg
    WylieInputtingState --> CommittingState: Return commits raw Wylie letters
    WylieInputtingState --> EmptyState: Escape, modifier shortcut, or last character deleted

    EmptyState --> StackingState: Stacking layout compose key enters composition
    StackingState --> StackingState: Add consonants or transforms
    StackingState --> CommittingState: Vowel, symbol, suffix, space, or return commits buffer
    StackingState --> EmptyState: Delete clears composition
    StackingState --> EmptyState: Compose key exits stacking mode after committing current buffer

    EmptyState --> CommittingState: Direct-layout key commits Tibetan immediately
    CommittingState --> EmptyState: Controller commits text and resets UI
```

## Notes

- `InputtingState` is an abstract base class implemented by `WylieInputtingState` and `StackingState`.
- `InputController` does not remain in `CommittingState`; it commits the string, resets the UI, and returns to `EmptyState`.
- Direct layouts such as Dzongkha typically bypass an inputting state and emit `CommittingState` immediately for each handled key.
