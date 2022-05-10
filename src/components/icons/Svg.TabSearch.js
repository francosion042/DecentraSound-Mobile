import * as React from "react";
import PropTypes from "prop-types";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../constants";

const SvgTabSearch = ({ active, size }) => {
  const fill = active ? colors.brandPrimary : colors.greyInactive;
  const dPath =
    "M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z";

  return (
    <Svg height={size} width={size} viewBox="0 0 16 16">
      <Path d={dPath} fill={fill} fillRule="evenodd" />
    </Svg>
  );
};

SvgTabSearch.defaultProps = {
  active: false,
  size: 24,
};

SvgTabSearch.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number,
};

export default SvgTabSearch;
