#!/usr/bin/env node

//@ts-check

const { promises, existsSync } = require("fs");
const { join } = require("path");

const WHITE_LISTED_KEYS = [
  // NPM
  "name",
  "version",
  "main",
  "types",
  "type",
  "publishConfig",
  "files",
  "author",
  "description",
  "keywords",
  "license",
  "bugs",
  "homepage",
  "private",
  "engines",
  "repository",
  "browser",
  "funding",
  "contributors",
  "email",
  "os",
  "cpu",

  // VSCode extension
  "icon",
  "displayName",
  "publisher",
  "preview",
  "categories",
  "galleryBanner",
  "activationEvents",
  "capabilities",
  "contributes"
]
const PACKAGE_JSON_NAME = "package.json"
/**
 * @param { string } file
 * @returns { Promise<{[key: string]: any}> }
 */
async function readJSON(file) {
  let data = await promises.readFile(file);
  return JSON.parse(data.toString());
}

/**
 * @param { string } file
 * @param { { [key: string]: any } } json
 * @returns { Promise<void> }
 */
async function writeJSON(file, json) {
  await promises.writeFile(file, JSON.stringify(json, null, '  ') + '\n');
}

/**
 * @param { {[key: string]: any} } packageJson
 * @param { string[] } allowedKeys
 * @returns { {[key: string]: any} }
 */
function clearPackageJSON(packageJson, allowedKeys) {
  for (const keyInPackageJson of Object.keys(packageJson)) {
    if (!allowedKeys.includes(keyInPackageJson)) {
      delete packageJson[keyInPackageJson];
    }
  }
  return packageJson;
}

/**
 * @returns { Promise<void> }
 */
async function run() {
  const packageJsonPath = process.argv[2]
  if (typeof packageJsonPath !== "string") {
    throw new Error('Valid path to package.json file not provided in arguments')
  }

  const pathToPackageJson = join(packageJsonPath, PACKAGE_JSON_NAME)
  if (!existsSync(pathToPackageJson)) {
    throw new Error(`Given path is not find valid path to package.json file. Got: "${pathToPackageJson}"`)
  }

  const packageJson = await readJSON(pathToPackageJson);
  const cleanPackageJSON = clearPackageJSON(packageJson, WHITE_LISTED_KEYS);
  await writeJSON(pathToPackageJson, cleanPackageJSON);
}

run().catch(error => {
  process.stderr.write(error.stack + '\n');
  process.exit(1);
})
