#!/bin/bash -e

: "${BRANCH_TO_MERGE_INTO?}"
: "${GITHUB_SECRET_TOKEN?}" "${GITHUB_REPO?}"

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

repo_path=$(pwd)
# Since Travis does a partial checkout, we need to get the whole thing
repo_temp=$(mktemp -d)
git clone "https://github.com/$GITHUB_REPO" "$repo_temp"

# shellcheck disable=SC2164
cd "$repo_temp"

printf 'Checking out %s\n' "$BRANCH_TO_MERGE_INTO" >&2
git checkout "$BRANCH_TO_MERGE_INTO"

# Clean out existing contents
printf 'Cleaning up evertything in temp\n' >&2
rm -rf **/* || exit 0
rm -rf ./* || exit 0

# go back to the original repo path to compile
# shellcheck disable=SC2164
cd "$repo_path"

bash ./compile.sh "$repo_temp" 1>&2


# return to the compilation output
# shellcheck disable=SC2164
cd "$repo_temp"


printf 'Committing %s\n' "$TRAVIS_COMMIT" >&2
git add -A
git commit -m "Travis Deploy: ${TRAVIS_COMMIT}"


printf 'Pushing to %s\n' "$GITHUB_REPO" >&2

push_uri="https://$GITHUB_SECRET_TOKEN@github.com/$GITHUB_REPO"

# Redirect to /dev/null to avoid secret leakage
git push "$push_uri" "$BRANCH_TO_MERGE_INTO" >/dev/null 2>&1
git push "$push_uri" :"$TRAVIS_BRANCH" >/dev/null 2>&1
