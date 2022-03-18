// to deploy locally
// run: npx hardhat node on a terminal
// then run: npx hardhat run --network localhost scripts/12_deploy_all.js
async function main(network) {
  console.log("network: ", network.name);

  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log(`Deployer's address: `, deployerAddress);

  const {
    TREASURY_ADDRESS,
    PLATFORM_FEE,
    WRAPPED_FTM_MAINNET,
    WRAPPED_FTM_TESTNET,
  } = require("../constants");

  ////////////

  const UtiltiyToken = await ethers.getContractFactory("Maribu");
  const utilityToken = await UtiltiyToken.deploy();
  console.log("Maribu deployed at ", utilityToken.address);

  const UTILITY_TOKEN_ADDRESS = utilityToken.address;
  const ArtFallon = await ethers.getContractFactory("ArtFallon");
  const artFallon = await ArtFallon.deploy(
    TREASURY_ADDRESS,
    "2000000000000000000"
  );

  await artFallon.deployed();
  console.log("ArtFallon deployed at", artFallon.address);
  ///////////
  ////////////
  const NFT = await ethers.getContractFactory("NFT");
  const nftExample = await ArtFallon.deploy(
    TREASURY_ADDRESS,
    "2000000000000000000"
  );

  await nftExample.deployed();
  console.log("NFT example deployed at", nftExample.address);
  ///////////

  //////////
  const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
  const proxyAdmin = await ProxyAdmin.deploy();
  await proxyAdmin.deployed();

  const PROXY_ADDRESS = proxyAdmin.address;

  console.log("ProxyAdmin deployed to:", proxyAdmin.address);

  const AdminUpgradeabilityProxyFactory = await ethers.getContractFactory(
    "AdminUpgradeabilityProxy"
  );
  //////////

  /////////
  const Marketplace = await ethers.getContractFactory("ArtFallonMarketplace");
  const marketplaceImpl = await Marketplace.deploy();
  await marketplaceImpl.deployed();

  console.log("ArtFallonMarketplace deployed to:", marketplaceImpl.address);

  const marketplaceProxy = await AdminUpgradeabilityProxyFactory.deploy(
    marketplaceImpl.address,
    PROXY_ADDRESS,
    []
  );
  await marketplaceProxy.deployed();
  console.log("Marketplace Proxy deployed at ", marketplaceProxy.address);
  const MARKETPLACE_PROXY_ADDRESS = marketplaceProxy.address;
  const marketplace = await ethers.getContractAt(
    "ArtFallonMarketplace",
    marketplaceProxy.address
  );

  await marketplace.initialize(TREASURY_ADDRESS, PLATFORM_FEE);
  console.log("Marketplace Proxy initialized");

  /////////

  /////////
  const BundleMarketplace = await ethers.getContractFactory(
    "ArtFallonBundleMarketplace"
  );
  const bundleMarketplaceImpl = await BundleMarketplace.deploy();
  await bundleMarketplaceImpl.deployed();
  console.log(
    "ArtFallonBundleMarketplace deployed to:",
    bundleMarketplaceImpl.address
  );

  const bundleMarketplaceProxy = await AdminUpgradeabilityProxyFactory.deploy(
    bundleMarketplaceImpl.address,
    PROXY_ADDRESS,
    []
  );
  await bundleMarketplaceProxy.deployed();
  console.log(
    "Bundle Marketplace Proxy deployed at ",
    bundleMarketplaceProxy.address
  );
  const BUNDLE_MARKETPLACE_PROXY_ADDRESS = bundleMarketplaceProxy.address;
  const bundleMarketplace = await ethers.getContractAt(
    "ArtFallonBundleMarketplace",
    bundleMarketplaceProxy.address
  );

  await bundleMarketplace.initialize(TREASURY_ADDRESS, PLATFORM_FEE);
  console.log("Bundle Marketplace Proxy initialized");

  ////////

  ////////
  const Auction = await ethers.getContractFactory("ArtFallonAuction");
  const auctionImpl = await Auction.deploy();
  await auctionImpl.deployed();
  console.log("ArtFallonAuction deployed to:", auctionImpl.address);

  const auctionProxy = await AdminUpgradeabilityProxyFactory.deploy(
    auctionImpl.address,
    PROXY_ADDRESS,
    []
  );

  await auctionProxy.deployed();
  console.log("Auction Proxy deployed at ", auctionProxy.address);
  const AUCTION_PROXY_ADDRESS = auctionProxy.address;
  const auction = await ethers.getContractAt(
    "ArtFallonAuction",
    auctionProxy.address
  );

  await auction.initialize(TREASURY_ADDRESS);
  console.log("Auction Proxy initialized");

  ////////

  ////////
  const Factory = await ethers.getContractFactory("ArtFallonNFTFactory");
  const factory = await Factory.deploy(
    AUCTION_PROXY_ADDRESS,
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS,
    "10000000000000000000",
    TREASURY_ADDRESS,
    "50000000000000000000"
  );
  await factory.deployed();
  console.log("ArtFallonNFTFactory deployed to:", factory.address);

  const PrivateFactory = await ethers.getContractFactory(
    "ArtFallonNFTFactoryPrivate"
  );
  const privateFactory = await PrivateFactory.deploy(
    AUCTION_PROXY_ADDRESS,
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS,
    "10000000000000000000",
    TREASURY_ADDRESS,
    "50000000000000000000"
  );
  await privateFactory.deployed();
  console.log(
    "ArtFallonNFTFactoryPrivate deployed to:",
    privateFactory.address
  );
  ////////

  ////////
  const NFTTradable = await ethers.getContractFactory("ArtFallonNFTTradable");
  const nft = await NFTTradable.deploy(
    "ArtFallon",
    "ART",
    AUCTION_PROXY_ADDRESS,
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS,
    "10000000000000000000",
    TREASURY_ADDRESS
  );
  await nft.deployed();
  console.log("ArtFallonNFTTradable deployed to:", nft.address);

  const NFTTradablePrivate = await ethers.getContractFactory(
    "ArtFallonNFTTradablePrivate"
  );
  const nftPrivate = await NFTTradablePrivate.deploy(
    "IArtFallon",
    "IART",
    AUCTION_PROXY_ADDRESS,
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS,
    "10000000000000000000",
    TREASURY_ADDRESS
  );
  await nftPrivate.deployed();
  console.log("ArtFallonNFTTradablePrivate deployed to:", nftPrivate.address);
  ////////

  ////////
  const TokenRegistry = await ethers.getContractFactory(
    "ArtFallonTokenRegistry"
  );
  const tokenRegistry = await TokenRegistry.deploy();

  await tokenRegistry.deployed();

  console.log("ArtFallonTokenRegistry deployed to", tokenRegistry.address);
  ////////

  ////////
  const AddressRegistry = await ethers.getContractFactory(
    "ArtFallonAddressRegistry"
  );
  const addressRegistry = await AddressRegistry.deploy();

  await addressRegistry.deployed();

  console.log("ArtFallonAddressRegistry deployed to", addressRegistry.address);
  const ArtFallon_ADDRESS_REGISTRY = addressRegistry.address;
  ////////

  ////////
  const PriceFeed = await ethers.getContractFactory("ArtFallonPriceFeed");
  const WRAPPED_FTM =
    network.name === "mainnet" ? WRAPPED_FTM_MAINNET : WRAPPED_FTM_TESTNET;
  const priceFeed = await PriceFeed.deploy(
    ArtFallon_ADDRESS_REGISTRY,
    WRAPPED_FTM
  );

  await priceFeed.deployed();

  console.log("ArtFallonPriceFeed deployed to", priceFeed.address);
  ////////

  ////////
  const ArtTradable = await ethers.getContractFactory("ArtFallonArtTradable");
  const artTradable = await ArtTradable.deploy(
    "ArtFallonArt",
    "FART",
    "20000000000000000000",
    TREASURY_ADDRESS,
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS
  );
  await artTradable.deployed();
  console.log("ArtFallonArtTradable deployed to:", artTradable.address);

  const ArtTradablePrivate = await ethers.getContractFactory(
    "ArtFallonArtTradablePrivate"
  );
  const artTradablePrivate = await ArtTradablePrivate.deploy(
    "ArtFallonArt",
    "FART",
    "20000000000000000000",
    TREASURY_ADDRESS,
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS
  );
  await artTradablePrivate.deployed();
  console.log(
    "ArtFallonArtTradablePrivate deployed to:",
    artTradablePrivate.address
  );
  ////////

  ////////
  const ArtFactory = await ethers.getContractFactory("ArtFallonArtFactory");
  const artFactory = await ArtFactory.deploy(
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS,
    "20000000000000000000",
    TREASURY_ADDRESS,
    "10000000000000000000"
  );
  await artFactory.deployed();
  console.log("ArtFallonArtFactory deployed to:", artFactory.address);

  const ArtFactoryPrivate = await ethers.getContractFactory(
    "ArtFallonArtFactoryPrivate"
  );
  const artFactoryPrivate = await ArtFactoryPrivate.deploy(
    MARKETPLACE_PROXY_ADDRESS,
    BUNDLE_MARKETPLACE_PROXY_ADDRESS,
    "20000000000000000000",
    TREASURY_ADDRESS,
    "10000000000000000000"
  );
  await artFactoryPrivate.deployed();
  console.log(
    "ArtFallonArtFactoryPrivate deployed to:",
    artFactoryPrivate.address
  );
  ////////

  await marketplace.updateAddressRegistry(ArtFallon_ADDRESS_REGISTRY);
  await bundleMarketplace.updateAddressRegistry(ArtFallon_ADDRESS_REGISTRY);

  await auction.updateAddressRegistry(ArtFallon_ADDRESS_REGISTRY);

  await addressRegistry.updateArtFallon(artFallon.address);
  await addressRegistry.updateAuction(auction.address);
  await addressRegistry.updateMarketplace(marketplace.address);
  await addressRegistry.updateBundleMarketplace(bundleMarketplace.address);
  await addressRegistry.updateNFTFactory(factory.address);
  await addressRegistry.updateNFTFactoryPrivate(privateFactory.address);
  await addressRegistry.updateTokenRegistry(tokenRegistry.address);
  await addressRegistry.updatePriceFeed(priceFeed.address);
  await addressRegistry.updateArtFactory(artFactory.address);
  await addressRegistry.updateArtFactoryPrivate(artFactoryPrivate.address);

  await tokenRegistry.add(WRAPPED_FTM);
  await tokenRegistry.add(UTILITY_TOKEN_ADDRESS);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
