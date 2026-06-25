# Exchange POS

A simple browser-based exchange POS app for BRL and GYD.

## Features
- Exchange calculation for two directions
- Editable rates
- Receipt printing and history
- Drafts and basic reports
- Local storage in the browser

## Run locally
Open the app directly in a browser from the project folder, or serve it with a simple local server:

```bash
python3 -m http.server 8000
```

Then visit http://127.0.0.1:8000/index.html

## Free deployment
This project is a static site, so it can be deployed for free with GitHub Pages.

1. Push this repository to GitHub.
2. Open the repository settings and enable GitHub Pages.
3. Select the GitHub Actions deployment source.
4. The workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) will publish the site automatically.
