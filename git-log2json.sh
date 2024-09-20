#!/usr/bin/env bash

# Use this one-liner to produce a JSON literal from the Git log:

git log \
    --pretty=format:'{%n  "date": "%as",%n  "message": "%B"%n},' \
    --grep='DEVLOG'
    $@ | \
    perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
    perl -pe 's/},]/}]/'
