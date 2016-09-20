import { colors, spacing } from 'material-ui/styles';
import pgColors from './pg-colors';

import {fade} from 'material-ui/utils/colorManipulator';

const spacing2 = _interopRequireDefault(spacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


/**
*  Light Theme is the default theme used in material-ui. It is guaranteed to
*  have all theme variables needed for every component. Variables not defined
*  in a custom theme will default to these values.
*/

const pgTheme = {
  spacing: spacing2.default,
  fontFamily: 'OpenSans, sans-serif, Vollkorn, serif',
  palette: {
    primary1Color: colors.green500,
    primary2Color: colors.lightGreen500,
    primary3Color: colors.lime400,
    accent1Color: colors.yellow500,
    accent2Color: colors.amber400,
    accent3Color: colors.red400,
    textColor: colors.darkBlack,
    secondaryTextColor: (0, fade)(colors.darkBlack, 0.54),
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: '#E0E9E5',
    disabledColor: (0, fade)(colors.darkBlack, 0.3),
    pickerHeaderColor: colors.green500,
    clockCircleColor: (0, fade)(colors.darkBlack, 0.07),
    shadowColor: colors.fullBlack
  }
};

export default pgTheme;
