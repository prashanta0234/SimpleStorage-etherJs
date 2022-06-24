const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();
async function main() {
  // write code here
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_S);
  const wallet = new ethers.Wallet(process.env.PRIVET_KEY, provider);
  const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync("SimpleStorage_sol_SimpleStorage.bin", "utf8");
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  const contract = await contractFactory.deploy();

  const fav = await contract.retrieve();
  console.log(fav.toString());
  const valueInfav = await contract.store("5");
  await valueInfav.wait(1);
  const updated = await contract.retrieve();
  console.log(updated.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
