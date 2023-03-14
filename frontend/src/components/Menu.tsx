import React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Text } from '../components/Text';
import '../styles/styles.css';


export function Menu() {
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text className="text-yellow-500 font-extrabold font-2xl" >
            Choose from the options
        </Text>
        <Collapsible.Trigger asChild>
          <button className="IconButton">{open ? <Cross2Icon /> : <RowSpacingIcon />}</button>
        </Collapsible.Trigger>
      </div>

      <div className="Repository">
        <span className="Text">General history</span>
      </div>

      <Collapsible.Content>
        <div className="Repository">
          <span className="Text">History track above</span>
        </div>
        <div className="Repository">
          <span className="Text">History track below</span>
        </div>
        <div className="Repository">
          <span className="Text">Exact history</span>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
