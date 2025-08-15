import React, { useState } from "react"
import Dashboard from "./pages/Dashboard"
import Renda from "./pages/Renda"
import Despesas from "./pages/Despesas"
import Fixas from "./pages/Fixas"
import Pedidos from "./pages/Pedidos"
import Casa from "./pages/Casa"
import { Home, DollarSign, CreditCard, FileText, Settings } from "lucide-react"

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState("Dashboard")

  const renderAba = () => {
    switch (abaAtiva) {
      case "Dashboard": return <Dashboard />
      case "Renda": return <Renda />
      case "Despesas": return <Despesas />
      case "Fixas": return <Fixas />
      case "Pedidos": return <Pedidos />
      case "Casa": return <Casa />
      default: return <Dashboard />
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Conteúdo principal */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {renderAba()}
      </div>

      {/* Barra inferior de navegação */}
      <nav style={{
        display: 'flex', justifyContent: 'space-around',
        padding: '10px 0', borderTop: '1px solid #ddd', background: '#fff'
      }}>
        <button onClick={() => setAbaAtiva("Dashboard")}><Home size={24} /></button>
        <button onClick={() => setAbaAtiva("Renda")}><DollarSign size={24} /></button>
        <button onClick={() => setAbaAtiva("Despesas")}><CreditCard size={24} /></button>
        <button onClick={() => setAbaAtiva("Fixas")}><FileText size={24} /></button>
        <button onClick={() => setAbaAtiva("Casa")}><Settings size={24} /></button>
      </nav>
    </div>
  )
}
