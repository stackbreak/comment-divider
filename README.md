<p align="center">
  <img alt="Comment Divider" src="https://github.com/stackbreak/comment-divider/raw/master/img/logo_256.png" width="20%"  />
</p>

<h1 align="center">
  Comment Divider
</h1>

This is **[Visual Studio Code](https://github.com/Microsoft/vscode)** extension, which provides commands for generating comment-wrapped separators from line content.

## Commands

### Make main header

- Default Shortcut:

  **`Shift`** + **`Alt`** + **`X`**

- Default Style:

  ```
  /* ========================================================================== */
  /*                                EXAMPLE TEXT                                */
  /* ========================================================================== */
  ```

- Demo:

  ![Main header Demo](img/main-header.gif)

### Make subheader

- Default Shortcut:

  **`Alt`** + **`X`**

- Default Style:

  ```
  /* ------------------------------ Example text ------------------------------ */
  ```

- Demo:

  ![Subheader Demo](img/sub-header.gif)

### Insert solid line

- Default Shortcut:

  **`Alt`** + **`Y`**

* Default Style:

  ```
  /* -------------------------------------------------------------------------- */
  ```

* Demo:

  ![Solid line Demo](img/solid-line.gif)

## Configuration

```json
  // Set line length for all dividers.
  "comment-divider.length": 80,

  // Set symbol for solid line filling.
  "comment-divider.line-filler": "-",

  // Set symbol for main header line filling.
  "comment-divider.mainheader-filler": "=",

  // Set symbol for subheader line filling.
  "comment-divider.subheader-filler": "-"
```

## Issues

Request features and report bugs using [GitHub](https://github.com/stackbreak/comment-divider/issues).
