# ToDoList

A simple browser-based to-do list app built as the course project for
**CSE25303 · Version Control System** (IILM University Gurugram).

The app is intentionally small: the focus of the project is the **Git / GitHub
workflow** used to build it.

## Features
- Add tasks (empty or blank tasks are ignored)
- Mark tasks as complete
- Delete tasks
- Filter by All / Active / Completed
- Counter of remaining tasks
- Tasks are saved in the browser (`localStorage`) and survive a reload

## How to run
No installation needed. Clone the repository and open `index.html` in any browser.

```bash
git clone https://github.com/Atharv875/ToDoList.git
cd ToDoList
```

## Git hooks
This repository shares its hooks through a tracked `.githooks` folder.
Enable them once after cloning:

```bash
git config core.hooksPath .githooks
```

- `pre-commit` blocks commits that add a `TODO` marker.
- `commit-msg` requires messages like `feat: add task input`
  (types: feat, fix, docs, style, refactor, test, chore).
