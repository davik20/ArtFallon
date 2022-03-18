// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/introspection/IERC165.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtFallonAddressRegistry is Ownable {
    bytes4 private constant INTERFACE_ID_ERC721 = 0x80ac58cd;

    /// @notice ArtFallon contract
    address public artFallon;

    /// @notice ArtFallonAuction contract
    address public auction;

    /// @notice ArtFallonMarketplace contract
    address public marketplace;

    /// @notice ArtFallonBundleMarketplace contract
    address public bundleMarketplace;

    /// @notice ArtFallonNFTFactory contract
    address public factory;

    /// @notice ArtFallonNFTFactoryPrivate contract
    address public privateFactory;

    /// @notice ArtFallonArtFactory contract
    address public artFactory;

    /// @notice ArtFallonArtFactoryPrivate contract
    address public privateArtFactory;

    /// @notice ArtFallonTokenRegistry contract
    address public tokenRegistry;

    /// @notice ArtFallonPriceFeed contract
    address public priceFeed;

    /**
     @notice Update artFallon contract
     @dev Only admin
     */
    function updateArtFallon(address _artFallon) external onlyOwner {
        require(
            IERC165(_artFallon).supportsInterface(INTERFACE_ID_ERC721),
            "Not ERC721"
        );
        artFactory = _artFallon;
    }

    /**
     @notice Update ArtFallonAuction contract
     @dev Only admin
     */
    function updateAuction(address _auction) external onlyOwner {
        auction = _auction;
    }

    /**
     @notice Update ArtFallonMarketplace contract
     @dev Only admin
     */
    function updateMarketplace(address _marketplace) external onlyOwner {
        marketplace = _marketplace;
    }

    /**
     @notice Update ArtFallonBundleMarketplace contract
     @dev Only admin
     */
    function updateBundleMarketplace(address _bundleMarketplace)
        external
        onlyOwner
    {
        bundleMarketplace = _bundleMarketplace;
    }

    /**
     @notice Update ArtFallonNFTFactory contract
     @dev Only admin
     */
    function updateNFTFactory(address _factory) external onlyOwner {
        factory = _factory;
    }

    /**
     @notice Update ArtFallonNFTFactoryPrivate contract
     @dev Only admin
     */
    function updateNFTFactoryPrivate(address _privateFactory)
        external
        onlyOwner
    {
        privateFactory = _privateFactory;
    }

    /**
     @notice Update ArtFallonArtFactory contract
     @dev Only admin
     */
    function updateArtFactory(address _artFactory) external onlyOwner {
        artFactory = _artFactory;
    }

    /**
     @notice Update ArtFallonArtFactoryPrivate contract
     @dev Only admin
     */
    function updateArtFactoryPrivate(address _privateArtFactory)
        external
        onlyOwner
    {
        privateArtFactory = _privateArtFactory;
    }

    /**
     @notice Update token registry contract
     @dev Only admin
     */
    function updateTokenRegistry(address _tokenRegistry) external onlyOwner {
        tokenRegistry = _tokenRegistry;
    }

    /**
     @notice Update price feed contract
     @dev Only admin
     */
    function updatePriceFeed(address _priceFeed) external onlyOwner {
        priceFeed = _priceFeed;
    }
}
