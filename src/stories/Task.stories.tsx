import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";

export default {
    title: 'Todolists/Task',
    component: Task,
    argTypes: {},
    args: {
        removeTask: action('Title changed inside Task'),
        changeTaskStatus: action('Remove button inside Task clicked'),
        changeTaskTitle: action('Status changed inside Task'),
    },
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});

TaskIsDoneExample.args = {
    task: {id: "1", isDone: true, title: "JS"},
    todolistId: "1"
}
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: "2", isDone: false, title: "HTML"},
    todolistId: "2"
}