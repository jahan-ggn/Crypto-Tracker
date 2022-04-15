import React, { useEffect, useState } from "react";
import CryptoContext from "./CryptoContext";

const CryptoState = (props) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    currency === "INR" ? setSymbol("₹") : setSymbol("$");
  }, [currency]);

  return <CryptoContext.Provider value={{currency, setCurrency, symbol}}>{props.children}</CryptoContext.Provider>;
};

export default CryptoState;
