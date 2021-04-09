git checkout "gh-pages"
yarn install
yarn build
rm -r docs
mv dist docs
git add .
git commit -am "pushing build to gh pages"
git push
