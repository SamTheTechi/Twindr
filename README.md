
![Flow Chart](flowChart.png)

# 🧠 Twindr

A monorepo for super scalable dating application.
Includes multiple microservices utlising gRPC, Rest, RabbitMQ, Docker


## 📁 Monorepo Structure

```
.
├── Apps              # Frontend app
├────── Next
├── Server            # Backend microservices
├────── Auth
├────── Gateway
├────── Matching
├────── Media
├────── Messaging
├────── Notification
├────── Profile
├────── Recommendation
├── Packages          # Shared code
├────── Proto
├────── Sql
├────── Bloomfilters
├────── StatusCodes
├── package.json
└── turbo.json
```

## 🚀 Getting Started

### 1. Install dependencies

```bash
bun install
```

### 2. Start all dev servers

```bash
bun turbo run dev
```

### 3. Build everything

```bash
bun tubro run build
```

Stay isolated, stay clean ✨

