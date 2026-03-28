import { CommittingState, InputState } from '../input_method/InputState';
import Layout from './Layout';
import { Key } from '../input_method';
import { KeyName } from '../input_method/Key';

export default class DzongkhaLayout implements Layout {
  readonly layoutId = 'dzongkha';
  readonly layoutName = 'Dzongkha';

  handle(
    key: Key,
    state: InputState,
    stateCallback: (newState: InputState) => void,
    errorCallback: () => void,
  ): boolean {
    if (key.name === KeyName.SPACE) {
      const buffer = String.fromCharCode(0x0f0b);
      stateCallback(new CommittingState(buffer));
      return true;
    }

    const code = this.keymap.get(key.ascii);
    if (code) {
      stateCallback(new CommittingState(code));
      return true;
    }
    return false;
  }

  private keyNameUppered_: Map<string, string> | undefined;
  private keyNameLowered_: Map<string, string> | undefined;

  getKeyNames(shift: boolean, ctrl: boolean, alt: boolean): Map<string, string> {
    if (ctrl) {
      return new Map<string, string>();
    }
    if (shift) {
      if (this.keyNameUppered_ === undefined) {
        this.keyNameUppered_ = new Map<string, string>();
        this.keymap.forEach((value, key) => {
          if (key === key.toUpperCase()) {
            this.keyNameUppered_!.set(key, value);
          }
        });
      }
      return this.keyNameUppered_;
    }
    if (this.keyNameLowered_ === undefined) {
      this.keyNameLowered_ = new Map<string, string>();
      this.keymap.forEach((value, key) => {
        if (key === key.toLowerCase()) {
          this.keyNameLowered_!.set(key, value);
        }
      });
    }
    return this.keyNameLowered_;
  }

  readonly keymap = new Map<string, string>([
    ['_', 'ཿ'],
    ['-', '༔'],
    [',', 'ས'],
    [';', 'ཚ'],
    [':', 'ྪ'],
    ['!', '༄'],
    ['?', 'ྸ'],
    ['.', 'ཧ'],
    ['"', 'ྫ'],
    ['(', '༼'],
    [')', '༽'],
    ['[', 'ཇ'],
    [']', 'ཉ'],
    ['{', 'ྗ'],
    ['}', 'ྙ'],
    ['@', '༅'],
    ['*', '༴'],
    ['/', 'ཨ'],
    ['\\', 'ཝ'],
    ['&', '༸'],
    ['#', '༆'],
    ['%', '༎'],
    ['`', '༉'],
    ['^', '༈'],
    ['+', '༑'],
    ['<', 'ྶ'],
    ['=', '།'],
    ['>', 'ྸ'],
    ['|', 'ྭ'],
    ['~', '༊'],
    ['$', ''],
    ['0', '༠'],
    ['1', '༡'],
    ['2', '༢'],
    ['3', '༣'],
    ['4', '༤'],
    ['5', '༥'],
    ['6', '༦'],
    ['7', '༧'],
    ['8', '༨'],
    ['9', '༩'],
    ['A', 'ྟ'],
    ['a', 'ཏ'],
    ['B', 'ྲ'],
    ['b', 'ར'],
    ['C', 'ཱ'],
    ['c', 'འ'],
    ['D', 'ྡ'],
    ['d', 'ད'],
    ['E', 'ྒ'],
    ['e', 'ག'],
    ['F', 'ྣ'],
    ['f', 'ན'],
    ['G', 'ྤ'],
    ['g', 'པ'],
    ['H', 'ྥ'],
    ['h', 'ཕ'],
    ['I', 'ཽ'],
    ['i', 'ོ'],
    ['J', 'ྦ'],
    ['j', 'བ'],
    ['K', 'ྨ'],
    ['k', 'མ'],
    ['L', 'ྩ'],
    ['l', 'ཙ'],
    ['M', 'ྴ'],
    ['m', 'ཤ'],
    ['N', 'ླ'],
    ['n', 'ལ'],
    ['O', 'ྕ'],
    ['o', 'ཅ'],
    ['P', 'ྖ'],
    ['p', 'ཆ'],
    ['Q', 'ྐ'],
    ['q', 'ཀ'],
    ['R', 'ྔ'],
    ['r', 'ང'],
    ['S', 'ྠ'],
    ['s', 'ཐ'],
    ['T', 'ྀ'],
    ['t', 'ི'],
    ['U', 'ཻ'],
    ['u', 'ེ'],
    ['V', 'ྱ'],
    ['v', 'ཡ'],
    ['W', 'ྑ'],
    ['w', 'ཁ'],
    ['X', 'ྯ'],
    ['x', 'ཟ'],
    ['Y', '྄'],
    ['y', 'ུ'],
    ['Z', 'ྮ'],
    ['z', 'ཞ'],
    ["'", 'ཛ'],
  ]);
}
