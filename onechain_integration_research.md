# OneChain Integration Research for DCABot

## Executive Summary
OneChain is a high-performance Layer 1 blockchain, built as a fork of **Sui**, using **Move** as its smart contract language. It features the Narwhal/Mysticeti consensus engine (DPoS + DAG) for fast finality and high throughput. 

For the DCABot project, integration will heavily leverage the **OneChain TypeScript SDK** and the **Move** programming language. The development experience mirrors building on Sui, utilizing objects, Programmable Transaction Blocks (PTBs), and similar wallet adapter patterns.

## SDK & Tools
Based on our research, the following official packages are essential:

1.  **Core Typescript SDK**: `@onelabs/sui` (fork of `@mysten/sui.js`)
    *   Used for RPC interaction, transaction building, keypair management, and BCS serialization.
    *   **Installation**: `npm install @onelabs/sui`
2.  **DApp Kit**: `@onelabs/dapp-kit` (fork of `@mysten/dapp-kit`)
    *   React hooks and providers for wallet connection, signing transactions, and account management.
    *   **Installation**: `npm install @onelabs/dapp-kit`
3.  **CLI Tool**: `one` (OneChain CLI)
    *   Required for Move contract development, compilation, testing, and deployment.
    *   **Installation**: `cargo install --locked --git https://github.com/one-chain-labs/onechain.git one --features tracing`

## Network Configuration

### RPC Endpoints
*   **Mainnet**: `https://rpc-mainnet.onelabs.cc:443`
*   **Devnet**: `https://rpc-devnet.onelabs.cc:443`

### Explorer
*   **OneChainScan**: `https://onechainscan.io` (Verify URL during development)

## Implementation Strategy

### 1. Smart Contract Development (Move)
Contracts are written in **Move**. The project structure for contracts will look like:
```
contracts/
  Move.toml      # Manifest file
  sources/       # Move source files (.move)
    dca_bot.move # Main contract logic
```
**Key Concepts to Implement:**
*   **Shared Objects**: The DCABot contract likely needs to be a shared object to allow multiple users to interact with it.
*   **Capability Pattern**: Use `AdminCap` for owner-only functions.
*   **Coin Management**: Use `sui::coin` (or `one::coin`) for handling deposits and swaps.

### 2. Frontend Integration (React/Next.js)
We will wrap the application with the OneChain providers:

```tsx
// Example Provider Setup
import { OneClientProvider, WalletProvider } from '@onelabs/dapp-kit';
import { getFullnodeUrl } from '@onelabs/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const networks = {
  devnet: { url: getFullnodeUrl('devnet') }, // Or custom OneChain URL
  mainnet: { url: getFullnodeUrl('mainnet') },
};

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <OneClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider>
          <Component {...pageProps} />
        </WalletProvider>
      </OneClientProvider>
    </QueryClientProvider>
  );
}
```

### 3. Transaction Execution (PTBs)
Interactions with the smart contract (e.g., "Create DCA Schedule") will use **Programmable Transaction Blocks (PTBs)**.

```typescript
import { TransactionBlock } from '@onelabs/sui/transactions';

const tx = new TransactionBlock();
tx.moveCall({
  target: `${PACKAGE_ID}::dca_bot::create_schedule`,
  arguments: [
    tx.pure(frequency),
    tx.pure(amount),
    tx.object(coinObjectId), // The coin to be swapped
  ],
});

signAndExecuteTransactionBlock({ transactionBlock: tx });
```

## Next Steps
1.  **Environment Setup**: Install the OneChain CLI (`one`) and verify installation.
2.  **Project Initialization**: Initialize the frontend with `@onelabs/dapp-kit` pre-configured.
3.  **Prototype Contract**: Create a simple Move contract (e.g., a "Hello World" or basic "Deposit" contract) to validate the deployment pipeline to OneChain Devnet.
4.  **Backend Integration**: Set up Convex Actions to query OneChain state via the SDK (for monitoring DCA executions).
