import DzongkhaLayout from './DzongkhaLayout';
import Layout from './Layout';
import SambhotaKeymapOneLayout from './SambhotaKeymapOneLayout';
import SambhotaKeymapTwoLayout from './SambhotaKeymapTwoLayout';
import TccKeyboardOneLayout from './TccKeyboardOneLayout';
import TccKeyboardTwoLayout from './TccKeyboardTwoLayout';
import WyleLayout from './WyleLayout';

export default class LayoutManager {
  private static instance: LayoutManager;

  private constructor() {}

  public static getInstance(): LayoutManager {
    if (!LayoutManager.instance) {
      LayoutManager.instance = new LayoutManager();
    }
    return LayoutManager.instance;
  }

  readonly layouts: Layout[] = [
    new DzongkhaLayout(),
    new SambhotaKeymapOneLayout(),
    new SambhotaKeymapTwoLayout(),
    new TccKeyboardOneLayout(),
    new TccKeyboardTwoLayout(),
    new WyleLayout(),
  ];

  getLayoutById(layoutId: string): Layout | undefined {
    return this.layouts.find((layout) => layout.layoutId === layoutId);
  }
}
