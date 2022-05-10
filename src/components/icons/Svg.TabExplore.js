import * as React from "react";
import PropTypes from "prop-types";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../constants";

const SvgTabExplore = ({ active, size }) => {
  const fill = active ? colors.brandPrimary : colors.greyInactive;
  const dPath =
    "M20 17a1 1 0 0 1-2 0V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v13a2 2 0 0 0 2 2h15c1.654 0 3-1.346 3-3V7h-2v10zM12 7h3v2h-3V7zm0 4h3v2h-3v-2zM5 7h5v6H5V7zm0 10v-2h10v2H5z";

  return (
    <Svg
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}
    >
      <Path d={dPath} fillRule="evenodd" />
    </Svg>
  );
};

SvgTabExplore.defaultProps = {
  active: false,
  size: 24,
};

SvgTabExplore.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number,
};

export default SvgTabExplore;
