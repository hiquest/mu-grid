import { Meta } from "@storybook/react";
import { ColumnDef, DataGrid } from "./DataGrid";

export default {
  title: "Components/DataGrid",
  component: DataGrid,
} as Meta;

const Template = (args) => <DataGrid {...args} />;

export const Default = Template.bind({});

type Person = {
  id: number;
  name: string;
  age: number;
  email: string;
  position: string;
  phone: string;
  salary: number;
};

const data: Person[] = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    email: "johndoe@nope.com",
    phone: "123-456-7890",
    salary: 100000,
    position: "Software Engineer",
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 23,
    email: "janedoe@nope.com",
    phone: "123-456-7890",
    salary: 100000,
    position: "Software Engineer",
  },
  {
    id: 3,
    name: "Mary Jane",
    age: 23,
    email: "maryjane@nope.com",
    phone: "123-456-7890",
    salary: 150000,
    position: "Manager",
  },
  {
    id: 4,
    name: "Mark Johnson",
    age: 50,
    email: "mark@nope.com",
    phone: "123-456-7890",
    salary: 1500000,
    position: "CEO",
  },
];

const columns: ColumnDef<Person>[] = [
  {
    field: "name",
    headerName: "Name",
    filterable: true,
  },
  {
    field: "age",
    headerName: "Age",
  },
  {
    field: "email",
    headerName: "Email",
    filterable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
  },
  {
    field: "position",
    headerName: "Position",
    filterable: true,
  },
  {
    field: "salary",
    headerName: "Salary",
    cellRenderer: (row) => `${row.salary.toLocaleString()}`,
    align: "right",
    sortable: true,
  },
];

Default.args = { data, columns };
