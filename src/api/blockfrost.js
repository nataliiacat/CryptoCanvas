const BLOCKFROST_API_URL = 'https://cardano-mainnet.blockfrost.io/api/v0';
const PROJECT_ID = 'mainnetRUrPjKhpsagz4aKOCbvfTPHsF0SmwhLc';

export const getWalletData = async (address) => {
  try {
    const response = await fetch(`${BLOCKFROST_API_URL}/addresses/${address}`, {
      headers: {
        'project_id': PROJECT_ID,
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching wallet data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw error;
  }
};

export const getNFTDetails = async (assetUnit) => {
  try {
    const response = await fetch(`${BLOCKFROST_API_URL}/assets/${assetUnit}`, {
      headers: {
        'project_id': PROJECT_ID,
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching NFT details: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching NFT details:", error);
    throw error;
  }
};

export const getTransactions = async (address) => {
  try {
    const response = await fetch(`${BLOCKFROST_API_URL}/addresses/${address}/transactions`, {
      headers: {
        'project_id': PROJECT_ID,
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching transactions: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};