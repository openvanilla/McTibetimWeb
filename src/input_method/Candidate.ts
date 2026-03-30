/**
 * Represents a candidate for selection in the input method.
 */
export class Candidate {
  /**
   * @param displayText The text to display for the candidate.
   * @param description A description of the candidate.
   */
  constructor(readonly displayText: string, readonly description: string) {}
}
