# My Personal Website

A simple personal website built using HTML, CSS, and JavaScript.

🚀 **Current Hosting:** The website is now hosted using **GitHub Pages**, providing a simple and fully integrated deployment directly from this repository.


## 🌐 Deployment (GitHub Pages)

The site is automatically deployed via **GitHub Pages**. Any changes pushed to the `main` branch are published automatically.

### ⚙️ How it works

- The website is served directly from the repository (e.g., `main` branch or `/docs` folder)
- No external infrastructure or manual deployment steps are required
- GitHub Pages provides built-in **HTTPS**, **CDN**, and caching

---

### 🌍 Custom Domain (Route53)

A custom domain is configured using **AWS Route53**:

- **A records** point the root domain to GitHub Pages IP addresses
- **CNAME record** maps the `www` subdomain to the GitHub Pages domain (e.g., `<username>.github.io`)
- A `CNAME` file in the repository ensures GitHub Pages uses the custom domain

This setup allows the site to be accessible via: https://pidumenk.de while still being hosted on GitHub Pages.

## ⚙️ Previous Implementation (AWS S3 + CloudFront)

> ⚠️ This section is kept for reference in case of reverting back to AWS-based hosting.

Previously, the website was hosted using AWS services:
- **S3** (static hosting)
- **CloudFront** (CDN)
- **Route53** (DNS)

Deployment was automated using GitHub Actions and the AWS CLI.

### GitHub Action to Sync S3 Bucket

This action uses the AWS CLI to sync a local directory with an S3 bucket.

### Usage

**`workflow.yaml` Example**

Place this file in `.github/workflows/workflow.yaml`:

```yaml
name: Upload Website

on:
  push:
    branches:
    - master

  pull_request:
    branches:
    - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: jakejarvis/s3-sync-action@master
      with:
        args: --acl public-read --follow-symlinks --delete --exclude '.git*/*' --exclude 'README.md' --exclude 'LICENSE'
      env:
        AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: 'us-west-1'   # optional: defaults to us-east-1
        SOURCE_DIR: 'public'      # optional: defaults to entire repository
```
### 📝 Notes

- `--acl public-read` → Ensures files are publicly accessible  
- `--follow-symlinks` → Prevents issues with symbolic links  
- `--delete` → Removes outdated files from the bucket  
- `--exclude '.git/*'` → Prevents exposing repository history  

---

### ⚙️ Configuration

Sensitive credentials must be stored as **GitHub repository secrets**:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

📖 For more details, see:  
https://github.com/marketplace/actions/s3-sync

---

### 🌍 Live Version

👉 https://pidumenk.de

---

### 📄 License

MIT