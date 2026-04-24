---
description: Search Unsplash for free blog post header images, download to /public/assets/images, and copy attribution text to clipboard
---

Help the user find, download, and attribute a free header image for their blog post from Unsplash.

**Keywords**: $ARGUMENTS

## Steps

### 1. Get keywords
If $ARGUMENTS is empty, ask the user: "What keywords should I search for on Unsplash?"

### 2. Search Unsplash
Use WebSearch with the query: `site:unsplash.com/photos $ARGUMENTS`

Collect **3–4 distinct Unsplash photo results**. For each, extract:
- The **photo slug** — the identifier after `/photos/` in the URL (e.g. `ajqDp29Pz7M`)
- The **photographer's name** (usually in the search result snippet or page title)

If results are sparse, also try fetching `https://unsplash.com/s/photos/<keywords>` with WebFetch and look for photo URLs and author names in the HTML.

### 3. Present options
Show a numbered list:
```
1. Photo by Jane Doe     → https://unsplash.com/photos/<slug>
2. Photo by John Smith   → https://unsplash.com/photos/<slug>
3. ...
```

### 4. Let the user choose
Ask: "Which photo would you like to use? (enter the number)"

### 5. Get a filename
Ask: "What short kebab-case filename should I save this as? (e.g. `mountain-sunset`, no extension needed)"

### 6. Fetch the real image URL
Use WebFetch to load `https://unsplash.com/photos/<chosen-slug>`.

Look in the HTML for the `<meta property="og:image" content="...">` tag — its `content` value is the CDN image URL (hosted at `images.unsplash.com`).

Strip any existing `w=` or `q=` query parameters and append `&w=1920&q=85` to get a full-width, high-quality version.

### 7. Download the image
Run a Bash command to download the image into the project's images folder:

```bash
mkdir -p public/assets/images
curl -sL "<cdn-url-with-quality-params>" -o "public/assets/images/<kebab-name>.jpg"
```

Verify the file was written and report its size.

### 8. Copy image tag + attribution to clipboard
Build the full clipboard content using this exact format (two blocks separated by a blank line):

```
![?](/assets/images/<kebab-name>.jpg)

_Thanks to <author-name> for making this [photo](https://unsplash.com/photos/<photo-slug>?utm_source=twitter&utm_medium=referral&utm_content=photos-page-share) available freely on [unsplash](www.unsplash.com) 🎁_
```

Copy it to the clipboard (preserve the blank line between the two lines):
```bash
printf '%s' $'![?](/assets/images/<kebab-name>.jpg)\n\n_Thanks to <author-name> for making this [photo](https://unsplash.com/photos/<photo-slug>?utm_source=twitter&utm_medium=referral&utm_content=photos-page-share) available freely on [unsplash](www.unsplash.com) 🎁_' | pbcopy
```

### 9. Update blog post frontmatter
If the user has a blog post file open in the IDE (visible from the `ide_opened_file` context), update its `image:` frontmatter field to `/assets/images/<kebab-name>.jpg` using the Edit tool.

Only do this if the open file is a blog post (e.g. in `_posts/`) and has an `image:` key in its frontmatter. If there is no open file or no `image:` key, skip this step silently.

### 10. Confirm
Report:
- The saved file path: `public/assets/images/<kebab-name>.jpg`
- That the attribution text is in the clipboard, ready to paste
- If the frontmatter was updated, mention which file was updated
