#!/bin/bash

BASEDIR=$(dirname "$0")
cd "$BASEDIR/../.git/hooks"
ln -s ../../hooks/pre-commit pre-commit
