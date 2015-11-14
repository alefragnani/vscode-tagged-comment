# Functionality

An easy way to add personalized comments to your code

Set your own template for the comment and use _variables_ for richer content. You can even _re-tag_ a comment, adding the previously used tag.

# Usage

### Availble commands

![Commands](images/tagged-comment-commands.png)

### Add your tag

![Add Tag](images/tagged-comment-add-tag.png)

### Comment added

![Comment Added](images/tagged-comment-comment-added.png)

## Available Variables

The following variables are available:

- `#enteredText` (the tag that you typed)
- `#day`
- `#month`
- `#year`

## Examples

### Default

The default template just adds the current date:

```
// #day/#month/#year - TAG: #enteredText
```

### With an issue tracker ID

```
// #day/#month/#year - ISSUE: #enteredText
```

## TODO List

- Add more variables
- Detect the current language comment pattern (issue [#57](https://github.com/Microsoft/vscode-extensionbuilders/issues/57))
- Define a default comment character for _non-language_ files
- Live preview for the tagged comment while typing
- Add tagged comment above selected lines

## Participate

If you have any idea, feel free to create issues and pull requests