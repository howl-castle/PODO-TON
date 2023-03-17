# PODO - Dapp; Wallet Integration on TON Connect 2 + Smart contract

### 1. Demo on https://howl-castle.github.io/PODO-TON/

### 2. Repository structure in brief

 *Branches*
 
 0. main
    - integrated from FE-VITE
    - README.md
 
 1. BE-SC -> Backend
    - Using Blueprint SDK, Written in FunC and Typescript
    - wallet integration; on TON CONNECT 2
    - smart contracts
       
 2. FE-VITE -> Frontend
    - written in Typescript
    - Built on Vite.js based on React

### 3. Developement
```
    npm install 
```
```
    npm run build
```
```
    npm run dev 
```
-------

## Backend: Smart Contracts for PODO-TON, Contracts deployed

### 1. Layout

-   `contracts` - contains the source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - contains the wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts. Would typically use the wrappers.
-   `scripts` - contains scripts used by the project, mainly the deployment scripts.   

We ask the community to provide any comments on this layout, the wanted/required changes, or even suggestions for entirely different project structures and/or tool concepts.

### 2. Repo contents / tech stack
1. Compiling FunC - [https://github.com/ton-community/func-js](https://github.com/ton-community/func-js)
2. Testing TON smart contracts - [https://github.com/ton-community/sandbox/](https://github.com/ton-community/sandbox/)
3. Deployment of contracts is supported with [TON Connect 2](https://github.com/ton-connect/), [Tonhub wallet](https://tonhub.com/) or via a direct `ton://` deeplink

### 3. How to use
```
    yarn install // setup
```
```
    yarn test // testing
```
  
# License
MIT
