import './App.css'
import CommitGraph from './components/CommitGraph/CommitGraph'
import TerminalComponent from './components/Terminal'
import TreeGithub from './components/TreeGithub/TreeGithub'

function App() {
  return (
    <div className='container'>
      <TerminalComponent />
      <TreeGithub />
      <div style={{ width: '100vw', height: '600px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CommitGraph />
      </div>
    </div>
  )
}

export default App
