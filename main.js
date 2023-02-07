import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'
import { configureChains, createClient, signMessage } from '@wagmi/core'
import { goerli, mainnet } from '@wagmi/core/chains'
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'

// define constants
const projectId = '5b71f5ba1a93e7ee227d6f2f023b946d'
const chains = [mainnet, goerli]

// configure wagmi client
const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: [...modalConnectors({ appName: 'web3Modal', chains }), new SafeConnector({ chains })],
  provider
})

// create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiClient, chains)
export const web3Modal = new Web3Modal(
  {
    projectId,
    walletImages: {
      safe: 'https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg'
    }
  },
  ethereumClient
)

document.getElementById('sign-button').onclick = async () => {
  const signature = await signMessage({
    message: 'Hello, World!'
  })
  console.log(signature)
}
