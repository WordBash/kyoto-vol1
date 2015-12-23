#!/usr/bin/env bash

set -e

if [[ "false" != "$TRAVIS_PULL_REQUEST" ]]; then
	echo "Not deploying pull requests."
	exit
fi

if [[ "master" != "$TRAVIS_BRANCH" ]]; then
	echo "Not on the 'master' branch."
	exit
fi

cd release

git add -A
git commit -m 'Update from travis'
git push --quiet https://$GH_TOKEN@github.com/WordBash/kyoto-vol1.git gh-pages 2> /dev/null
