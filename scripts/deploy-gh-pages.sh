set -e # stop at first failing command
git init
git config --global user.email $(gh_email) > /dev/null 2>&1
git config --global user.name $(gh_user) > /dev/null 2>&1
git add .
git checkout deploy-sh-pages.sh
git commit -m "[Azure Pipeline] Deploy to ghpages branch from Deploy stage"
git remote add origin git@github.com:$(gh_user)/$(gh_repo).git
echo "[Azure Pipeline] Remote origin added"
git push --force origin master:gh-pages