// ----------------------------------------------------------------------------
// REQUIRED: Instructions
// ----------------------------------------------------------------------------
/*
  For this first project, we've provided a significant amount of scaffolding
  in your test suite. We've done this to:

    1. Set expectations, by example, of where the bar for testing is.
    2. Encourage more students to embrace an Advanced Typescript Hardhat setup.
    3. Reduce the amount of time consumed this week by "getting started friction".

  Please note that:

    - We will not be so generous on future projects!
    - The tests provided are about ~90% complete.
    - IMPORTANT:
      - We've intentionally left out some tests that would reveal potential
        vulnerabilities you'll need to identify, solve for, AND TEST FOR!

      - Failing to address these vulnerabilities will leave your contracts
        exposed to hacks, and will certainly result in extra points being
        added to your micro-audit report! (Extra points are _bad_.)

  Your job (in this file):

    - DO NOT delete or change the test names for the tests provided
    - DO complete the testing logic inside each tests' callback function
    - DO add additional tests to test how you're securing your smart contracts
         against potential vulnerabilties you identify as you work through the
         project.

    - You will also find several places where "FILL_ME_IN" has been left for
      you. In those places, delete the "FILL_ME_IN" text, and replace with
      whatever is appropriate.
*/
// ----------------------------------------------------------------------------

import { expect } from "chai";
import { ethers, network } from "hardhat";
import { BigNumber } from "ethers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { Project, ProjectFactory, ProjectFactory__factory } from "../typechain";

// ----------------------------------------------------------------------------
// OPTIONAL: Constants and Helper Functions
// ----------------------------------------------------------------------------
// We've put these here for your convenience. Feel free to use them if they
// are helpful!
const SECONDS_IN_DAY: number = 60 * 60 * 24;
const ONE_ETHER: BigNumber = ethers.utils.parseEther("1");

// Bump the timestamp by a specific amount of seconds
const timeTravel = async (seconds: number) => {
  await network.provider.send("evm_increaseTime", [seconds]);
  await network.provider.send("evm_mine");
};

// Or, set the time to be a specific amount (in seconds past epoch time)
const setBlockTimeTo = async (seconds: number) => {
  await network.provider.send("evm_setNextBlockTimestamp", [seconds]);
  await network.provider.send("evm_mine");
};
// ----------------------------------------------------------------------------

