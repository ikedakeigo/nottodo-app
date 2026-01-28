# Project: nottodo-app

## Overview

Next.js 14 App Router を使用したタスク管理アプリケーション。

## Tech Stack

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Database: Supabase (PostgreSQL)
- ORM: Prisma
- Styling: Tailwind CSS

## Critical Rules

- TypeScript strict mode
- Server Components をデフォルト使用
- 'use client' は必要な場合のみ
- TDD: テストを先に書く

## File Structure

src/
├── app/ # Next.js App Router
├── components/ # UIコンポーネント
├── hooks/ # カスタムフック
├── lib/ # ユーティリティ
└── types/ # 型定義

## Available Commands

- /tdd - テスト駆動開発
- /plan - 実装計画作成
- /code-review - コードレビュー
