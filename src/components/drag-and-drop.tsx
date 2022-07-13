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

/**
 * A custom version of Droppable
 * @param children
 * @param props
 * @constructor
 */
export const Drop = ({children, ...props}: DropProps) => {
  return (
    /*
    * https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md
    * Droppable:
    * required props:
    * droppableId
    *
    * children function:
    * Droppable needs a function as its child. This function returns a React component
    * this component needs:
    * ref={provided.innerRef}: provided.innerRef is a function used to supply with DOM node of your component to React-Beautiful-Dnd
    * {...provided.droppableProps}
    * */
    <Droppable {...props}>
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
/*
* A placeholder is a React element used to increase the available space in a Droppable during a drag when it's needed.
* A placeholder needs to be a child of the component that you designate as a Droppable
*
* https://reactjs.org/docs/refs-and-the-dom.html
* You may not use the ref attribute on function components because they don’t have instances.
* If you want to allow people to take a ref to your function component, you can use forwardRef
*
* Ref forwarding is an opt-in feature that lets some components take a ref they receive,
* and pass it further down (in other words, “forward” it) to a child.
* */
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({children, ...props}, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
);

type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode };
/**
 * A custom version of Draggable
 * @param children
 * @param props
 * @constructor
 */
/*
* Draggable: a component that you can drag and drop onto <Droppable />
* https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md
*
* provided.dragHandleProps: this should be applied to the part of component that we want to use to control
* the entire component. You can use this to drag a large item by just a small part of it
* */
export const Drag = ({children, ...props}: DragProps) => {
  return (
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
