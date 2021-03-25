/**
 *
 * This file was generated with Adobe XD React Exporter
 * Exporter for Adobe XD is written by: Johannes Pichler <j.pichler@webpixels.at>
 *
 **/

import React from "react";
import Svg, {
  Defs,
  ClipPath,
  Rect,
  G,
  Circle,
  Path,
  Text,
  TSpan
} from "react-native-svg";
/* Adobe XD React Exporter has dropped some elements not supported by react-native-svg: style */

const ProfileComponent = () => (
  <Svg viewBox="0 0 414 736">
    <Defs>
      <ClipPath id="a">
        <Rect className="a" width={46} height={46} />
      </ClipPath>
      <ClipPath id="b">
        <Rect className="a" width={414} height={68} />
      </ClipPath>
      <ClipPath id="c">
        <Rect className="a" width={3} height={15} />
      </ClipPath>
      <ClipPath id="e">
        <Rect width={414} height={736} />
      </ClipPath>
    </Defs>
    <G id="d" className="b">
      <Rect className="p" width={414} height={736} />
      <G transform="translate(24 102.307)">
        <G transform="translate(106 -7.307)">
          <Circle className="c" cx={77} cy={77} r={77} />
          <G className="d" transform="translate(54 54)">
            <Path
              className="e"
              d="M0,46V40.251c0-6.326,10.35-11.5,23-11.5s23,5.175,23,11.5V46ZM11.5,11.5A11.5,11.5,0,1,1,23,23,11.5,11.5,0,0,1,11.5,11.5Z"
              transform="translate(0 0)"
            />
          </G>
        </G>
        <Text className="f" transform="translate(183 213.693)">
          <TSpan x={-62.248} y={0}>
            {"Jane Doe"}
          </TSpan>
        </Text>
        <Text className="g" transform="translate(183 243.693)">
          <TSpan x={-45.85} y={0}>
            {"San Francisco, CA"}
          </TSpan>
        </Text>
        <Text className="h" transform="translate(1 298.693)">
          <TSpan x={26.107} y={13}>
            {"Hi! My name is Jane, I\u2019m a creative geek from San "}
          </TSpan>
          <TSpan x={40.791} y={37}>
            {"Francisco, CA. Contact me at jane@mail.com"}
          </TSpan>
        </Text>
        <G transform="translate(69 407.693)">
          <Rect className="e" width={96} height={40} rx={20} />
          <Text className="i" transform="translate(48 24)">
            <TSpan x={-10.833} y={0}>
              {"ADD"}
            </TSpan>
          </Text>
        </G>
        <G transform="translate(200 407.693)">
          <G className="j">
            <Rect className="o" width={96} height={40} rx={20} />
            <Rect className="a" x={1} y={1} width={94} height={38} rx={19} />
          </G>
          <Text className="k" transform="translate(48 24)">
            <TSpan x={-25.005} y={0}>
              {"MESSAGE"}
            </TSpan>
          </Text>
        </G>
      </G>
      <G className="l">
        <Rect className="a" width={414} height={20} />
        <Rect
          className="a"
          width={414}
          height={48}
          transform="translate(0 20)"
        />
        <G className="m" transform="translate(395 37)">
          <Path
            className="e"
            d="M0,13.5A1.5,1.5,0,1,1,1.5,15,1.5,1.5,0,0,1,0,13.5Zm0-6A1.5,1.5,0,1,1,1.5,9,1.5,1.5,0,0,1,0,7.5Zm0-6A1.5,1.5,0,1,1,1.5,3,1.5,1.5,0,0,1,0,1.5Z"
          />
        </G>
        <Text className="n" transform="translate(208 48)">
          <TSpan x={-30.334} y={0}>
            {"PROFILE"}
          </TSpan>
        </Text>
        <G transform="translate(16 36)">
          <Rect className="a" width={16} height={16} />
          <Path
            className="e"
            d="M0,14V12H8v2ZM0,8V6H16V8ZM0,2V0H16V2Z"
            transform="translate(0 1)"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export default ProfileComponent;
