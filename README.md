# options.cafe

# Local Development - test

- `npm install` will install the node stuff we need.
- `hugo serve` will run a local web server.
- `npx tailwindcss build assets/css/v2.css -o assets/css/v2-build.css` builds tailwind CSS.
- `npx tailwindcss build -i assets/css/v2.css -o assets/css/v2-build.css --watch` is useful to rebuild whenever we update the html. Typically just open in another terminal.

# Short Tags

- `{{< img src="/blog/img.jpg" width="1000" alt="options cafe is sunsetting its trading platform" >}}`

# Building Blog Posts

- Make sure you put your images in the `assets` folder not the `static` folder. This is so we can resize images.
- If you want to use an image you can use this short tag `{{< img src="/blog/img.jpg" width="1000" alt="options cafe is sunsetting its trading platform" >}}`.
- To build a blog summary we create a file in `layouts/partials/v1/blog/summaries`. We do this because our summaries have html and the `<!--more-->` does not work with short tags for some reason.
