import { LayoutManager } from '../layout';
import Layout from '../layout/Layout';
import SambhotaKeymapOneLayout from '../layout/SambhotaKeymapOneLayout';

import { CommittingState, EmptyState, InputState, InputtingState } from './InputState';
import { Key, KeyName } from './Key';

export class KeyHandler {
  private layout: Layout = new SambhotaKeymapOneLayout();
  selectLayoutById(id: string) {
    const layout = LayoutManager.getInstance().getLayoutById(id);
    if (layout) {
      this.layout = layout;
    }
  }

  handle(
    key: Key,
    state: InputState,
    stateCallback: (state: InputState) => void,
    errorCallback: () => void,
  ): boolean {
    return this.layout.handle(key, state, stateCallback, errorCallback);
  }
}
