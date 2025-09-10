# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Prompts:
- Add parameter:
add two parameters names minBranchOffset and MaxBranchOffset in the TreeWidget that change corresponding useStates in RotatingCube. Both parameters shall range from 0.0 to 1.0. Both shall default to 1.0. These two parameter shall also be added to the Treestructure and passed in where the TreeStructure is create


Run Project:
npm run dev

ToDo:
- Add bark to tree
- vary the thickness of the branches
- Branches to branch off not at the tip but thrughout the parent branch
    - try to avoid gaps beween branches. Do not start child branches at the tip of the parent branch.
- RenameRotatingCube into something with tree
- rename project (if that is possible)

