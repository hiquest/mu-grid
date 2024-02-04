# µGrid
[![Tests](https://github.com/hiquest/mugrid/actions/workflows/test.yml/badge.svg)](https://github.com/hiquest/mugrid/actions/workflows/test.yml)

A high-performant MIT-licensed React DataGrid component for everyone.

## Features

- 💯 Free & open-source
- 🚀 TypeScript-first
- 📦 Small bundle size
- 🎨 Customizable

## Installation

```bash
npm install mugrid
```

## Usage

```jsx
import { DataGrid } from 'mugrid';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'name', name: 'Name' },
  { key: 'age', name: 'Age' },
];

const rows = [
  { id: 1, name: 'John Doe', age: 25 },
  { id: 2, name: 'Jane Doe', age: 22 },
];

function App() {
  return <DataGrid columns={columns} rows={rows} />;
}
```
