## Gulp Task

For creating the templates, we will use a gulp task. The gulp task will be responsible for creating the templates with nunjucks. The gulp task will also be responsible for creating the `package.json` file and installing the required dependencies.

### Templates

- `layouts`:
  - This will be the layout for the whole project. And it will include the whole index.html file.
- `macros`:
  - This will be the macros for the whole project. We can have conditional statements and loops in the macros.
- `partials`:
  - This will have the `blocks` of the page.

### Creating the templates:

```shell
$ gulp -f gulpfile.cjs
```

Using the above command, we can create the templates. The templates will be created in the `dist` folder.
