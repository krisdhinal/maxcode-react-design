import { useCallback } from "react";

function useDragRef(drag) {
  return useCallback(
    (element) => {
      if (element) {
        drag(element);
      }
    },
    [drag]
  );
}

export default useDragRef;
