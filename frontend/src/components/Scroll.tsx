import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import '../styles/styles.css';



export interface ScrollProps{
  data: [number,string][];
}

export function Scroll(props:ScrollProps) {
  return(
  <ScrollArea.Root className="ScrollAreaRoot bg-blue-300 bg-opacity-60">
    <ScrollArea.Viewport className="ScrollAreaViewport">
      <div style={{ padding: '15px 20px' }}>
        <div className="TextArea text-yellow-700">Your Consumption</div>
        {props.data.map(([spent,date]) => (
          <div className="Tag text-white" key={spent}>
            {`Spent: ${spent} KwH \n Date: ${date}`}
          </div>
        ))}
      </div>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="ScrollAreaCorner" />
  </ScrollArea.Root>
  )
}