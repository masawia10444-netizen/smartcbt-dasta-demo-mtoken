import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

// please see this issue for more details
// https://github.com/atlassian/react-beautiful-dnd/issues/2399

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};
