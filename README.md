<p align="center">
  <img alt="Comment Divider" src="https://github.com/stackbreak/comment-divider/raw/master/img/logo_256.png" width="20%"  />
</p>

<h1 align="center">
  Comment Divider
</h1>

This is **[Visual Studio Code](https://github.com/Microsoft/vscode)** extension, which provides commands for generating comment-wrapped separators from line content.

**[Supports all common languages](#language-support).**

## Install

https://marketplace.visualstudio.com/items?itemName=stackbreak.comment-divider

## Demo

![Subheader Demo](img/sub-header.gif)

## Commands

### Make main header

- Default Shortcut:

  **`Shift`** + **`Alt`** + **`X`**

- Default Style:

  ```
  /* -------------------------------------------------------------------------- */
  /*                                Example text                                */
  /* -------------------------------------------------------------------------- */
  ```

### Make subheader

- Default Shortcut:

  **`Alt`** + **`X`**

- Default Style:

  ```
  /* ------------------------------ Example text ------------------------------ */
  ```

### Insert solid line

- Default Shortcut:

  **`Alt`** + **`Y`**

* Default Style:

  ```
  /* -------------------------------------------------------------------------- */
  ```

## Language Support

Extension uses relevant comment characters for all common languages.

For example, in python files subheader looks like

```python
# ------------------------------ python example ------------------------------ #
```

or in html files

```html
<!-- ---------------------------- html example ----------------------------- -->
```

**Also, you can easily [add support](#languages-configuration) for any missing language or override the default preset.**

## Default Configuration

### Common

```json
  // Set line length for all dividers.
  "comment-divider.length": 80,
```

### Main Header

```json
  // "Set symbol for main header line filling (only one).
  "comment-divider.mainHeaderFiller": "-",

  // Set main header vertical style.
  "comment-divider.mainHeaderHeight": "block",

  // Set main header text align.
  "comment-divider.mainHeaderAlign": "center",

  // Set main header text transform style.
  "comment-divider.mainHeaderTransform": "none",
```

### Subheader

```json
  // "Set symbol for subheader line filling (only one).
  "comment-divider.subheaderFiller": "-",

  // Set subheader vertical style.
  "comment-divider.subheaderHeight": "line",

  // Set subheader text align.
  "comment-divider.subheaderAlign": "center",

  // Set subheader text transform style.
  "comment-divider.subheaderTransform": "none",
```

### Solid Line

```json
  // Set symbol for solid line filling.
  "comment-divider.lineFiller": "-",
```

## Languages Configuration

If some language is not supported out of the box, or you want to change default comment characters for an already supported language, it is possible to do it in the settings.

```json
"comment-divider.languagesMap": {
      "toml": ["#", "#"],
      "scss": ["//"]
}
```

The item name is the language mode name and is associated with an array of 1 or 2 elements. The first element is the start of the line. The second, if defined, is the end.

The example above defines the right characters for `toml` and overrides `scss` defaults. As a result, the subheaders for these languages look like this:

```toml
# ------------------------------ toml subheader ------------------------------ #
```

```scss
// ----------------------------- scss subheader --------------------------------
```

## Issues

Request features and report bugs using [GitHub](https://github.com/stackbreak/comment-divider/issues).
