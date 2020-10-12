import * as React from "react";

function K(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
      <circle cx={255} cy={255} r={230} fill="#2962ff" />
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
        {"K"}
      </text>
    </svg>
  );
}

const MemoK = React.memo(K);
export default MemoK;
