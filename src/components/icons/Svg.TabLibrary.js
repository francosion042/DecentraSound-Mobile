import React from "react";
import PropTypes from "prop-types";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../constants";

const SvgTabLibrary = ({ active, size }) => {
  const fill = active ? colors.brandPrimary : colors.greyInactive;
  const dPath =
    "M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM4 5v14h16V7h-8.414l-2-2H4zm7 8.05V9h5v2h-3v4.5a2.5 2.5 0 1 1-2-2.45z";

  return (
    <Svg height={size} width={size} viewBox="0 0 24 24">
      <Path d={dPath} fill={fill} />
    </Svg>
  );
};

SvgTabLibrary.defaultProps = {
  active: false,
  size: 24,
};

SvgTabLibrary.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number,
};

export default SvgTabLibrary;
