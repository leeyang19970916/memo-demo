set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/leeyang19970916/memo.git master:gh-pages

cd -