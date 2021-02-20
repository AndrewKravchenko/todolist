import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/tasks-api";

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
    task: {id: "1", status: TaskStatuses.Completed, title: "JS", todoListId: "todolistId1", description: "",
    startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
    todolistId: "1"
}
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: "2", status: TaskStatuses.New, title: "HTML", todoListId: "todolistId1", description: "",
        startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
    todolistId: "2"
}