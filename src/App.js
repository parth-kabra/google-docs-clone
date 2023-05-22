import './App.css';
import Header from './components/header';
import Icons from './components/icons';
import EncryptedContentDisplay from './components/shared';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Editor = <>
	<Header />
	<Icons />
</>

const ViewOnlyDocument = <>
    <EncryptedContentDisplay />
    <Icons />
</>

function App() {
	return (
		<Routes>
			<Route path='/' element={Editor} />
			<Route path="/document/:content" element={ViewOnlyDocument} />
	  	</Routes>
	);
}

export default App;
