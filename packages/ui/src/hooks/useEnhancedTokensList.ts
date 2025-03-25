import { useMemo } from 'react'
import type { BalanceMap } from './useDuneBalances'
import { type Currency, useRelayChains } from '@reservoir0x/relay-kit-hooks'
import { useRelayClient } from '../hooks/index.js'

export type EnhancedToken = {
  chainId: number
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI: string
  verified?: boolean
  vmType?: 'bvm' | 'evm' | 'svm' | 'tvm' | 'tonvm' | 'suivm'
  balance?: {
    amount: string
    price_usd?: number
    value_usd?: number
  }
  groupID?: string
  isGasCurrency?: boolean
}

export const useEnhancedTokensList = (
  tokenLists: Currency[] | undefined,
  balanceMap: BalanceMap | undefined,
  context: 'from' | 'to',
  multiWalletSupportEnabled: boolean,
  chainId?: number
): EnhancedToken[] => {
  const relayClient = useRelayClient()
  const { chains } = useRelayChains(relayClient?.baseApiUrl)

  const chainCurrencyMap = useMemo(() => {
    if (!chains) return new Map()
    return new Map(
      chains
        .filter((chain) => chain?.currency?.address)
        .map((chain) => [
          `${chain.id}:${chain.currency?.address?.toLowerCase()}`,
          true
        ])
    )
  }, [chains])

  return useMemo(() => {
    if (!tokenLists) return []

    const enhancedTokens = tokenLists
      .map((currency) => {
        // Validate that all required fields exist
        if (
          typeof currency?.chainId !== 'number' ||
          !currency?.address ||
          !currency?.symbol ||
          !currency?.name ||
          typeof currency?.decimals !== 'number'
        ) {
          return null
        }

        // Construct the enhanced token with all required fields
        const enhancedToken: EnhancedToken = {
          chainId: currency.chainId,
          address: currency.address,
          symbol: currency.symbol,
          name: currency.name,
          decimals: currency.decimals,
          logoURI: currency.metadata?.logoURI ?? '',
          verified: currency.metadata?.verified ?? false,
          vmType: currency.vmType,
          balance: balanceMap?.[`${currency.chainId}:${currency.address}`],
          isGasCurrency: chainCurrencyMap.has(
            `${currency.chainId}:${currency.address.toLowerCase()}`
          )
        }

        return enhancedToken
      })
      // Remove any tokens that failed validation
      .filter((token): token is EnhancedToken => token !== null)
      // Remove duplicate tokens by chainId:address
      .filter(
        (token, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.chainId === token.chainId &&
              t.address.toLowerCase() === token.address.toLowerCase()
          )
      )
      // Filter by chainId if specified
      .filter((token) => !chainId || token.chainId === chainId)
      // Filter out non-EVM tokens when multiWallet support is disabled
      .filter((token) => {
        if (context === 'from' && !multiWalletSupportEnabled) {
          return token.vmType === 'evm'
        }
        return true
      })
      .sort((a, b) => {
        // Sort by USD value
        const aValueUsd = a.balance?.value_usd ?? 0
        const bValueUsd = b.balance?.value_usd ?? 0
        if (aValueUsd !== bValueUsd) {
          return bValueUsd - aValueUsd
        }

        // Prioritize ETH tokens
        if (a.groupID === 'ETH' && b.groupID !== 'ETH') return -1
        if (b.groupID === 'ETH' && a.groupID !== 'ETH') return 1

        // Then prioritize USDC tokens
        if (a.groupID === 'USDC' && b.groupID !== 'USDC') return -1
        if (b.groupID === 'USDC' && a.groupID !== 'USDC') return 1

        // Finally sort by verified status
        const aVerified = a.verified ?? false
        const bVerified = b.verified ?? false
        return bVerified === aVerified ? 0 : bVerified ? 1 : -1
      })

    return enhancedTokens
  }, [
    tokenLists,
    balanceMap,
    context,
    multiWalletSupportEnabled,
    chainId,
    chainCurrencyMap
  ])
}
