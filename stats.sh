#!/bin/bash

set -e # Exit on error

pushd "$(dirname "$0")" > /dev/null

(
printf '{\n'
printf '  "numcommits": %d,\n'  "$(git rev-list --count --all)"
printf '  "numbranches": %d,\n' "$(git branch -a | grep origin | wc -l)"
printf '  "numtags": %d,\n'     "$(git tag | wc -l)"
printf '  "storage": %d,\n'    "$(du -ca .git | tail -n 1 | cut -f 1)"
printf '  "firstcommit": "%s",\n'    "$(git log --all --full-history --date-order --format="%aI" | tail -n 1)"
printf '  "lastcommit": "%s",\n'    "$(git log --reverse --format="%aI" | sort | tail -n 1)"
printf '  "numlines": %d,\n'    "$(git ls-files | grep -E '\.(css|html|py|sh)$' | xargs wc -l | tail -n 1 | tr -d " total" )"
printf '  "numfiles": %d\n'    "$( git ls-files | wc -l)"
printf '}\n'
) | jq '.' > data/stats.json

popd > /dev/null
