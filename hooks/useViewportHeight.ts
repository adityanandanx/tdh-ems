import { useEffect, useState } from "react";

const useNavHeight = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const area = document.querySelector("#visible-area");
    if (!area) throw new Error("No visible-area element");
    setHeight(area.getBoundingClientRect().height);

    const handleResize = (e: Event) => {
      setHeight(area.getBoundingClientRect().height);
    };

    window.addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  return height;
};

export default useNavHeight;