describe("Crowdfundr", () => {
  let deployer: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  let ProjectFactory: ProjectFactory__factory;
  let projectFactory: ProjectFactory;

  beforeEach(async () => {
    [deployer, alice, bob] = await ethers.getSigners();

    // NOTE: You may need to pass arguments to the `deploy` function if your
    //       ProjectFactory contract's constructor has input parameters
    ProjectFactory = await ethers.getContractFactory("ProjectFactory");
    projectFactory =
      (await ProjectFactory.deploy(/* FILL_ME_IN: */)) as ProjectFactory;
    await projectFactory.deployed();
  });

  describe("ProjectFactory: Additional Tests", () => {
    /* 
      TODO: You may add additional tests here if you need to

      NOTE: If you wind up writing Solidity code to protect against a
            vulnerability that is not tested for below, you should add
            at least one test here.

      DO NOT: Delete or change the test names for the tests provided below
    */
  });

  describe("ProjectFactory", () => {
    it("Deploys a contract", () => {
      expect(projectFactory.address).to.be.ok;
    });

    it("Can register a single project", async () => {
      expect(true).to.be.false;
    });

    it("Can register multiple projects", async () => {
      expect(true).to.be.false;
    });

    it("Registers projects with the correct owner", async () => {
      expect(true).to.be.false;
    });

    it("Registers projects with a preset funding goal (in units of ether)", async () => {
      expect(true).to.be.false;
    });

    it('Emits a "FILL_ME_IN" event after registering a project', async () => {
      expect(true).to.be.false;
    });

    it("Allows multiple contracts to accept ETH simultaneously", async () => {
      expect(true).to.be.false;
    });
  });

  describe("Project: Additional Tests", () => {
    /* 
      TODO: You may add additional tests here if you need to

      NOTE: If you wind up protecting against a vulnerability that is not
            tested for below, you should add at least one test here.

      DO NOT: Delete or change the test names for the tests provided below
    */
  });

  describe("Project", () => {
    let projectAddress: string;
    let project: Project;

    beforeEach(async () => {
      // TODO: Your ProjectFactory contract will need a `create` method, to
      //       create new Projects
      const txReceiptUnresolved = await projectFactory.create(/* FILL_ME_IN */);
      const txReceipt = await txReceiptUnresolved.wait();

      projectAddress = txReceipt.events![0].args![0];
      project = await ethers.getContractAt("Project", projectAddress);
    });

    describe("Contributions", () => {
      describe("Contributors", () => {
        it("Allows the creator to contribute", async () => {
          expect(true).to.be.false;
        });

        it("Allows any EOA to contribute", async () => {
          expect(true).to.be.false;
        });

        it("Allows an EOA to make many separate contributions", async () => {
          expect(true).to.be.false;
        });

        it('Emits a "FILL_ME_IN" event after a contribution is made', async () => {
          expect(true).to.be.false;
        });
      });

      describe("Minimum ETH Per Contribution", () => {
        it("Reverts contributions below 0.01 ETH", async () => {
          expect(true).to.be.false;
        });

        it("Accepts contributions of exactly 0.01 ETH", async () => {
          expect(true).to.be.false;
        });
      });

      describe("Final Contributions", () => {
        it("Allows the final contribution to exceed the project funding goal", async () => {
          // Note: After this contribution, the project is fully funded and should not
          //       accept any additional contributions. (See next test.)
        });

        it("Prevents additional contributions after a project is fully funded", async () => {
          expect(true).to.be.false;
        });

        it("Prevents additional contributions after 30 days have passed since Project instance deployment", async () => {
          expect(true).to.be.false;
        });
      });
    });

    describe("Withdrawals", () => {
      describe("Project Status: Active", () => {
        it("Prevents the creator from withdrawing any funds", async () => {
          expect(true).to.be.false;
        });

        it("Prevents contributors from withdrawing any funds", async () => {
          expect(true).to.be.false;
        });

        it("Prevents non-contributors from withdrawing any funds", async () => {
          expect(true).to.be.false;
        });
      });

      describe("Project Status: Success", () => {
        it("Allows the creator to withdraw some of the contribution balance", async () => {
          expect(true).to.be.false;
        });

        it("Allows the creator to withdraw the entire contribution balance", async () => {
          expect(true).to.be.false;
        });

        it("Allows the creator to make multiple withdrawals", async () => {
          expect(true).to.be.false;
        });

        it("Prevents the creator from withdrawing more than the contribution balance", async () => {
          expect(true).to.be.false;
        });

        it('Emits a "FILL_ME_IN" event after a withdrawal is made by the creator', async () => {
          expect(true).to.be.false;
        });

        it("Prevents contributors from withdrawing any funds", async () => {
          expect(true).to.be.false;
        });

        it("Prevents non-contributors from withdrawing any funds", async () => {
          expect(true).to.be.false;
        });
      });

      describe("Project Status: Failure", () => {
        it("Prevents the creator from withdrawing any funds", async () => {
          expect(true).to.be.false;
        });

        it("Prevents contributors from withdrawing any funds", async () => {
          expect(true).to.be.false;
        });

        it("Prevents non-contributors from withdrawing any funds", async () => {
          expect(true).to.be.false;
        });
      });
    });

    describe("Refunds", () => {
      it("Allows contributors to be refunded when a project fails", async () => {
        expect(true).to.be.false;
      });

      it("Prevents contributors from being refunded if a project has not failed", async () => {
        expect(true).to.be.false;
      });

      it('Emits a "FILL_ME_IN" event after a a contributor receives a refund', async () => {
        expect(true).to.be.false;
      });
    });

    describe("Cancelations (creator-triggered project failures)", () => {
      it("Allows the creator to cancel the project if < 30 days since deployment has passed ", async () => {
        expect(true).to.be.false;
      });

      it("Prevents the creator from canceling the project if at least 30 days have passed", async () => {
        expect(true).to.be.false;
      });

      it('Emits a "FILL_ME_IN" event after a project is cancelled by the creator', async () => {
        expect(true).to.be.false;
      });
    });

    describe("NFT Contributor Badges", () => {
      it("Awards a contributor with a badge when they make a single contribution of at least 1 ETH", async () => {
        expect(true).to.be.false;
      });

      it("Awards a contributor with a badge when they make multiple contributions to a single project that sum to at least 1 ETH", async () => {
        expect(true).to.be.false;
      });

      it("Does not award a contributor with a badge if their total contribution to a single project sums to < 1 ETH", async () => {
        expect(true).to.be.false;
      });

      it("Awards a contributor with a second badge when their total contribution to a single project sums to at least 2 ETH", async () => {
        // Note: One address can receive multiple badges for a single project,
        //       but they should only receive 1 badge per 1 ETH contributed.
        expect(true).to.be.false;
      });

      it("Does not award a contributor with a second badge if their total contribution to a single project is > 1 ETH but < 2 ETH", async () => {
        expect(true).to.be.false;
      });

      it("Awards contributors with different NFTs for contributions to different projects", async () => {
        expect(true).to.be.false;
      });

      it("Allows contributor badge holders to trade the NFT to another address", async () => {
        expect(true).to.be.false;
      });

      it("Allows contributor badge holders to trade the NFT to another address even after its related project fails", async () => {
        expect(true).to.be.false;
      });
    });
  });
});
