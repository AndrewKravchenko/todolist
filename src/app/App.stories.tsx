import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import App from './App'
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator'

export default {
    title: 'Todolists/App',
    component: App,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
} as Meta;

const Template: Story = (args) =>
    <App demo={true} {...args} />
export const AppWithReduxExample = Template.bind({});

AppWithReduxExample.args = {}

