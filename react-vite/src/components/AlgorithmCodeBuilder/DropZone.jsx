import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, droppedItem }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'DRAG_ITEM',
    drop: (item) => onDrop(item.type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`drop-zone ${isOver ? 'dragging' : ''}`}
    >
      {droppedItem ? droppedItem.toUpperCase().replace('_', ' ') : 'Drag an item here'}
    </div>
  );
};

export default DropZone;
