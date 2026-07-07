import React from 'react'

const Services = () => {
  return (
    <section>
        <h1 className="text-4xl font-bold">What Ledger Offers</h1>
        <div>
            <h3>Secure Accounts</h3>
            <p>OTP-verified login keeps your account protected at every sign-in.</p>
        </div>
        <div>
            <h3>Transaction Ledger</h3>
            <p>A complete, searchable history of every deposit, withdrawal, and transfer - with running balances you can trust.</p>
        </div>
        <div>
            <h3>Loans Against History</h3>
            <p>Borrow against your own account history, with clear repayment deadlines and no hidden terms.</p>
        </div>
        <div>
            <h3>Real-Time Balance</h3>
            <p>Your balance is calculated live from your transaction history — always accurate, never stale.</p>
        </div>
    </section>
  )
}

export default Services
