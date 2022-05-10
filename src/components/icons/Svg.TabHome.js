import * as React from "react";
import PropTypes from "prop-types";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../constants";

const SvgTabHome = ({ active, size }) => {
  const fill = active ? colors.brandPrimary : colors.greyInactive;
  const dPath =
    "M6 19h12V9.157l-6-5.454-6 5.454V19zm13 2H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM8 10a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5v-2zm0 4a3 3 0 0 1 3 3H8v-3z";

  return (
    <Svg height={size} width={size} viewBox="0 0 24 24">
      <Path d={dPath} fill={fill} />
    </Svg>
  );
};

SvgTabHome.defaultProps = {
  active: false,
  size: 24,
};

SvgTabHome.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number,
};

export default SvgTabHome;
