import { useEffect, useState } from "react";

const useNavHeight = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const nav = document.querySelector("header");
    if (!nav) throw new Error("No Nav component");
    setHeight(nav.getBoundingClientRect().height);
  }, []);

  return height;
};

export default useNavHeight;
