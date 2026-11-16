# web-interview

前端 / 算法面试 TypeScript 练习仓库。按专题拆分算法题与手写题（排序、链表、树、图、DP、防抖节流等），可用 `tsc` 统一编译，或用 `tsx` 直接运行某个文件。

## 环境要求

- **Node.js**：`>= 20`（推荐使用当前 LTS，如 Node 22）
- **包管理**：npm（仓库含 `package-lock.json`）
- **TypeScript**：由开发依赖安装（当前为 7.x）

## 安装

```bash
npm install
```

## 常用命令

```bash
# 类型检查（不产出文件）
npm run typecheck

# 生产构建：编译全部 .ts 到 dist/
npm run build

# 运行示例入口（冒泡排序演示，依赖先 build）
npm start

# 不经构建直接运行 sort.ts
npm run dev:sort

# 用 tsx 运行任意练习文件，例如：
npx tsx 01_array_string.ts
```

当前未配置自动化单测；`npm test` 会正常退出并提示未配置。

## 项目结构（简要）

- `01_*.ts` ~ `24_*.ts`：按专题整理的算法练习
- `sort.ts` / `study*.ts` / `web-writing.ts`：排序与前端手写题练习
- `tsconfig.json`：TypeScript 编译配置（`moduleDetection: force`，各文件为独立模块作用域）
- `.github/workflows/ci.yml`：在 Node 20 / 22 上执行 typecheck、build、smoke start

## 说明

- 本仓库不依赖外部服务或密钥；本地安装与构建即可验证。
- 练习文件彼此独立，同名工具类（如 `ListNode` / `TreeNode`）在需要处各自定义，避免全局命名冲突。
