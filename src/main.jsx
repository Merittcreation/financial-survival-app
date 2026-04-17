import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  state = { error: null }
  static getDerivedStateFromError(e) { return { error: e } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight:'100vh', background:'#020209', color:'white', padding:'24px', fontFamily:'monospace' }}>
          <h2 style={{ color:'#f87171', marginBottom:'12px' }}>⚠ App Error</h2>
          <pre style={{ color:'#fca5a5', fontSize:'13px', whiteSpace:'pre-wrap', wordBreak:'break-word' }}>
            {this.state.error.message}
          </pre>
          <pre style={{ color:'#94a3b8', fontSize:'11px', marginTop:'12px', whiteSpace:'pre-wrap', wordBreak:'break-word' }}>
            {this.state.error.stack}
          </pre>
          <button
            onClick={() => { localStorage.clear(); window.location.reload() }}
            style={{ marginTop:'20px', padding:'12px 24px', background:'#10b981', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px' }}
          >
            Clear cache &amp; reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
