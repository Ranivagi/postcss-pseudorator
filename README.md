# PostCSS Pseudorator

Pseudo element separator, [PostCSS] plugin.

[PostCSS]: https://github.com/postcss/postcss

If part of comma-separated list of selectors contains unknown pseudo element, browser will ignore the whole block,
including parts it could use.

For example
```css
.highlight,
.block:focus-within {
    background: yellow;
}
```
is completely ignored by IE and Edge(EdgeHTML) for
```html
<div class="highlight">Important information</div>
```
To work arount the problem, selector should be separated into two parts, so that browser can pick up one and ignore another:
```css
.highlight {
    background: yellow;
}
.block:focus-within {
    background: yellow;
}
```
and this is what Pseudorator does for you.

Please note that Pseudorator is **not a polyfill** for unknown pseudo element.

## Installation

```html
npm install postcss-pseudonator --save-dev
```

## Usage

Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

Add the plugin to your PostCSS pipeline, in relatively early stage.
Just before autoprefixer should be a nice place.

```diff
module.exports = {
  plugins: [
+   require('postcss-pseudorator')(...),
    require('autoprefixer')
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage

##Options

- `separate`: array of pseudo elements which should be separated from others.
For example: `[":focus-within", ":dir"]`.
- `debug`: boolean. Print out all separated selectors. Default false.
