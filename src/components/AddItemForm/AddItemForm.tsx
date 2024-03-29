import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {IconButton, TextField} from '@material-ui/core'
import {AddBox} from '@material-ui/icons'

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function({addItem, disabled = false}: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }
    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
                   disabled={disabled}
        />
        <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
            <AddBox/>
        </IconButton>
    </div>
})
