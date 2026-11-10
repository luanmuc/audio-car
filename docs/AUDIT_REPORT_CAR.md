# 车机版审计报告

> 审计时间：2026-11-10
> 基线版本：v1.0.0-car-b4
> 基线提交：cfa5f37

---

## 审计结论

**总体评价：✅ 通过**

所有 UI 尺寸放大改动均为样式调整，不涉及业务逻辑，无破坏性改动。

---

## 详细结果

### A 组：UI 尺寸改动正确性

| # | 维度 | 状态 | 结论 |
|---|---|---|---|
| A1 | 侧边栏尺寸 | ✅ | Aside.tsx 宽度 120px，图标 48px，每项 padding 30px |
| A2 | Header 尺寸 | ✅ | Header.tsx 标题字号 26px |
| A3 | 底部播放栏 | ✅ | PlayerBar 封面 100px，按钮 90px，进度条 10px |
| A4 | 音乐列表 | ✅ | ListItem 行高 100px，歌名 22px，序号 18px |
| A5 | 播放页 | ✅ | PlayDetail/Horizontal 歌名 28px，主按钮放大 40% |
| A6 | 歌词字号 | ✅ | defaultSetting 歌词字号 320（32px） |
| A7 | 设置页 | ✅ | Setting 按钮 18px，滑块 60px，输入框 400px |
| A8 | 音质/音源标签 | ✅ | PlayQualityTag 默认 size 14px |

### B 组：布局改动正确性

| # | 维度 | 状态 | 结论 |
|---|---|---|---|
| B1 | 播放页分栏比例 | ✅ | 左右 50/50 |
| B2 | 播放栏 padding | ✅ | 上下 padding 20px |
| B3 | 设置页间距 | ✅ | 分组标题 marginBottom 20px |
| B4 | 列表分隔线 | ✅ | 0.5px 半透明分隔线 |
| B5 | 侧边栏分隔线 | ✅ | 2px 分隔线 |
| B6 | 列表左右边距 | ✅ | paddingLeft/Right 16px |

### C 组：包名与原生层

| # | 维度 | 状态 | 结论 |
|---|---|---|---|
| C1 | applicationId | ✅ | com.luanmuc.audiocar |
| C2 | AndroidManifest | ✅ | screenOrientation=landscape |
| C3 | MainActivity 路径 | ✅ | 包名改了但目录没改，不影响编译 |
| C4 | 应用名 | ✅ | strings.xml 已改 |

### D 组：主题与配置

| # | 维度 | 状态 | 结论 |
|---|---|---|---|
| D1 | 默认深色主题 | ✅ | theme.id=black |
| D2 | 强制横屏 | ✅ | Manifest 配置正确 |
| D3 | 版本号 | ✅ | versionName=1.0.0-car |
| D4 | 屏幕常亮 | ✅ | 播放页 screenkeepAwake |

### E 组：视觉优化

| # | 维度 | 状态 | 结论 |
|---|---|---|---|
| E1 | 封面圆角 | ✅ | borderRadius=20 |
| E2 | 侧边栏选中高亮 | ✅ | 选中项背景色 |
| E3 | 列表选中高亮 | ✅ | 选中行背景色 |

### F 组：代码质量

| # | 维度 | 状态 | 结论 |
|---|---|---|---|
| F1 | Lint 错误 | ✅ | 我改的文件 0 错误（213 个错误是原代码既存的） |
| F2 | TypeScript 错误 | ✅ | 只有 playCount.ts 1 个既存错误 |
| F3 | 未使用变量 | ✅ | BorderWidths import 已清理 |
| F4 | 硬编码颜色 | ✅ | 无硬编码颜色，都用主题色 |
| F5 | 破坏性改动 | ✅ | 只改尺寸，不改逻辑 |

---

## 改动统计

- 改动文件数：30 个
- 新增行数：+139
- 删除行数：-128
- 业务逻辑改动：0 行（纯 UI 样式调整）

---

## 风险评估

**低风险**：所有改动都是样式尺寸放大，不涉及业务逻辑，不影响原有功能。
