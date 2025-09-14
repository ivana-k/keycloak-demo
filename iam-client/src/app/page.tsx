"use client"

import HomePage  from './pages/HomePage'
import { KeycloakProvider } from './keycloak/KeycloakConfig'

export default function Home() {
  
  return (
    <div className="font-sans">
      <main>
      <KeycloakProvider>
        <HomePage />
      </KeycloakProvider>
      </main>
    </div>

    
  );
}
