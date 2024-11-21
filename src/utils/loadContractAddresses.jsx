import contracts from '../artifacts/arbitrum-one/deployments.json';

/**
 * Utility function to get the contract address by network and key.
 * @param {string} network - The network key (e.g., "arbitrum-sepolia").
 * @param {string} key - The key for the contract (e.g., "USDTv1").
 * @returns {string | null} - The contract address or null if the key is invalid.
 */
export function getContractAddress(network, key) {
  if (contracts[network] && contracts[network][key]) {
    return contracts[network][key];
  }
  console.warn(`Contract key "${key}" not found in the configuration for network "${network}".`);
  return null;
}

/**
 * Utility function to get the full contract details by network and key.
 * @param {string} network - The network key (e.g., "arbitrum-sepolia").
 * @param {string} key - The key for the contract (e.g., "USDTv1").
 * @returns {object | null} - The contract details (name and address) or null if the key is invalid.
 */
export function getContractDetails(network, key) {
  if (contracts[network] && contracts[network][key]) {
    return {
      contract_name: key,
      contract_address: contracts[network][key]
    };
  }
  console.warn(`Contract key "${key}" not found in the configuration for network "${network}".`);
  return null;
}
