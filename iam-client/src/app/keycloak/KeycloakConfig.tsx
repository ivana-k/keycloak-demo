"use client"

import React, {
    createContext,
    useEffect,
    useState,
    useRef,
  } from 'react'
  import Keycloak from 'keycloak-js'
  
  interface KeycloakContextProps {
    keycloak: Keycloak | null
    authenticated: boolean
  }
  
  const KeycloakContext = createContext<KeycloakContextProps | undefined>(
    undefined,
  )
  
  interface KeycloakProviderProps {
    children: React.ReactNode
  }
  
  const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ children }) => {
    const isRun = useRef<boolean>(false)
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
    const [authenticated, setAuthenticated] = useState<boolean>(false)
  
    useEffect(() => {
      if (isRun.current) return
  
      isRun.current = true
  
      const initKeycloak = async () => {
        const keycloackConfig = {
          url: process.env.NEXT_PUBLIC_KEYCLOAK_URL as string,
          realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string,
          clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT as string,
        }
        const keycloakInstance: Keycloak = new Keycloak(keycloackConfig)
  
        keycloakInstance
          .init({
            onLoad: 'check-sso',
            pkceMethod: 'S256',
            flow: "standard",   // ensure standard OIDC flow
          })
          .then((authenticated: boolean) => {
            if (authenticated) {
                console.log("Tokens:", keycloakInstance.token, keycloak?.idToken);
                console.log("Parsed ID Token:", keycloakInstance.idTokenParsed);        
                console.log("Logged in as:", keycloakInstance.idTokenParsed?.preferred_username);
              } else {
                console.log("Not logged in");
              }
            setAuthenticated(authenticated)
          })
          .catch((error) => {
            console.error('Keycloak initialization failed:', error)
            setAuthenticated(false)
          })
          .finally(() => {
            setKeycloak(keycloakInstance)
            console.log('keycloak', keycloakInstance)
          })
      }
  
      initKeycloak()
    }, [])
  
    return (
      <KeycloakContext.Provider value={{ keycloak, authenticated }}>
        {children}
      </KeycloakContext.Provider>
    )
  }
  
  export { KeycloakProvider, KeycloakContext }