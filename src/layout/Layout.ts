import { Key } from '../input_method';
import { InputState } from '../input_method/InputState';

export default abstract class Layout {
  abstract get layoutId(): string;
  abstract get layoutName(): string;

  abstract handle(
    key: Key,
    state: InputState,
    stateCallback: (newState: InputState) => void,
    errorCallback: () => void,
  ): boolean;

  abstract getKeyNames(shift: boolean, ctrl: boolean, alt: boolean): Map<string, string>;
}
