.PHONY: install build watch lint

export PATH := $(PATH)

default: build

_pnpm:
	@which pnpm || npm i --global pnpm

install: _pnpm
	@pnpm install

build: _pnpm
	@pnpm run build

watch: _pnpm
	@NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm run dev

lint: _pnpm
	@pnpm run lint
