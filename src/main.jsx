
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
//Nếu không sử dụng redux: createRoot(document.getElementById('root')).render(<App />);



//{} : destructuring
/*
const element = <h1>Hello, world!</h1>;
// Chuyển thành:
const element = React.createElement('h1', null, 'Hello, world!');
*/
// ReactDOM.render(element, document.getElementById('root'));