import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";

export default {
    title: 'Todolists/AddItemForm',
    component: AddItemForm,
    argTypes: {},
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('Button inside clicked'),
}
