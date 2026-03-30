import { Candidate } from './Candidate';
import { InputtingState } from './InputState';

class CandidateWrapper {
  constructor(readonly keyCap: string, readonly candidate: Candidate, readonly selected: boolean) {
    this.keyCap = keyCap;
    this.candidate = candidate;
    this.selected = selected;
  }

  /** Returns the reading of the candidate. */
  get reading(): string {
    return this.candidate.displayText;
  }

  /** Returns the value of the candidate. */
  get value(): string {
    return this.candidate.displayText;
  }

  /** Returns the description of the candidate. */
  get description(): string {
    return this.candidate.description;
  }
}

enum ComposingBufferTextStyle {
  Normal = 'normal',
  Highlighted = 'highlighted',
}

class ComposingBufferText {
  readonly text: string;
  readonly style: ComposingBufferTextStyle;

  constructor(text: string, style: ComposingBufferTextStyle = ComposingBufferTextStyle.Normal) {
    this.text = text;
    this.style = style;
  }
}

class InputUIState {
  constructor(
    readonly composingBuffer: ComposingBufferText[],
    readonly cursorIndex: number,
    readonly candidates: CandidateWrapper[],
    readonly tooltip?: string,
  ) {}
}

/**
 * Builds the serialized UI payload for an InputtingState.
 *
 * This builder converts the internal input-method state into the compact JSON
 * structure expected by concrete UI implementations.
 */
export class InputUIStateBuilder {
  /**
   * Creates a builder for the given inputting state.
   * @param state The inputting state to serialize for the UI layer.
   */
  constructor(readonly state: InputtingState) {}

  /**
   * Builds the UI payload and returns it as a JSON string.
   * @returns The serialized UI payload.
   */
  buildJsonString(): string {
    return JSON.stringify(this.build());
  }

  build(): InputUIState {
    const composingBufferTexts: ComposingBufferText[] = [];
    const text = this.state.composingBuffer;
    composingBufferTexts.push(new ComposingBufferText(text));

    const selectionKeys = this.state.selectionKeys;
    const candidateWrappers: CandidateWrapper[] = [];
    for (let i = 0; i < this.state.candodates.length; i++) {
      let selectionKey = selectionKeys[i];
      const candidate = this.state.candodates[i];
      const selected = false;
      candidateWrappers.push(new CandidateWrapper(selectionKey, candidate, selected));
    }
    return new InputUIState(
      composingBufferTexts,
      this.state.cursorIndex,
      candidateWrappers, // candidates
      this.state.tooltip,
    );
  }
}
