#!/bin/bash

echo "Setting up microservices..."

Folder="$1"
if [ "$Folder" != "server" ]; then
echo "This script only for setting up Js Bun servers" 
exit 1
fi

for i in "${Folder}"/*; do
  [ -d "$i" ] || continue

  name=$(basename "$i")
  echo "Configuring '${name}'..."

  bun init "$i" -y

  rm -f "$i"/bun.lock "$i"/package.json "$i"/README.md
  rm -r "$i"/node_modules
  touch "$i"/package.json

  cat <<PACKAGEJSON > "$i"/package.json
{
  "name": "$name",
  "version": "0.1.0",
  "scripts": {
    "dev": "bun run index.ts",
    "build": "bun build index.ts --outdir dist"
  }
}
PACKAGEJSON
  sleep .2
done

echo "Done your good to go!"




