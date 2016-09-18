export const SELECT_TAB = 'SELECT_TAB';

export function selectTab(slideIndex) {
  return {
    type: SELECT_TAB,
    payload: slideIndex
  }
}
