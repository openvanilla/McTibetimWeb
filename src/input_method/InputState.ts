import { Candidate } from './Candidate';

export abstract class InputState {}

export class EmptyState extends InputState {}

/**
 * Transitional state that carries text to be committed to the host.
 */
export class CommittingState extends InputState {
  constructor(readonly commitString: string) {
    super();
  }
}

export abstract class InputtingState extends InputState {
  abstract get composingBuffer(): string;
  abstract get cursorIndex(): number;
  abstract get tooltip(): string | undefined;
  abstract get candodates(): Candidate[];
  selectionKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
}

export class WylieInputtingState extends InputtingState {
  candodates: Candidate[] = [];
  constructor(readonly letters: string, readonly tibetan: string, readonly cursorIndex: number) {
    super();
  }

  get composingBuffer(): string {
    return this.letters;
  }
  get tooltip(): string | undefined {
    return this.tibetan;
  }
}

export class StackingState extends InputtingState {
  private composingBuffer_: string;
  private _utf16Code: number[];
  get composingBuffer(): string {
    return this.composingBuffer_;
  }

  get utf16Code(): number[] {
    return this._utf16Code;
  }

  candodates: Candidate[] = [];

  constructor(utf16Code: number[], readonly consonantIndexes: number[]) {
    super();
    this._utf16Code = utf16Code;
    this.composingBuffer_ = String.fromCharCode(...utf16Code);
  }

  get cursorIndex(): number {
    return this.composingBuffer.length;
  }

  get tooltip(): string | undefined {
    return 'Stacking';
  }
}
