# Repo for testing NPM publishing
The repo is testing how to publish to NPM a package which has been cleaned from unnecessary files and package.json fields.

Add white listed fields of `package.json`-file to `clean-package-json.js` file's `WHITE_LISTED_KEYS`-array.

Copy to-be-published files with the `publish:copyFilesToPublishDir`-script in the `package.json`-file to the temp folder. Change the script as necessary for your needs.

The repo is tested with PNPM package manager. The PNPM will use the `files`-field of `package.json` and exlude further files not matching with the patterns there.

Inspired from below NPM packages.

[clean-publish](https://www.npmjs.com/package/clean-publish)

[clean-package](https://www.npmjs.com/package/clean-package)

`clean-package-json.js` is copied from `clean-publish` [code.js](https://github.com/shashkovdanil/clean-publish/blob/master/core.js)
