# My Personal Website

A simple website was built using such technologies like HTML, CSS and JavaScript.

The website is hosted on AWS services (S3, Route53 and CloudFront). To upload any changes in automatic way, GitHub Actions are currently being used. 

# GitHub Action to Sync S3 Bucket

This simple action uses the vanilla AWS CLI to sync a directory (either from your repository or generated during your workflow) with a remote S3 bucket.

# Usage

`*workflow.yml*` *Example*

Place in a .yml file such as this one in your `.github/workflows` folder. 

*The following example includes optimal defaults for a public static website:*

* `--acl public-read` makes your files publicly readable (make sure your bucket settings are also set to public).
* `--follow-symlinks` won't hurt and fixes some weird symbolic link problems that may come up.
* Most importantly, `--delete` permanently deletes files in the S3 bucket that are not present in the latest version of your repository/build.
* *Optional tip:* If you're uploading the root of your repository, adding `--exclude '.git/*'` prevents your `.git` folder from syncing, which would expose your source code history if your project is closed-source. (To exclude more than one pattern, you must have one `--exclude` flag per exclusion. The single quotes are also important!)

```yaml
name: Upload Website

on:
  push:
    branches:
    - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: jakejarvis/s3-sync-action@master
      with:
        args: --acl public-read --follow-symlinks --delete
      env:
        AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: 'us-west-1'   # optional: defaults to us-east-1
        SOURCE_DIR: 'public'      # optional: defaults to entire repository
```
# Configuration

The following settings must be passed as environment variables as shown in the example. Sensitive information, especially `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, should be set as encrypted secrets in setting of your GitHub repository — otherwise, they'll be public to anyone browsing your repository's source code and CI logs.

For more details, please, refer to [S3-Sync](https://github.com/marketplace/actions/s3-sync).

## Preview

![](https://github.com/pidumenk/my-personal-website/blob/master/Demo.gif)

[Live Version](https://pidumenk.de)

## License

[MIT](https://choosealicense.com/licenses/mit/)
