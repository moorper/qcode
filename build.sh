#!/bin/bash
rm -rf ~/tmp/qcode
rm -rf ~/tmp/qcode.zip

mkdir -p ~/tmp/qcode
rsync -rz ./css ~/tmp/qcode
rsync -rz ./img ~/tmp/qcode
rsync -rz ./js ~/tmp/qcode
rsync ./manifest.json ~/tmp/qcode
rsync ./option.html ~/tmp/qcode
rsync ./popup.html ~/tmp/qcode
cd ~/tmp
zip -rq qcode.zip qcode
rm -rf ~/tmp/qcode