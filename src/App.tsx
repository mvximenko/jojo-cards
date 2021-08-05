import stands from './data/stands';
import users from './data/users';
import { API_IMG } from './config';

function App() {
  return (
    <>
      {stands[0].map((stand) => (
        <div>
          <p>{stand.id}</p>
          <p>{stand.name}</p>
          <img src={`${API_IMG}${stand.image}.webp`} />
        </div>
      ))}
    </>
  );
}

export default App;
