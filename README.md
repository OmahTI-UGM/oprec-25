# Oprec MAKOMTI 2025 Repository

## Design

https://www.figma.com/files/project/107570013

## Pull & Push Schema

1. Create and checkout to your developing branch "git checkout -b "branch name"
2. Pull origin main "git pull origin main"
3. Code
4. Pull origin main 
5. Add the changed file to git "git add ."
6. Commit (Please follow the commit messages rule)
7. Push to main "git push -u origin main"
8. Create a new pull request to develop branch and mention @salmon
9. Done

## Branch Naming

`<type>/<short_description>.<nama>`

- `<type>` :
  - feature: saya menambahkan fitur baru
  - fixing: saya memperbaiki fitur

Contoh: feature/navbar.arya

## Commit message

`<type>[scope]: <short_summary>`

- `<type>` :
  - feat: saya menambahkan fitur baru
  - fix: saya memperbaiki fitur

Contoh: feat[Homepage]: Creating about section

## Folder Structure

```
- public: file public (including assets)
- app : Contain all pages
- src
    - components : all components (layouts, button, navbar, etc)
    - helpers : pembantu (fetch backend, etc)
    - hooks : custom hooks
    - context: custom context
    - modules: all views
        - [Page name]
            - page.js
```

## Notes

- kalo branch mu udah di merge, jangan lupa juga buat hapus branch mu dari github (biar rapi :>)
