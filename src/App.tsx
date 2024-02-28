import { ReactQueryDevtools } from 'react-query/devtools';
import { Link } from 'react-router-dom';
import Main from './components/Main';

const App = () => {
  return (
    <>
      <Main />
      <ReactQueryDevtools />
    </>
  );
}

export default App;
