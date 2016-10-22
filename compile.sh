#!/bin/bash -e

source_path=$(pwd)
out_path=$1

echo "building from '$source_path' to '$out_path'"

npm run bundle

mkdir -p build
cp -R build $out_path/

cp CNAME $out_path/
cp *.html $out_path/
cp -R images $out_path/

echo "building complete!"

