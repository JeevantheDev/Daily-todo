import './App.scss';
import Header from './components/Header/Header';
import SigninButton from './components/SigninButton/SigninButton';
import TodoBoard from './components/TodoBoard/TodoBoard';
import { GlobalProvider } from './context/Context';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <div className="App-container">
          <Header />
          <SigninButton />
          <TodoBoard />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
