yarn install
yarn build
mv dist ../TMP_DIST
git checkout "gh-pages"
sudo rm -r *
mv ../TMP_DIST/ .
mv TMP_DIST/* .
rm -r TMP_DIST
git add .
git commit -am "pushing build to gh pages"
git push
git checkout -
