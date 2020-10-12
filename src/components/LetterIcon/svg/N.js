import * as React from "react";

function N(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
      <circle cx={255} cy={255} r={230} fill="#00c853" />
      <text
        x={255}
        y={246}
        alignmentBaseline="central"
        textAnchor="middle"
        fill="#fff"
        fontSize={275}
        fontWeight={300}
        fontFamily="Roboto"
      >
        {"N"}
      </text>
    </svg>
  );
}

const MemoN = React.memo(N);
export default MemoN;
