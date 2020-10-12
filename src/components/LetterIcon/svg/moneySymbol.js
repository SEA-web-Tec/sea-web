import * as React from "react";

function moneySymbol(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
      <circle cx={255} cy={255} r={230} fill="#aeea00" />
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
        {"$"}
      </text>
    </svg>
  );
}

const MemomoneySymbol = React.memo(moneySymbol);
export default MemomoneySymbol;
