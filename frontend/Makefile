.PHONY: install build watch lint analyze

export PATH := $(PATH)
export NODE_TLS_REJECT_UNAUTHORIZED := 0

default: build

_pnpm:
	@which pnpm || npm i --global pnpm

install: _pnpm
	@pnpm install

build: _pnpm
	@pnpm run build

watch: _pnpm
	pnpm run dev

lint: _pnpm
	@pnpm run lint

analyze: _pnpm
	@pnpm run analyze
