export const SELECT_TAB = 'SELECT_TAB';
export const CONSUME_SECTIONAMES = 'CONSUME_SECTIONAMES';
export const CONSUME_PLANTS = 'CONSUME_PLANTS';

export function selectTab(slideIndex) {
  return {
    type: SELECT_TAB,
    payload: slideIndex
  }
}

export function consumeSectionNames(sectionNames) {
  return {
    type: CONSUME_SECTIONAMES,
    payload: sectionNames
  }
}

export function consumePlants(plants) {
  return {
    type: CONSUME_PLANTS,
    payload: plants
  }
}
