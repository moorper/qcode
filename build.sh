#!/bin/bash
rm -rf /Users/where/tmp/qcode
rm -rf /Users/where/tmp/qcode.zip

mkdir /Users/where/tmp/qcode
rsync -rz ./css /Users/where/tmp/qcode
rsync -rz ./img /Users/where/tmp/qcode
rsync -rz ./js /Users/where/tmp/qcode
rsync ./manifest.json /Users/where/tmp/qcode
rsync ./option.html /Users/where/tmp/qcode
rsync ./popup.html /Users/where/tmp/qcode
cd /Users/where/tmp
zip -rq qcode.zip qcode
rm -rf /Users/where/tmp/qcode