import './css/Header.css';

export default function Header() {
  return (
    <header className='flex justify-between items-center mb-4'>
      <h1 className='title'>
        <a href='/'>독일 생활 표현 사전</a>
      </h1>
      <div>
        <button onClick={() => setPage('favorites')}>즐겨찾기</button>
      </div>
    </header>
  );
}
