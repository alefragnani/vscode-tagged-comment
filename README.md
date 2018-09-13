# Tagged Comment

**Tagged Comment** is an open source extension created for **Visual Studio Code**. While being free and open source, if you find it useful, please consider [supporting it](#support)

It helps you to personalized comments on your code. Set define a template for your comments. You can combine _fixed values_ and _variables_ for richer content. You can even _re-tag_ a comment, adding the previously used tag.

# Features

## Available commands

* `Tagged: Add a Tagged Comment`
* `Tagged: Add a Tagged Comment Line Above`
* `Tagged: Re-Add the Previously Tagged Comment`
* `Tagged: Re-Add the Previously Tagged Comment Line Above`

### Add your tag

![Add Tag](images/tagged-comment-add-tag.png)

### Comment added

![Comment Added](images/tagged-comment-comment-added.png)

## Available variables

The following variables are available:

- `#enteredText` (the tag that you typed)
- `#day`
- `#month`
- `#year`

### Examples

#### Default

The default template just adds the current date:

```
// #day/#month/#year - TAG: #enteredText
```

#### With an issue tracker ID

```
// #day/#month/#year - ISSUE: #enteredText
```
## Support

While **Tagged Comment** is free and open source, if you find it useful, please consider supporting it.

I've been working **Tagged Comment** since VS Code internal beta days, and while I enjoy developing it, I would like to be able to give more attention to its growth.

<table align="center" width="60%" border="0">
  <tr>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=US&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=BR&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=BRL&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/pt_BR/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="Patreon" href="https://www.patreon.com/alefragnani"><img src="https://raw.githubusercontent.com/alefragnani/oss-resources/master/images/button-become-a-patron-rounded-small.png"/></a>
    </td>
  </tr>
</table>

---

# License

[MIT](LICENSE.md) &copy; Alessandro Fragnani