import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('https://graphql.union.build/v1/graphql');

export const getTransactionCount = async () => {
  const query = gql`
    query GetTransactions {
      v2_transfers(limit: 1000, where: { stage: { _eq: "completed" } }) {
        asset {
          chain
        }
      }
      v1_packets(limit: 1000) {
        asset {
          chain
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    const transfers = data.v2_transfers || [];
    const packets = data.v1_packets || [];
    const allTxns = [...transfers, ...packets];
    const chainCounts = {};

    chains.forEach(chain => {
      chainCounts[chain] = allTxns.filter(tx => tx.asset?.chain === chain).length;
    });

    console.log('Transaction Counts:', chainCounts); // Log for debugging
    return chainCounts;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return {};
  }
};
