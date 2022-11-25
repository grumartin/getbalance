import React, { useState } from 'react';
import { ethers } from 'ethers';
import ContractAbi from './ContractAbi.json';

const GetBlockHeight = () => {
  let contractAddress = '0xf34b643b1b16e6fdd1b3a4e46dac238430a371dc';
  const [balance, setBalance] = useState(null);

  const getBalancefromAccount = () => {
    //connect to metamask
    if(window.ethereum){
        window.ethereum.request({method: 'eth_requestAccounts'})
        .then(result => {
            console.log("Wallet connected");
            //define provider
            let provider = new ethers.providers.Web3Provider(window.ethereum);
            //define contract
            let contract = new ethers.Contract(contractAddress, ContractAbi, provider);
            //get balance
            console.log(result[0]); //address of client
            contract.balanceOf(result[0]).then(balRes => {
                setBalance(ethers.utils.formatEther(balRes));
            });
        })
    }else{
        console.log("You need to install MetaMask");
    }
  }

  return (
      <div>
        <h2>Current Balance of DIAToken</h2>
        <button onClick={getBalancefromAccount}>Fetch Balance</button>
        <div>Current Balance: {balance}</div>
      </div>
  )
}

export default GetBlockHeight;
