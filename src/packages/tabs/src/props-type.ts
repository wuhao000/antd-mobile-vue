import {Models} from '../../../types/models';


export interface TabBarPropsType {
  /** current active tab */
  activeTab: number;
  /** use animate | default: true */
  animated: boolean;
  /** call this function to switch tab */
  goToTab: (index: number) => void;
  instanceId: number;
  /** page size of tabbar's tab | default: 5 */
  page?: number;
  /** render the tab of tabbar */
  renderTab?: (tab: Models.TabData) => any;
  /** render the underline of tabbar or not*/
  renderUnderline?: boolean;
  /** tabBar active text color */
  tabBarActiveTextColor?: string;
  /** tabBar background color */
  tabBarBackgroundColor?: string;
  /** tabBar inactive text color */
  tabBarInactiveTextColor?: string;
  /** tabBar's position | defualt: top */
  tabBarPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** tabBar text style */
  tabBarTextStyle?: any;
  // TabBar shortcut settings.
  /** tabBar underline style */
  tabBarUnderlineStyle?: any;
  /** tabs data */
  tabs: Models.TabData[];
}

export interface PropsType {
  /** whether to change tabs with animation | default: true */
  animated?: boolean;
  /** destroy inactive tab | default: false */
  destroyInactiveTab?: boolean;
  /** distance to change tab, width ratio | default: 0.3 */
  distanceToChangeTab?: number;
  /** initial Tab, index or key */
  initialPage?: number | string;
  /** current tab, index or key */
  page?: number | string;
  /** pre-render nearby # sibling, Infinity: render all the siblings, 0: render current page | default: 1 */
  prerenderingSiblingsNumber?: number;
  /** render for TabBar */
  renderTabBar?: any | false;
  /** whether to switch tabs with swipe gestrue in the content | default: true */
  swipeable?: boolean;
  /** tabBar active text color */
  tabBarActiveTextColor?: string;
  /** tabBar background color */
  tabBarBackgroundColor?: string;
  /** tabBar inactive text color */
  tabBarInactiveTextColor?: string;
  /** TabBar's position | default: top */
  tabBarPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** tabBar text style */
  tabBarTextStyle?: any;
  // TabBar shortcut settings.
  /** tabBar underline style */
  tabBarUnderlineStyle?: any;
  /** tab paging direction | default: horizontal */
  tabDirection?: 'horizontal' | 'vertical';
  /** tabs data */
  tabs: Models.TabData[];
  /** use left instead of transform | default: false */
  useLeftInsteadTransform?: boolean;
  /** use scroll follow pan | default: true */
  useOnPan?: boolean;
  /** use paged | default: true */
  usePaged?: boolean;
}
