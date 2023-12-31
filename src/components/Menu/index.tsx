import React, { useContext } from 'react'
import { Menu as UikitMenu, ConnectorNames } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import useGetbrrlPriceData from 'hooks/useGetbrrlPriceData'
import useGettsbPriceData from 'hooks/useGettsbPriceData'
import useGetLocalProfile from 'hooks/useGetLocalProfile'
import { connectorsByName } from 'connectors'
import links from './config'

const Menu: React.FC = (props) => {
  const { account, activate, deactivate } = useWeb3React()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const priceData = useGetPriceData()
  const cakePriceUsd = useGetPriceData()
  const brrlPriceUsd = useGetbrrlPriceData()
  const tsbPriceUsd = useGettsbPriceData()
  const profile = useGetLocalProfile()

  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={(connectorId: ConnectorNames) => {
        const connector = connectorsByName[connectorId]
        if (connector) {
          activate(connector)
        }
      }}
      logout={deactivate}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd}
      brrlPriceUsd={brrlPriceUsd}
      tsbPriceUsd={tsbPriceUsd}
      profile={profile}
      {...props}
    />
  )
}

export default Menu
