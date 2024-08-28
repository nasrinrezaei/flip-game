import { Helmet } from 'react-helmet';
import FlipGame from '../components/FlipGame';
import { Route, Routes } from 'react-router-dom';

export function Game() {
  return (
    <>
      <Helmet>
        <title> Flip Game</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<FlipGame />} />
      </Routes>
    </>
  );
}
