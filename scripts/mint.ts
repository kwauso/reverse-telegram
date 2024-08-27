import {address} from "hardhat/internal/core/config/config-validation";

const hre = require("hardhat");

(async ()=> {
    try {
        const PaperCoin = await hre.ethers.getContractFactory("PaperCoin")
        const PAC = await PaperCoin.deploy()
        await PAC.waitForDeployment();
        const address = await PAC.getAddress()
        console.log(`Token address: ${address}`)
    } catch (err) {
        console.error(err)
    }
})();