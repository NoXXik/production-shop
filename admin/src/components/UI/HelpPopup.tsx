import { Button, Tooltip } from 'antd'
import { TooltipPlacement } from 'antd/es/tooltip'
import React from 'react'

export default function HelpPopup(props: {placement?: TooltipPlacement | undefined, title: string}) {
    
  return (
    <>
        <Tooltip placement={props.placement || 'left'} title={props.title}>
            <Button>?</Button>
        </Tooltip>
    </>
  )
}
