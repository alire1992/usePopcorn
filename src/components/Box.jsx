/* eslint-disable react/prop-types */

import { useState } from "react";
import ToggleButton from "./ToggleButton";

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ToggleButton onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </ToggleButton>
      {isOpen && children}
    </div>
  );
}

export default Box;
