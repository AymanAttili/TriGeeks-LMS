import { MoreVert } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { FC, useState } from 'react'

type Item = {
    title: string,
    onClick: () => void
}
interface ActionsMenuProps {
    items: Item[];
}

const ActionsMenu: FC<ActionsMenuProps> = ({ items }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <IconButton
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    items.map((item) =>
                        <MenuItem
                            onClick={
                                () => {
                                    item.onClick();
                                    handleClose();
                                }
                            }
                        >
                            {item.title}
                        </MenuItem>
                    )
                }
            </Menu>
        </>
    )
}

export default ActionsMenu