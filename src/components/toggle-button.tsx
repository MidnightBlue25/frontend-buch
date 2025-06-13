"use client";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  return (
    <Button
      variant="link"
      onClick={() => setIsDarkMode((prev) => !prev)}
    >
      {isDarkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
    </Button>
  );
}
