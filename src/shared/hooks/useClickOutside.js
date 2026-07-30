import { useEffect } from "react";

export default function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClick(e) {
      if (!ref.current?.contains(e.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, [callback, ref]);
}