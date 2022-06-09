import React, {ReactNode} from 'react';
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from 'react-beautiful-dnd';

type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode };

// https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md
/**
 * A custom version of Droppable
 * @param children
 * @param props
 * @constructor
 */
export const Drop = ({children, ...props}: DropProps) => {
  return (
    <Droppable {...props}>
      {/* provided: DraggableProvided */}
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          });
        }
        return <div/>;
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<{ provided: DroppableProvided } & DroppableProvidedProps> & React.HTMLAttributes<HTMLDivElement>;
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({children, ...props}, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
);

// https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md
type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode };
/**
 * A custom version of Draggable
 * @param children
 * @param props
 * @constructor
 */
export const Drag = ({children, ...props}: DragProps) => {
  return (
    // Draggable: a component that you can drag and drop onto <Droppable />s
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          /*
          * Clone and return a new React element using element as the starting point.
          * config should contain all new props, key, or ref.
          * The resulting element will have the original element’s props with the new props merged in shallowly.
          * New children will replace existing children.
          * key and ref from the original element will be preserved if no key and ref present in the config.
          * */
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          });
        }
        return <div/>;
      }}
    </Draggable>
  );
};