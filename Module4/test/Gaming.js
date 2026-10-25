const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("test game scenario", function(){
  it("test my win loss function for a 'win' ", async function(){
          const Game = await ethers.deployContract("Gaming");
          const signers = await ethers.getSigners();
          const fundGame = await Game.fundGame({from: signers[0], value: ethers.parseEther('100')})
	  const preBalance = await ethers.provider.getBalance(signers[0])
	  // 'random number' from the blcck # to module + 1 is {0 10}
          const gameRound = await Game.winOrLose(11,true,{ from: signers[0], value: ethers.parseEther('1.0') } )
          const postBalance = await ethers.provider.getBalance(signers[0])
	  console.log("preBalance", preBalance)
	  console.log("postBalance", postBalance)
          expect(postBalance).to.be.greaterThan(preBalance + ethers.parseEther(".9"));  // member the gas fees will make it somewhat less than 1 ehter win
          const playerStats = await Game.players(signers[0])
          expect(playerStats[0]).to.equal(1)
          //assert.isAtLeast(initialBalanceInEther, postBalanceInEther + 1, 'Player account should have decreased by the amount of the wager')
  });

  it("test my win loss function for a 'loss' ", async function(){
          const Game = await ethers.deployContract("Gaming");
          const signers = await ethers.getSigners();
          const fundGame = await Game.fundGame({from: signers[0], value: ethers.parseEther('100')})
          const preBalance = await ethers.provider.getBalance(signers[0])
          const preBalanceContract = await ethers.provider.getBalance(Game.target)
          // 'random number' from the blcck # to module + 1 is {0 10}
          const gameRound = await Game.winOrLose(11,false,{ from: signers[0], value: ethers.parseEther('2.0') } )
          const postBalance = await ethers.provider.getBalance(signers[0])
          const postBalanceContract = await ethers.provider.getBalance(Game.target)
          console.log("preBalance", preBalance)
          console.log("postBalance", postBalance)
          expect(postBalanceContract).to.equal(preBalanceContract + ethers.parseEther("2.0"));  // member the gas fees will make it somewhat less than 1 ehter win
          const playerStats = await Game.players(signers[0])
          expect(playerStats[1]).to.equal(1)
  });

  it("test my win loss function for a 'win' ", async function(){

          const Game = await ethers.deployContract("Gaming");
          const signers = await ethers.getSigners();
          const fundGame = await Game.fundGame({from: signers[0], value: ethers.parseEther('100')})
          const preBalance = await ethers.provider.getBalance(signers[0])
          // 'random number' from the blcck # to module + 1 is {0 10}
          const gameRound = await Game.winOrLose(0, false,{ from: signers[0], value: ethers.parseEther('5.0') } )
          const postBalance = await ethers.provider.getBalance(signers[0])
          console.log("preBalance", preBalance)
          console.log("postBalance", postBalance)
          expect(postBalance).to.be.greaterThan(preBalance + ethers.parseEther("4.9"));  // member the gas fees will make it somewhat less than 1 ehter win
          const playerStats = await Game.players(signers[0])
          expect(playerStats[0]).to.equal(1)

  });

  it("test my win loss function for a 'win' ", async function(){

          const Game = await ethers.deployContract("Gaming");
          const signers = await ethers.getSigners();
          const fundGame = await Game.fundGame({from: signers[0], value: ethers.parseEther('100')})
          const preBalanceContract = await ethers.provider.getBalance(Game.target)
          // 'random number' from the blcck # to module + 1 is {0 10}
          const gameRound = await Game.winOrLose(0,true,{ from: signers[0], value: ethers.parseEther('7.0') } )
          const postBalanceContract = await ethers.provider.getBalance(Game.target)
          expect(postBalanceContract).to.equal(preBalanceContract + ethers.parseEther("7.0"));  // member the gas fees will make it somewhat less than 1 ehter win
          const playerStats = await Game.players(signers[0])
          expect(playerStats[1]).to.equal(1)
  });

  it("test loss functionality strictly for the == condition and true ", async function(){

          const Game = await ethers.deployContract("Gaming");
          const signers = await ethers.getSigners();
          const fundGame = await Game.fundGame({from: signers[0], value: ethers.parseEther('100')})
          await Game.setMysteryNumber(6)
	  const preBalance = await ethers.provider.getBalance(signers[0])
	  const preBalanceContract = await ethers.provider.getBalance(Game.target)
          // 'random number' from the block # has been forced to a value of '6'}
          const gameRound = await Game.winOrLose(6,true,{ from: signers[0], value: ethers.parseEther('2.0') } )
	  const postBalance = await ethers.provider.getBalance(signers[0])
          const postBalanceContract = await ethers.provider.getBalance(Game.target)
          console.log("preBalance", preBalance)
          console.log("postBalance", postBalance)

          expect(postBalanceContract).to.equal(preBalanceContract + ethers.parseEther("2.0"));
          const playerStats = await Game.players(signers[0])
          expect(playerStats[1]).to.equal(1)
  });




  it("Check to see if player winning stats are incrementing correctly", async function(){

          const Game = await ethers.deployContract("Gaming");
          const signers = await ethers.getSigners();
          const fundGame = await Game.fundGame({from: signers[0], value: ethers.parseEther('100')})
          const preBalance = await ethers.provider.getBalance(signers[0])
          const preBalanceContract = await ethers.provider.getBalance(Game.target)
          const gameRound = await Game.winOrLose(11,true,{ from: signers[0], value: ethers.parseEther('2.0')})
          // run second round
	  const gameRoundTwo = await Game.winOrLose(11,true,{ from: signers[0], value: ethers.parseEther('2.0')})

          const playerStats = await Game.players(signers[0])
          expect(playerStats[0]).to.equal(2)
  });

  it("Check to see if player losing stats are incrementing correctly", async function(){

          const Game = await ethers.deployContract("Gaming");
          const signers = await ethers.getSigners();
          const fundGame = await Game.fundGame({from: signers[0], value: ethers.parseEther('100')})
          const preBalance = await ethers.provider.getBalance(signers[0])
          const preBalanceContract = await ethers.provider.getBalance(Game.target)
          const gameRound = await Game.winOrLose(0,true,{ from: signers[0], value: ethers.parseEther('2.0')})
          // run second round
	  const gameRoundTwo = await Game.winOrLose(0,true,{ from: signers[0], value: ethers.parseEther('2.0')})
          const playerStats = await Game.players(signers[0]) 

	  expect(playerStats[1]).to.equal(2)
  });

  it("Check to see if Game wide losing stats are incrementing correctly", async function(){

          const Game = await ethers.deployContract("Gaming");
          const signers = await ethers.getSigners();
          const fundGame = await Game.fundGame({from: signers[0], value: ethers.parseEther('100')})
          
          const gameRound = await Game.winOrLose(0,true,{ from: signers[0], value: ethers.parseEther('2.0')})
          // run second round
          const gameRoundTwo = await Game.winOrLose(0,true,{ from: signers[0], value: ethers.parseEther('2.0')})
          

          expect(await Game.losses()).to.equal(2);
  });

  it("Check to see if Game wide winning stats are incrementing correctly", async function(){

          const Game = await ethers.deployContract("Gaming");
          const signers = await ethers.getSigners();
          const fundGame = await Game.fundGame({from: signers[0], value: ethers.parseEther('100')})

          const gameRound = await Game.winOrLose(11,true,{ from: signers[0], value: ethers.parseEther('2.0')})
          // run second round
          const gameRoundTwo = await Game.winOrLose(11,true,{ from: signers[0], value: ethers.parseEther('2.0')})


          expect(await Game.wins()).to.equal(2);
  });
	









});
