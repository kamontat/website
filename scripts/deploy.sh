#!/usr/bin/env sh

set -e

cd "$(dirname "$0")/.."

vercel deploy \
	--yes \
	--prebuilt \
	--env "KEYSTATIC_SECRET=$KEYSTATIC_SECRET" \
	--env "KEYSTATIC_GITHUB_CLIENT_ID=$KEYSTATIC_GITHUB_CLIENT_ID" \
	--env "KEYSTATIC_GITHUB_CLIENT_SECRET=$KEYSTATIC_GITHUB_CLIENT_SECRET" \
	"$@"
