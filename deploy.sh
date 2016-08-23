#!/bin/sh

git checkout --orphan gh-pages
find . -maxdepth 1 -type f -delete
mv public/* .
rmdir public
rm -rf node_modules
git add .
git commit -m 'update gh-pages'
git push origin gh-pages --force
git checkout master
git branch -D gh-pages
