import React from 'react';
import { useDrag } from 'react-dnd';

const DragItem = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'DRAG_ITEM',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="drag-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {label}
    </div>
  );
};

export default DragItem;
