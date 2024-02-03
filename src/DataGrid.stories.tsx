import { Meta } from "@storybook/react";
import { DataGrid } from "./DataGrid";

export default {
  title: "Components/DataGrid",
  component: DataGrid,
} as Meta;

const Template = (args) => <DataGrid {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Props for DataGrid
};
