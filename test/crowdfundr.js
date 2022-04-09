const { expect } = require("chai");
const { network } = require("hardhat");

const SECONDS_IN_DAY = 60 * 60 * 24;
const ONE_ETHER = ethers.utils.parseEther("1");

// Bump the timestamp by a specific amount of seconds
const timeTravel = async (seconds) => {
  await network.provider.send("evm_increaseTime", [seconds]);
  await network.provider.send("evm_mine");
};


// Or, set the time to be a specific amount (in seconds past epoch time)
const setBlockTimeTo = async (seconds) => {
  await network.provider.send("evm_setNextBlockTimestamp", [seconds])
  await network.provider.send("evm_mine")
}

// NOTE: These tests are here to get you started, you'll need to think through
// any additional tests you'll need in order to verify your contracts work
// as expected
describe("Crowdfundr", () => {

  let deployer;
  let alice;
  let bob;

  describe("Factory", () => {
    let factoryContract;

    beforeEach(async () => {
      [deployer, alice, bob] = await ethers.getSigners();

      // Note from instructors: you will need to change the name from "Factory" to
      // the name you used for your Crowdfundr factory contract. You may also need to
      // pass arguments to the `deploy` function if your factory contract uses a constructor
      const factoryContractFactory = await ethers.getContractFactory(
        "Factory"
      );
      factoryContract = await factoryContractFactory.deploy();
      await factoryContract.deployed();
    })

    describe("Project Creation", () => {
      it("should create a single project", async () => {

      })

      it("should create a multiple concurrent projects", async () => {

      })

      it("should emit correct events on project creation", async () => {

      })
    })
  })

  describe("Project", () => {
    let projectContract;

    beforeEach(async () => {
      [deployer, alice, bob] = await ethers.getSigners();

      // Note from instructors: you will need to change the name from "Project" to
      // the name you used for the contract you use to hold project data. You may
      // also need to change the `deploy` function to take arguments if your Project
      // constructor accepts arguments
      const projectContractFactory = await ethers.getContractFactory(
        "Project"
      );
      projectContract = await projectContractFactory.deploy();
      await projectContract.deployed();
    })

    describe("Contributions", () => {
      it("should fail if contribution is less than required amount", async () => {

      })

      it("should emit correct events when contributing", async () => {

      })

      it("should award NFT when single contribution equal to or greater than 1 ETH", async () => {

      })

      it("should award NFT when multiple contributions sum to equal to or greater than 1 ETH", async () => {

      })

      it("should not award NFT when contribution less than 1 ETH", async () => {

      })

      it("should not award NFT after a previous NFT has been transfered from the caller's address", async () => {

      })

      it("should award different NFT's for different projects", async () => {

      })

      it("should prevent contributions when project is already fully funded", async () => {

      })

      it("should allow final contribution to go over the project limit (and only the last one)", async () => {

      })

      it("should prevent contributions when project is not fully funded and past 30 days", async () => {

      })
    })

    describe("Creator Withdrawals", () => {

      it("should not allow creator to withdraw if project is has not failed", async () => {

      })

      it("should allow creator to withdraw if project has failed", async () => {

      })

      it("should only allow project creator to withdraw", async () => {

      })

      it("should not be susceptible to reentrancy", async () => {

      })

      it("should emit correct event", async () => {

      })
    })

    describe("Cancellations", () => {

      it("should only allow creator to cancel", async () => {

      })

      it("should emit correct event", async () => {

      })

    })

    describe("Contributor Refunds", () => {

      it("should throw if contributor tries to withdraw while project has not failed", async () => {

      })

      it("should allow contributor to be refunded when project is failed", async () => {

      })

      it("should not be susceptible to reentrancy", async () => {

      })

      it("should not allow a contributor to withdraw more than they contributed", async () => {

      })

      it("should emit the correct event", async () => {

      })
    })
  })
})
