#!/bin/bash

echo "Setting up Turborepo config..."

project_name=$(basename "$PWD")

cat <<TURBOJSON > turbo.json
{
  "$schema": "https://turborepo.org/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": [
        "^build"
      ],
      "inputs": [
        ".env*"
      ],
      "outputs": [
        "dist/**",
        ".next/**",
        "!.next/cache/**"
      ]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": [
        "^lint"
      ]
    }
  }
}
TURBOJSON

cat <<ROOTPACKAGEJSON > package.json
{
  "name": "$project_name",
  "private": true,
  "type": "module",
  "packageManager": "bun@1.2.8",
  "workspaces": [
    "apps/*",
    "server/*",
    "packages/*"
  ],
  "engines": {
    "node": ">=18"
  },
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "check-types": "turbo run check-types"
  },
  "devDependencies": {
    "@types/bun": "latest",
    "turbo": "^2.5.0",
    "prettier": "^3.5.3",
    "typescript": "5.8.2"
  },
  "dependencies": {
    "hono": "^4.7.5"
  }
}
ROOTPACKAGEJSON

echo "Created root package.json with workspaces"

if [ ! -f bun.lockb ]; then
  echo "📦 Initializing bun dependencies..."
  bun install
fi

echo "🚀 Turborepo is set up and ready to fly!"
