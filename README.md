# Backend Ledger

A double-entry ledger backend built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. It supports creating and tracking financial transactions between accounts with **atomic transactions**, **idempotency**, and **ledger-based balance derivation**.

> 🚧 A **React** frontend is now in progress — basic **Login/Register** pages have been scaffolded. More pages (dashboard, transactions) coming soon.

---

## Features

- **Double-entry ledger system** — every transaction generates a paired debit and credit ledger entry, ensuring balances can always be derived and reconciled.
- **Atomic transactions** — uses MongoDB sessions (`startTransaction`/`commitTransaction`/`abortTransaction`) so related writes (ledger entries + transaction status) either all succeed or all roll back together.
- **Idempotency** — each transaction requires a unique `idempotencyKey` to prevent duplicate processing on retried requests.
- **Transaction state tracking** — transactions move through well-defined statuses: `PENDING`, `COMPLETED`, `FAILED`, `REVERSED`.
- **Schema-level validation** — Mongoose schemas enforce required fields, valid enums, and non-negative transaction amounts.

---

## Tech Stack

**Backend**
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB
- **ODM:** Mongoose

**Frontend** *(in progress)*
- **Library:** React
- **Status:** Login/Register pages scaffolded

---

## Project Structure

```
Backend-ledger/
├── src/
│   ├── controllers/
│   │   └── transaction.controller.js
│   ├── models/
│   │   ├── transaction.model.js
│   │   ├── account.model.js
│   │   └── ledger.model.js
│   ├── routes/
│   └── ...
├── client/                 # React frontend (in progress)
│   └── src/
│       └── pages/
│           ├── Login.jsx
│           └── Register.jsx
├── package.json
└── README.md
```

---

## Data Models

### Transaction
| Field | Type | Notes |
|---|---|---|
| `fromAccount` | ObjectId (ref: Account) | Required |
| `toAccount` | ObjectId (ref: Account) | Required |
| `amount` | Number | Required, must be ≥ 0 |
| `status` | String (enum) | `PENDING`, `COMPLETED`, `FAILED`, `REVERSED` — defaults to `PENDING` |
| `idempotencyKey` | String | Required, unique |

### Ledger Entry
Each transaction produces two ledger entries — one `DEBIT` (from the source account) and one `CREDIT` (to the destination account) — linked back to the parent transaction.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or Atlas)

### Installation

```bash
git clone https://github.com/<your-username>/backend-ledger.git
cd backend-ledger
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Server

```bash
npm start
```

### Running the Frontend (in progress)

```bash
cd client
npm install
npm run dev
```

---

## API Overview

### Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Registers a new user |
| `POST` | `/api/auth/login` | Logs in a user |
| `POST` | `/api/auth/logout` | Logs out the current user |

### Accounts

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/accounts/` | Creates a new account |
| `GET` | `/api/accounts` | Fetches all accounts |
| `GET` | `/api/accounts/balance/:accountId` | Fetches the balance for a specific account |

### Transactions

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/transactions/system/initial-funds` | Creates an initial funds transaction between the authenticated user's system account and a target account |

> More endpoints (transfers, transaction history) to be documented as they're added.

---

## Roadmap

- [ ] Add transfer endpoint between two user accounts
- [ ] Add balance derivation endpoint (computed from ledger entries)
- [ ] Add reversal/refund flow for `COMPLETED` transactions
- [ ] Add authentication & role-based access
- [x] Scaffold frontend Login/Register pages
- [ ] Build Dashboard page (accounts + transaction history view)
- [ ] Connect frontend to backend API

---
